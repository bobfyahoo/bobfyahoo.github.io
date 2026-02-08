import { onMounted, onUnmounted } from 'vue';
import { GlobalStore } from '../store/GlobalStore';
import { useTicketStore } from '../store/ticketStore';
import type { Ticket } from '../types/TicketType';

export function useTicketUtil() {
  const ticketStore = useTicketStore();

  const addTicket = (data: any) => {
    GlobalStore.saveTicket(data);
    ticketStore.refreshTickets();
  };

  const saveTicket = (form: Ticket) => {
    GlobalStore.saveTicket(form);
    ticketStore.refreshTickets();
  };

  const confirmDelete = (id: string) => {
    const modalElement = window.parent.document.getElementById('deleteModal');
    const confirmBtn = window.parent.document.getElementById('globalConfirmDelete');

    // Check that BOTH exist before proceeding
    if (modalElement && confirmBtn) {
      const modal = new (window as any).parent.bootstrap.Modal(modalElement);
      
      confirmBtn.onclick = () => {
        GlobalStore.deleteTicket(id);
        ticketStore.refreshTickets();
        modal.hide();
      };
      modal.show();
    } else {
      console.error("Could not find the modal or confirm button in the DOM.");
    }
  };

  const changeStatus = (ticket:Ticket, newStatus: string) => {
      GlobalStore.saveTicket({ ...ticket, status: newStatus });
      ticketStore.refreshTickets();
  };

  onMounted(() => window.addEventListener('storage', ticketStore.refreshTickets));
  onUnmounted(() => window.removeEventListener('storage', ticketStore.refreshTickets));

  return { addTicket, changeStatus, confirmDelete, saveTicket, ticketStore, refreshTickets: ticketStore.refreshTickets };
}