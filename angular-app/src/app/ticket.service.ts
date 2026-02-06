import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TicketService {
  tickets = signal<any[]>(this.getStorage());

  constructor() {
    // This is the Data Hook listener
    window.addEventListener('storage', () => this.tickets.set(this.getStorage()));
  }

  private getStorage() {
    return JSON.parse(localStorage.getItem('shared_tickets') || '[]');
  }

  save(ticket: any) {
    const data = this.getStorage();
    const now = new Date().toLocaleString();
    const updated = ticket.id 
      ? data.map((t: any) => t.id === ticket.id ? { ...ticket, updated: now } : t)
      : [...data, { ...ticket, id: Date.now(), created: now, updated: now }];
    
    localStorage.setItem('shared_tickets', JSON.stringify(updated));
    this.tickets.set(updated);
  }

  delete(id: number) {
    const data = this.getStorage().filter((t: any) => t.id !== id);
    localStorage.setItem('shared_tickets', JSON.stringify(data));
    this.tickets.set(data);
  }
}