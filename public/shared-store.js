const GlobalStore = {
    KEY: 'shared_tickets',
    assignees: ['Robert', 'Sarah', 'James', 'Elena', 'Hiro', 'Chloe'],
    getTickets: function() { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); },
    saveTicket: function(ticket) {
        const data = this.getTickets();
        const now = new Date().toLocaleString();
        const updated = ticket.id 
            ? data.map(t => t.id === ticket.id ? { ...ticket, updated: now } : t)
            : [...data, { ...ticket, id: Date.now(), created: now, updated: now }];
        localStorage.setItem(this.KEY, JSON.stringify(updated));
    },
    deleteTicket: function(id) {
        const updated = this.getTickets().filter(t => t.id !== id);
        localStorage.setItem(this.KEY, JSON.stringify(updated));
    }
};