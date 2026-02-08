import { defineStore } from 'pinia';
import { GlobalStore } from './GlobalStore'; // Your shared logic
import type { Ticket } from '../types/TicketType';
import { ViewConst } from '../types/ViewConst';

export const useTicketStore = defineStore('ticketStore', {
  // 1. State: The data
  state: () => ({
    tickets: GlobalStore.refreshTickets() as Ticket[],
    view: 'list' as ViewConst, 
    id: null as string | null,
    form: null as Ticket | null
  }),

  // 2. Actions: Methods to change data
  actions: {
    refreshTickets() {
      this.tickets = GlobalStore.refreshTickets();
    },
    openForm(ticket?:Ticket | null) {
      this.id = ticket ? ticket.id : null;
      this.form = this.getTicket(this.id!) || { id: crypto.randomUUID(), summary: '', description: '', assignee: '', status: 'Open'}; 
      this.view = ViewConst.Form;
    },
    openList() {
      this.view = ViewConst.List;
      this.id = null;
      this.form = null;
      this.refreshTickets();
    },
    getTicket(id: string): Ticket | undefined {
      this.refreshTickets(); // Ensure we have the latest data before searching
      return this.tickets.find(t => t.id === id);
    }
  }
});