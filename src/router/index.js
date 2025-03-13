import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '../stores/counter';
import Registrar from '../page/RegistroPage.vue'
import Login from '../page/LoginPage.vue'
import HomeLogin from '../page/HomeLogin.vue'
import LoginCitas from '../page/Citaspage.vue'
import Pedircita from '../page/Pedircita.vue'
import Consulta from '../page/ConsultarCitas.vue'
import Cancelar from '../page/CancelarCitas.vue'
import CambiarDatos from '../page/CambiarDatos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',  
      component: Login,
    },
        {
          path: '/registrar',
          name: 'registrar',
          component: Registrar
        },
        {
          path: '/login/:username',
          name: 'username',
          component: HomeLogin,
          meta: { requiresAuth: true } // Requiere autenticación
        },
        {
          path: '/login/:username/cambio',
          name: 'cambio',
          component: CambiarDatos,
          meta: { requiresAuth: true }// Requiere autenticación
        },
        {
          path: '/login/:username/citas',
          name: 'Citas',
          component: LoginCitas,
          meta: { requiresAuth: true } // Requiere autenticación
        },        
        {
          path: '/login/:username/citas/pedir',
          name: 'pedir',
          component: Pedircita,
          meta: { requiresAuth: true }// Requiere autenticación
        },
        {
          path: '/login/:username/citas/consultar',
          name: 'consultar',
          component: Consulta,
          meta: { requiresAuth: true } // Requiere autenticación
        },
        {
          path: '/login/:username/citas/cancelar',
          name: 'canelarCitas',
          component: Cancelar,
          meta: { requiresAuth: true } // Requiere autenticación
        }
      ]
    } 
  )
// Aquí está la parte importante: Verificamos si el token está disponible
router.beforeEach((to, from, next) => {
  const store = useCounterStore();  // Obtener el token desde el store

  // Si la ruta requiere autenticación y no tenemos token, redirigimos al login
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getToken()) {
      next({ name: 'login' });  // Redirigir al login
    } else {
      next();  // Continuar con la navegación
    }
  } else {
    next();  // Si la ruta no requiere autenticación, continuar normalmente
  }
});

export default router
