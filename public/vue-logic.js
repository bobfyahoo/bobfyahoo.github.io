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
            state.form = ticket ? { ...ticket } : { summary: '', description: '', assignee: '', status: 'Open' };
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

        return { state, preview, openForm, save, confirmDelete, assignees: GlobalStore.assignees, statuses: GlobalStore.statuses };
    },
    template: `
        <div v-if="state.view === 'list'">
            <button class="btn btn-primary mb-3" @click="openForm()">Add Ticket (Vue)</button>
            <table class="table">
                <thead><tr><th>Summary</th><th>Assignee</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  <tr v-for="t in state.tickets" :key="t.id">
                    <td>{{t.summary}}</td>
                    <td>{{t.assignee}}</td>
                    <td><span class="badge bg-secondary">{{t.status}}</span></td>
                    <td>
                      <button class="btn btn-sm btn-link" @click="openForm(t)">Edit</button>
                      <button class="btn btn-sm btn-link text-danger" @click="confirmDelete(t.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
            </table>
        </div>
        <form v-else @submit.prevent="save">
            <div class="mb-2">
                <label for="summaryInput" class="form-label"><strong>Summary</strong></label>
                <input id="summaryInput" v-model="state.form.summary" class="form-control" maxlength="50" required>
            </div>
            <div class="mb-2">
                <label for="descriptionInput" class="form-label"><strong>Description</strong></label>
                <textarea id="descriptionInput" v-model="state.form.description" class="form-control" maxlength="500" required></textarea>
            </div>
            <div class="rich-preview mb-2" v-html="preview"></div>
            <div class="mb-3">
                <label for="assigneeSelect" class="form-label"><strong>Assignee</strong></label>
                <select id="assigneeSelect" v-model="state.form.assignee" class="form-select" required>
                    <option v-for="a in assignees" :key="a">{{a}}</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="statusSelect" class="form-label"><strong>Status</strong></label>
                <select id="statusSelect" v-model="state.form.status" class="form-select" required>
                    <option v-for="s in statuses" :key="s">{{s}}</option>
                </select>
            </div>
            <button class="btn btn-success me-2">Save</button>
            <button type="button" class="btn btn-light" @click="state.view = 'list'">Cancel</button>
        </form>
    `
};