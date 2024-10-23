import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// 使用 router
app.use(router)

app.mount('#app')