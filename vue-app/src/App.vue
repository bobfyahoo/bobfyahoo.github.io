<script setup lang="ts">
import Form from './components/Form.vue'
import List from './components/List.vue'
import { useTicketStore } from './store/ticketStore';
import { ViewConst } from './types/ViewConst';

const ticketStore = useTicketStore();
</script>

<template>
  <div>
    <List v-if="ticketStore.view == ViewConst.List"/>
    <Form v-if="ticketStore.view == ViewConst.Form"/>
  </div>    
</template>

