import { createApp } from 'vue'
import App from './App.vue'
import { defineNumberFlow } from '../../dist'

defineNumberFlow()

createApp(App).mount('#app')
