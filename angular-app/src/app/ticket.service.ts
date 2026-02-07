import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'shared_tickets';

@Injectable({ providedIn: 'root' })
export class TicketService {
  tickets = signal<any[]>(this.getStorage());

  constructor() {
    window.addEventListener('storage', () => this.tickets.set(this.getStorage()));
  }

  /** Use parent's localStorage when in iframe so we share data with the main page. */
  private getStorageApi(): Storage {
    try {
      if (typeof window !== 'undefined' && window.parent && window.parent !== window && window.parent.localStorage) {
        return window.parent.localStorage;
      }
    } catch {
      // Cross-origin or access denied
    }
    return localStorage;
  }

  private getStorage(): any[] {
    const storage = this.getStorageApi();
    const raw = JSON.parse(storage.getItem(STORAGE_KEY) || '[]');
    let changed = false;
    const seen = new Set<string | number>();
    const normalized = raw
      .map((t: any, i: number) => {
        if (t.id != null && t.id !== '') return t;
        changed = true;
        return { ...t, id: crypto.randomUUID() + i };
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
      storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  }

  save(ticket: any) {
    const storage = this.getStorageApi();
    const raw = JSON.parse(storage.getItem(STORAGE_KEY) || '[]');
    const now = new Date().toLocaleString();
    
    // 1. Check if the ticket already exists in our data
    const exists = raw.some((t: any) => t.id === ticket.id);

    let updated: any[];

    if (exists) {
      // 2. UPDATE: Map through and replace the matching ID
      updated = raw.map((t: any) =>
        t.id === ticket.id ? { ...ticket, updated: now } : t
      );
    } else {
      // 3. ADD: It's a new ID, so append it to the array
      // We ensure created/updated timestamps and default status here
      const newTicket = { 
        ...ticket, 
        created: now, 
        updated: now, 
        status: ticket.status || 'Open' 
      };
      updated = [...raw, newTicket];
    }

    // 4. Persist and Sync
    storage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    this.triggerStorageSync(); // Cleaned up the event dispatching logic
    this.tickets.set(updated); // Use the 'updated' array directly for better performance
  }

  private triggerStorageSync() {
    try {
      window.parent.dispatchEvent(new Event('storage'));
    } catch {
      window.dispatchEvent(new Event('storage'));
    }
  }

  delete(id: number) {
    const storage = this.getStorageApi();
    const data = this.getStorage().filter((t: any) => t.id !== id);
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
    try {
      window.parent.dispatchEvent(new Event('storage'));
    } catch {
      window.dispatchEvent(new Event('storage'));
    }
    this.tickets.set(this.getStorage());
  }
}