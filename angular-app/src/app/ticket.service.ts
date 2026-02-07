import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TicketService {
  tickets = signal<any[]>(this.getStorage());

  constructor() {
    // This is the Data Hook listener
    window.addEventListener('storage', () => this.tickets.set(this.getStorage()));
  }

  private getStorage(): any[] {
    const raw = JSON.parse(localStorage.getItem('shared_tickets') || '[]');
    let changed = false;
    const seen = new Set<string | number>();
    const normalized = raw
      .map((t: any, i: number) => {
        if (t.id != null && t.id !== '') return t;
        changed = true;
        return { ...t, id: Date.now() + i };
      })
      .filter((t: any) => {
        const key = t.id;
        if (seen.has(key)) {
          changed = true;
          return false;
        }
        seen.add(key);
        return true;
      });
    if (changed) {
      localStorage.setItem('shared_tickets', JSON.stringify(normalized));
    }
    return normalized;
  }

  save(ticket: any) {
    const data = this.getStorage();
    const now = new Date().toLocaleString();
    const id = ticket.id;
    const hasId = id !== undefined && id !== null && id !== '';
    const updated = hasId
      ? data.map((t: any) =>
          t.id == id ? { ...t, ...ticket, updated: now } : t
        )
      : [...data, { ...ticket, id: Date.now(), created: now, updated: now, status: ticket.status || 'Open' }];

    localStorage.setItem('shared_tickets', JSON.stringify(updated));
    this.tickets.set([...updated]);
  }

  delete(id: number) {
    const data = this.getStorage().filter((t: any) => t.id !== id);
    localStorage.setItem('shared_tickets', JSON.stringify(data));
    this.tickets.set(data);
  }
}