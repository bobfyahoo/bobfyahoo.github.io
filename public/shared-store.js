const GlobalStore = {
    KEY: 'shared_tickets',
    assignees: ['Robert', 'Sarah', 'James', 'Elena', 'Hiro', 'Chloe'],
    statuses: ['Open', 'In-Progress', 'Resolved', 'Re-opened', 'Tested', 'Deployed', 'Closed'],

    getTickets() {
        return JSON.parse(localStorage.getItem(this.KEY) || '[]');
    },

    saveTicket(ticket) {
        const data = this.getTickets();
        const now = new Date().toLocaleString();
        let result;

        if (ticket.id) {
            result = data.map(t => t.id === ticket.id ? { ...ticket, updated: now } : t);
        } else {
            result = [...data, { ...ticket, id: Date.now(), created: now, updated: now, status: 'Open' }];
        }
        
        localStorage.setItem(this.KEY, JSON.stringify(result));
        window.dispatchEvent(new Event('storage')); 
    },

    deleteTicket(id) {
        const result = this.getTickets().filter(t => t.id !== id);
        localStorage.setItem(this.KEY, JSON.stringify(result));
        window.dispatchEvent(new Event('storage'));
    }
};