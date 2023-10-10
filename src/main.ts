import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'

import '@/services/AxiosInterceptorSetup'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, fab);

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component("font-awesome-icon", FontAwesomeIcon)

app.mount('#app')
