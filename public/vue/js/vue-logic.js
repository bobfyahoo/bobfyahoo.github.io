const { reactive, computed } = Vue;

const VueTab = {
    setup() {
        const state = reactive({
            tickets: GlobalStore.getTickets(),
            view: 'list',
            form: {}
        });

        // Check if the element exists and hasn't been mounted yet
        const container = document.querySelector('#app')
        if (container && (container as any).__vue_app__) {
            (container as any).__vue_app__.unmount();
        }

        const preview = computed(() => marked.parse(state.form.description || ''));

        const openForm = (ticket = null) => {
            state.form = ticket ? { ...ticket } : { id: crypto.randomUUID(), summary: '', description: '', assignee: '', status: 'Open'};
            state.view = 'form';
        };

        const save = () => {
            GlobalStore.saveTicket(state.form);
            state.tickets = GlobalStore.getTickets();
            state.view = 'list';
        };

        const confirmDelete = (id) => {
            const modal = new bootstrap.Modal('#deleteModal');
            document.getElementById('globalConfirmDelete').onclick = () => {
                GlobalStore.deleteTicket(id);
                state.tickets = GlobalStore.getTickets();
                modal.hide();
            };
            modal.show();
        };

        const changeStatus = (ticket, newStatus) => {
            GlobalStore.saveTicket({ ...ticket, status: newStatus });
            state.tickets = GlobalStore.getTickets();
        };

        return { state, preview, openForm, save, confirmDelete, changeStatus, assignees: GlobalStore.assignees, statuses: GlobalStore.statuses };
    },
    // template moved to external file. The main page will load it when serving over HTTP.
    // If you want the inline template kept as fallback, I can add a small runtime fetch + fallback here.
    template: ''
};

// runtime loader: fetch list and form partials and set VueTab.template
(function(){
    if (typeof window === 'undefined') return;
    Promise.all([
        fetch('vue/html/list.html').then(r => { if(!r.ok) throw new Error('list fetch failed'); return r.text(); }),
        fetch('vue/html/form.html').then(r => { if(!r.ok) throw new Error('form fetch failed'); return r.text(); })
    ]).then(([listTpl, formTpl]) => {
        VueTab.template = listTpl + formTpl;
    }).catch(err => {
        console.error('Failed to load Vue templates', err);
    });
})();
