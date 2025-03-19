<template>
  <header class="encabezado">
    <div class="menu">
      <div class="izquierda">
          <img src="./assets/img/logo.png" alt="" srcset="">
          <h4>{{$t('logo')}}</h4>
      </div>
      <div class="centro">
        <h1 class="logo">
          ClickSalud
        </h1>
      </div>
      <div class="derecha">
        <div v-if="!isAuthenticated">
          <router-link to="/registrar" class="btn-link btn-secundario">{{$t('Registro')}}</router-link>
        </div>
        <div v-if="!isAuthenticated">
          <router-link :to="{ name: 'login', params: { username } }" class="btn-link">{{$t('Sesion')}}</router-link>
        </div>
        <div v-if="isAuthenticated">
          <a @click="logout" class="btn-link-close btn-danger">
            <i class="bi bi-box-arrow-left"></i> 
          </a>
        </div>
      </div>
    </div>
  </header> 
  <div class="btnIdioma">
    <div class="btnIdioma">
        <button @click="cambiarIdioma('es')" class="btn-language btn-es">Es</button>
        <button @click="cambiarIdioma('en')" class="btn-language btn-en">En</button>
        <button @click="cambiarIdioma('fr')" class="btn-language btn-fr">Fr</button>
    </div>
  </div>
<main>
  <RouterView/>
</main>
</template>




<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useCounterStore } from './stores/counter'
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
// Obtén el estado de autenticación del store
const store = useCounterStore();
// Computed para obtener el estado reactivo de la autenticación
const isAuthenticated = computed(() => store.Autenticacion);
const router = useRouter();

const cambiarIdioma = (idioma) => {
  locale.value = idioma;
};


// Función para cerrar sesión
const logout = () => {
  store.logout(); // Cambiar el estado de autenticación
  router.push('/'); // Redirigir a la página principal
}
</script>


<style >
@import "assets/sytles.scss";
</style>