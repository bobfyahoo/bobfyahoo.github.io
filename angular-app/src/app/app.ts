import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketService } from './ticket.service'; // We will create this next
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  service = inject(TicketService);
  view = signal<'list' | 'form'>('list');
  formModel = signal<any>({});
  
  assignees = ['Robert', 'Sarah', 'James', 'Elena', 'Hiro', 'Chloe'];

  statuses = ['Open', 'In-Progress', 'Resolved', 'Re-opened', 'Tested', 'Deployed', 'Closed'];

  openForm(ticket?: any) {
    this.formModel.set(ticket ? { ...ticket } : { assignee: '', summary: '', description: '', status: 'Open' });
    this.view.set('form');

    // clear any previous invalid markers
    setTimeout(() => {
      const ids = ['summaryInput', 'descriptionInput', 'assigneeSelect', 'statusSelect'];
      ids.forEach(id => {
        try { document.getElementById(id)?.classList.remove('is-invalid'); } catch(e) {}
      });
    });
  }

  onSave() {
    const fm = this.formModel();
    const summary = (fm.summary || '').toString().trim();
    const description = (fm.description || '').toString().trim();
    const assignee = (fm.assignee || '').toString().trim();
    const status = (fm.status || '').toString().trim();

    // validation
    if (!summary) {
      document.getElementById('summaryInput')?.classList.add('is-invalid');
      document.getElementById('summaryInput')?.focus();
      return;
    } else { document.getElementById('summaryInput')?.classList.remove('is-invalid'); }

    if (!description) {
      document.getElementById('descriptionInput')?.classList.add('is-invalid');
      document.getElementById('descriptionInput')?.focus();
      return;
    } else { document.getElementById('descriptionInput')?.classList.remove('is-invalid'); }

    if (!assignee) {
      document.getElementById('assigneeSelect')?.classList.add('is-invalid');
      document.getElementById('assigneeSelect')?.focus();
      return;
    } else { document.getElementById('assigneeSelect')?.classList.remove('is-invalid'); }

    if (!status) {
      document.getElementById('statusSelect')?.classList.add('is-invalid');
      document.getElementById('statusSelect')?.focus();
      return;
    } else { document.getElementById('statusSelect')?.classList.remove('is-invalid'); }

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