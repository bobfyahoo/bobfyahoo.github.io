<script setup lang="ts">
import { computed } from 'vue';
import { useTicketUtil } from '../composable/ticketUtil';
import { useTicketStore } from '../store/ticketStore';
import { AssigneeConst } from '../types/AssigneeConst';
import { StatusConst } from '../types/StatusConst';
import { marked } from "marked";

const ticketUtil = useTicketUtil();
const ticketStore = useTicketStore();

const preview = computed(() => {
  const content = ticketStore.form?.description || '';
  return marked.parse(content); 
});
</script>

<template>
<form v-if="ticketStore.view === 'form' && ticketStore.form" @submit.prevent="ticketUtil.saveTicket(ticketStore.form!)" >
    <div class="mb-2">
        <label for="summaryInput" class="form-label"><strong>Summary</strong></label>
        <input id="summaryInput" v-model="ticketStore.form!.summary" class="form-control" maxlength="50" required>
    </div>
    <div class="mb-2">
        <label for="descriptionInput" class="form-label"><strong>Description</strong></label>
        <textarea id="descriptionInput" v-model="ticketStore.form!.description" class="form-control" maxlength="500" required></textarea>
    </div>
    <div class="rich-preview mb-2" v-html="preview"></div>
    <div class="mb-3">
        <label for="assigneeSelect" class="form-label"><strong>Assignee</strong></label>
        <select id="assigneeSelect" v-model="ticketStore.form!.assignee" class="form-select" required>
            <option value="">Select assignee</option>
            <option v-for="(name, key) in AssigneeConst" :key="key" :value="name">{{name}}</option>
        </select>
    </div>
    <div class="mb-3">
        <label for="statusSelect" class="form-label"><strong>Status</strong></label>
        <select id="statusSelect" v-model="ticketStore.form!.status" class="form-select" required>
            <option v-for="(name, key) in StatusConst" :key="key" :value="name">{{name}}</option>
        </select>
    </div>
    <button class="btn btn-success me-2">Save</button>
    <button type="button" class="btn btn-light" @click="ticketStore.openList">Cancel</button>
</form>

</template>