import { Component, inject, signal } from '@angular/core';
import { TicketService } from './ticket.service';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent {
  service = inject(TicketService);
  sanitizer = inject(DomSanitizer);
  
  view = signal<'list' | 'form'>('list');
  formModel = signal<any>({});
  assignees = ['Robert', 'Sarah', 'James', 'Elena', 'Hiro', 'Chloe'];
  statuses = ['Open', 'In-Progress', 'Resolved', 'Re-opened', 'Tested', 'Deployed', 'Closed'];

  get markdownPreview() {
    return this.sanitizer.bypassSecurityTrustHtml(marked.parse(this.formModel().description || ''));
  }

  openForm(ticket?: any) {
    this.formModel.set(ticket ? { ...ticket } : { assignee: 'Robert', status: 'Open', summary: '', description: '' });
    this.view.set('form');
  }

  onSave() {
    this.service.save(this.formModel());
    this.view.set('list');
  }

  confirmDelete(id: number) {
    const modal = new (window as any).parent.bootstrap.Modal(window.parent.document.getElementById('deleteModal'));
    window.parent.document.getElementById('globalConfirmDelete')!.onclick = () => {
      this.service.delete(id);
      modal.hide();
    };
    modal.show();
  }
}