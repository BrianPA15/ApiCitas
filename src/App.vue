<template>
  <header class="encabezado">
    <div class="menu">
      <div class="izquierda">
        <div>
          <img src="./assets/img/logo.png" alt="" srcset="">
          <h4>Comunidad de Madrid</h4>
        </div>
      </div>
      <div class="centro">
        <h1 class="logo">
          ClickSalud
        </h1>
      </div>
      <div class="derecha">
        <div v-if="!isAuthenticated">
          <router-link to="/registrar" class="btn-link btn-secundario">Registrar</router-link>
        </div>
        <div v-if="!isAuthenticated">
          <router-link :to="{ name: 'login', params: { username } }" class="btn-link">Inicia Sesión</router-link>
        </div>
        <div v-if="isAuthenticated">
          <a @click="logout" class="btn-link-close btn-danger">
            <i class="bi bi-box-arrow-left"></i> Cerrar Sesión
          </a>
        </div>
      </div>
    </div>
  </header>  
<main>
  <RouterView/>
</main>
</template>




<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useCounterStore } from './stores/counter'
// Obtén el estado de autenticación del store
const store = useCounterStore();
// Computed para obtener el estado reactivo de la autenticación
const isAuthenticated = computed(() => store.Autenticacion);
const router = useRouter();


// Función para cerrar sesión
const logout = () => {
  store.logout(); // Cambiar el estado de autenticación
  router.push('/'); // Redirigir a la página principal
}
</script>


<style >
@import "assets/sytles.scss";
</style>