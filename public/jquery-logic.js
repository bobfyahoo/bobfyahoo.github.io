const JQueryTab = {
    init: function(containerId) {
        this.$el = $(containerId);
        this.renderList();
    },

    renderList: function() {
        const tickets = GlobalStore.getTickets();
        const assigneeOptions = `<option value="">Select assignee</option>` + GlobalStore.assignees.map(a => `<option value="${a}">${a}</option>`).join('');
        const statusOptions = GlobalStore.statuses.map(s => `<option value="${s}">${s}</option>`).join('');
        this.$el.html(`
            <button class="btn btn-primary mb-3" id="jq-add-btn">Add Ticket (jQuery)</button>
            <div id="jq-form" class="card p-3 mb-3 d-none" data-edit-id="">
                <div class="mb-2">
                    <label for="jq-summary" class="form-label"><strong>Summary</strong></label>
                    <input id="jq-summary" class="form-control" maxlength="50" required>
                </div>
                <div class="mb-2">
                    <label for="jq-description" class="form-label"><strong>Description</strong></label>
                    <textarea id="jq-description" class="form-control" maxlength="500" required></textarea>
                </div>
                <div class="mb-3">
                    <label for="jq-assignee" class="form-label"><strong>Assignee</strong></label>
                    <select id="jq-assignee" class="form-select" required>
                        ${assigneeOptions}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="jq-status" class="form-label"><strong>Status</strong></label>
                    <select id="jq-status" class="form-select" required>
                        ${statusOptions}
                    </select>
                </div>
                <button id="jq-save-btn" class="btn btn-success me-2">Save</button>
                <button id="jq-cancel-btn" class="btn btn-light">Cancel</button>
            </div>
            <table id="jq-table" class="table">
                <thead><tr><th>Summary</th><th>Assignee</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody id="jq-tbody"></tbody>
            </table>
        `);

        tickets.forEach(t => {
            $('#jq-tbody').append(`
                <tr>
                    <td>${t.summary}</td>
                    <td>${t.assignee}</td>
                    <td><span class="badge bg-secondary">${t.status}</span></td>
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
        const self = this;
        // ensure handlers are not double-bound
        $('#jq-add-btn').off('click').on('click', () => {
            $('#jq-form').data('editId', '').attr('data-edit-id', '');
            $('#jq-summary').val('');
            $('#jq-description').val('');
            // default assignee blank, status Open
            $('#jq-assignee').val('');
            $('#jq-status').val('Open');
            $('#jq-form').removeClass('d-none');
            $('#jq-add-btn').hide();
            // hide the list table while editing/adding
            $('#jq-table').hide();
        });

        $('#jq-save-btn').off('click').on('click', () => {
            const editId = $('#jq-form').data('editId') || $('#jq-form').attr('data-edit-id');
            const summary = String($('#jq-summary').val() || '').trim();
            const description = String($('#jq-description').val() || '').trim();
            const assignee = String($('#jq-assignee').val() || '').trim();
            const status = String($('#jq-status').val() || '').trim();

            // simple validation
            if (!summary) { $('#jq-summary').addClass('is-invalid').focus(); return; } else { $('#jq-summary').removeClass('is-invalid'); }
            if (!description) { $('#jq-description').addClass('is-invalid').focus(); return; } else { $('#jq-description').removeClass('is-invalid'); }
            if (!assignee) { $('#jq-assignee').addClass('is-invalid').focus(); return; } else { $('#jq-assignee').removeClass('is-invalid'); }
            if (!status) { $('#jq-status').addClass('is-invalid').focus(); return; } else { $('#jq-status').removeClass('is-invalid'); }

            const ticket = { summary, description, assignee, status };
            if (editId) { ticket.id = Number(editId); }
            GlobalStore.saveTicket(ticket);
            self.renderList();
        });

        // Cancel button should hide form and restore table and controls
        $('#jq-cancel-btn').off('click').on('click', () => {
            // clear edit state
            $('#jq-form').data('editId', '').attr('data-edit-id', '');
            // hide form
            $('#jq-form').addClass('d-none');
            // show table and add button
            $('#jq-table').show();
            $('#jq-add-btn').show();
        });

        // remove invalid marker on change
        $('#jq-summary').off('input').on('input', function(e){ $(e.currentTarget).removeClass('is-invalid'); });
        $('#jq-description').off('input').on('input', function(e){ $(e.currentTarget).removeClass('is-invalid'); });
        $('#jq-assignee').off('change').on('change', function(e){ $(e.currentTarget).removeClass('is-invalid'); });
        $('#jq-status').off('change').on('change', function(e){ $(e.currentTarget).removeClass('is-invalid'); });
        
        // Edit button: load ticket into form for editing
        $('.jq-edit').off('click').on('click', (e) => {
            const id = $(e.currentTarget).data('id');
            const tickets = GlobalStore.getTickets();
            const t = tickets.find(x => x.id === id);
            if (!t) return;
            $('#jq-summary').val(t.summary);
            $('#jq-description').val(t.description || '');
            // leave assignee blank if ticket has none
            $('#jq-assignee').val(t.assignee || '');
            $('#jq-status').val(t.status || 'Open');
            $('#jq-form').data('editId', id).attr('data-edit-id', id);
            $('#jq-form').removeClass('d-none');
            $('#jq-add-btn').hide();
            // hide the list table while editing
            $('#jq-table').hide();
        });
        
        $('.jq-del').off('click').on('click', (e) => {
            const id = $(e.currentTarget).data('id');
            const modal = new bootstrap.Modal('#deleteModal');
            $('#globalConfirmDelete').off('click').on('click', () => {
                GlobalStore.deleteTicket(id);
                self.renderList();
                modal.hide();
            });
            modal.show();
        });
    }
};