const JQueryTab = {
    init: function(containerId) {
        this.$el = $(containerId);
        this.renderList();
    },

    renderList: function() {
        const tickets = GlobalStore.getTickets();
        const assigneeOptions = `<option value="">Select assignee</option>` + GlobalStore.assignees.map(a => `<option value="${a}">${a}</option>`).join('');
        const statusOptions = GlobalStore.statuses.map(s => `<option value="${s}">${s}</option>`).join('');
        const self = this;

        // load external templates (required when serving over HTTP)
        const formUrl = 'jquery/html/form.html';
        const rowUrl = 'jquery/html/row.html';

        $.get(formUrl).done(function(formTpl) {
            const html = formTpl.replace('<!--ASSIGNEE_OPTIONS-->', assigneeOptions).replace('<!--STATUS_OPTIONS-->', statusOptions);
            self.$el.html(html);

            // load rows
            $.get(rowUrl).done(function(rowTpl) {
                tickets.forEach(t => {
                    const statusOpts = GlobalStore.statuses.map(s => `<option value="${escapeHtml(s)}"${s === t.status ? ' selected' : ''}>${escapeHtml(s)}</option>`).join('');
                    const row = rowTpl.replace(/__SUMMARY__/g, escapeHtml(t.summary || ''))
                                      .replace(/__ASSIGNEE__/g, escapeHtml(t.assignee || ''))
                                      .replace(/__STATUS__/g, escapeHtml(t.status || ''))
                                      .replace(/__ID__/g, String(t.id))
                                      .replace(/__STATUS_OPTIONS__/, statusOpts);
                    $('#jq-tbody').append(row);
                });
                self.bindEvents();
            }).fail(function(err) {
                console.error('Failed to load row template:', err);
            });

        }).fail(function(err) {
            console.error('Failed to load form template:', err);
        });
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

        self.$el.off('change', '.jq-status-change').on('change', '.jq-status-change', function() {
            const id = $(this).data('id');
            const newStatus = $(this).val();
            const t = GlobalStore.getTickets().find(x => x.id == id);
            if (t) { GlobalStore.saveTicket({ ...t, status: newStatus }); self.renderList(); }
        });
    }
};

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
