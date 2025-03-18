import 'bootstrap-icons/font/bootstrap-icons.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Importa BootstrapVue3 y sus estilos
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
library.add(far, fab, fas)

app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)  // Asegúrate de registrar BootstrapVue3
app.use(VCalendar, {})
app.use(VueSweetalert2)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
