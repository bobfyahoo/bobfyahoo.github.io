<script setup lang="ts">
import { useTicketUtil } from '../composable/ticketUtil';
import { useTicketStore } from '../store/ticketStore';
import { StatusConst } from '../types/StatusConst';

const ticketUtil = useTicketUtil();
const ticketStore = useTicketStore();
</script>

<template>
    <div>
        <button class="btn btn-primary mb-3" @click="ticketStore.openForm()">Add Ticket (Vue)</button>
        <table class="table align-middle">
            <thead><tr><th>Summary</th><th>Assignee</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
            <tr v-for="t in ticketStore.tickets" :key="t.id">
                <td>{{t.summary}}</td>
                <td>{{t.assignee}}</td>
                <td>
                <select class="form-select form-select-sm d-inline-block w-auto" :value="t.status" @change="ticketUtil.changeStatus(t, ($event?.target as HTMLSelectElement)?.value)">
                    <option v-for="(name, key) in StatusConst" :key="key" :value="name">{{name}}</option>
                </select>
                </td>
                <td>
                <button class="btn btn-sm btn-link" @click="ticketStore.openForm(t)">Edit</button>
                <button class="btn btn-sm btn-link text-danger" @click="ticketUtil.confirmDelete(t.id)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>