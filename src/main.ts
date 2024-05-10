import './assets/scss/app.scss'
import 'bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { firebaseApp } from './firebaseInit'

import { VueFire } from 'vuefire'
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Makassar')
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueFire, { firebaseApp })

app.mount('#app')
