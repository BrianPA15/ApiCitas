import 'bootstrap-icons/font/bootstrap-icons.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

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
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')
