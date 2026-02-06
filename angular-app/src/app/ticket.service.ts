import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TicketService {
  tickets = signal<any[]>(JSON.parse(localStorage.getItem('shared_tickets') || '[]'));

  constructor() {
    window.addEventListener('storage', () => {
      this.tickets.set(JSON.parse(localStorage.getItem('shared_tickets') || '[]'));
    });
  }

  save(ticket: any) {
    const data = JSON.parse(localStorage.getItem('shared_tickets') || '[]');
    const now = new Date().toLocaleString();
    const updated = ticket.id 
      ? data.map((t: any) => t.id === ticket.id ? { ...ticket, updated: now } : t)
      : [...data, { ...ticket, id: Date.now(), created: now, updated: now }];
    
    localStorage.setItem('shared_tickets', JSON.stringify(updated));
    this.tickets.set(updated);
  }

  delete(id: number) {
    const updated = JSON.parse(localStorage.getItem('shared_tickets') || '[]').filter((t:any) => t.id !== id);
    localStorage.setItem('shared_tickets', JSON.stringify(updated));
    this.tickets.set(updated);
  }
}