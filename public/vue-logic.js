const { createApp, reactive, computed } = Vue;

const VueTab = {
    setup() {
        const state = reactive({
            tickets: GlobalStore.getTickets(),
            view: 'list',
            form: {}
        });

        const preview = computed(() => marked.parse(state.form.description || ''));

        const openForm = (ticket = null) => {
            state.form = ticket ? { ...ticket } : { summary: '', description: '', assignee: 'Robert', status: 'Open' };
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

        return { state, preview, openForm, save, confirmDelete, assignees: GlobalStore.assignees };
    },
    template: `
        <div v-if="state.view === 'list'">
            <button class="btn btn-primary mb-3" @click="openForm()">Add Ticket (Vue)</button>
            <table class="table">
                <tr v-for="t in state.tickets" :key="t.id">
                    <td>{{t.summary}}</td><td>{{t.assignee}}</td>
                    <td><button class="btn btn-sm btn-link" @click="openForm(t)">Edit</button>
                        <button class="btn btn-sm btn-link text-danger" @click="confirmDelete(t.id)">Delete</button></td>
                </tr>
            </table>
        </div>
        <form v-else @submit.prevent="save">
            <input v-model="state.form.summary" class="form-control mb-2" maxlength="50" required>
            <textarea v-model="state.form.description" class="form-control mb-2" maxlength="500" required></textarea>
            <div class="rich-preview mb-2" v-html="preview"></div>
            <select v-model="state.form.assignee" class="form-select mb-3">
                <option v-for="a in assignees">{{a}}</option>
            </select>
            <button class="btn btn-success me-2">Save</button>
            <button type="button" class="btn btn-light" @click="state.view = 'list'">Cancel</button>
        </form>
    `
};