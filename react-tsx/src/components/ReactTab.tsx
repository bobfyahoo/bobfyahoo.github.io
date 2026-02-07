import { useEffect, useState } from 'react';
import { marked } from 'marked'; 
import { GlobalStore } from '../store/GlobalStore';
import 'bootstrap/dist/css/bootstrap.min.css';

export interface Ticket {
  id: string;
  summary: string;
  description: string;
  assignee: string;
  status: string;
}

const ReactTab = () => {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [tickets, setTickets] = useState<Ticket[]>(GlobalStore.getTickets());
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);

  const refresh = () => setTickets(GlobalStore.getTickets());

  const handleSave = (data: Ticket) => {
    GlobalStore.saveTicket(data);
    refresh();
    setView('list');
  };

  useEffect(() => {
    // 1. Define the logic to sync data
    const handleStorage = () => {
      console.log('Syncing tickets from storage...');
      refresh();
    };

    // 2. Start listening (Equivalent to your Angular constructor)
    window.addEventListener('storage', handleStorage);

    // 3. THE CLEANUP (The important part!)
    // This runs right before the component is destroyed (unmounted)
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []); // Empty array means "run once on startup"

  const confirmDelete = (id: string) => {
    const modalElement = window.parent.document.getElementById('deleteModal');
    const confirmBtn = window.parent.document.getElementById('globalConfirmDelete');

    // Check that BOTH exist before proceeding
    if (modalElement && confirmBtn) {
      const modal = new (window as any).parent.bootstrap.Modal(modalElement);
      
      confirmBtn.onclick = () => {
        GlobalStore.deleteTicket(id);
        refresh();
        modal.hide();
      };
      modal.show();
    } else {
      console.error("Could not find the modal or confirm button in the DOM.");
    }
  };

  if (view === 'form') {
    return (
      <TicketForm 
        ticket={activeTicket} 
        onSave={handleSave} 
        onCancel={() => setView('list')} 
      />
    );
  }

  return (
    <div>
      <button 
        className="btn btn-primary mb-3" 
        onClick={() => { setActiveTicket(null); setView('form'); }}
      >
        Add Ticket (React)
      </button>
      
      <TicketTable 
        tickets={tickets} 
        onEdit={(t) => { setActiveTicket(t); setView('form'); }} 
        onDelete={confirmDelete}
        onStatusChange={(t, newStatus:string) => { 
          GlobalStore.saveTicket({ ...t, status: newStatus }); 
          refresh(); 
        }}
      />
    </div>
  );
};

// --- Sub-Components ---


interface TableProps {
  tickets: Ticket[];
  onEdit: (t: Ticket) => void;
  onDelete: (id: string) => void;
  onStatusChange: (t: Ticket, status: string) => void;
}

function TicketTable({tickets, onEdit, onDelete, onStatusChange }: TableProps) {  
  return (
    <table className="table align-middle">
      <thead>
        <tr>
          {['Summary', 'Assignee', 'Status', 'Actions'].map(h => <th key={h}>{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {tickets.map(t => (
          <tr key={t.id}>
            <td>{t.summary}</td>
            <td>{t.assignee}</td>
            <td>
              <select 
                title="Change Status"
                className="form-select form-select-sm d-inline-block w-auto"
                value={t.status}
                onChange={e => onStatusChange(t, e.target.value)}
              >
                {GlobalStore.statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </td>
            <td>
              <button className="btn btn-sm btn-link" onClick={() => onEdit(t)}>Edit</button>
              <button className="btn btn-sm btn-link text-danger" onClick={() => onDelete(t.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface FormProps {
  ticket: Ticket | null;
  onSave: (data: Ticket) => void;
  onCancel: () => void;
}

function TicketForm({ ticket, onSave, onCancel }: FormProps) {
  const [form, setForm] = useState(ticket || { 
    id: crypto.randomUUID(), 
    summary: '', 
    description: '', 
    assignee: '', 
    status: 'Open' 
  });

  const preview = marked.parse(form.description || '');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <label className="form-label"><strong>Summary</strong></label>
        <input
          title="Ticket Summary" 
          className="form-control" 
          maxLength={50} 
          required 
          value={form.summary} 
          onChange={e => setForm({...form, summary: e.target.value})} 
        />
      </div>

      <div className="mb-2">
        <label className="form-label"><strong>Description</strong></label>
        <textarea 
          title="Ticket Description"
          className="form-control" 
          maxLength={500} 
          required 
          value={form.description} 
          onChange={e => setForm({...form, description: e.target.value})} 
        />
      </div>

      {/* Markdown Preview */}
      <div 
        className="rich-preview mb-2 border p-2 bg-light" 
        dangerouslySetInnerHTML={{ __html: preview }} 
      />

      <div className="mb-2">
        <label className="form-label"><strong>Assignee</strong></label>
        <select 
          title="Ticket Assignee"
          className="form-select" 
          value={form.assignee} 
          required 
          onChange={e => setForm({...form, assignee: e.target.value})}
        >
          <option value="">Select assignee</option>
          {GlobalStore.assignees.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      <div className="mb-2">
        <label className="form-label"><strong>Status</strong></label>
        <select
          title="Ticket Status" 
          className="form-select" 
          value={form.status} 
          required 
          onChange={e => setForm({...form, status: e.target.value})}
        >
          {GlobalStore.statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <button type="submit" className="btn btn-success me-2">Save</button>
      <button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default ReactTab;