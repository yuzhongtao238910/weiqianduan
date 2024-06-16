import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
console.log(window, 'm-vue')
createApp(App).use(router).mount('#app')
