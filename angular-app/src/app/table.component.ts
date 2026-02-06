import { Component, inject, Output, EventEmitter } from '@angular/core';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-ticket-table',
  standalone: true,
  template: `
    <button class="btn btn-primary mb-3" (click)="add.emit()">Add Ticket</button>
    <table class="table">
      <thead><tr><th>Summary</th><th>Assignee</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        @for (t of service.tickets(); track t.id) {
          <tr>
            <td>{{ t.summary }}</td>
            <td>{{ t.assignee }}</td>
            <td><span class="badge bg-secondary">{{ t.status }}</span></td>
            <td>
              <button class="btn btn-sm btn-info me-1" (click)="edit.emit(t)">Edit</button>
              <button class="btn btn-sm btn-danger" (click)="onDelete(t.id)">Delete</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class TableComponent {
  service = inject(TicketService);
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();

  onDelete(id: number) {
    const modal = new (window as any).bootstrap.Modal('#deleteModal');
    const btn = document.getElementById('globalConfirmDelete')!;
    btn.onclick = () => {
      this.service.delete(id);
      modal.hide();
    };
    modal.show();
  }
}