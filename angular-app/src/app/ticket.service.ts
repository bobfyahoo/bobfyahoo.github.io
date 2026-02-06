import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly KEY = 'shared_tickets';
  // Use a signal for synchronous, reactive state
  tickets = signal<any[]>(this.load());

  private load() {
    return JSON.parse(localStorage.getItem(this.KEY) || '[]');
  }

  save(ticket: any) {
    const data = this.load();
    const now = new Date().toLocaleString();
    const result = ticket.id 
      ? data.map((t: any) => t.id === ticket.id ? { ...ticket, updated: now } : t)
      : [...data, { ...ticket, id: Date.now(), created: now, updated: now, status: 'Open' }];
    
    localStorage.setItem(this.KEY, JSON.stringify(result));
    this.tickets.set(result);
  }

  delete(id: number) {
    const result = this.load().filter((t: any) => t.id !== id);
    localStorage.setItem(this.KEY, JSON.stringify(result));
    this.tickets.set(result);
  }
}