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
        
        // 1. Check if this specific ID is already in our storage
        const exists = data.some(t => t.id === ticket.id);
        let result;

        if (exists) {
            // 2. UPDATE: Replace the existing record
            result = data.map(t => 
                t.id === ticket.id ? { ...ticket, updated: now } : t
            );
        } else {
            // 3. INSERT: Add as a new record
            // Note: We keep the ticket.id you assigned upstream
            result = [...data, { 
                ...ticket, 
                created: now, 
                updated: now, 
                status: ticket.status || 'Open' 
            }];
        }
        
        // 4. Persist and Notify
        localStorage.setItem(this.KEY, JSON.stringify(result));
        window.dispatchEvent(new Event('storage')); 
    },

    deleteTicket(id) {
        const result = this.getTickets().filter(t => t.id !== id);
        localStorage.setItem(this.KEY, JSON.stringify(result));
        window.dispatchEvent(new Event('storage'));
    }
};