import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia();
const app = createApp(App).use(pinia).mount('#app');
const container = document.querySelector('#app')

// Check if the element exists and hasn't been mounted yet
if (container && !(container as any).__vue_app__) {
    app.mount('#app')
} else if (container) {
    // Optional: Force unmount if you want a fresh start
    (container as any).__vue_app__.unmount();
    app.mount('#app');
    //console.warn('Vue app was already mounted.');
}