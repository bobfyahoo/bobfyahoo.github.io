import { createApp, type App as VueApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import './style.css'

const pinia = createPinia();
const app: VueApp = createApp(App).use(pinia);
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