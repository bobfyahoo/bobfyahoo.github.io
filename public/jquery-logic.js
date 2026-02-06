const JQueryTab = {
    init: function(containerId) {
        this.$el = $(containerId);
        this.renderList();
    },

    renderList: function() {
        const tickets = GlobalStore.getTickets();
        this.$el.html(`
            <button class="btn btn-primary mb-3" id="jq-add-btn">Add Ticket (jQuery)</button>
            <table class="table">
                <thead><tr><th>Summary</th><th>Actions</th></tr></thead>
                <tbody id="jq-tbody"></tbody>
            </table>
        `);

        tickets.forEach(t => {
            $('#jq-tbody').append(`
                <tr>
                    <td>${t.summary}</td>
                    <td>
                        <button class="btn btn-sm btn-link jq-edit" data-id="${t.id}">Edit</button>
                        <button class="btn btn-sm btn-link text-danger jq-del" data-id="${t.id}">Delete</button>
                    </td>
                </tr>
            `);
        });

        this.bindEvents();
    },

    bindEvents: function() {
        $('#jq-add-btn').on('click', () => alert("Direct addition restricted in jQuery tab demo. Use React/Vue to add!"));
        
        $('.jq-del').on('click', (e) => {
            const id = $(e.currentTarget).data('id');
            const modal = new bootstrap.Modal('#deleteModal');
            $('#globalConfirmDelete').off('click').on('click', () => {
                GlobalStore.deleteTicket(id);
                this.renderList();
                modal.hide();
            });
            modal.show();
        });
    }
};