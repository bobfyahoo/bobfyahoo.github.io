import type { Ticket } from "../components/ReactTab";

const STORAGE_KEY = 'shared_tickets';

export const GlobalStore = {
  assignees: ['Robert', 'Sarah', 'James', 'Elena', 'Hiro', 'Chloe'],
  statuses: ['Open', 'In-Progress', 'Resolved', 'Re-opened', 'Tested', 'Deployed', 'Closed'],

  getStorageApi(): Storage {
    try {
      if (typeof window !== 'undefined' && window.parent && window.parent !== window && window.parent.localStorage) {
        return window.parent.localStorage;
      }
    } catch { /* Cross-origin or access denied */ }
    return localStorage;
  },

  getTickets(): Ticket[] {
    const storage = this.getStorageApi();
    return JSON.parse(storage.getItem(STORAGE_KEY) || '[]');
  },

  saveTicket(ticket: Ticket) {
    const storage = this.getStorageApi();
    const raw = this.getTickets();
    const now = new Date().toLocaleString();
    
    const exists = raw.some((t: Ticket) => t.id === ticket.id);
    let updated: Ticket[];

    if (exists) {
      updated = raw.map((t: Ticket) =>
        t.id === ticket.id ? { ...ticket, updated: now } : t
      );
    } else {
      const newTicket = { 
        ...ticket, 
        created: now, 
        updated: now, 
        status: ticket.status || 'Open' 
      };
      updated = [...raw, newTicket];
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(updated));
    this.triggerStorageSync();
  },

  deleteTicket(id: string) {
    const storage = this.getStorageApi();
    const data = this.getTickets().filter((t: Ticket) => t.id !== id);
    storage.setItem(STORAGE_KEY, JSON.stringify(data));
    this.triggerStorageSync();
  },

  triggerStorageSync() {
    try {
      window.parent.dispatchEvent(new Event('storage'));
    } catch {
      window.dispatchEvent(new Event('storage'));
    }
  }
};