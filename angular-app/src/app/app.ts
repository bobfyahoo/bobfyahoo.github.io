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

  openForm(ticket?: any) {
    this.formModel.set(ticket ? { ...ticket } : { assignee: 'Robert', summary: '', description: '' });
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