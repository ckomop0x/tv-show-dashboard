import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import horizontalScroll from './directives/horizontalScroll'
import './style.css'

const app = createApp(App)

app.directive('horizontal-scroll', horizontalScroll)

app.use(router).mount('#app')
