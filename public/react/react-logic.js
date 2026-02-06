const { useState, useEffect } = React;

const ReactTab = () => {
    const [view, setView] = useState('list'); // 'list' or 'form'
    const [tickets, setTickets] = useState(GlobalStore.getTickets());
    const [activeTicket, setActiveTicket] = useState(null);

    const refresh = () => setTickets(GlobalStore.getTickets());

    const handleSave = (data) => {
        GlobalStore.saveTicket(data);
        refresh();
        setView('list');
    };

    const confirmDelete = (id) => {
        const modal = new bootstrap.Modal('#deleteModal');
        document.getElementById('globalConfirmDelete').onclick = () => {
            GlobalStore.deleteTicket(id);
            refresh();
            modal.hide();
        };
        modal.show();
    };

    if (view === 'form') {
        return React.createElement(TicketForm, { 
            ticket: activeTicket, 
            onSave: handleSave, 
            onCancel: () => setView('list') 
        });
    }

    return React.createElement('div', null,
        React.createElement('button', { 
            className: 'btn btn-primary mb-3', 
            onClick: () => { setActiveTicket(null); setView('form'); } 
        }, 'Add Ticket (React)'),
        React.createElement(TicketTable, { 
            tickets, 
            onEdit: (t) => { setActiveTicket(t); setView('form'); }, 
            onDelete: confirmDelete 
        })
    );
};

// Table and Form components extracted to keep methods short
function TicketTable({ tickets, onEdit, onDelete }) {
    return React.createElement('table', { className: 'table align-middle' },
        React.createElement('thead', null, React.createElement('tr', null, 
            ['Summary', 'Assignee', 'Status', 'Actions'].map(h => React.createElement('th', { key: h }, h))
        )),
        React.createElement('tbody', null, tickets.map(t => React.createElement('tr', { key: t.id },
            React.createElement('td', null, t.summary),
            React.createElement('td', null, t.assignee),
            React.createElement('td', null, React.createElement('span', { className: 'badge bg-secondary' }, t.status)),
            React.createElement('td', null, 
                React.createElement('button', { className: 'btn btn-sm btn-link', onClick: () => onEdit(t) }, 'Edit'),
                React.createElement('button', { className: 'btn btn-sm btn-link text-danger', onClick: () => onDelete(t.id) }, 'Delete')
            )
        )))
    );
}

function TicketForm({ ticket, onSave, onCancel }) {
    const [form, setForm] = useState(ticket || { summary: '', description: '', assignee: '', status: 'Open' });
    const preview = marked.parse(form.description || '');

    return React.createElement('form', { onSubmit: (e) => { e.preventDefault(); onSave(form); }},
        React.createElement('div', { className: 'mb-2' },
            React.createElement('label', { htmlFor: 'summaryInput', className: 'form-label' }, React.createElement('strong', null, 'Summary')),
            React.createElement('input', { id: 'summaryInput', className: 'form-control', maxLength: 50, required: true, value: form.summary, onChange: e => setForm({...form, summary: e.target.value}) })
        ),
        React.createElement('div', { className: 'mb-2' },
            React.createElement('label', { htmlFor: 'descriptionInput', className: 'form-label' }, React.createElement('strong', null, 'Description')),
            React.createElement('textarea', { id: 'descriptionInput', className: 'form-control', maxLength: 500, required: true, value: form.description, onChange: e => setForm({...form, description: e.target.value}) })
        ),
        React.createElement('div', { className: 'rich-preview mb-2', dangerouslySetInnerHTML: { __html: preview } }),
        React.createElement('div', { className: 'mb-2' },
            React.createElement('label', { htmlFor: 'assigneeSelect', className: 'form-label' }, React.createElement('strong', null, 'Assignee')),
            React.createElement('select', { id: 'assigneeSelect', className: 'form-select', value: form.assignee, required: true, onChange: e => setForm({...form, assignee: e.target.value})}, 
                React.createElement('option', { key: '__empty__', value: '' }, 'Select assignee'),
                GlobalStore.assignees.map(a => React.createElement('option', { key: a, value: a }, a))
            )
        ),
        React.createElement('div', { className: 'mb-2' },
            React.createElement('label', { htmlFor: 'statusSelect', className: 'form-label' }, React.createElement('strong', null, 'Status')),
            React.createElement('select', { id: 'statusSelect', className: 'form-select', value: form.status, required: true, onChange: e => setForm({...form, status: e.target.value})}, 
                GlobalStore.statuses.map(s => React.createElement('option', { key: s, value: s }, s))
            )
        ),
        React.createElement('button', { type: 'submit', className: 'btn btn-success me-2' }, 'Save'),
        React.createElement('button', { type: 'button', className: 'btn btn-light', onClick: onCancel }, 'Cancel')
    );
}
