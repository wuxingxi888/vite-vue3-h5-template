import { createApp } from 'vue'
import store from './store'

import App from './App.vue'
import router from './router'
// 引入全局样式
import '@/styles/index.scss'

import { installPlugins } from './plugins'

const app = createApp(App)

installPlugins(app)

app.use(store)
app.use(router)
app.mount('#app')
