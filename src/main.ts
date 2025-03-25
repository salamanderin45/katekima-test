import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import { VueQueryPlugin } from '@tanstack/vue-query'

app.use(VueQueryPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
