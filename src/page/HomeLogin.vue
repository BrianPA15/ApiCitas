<template>
<div class="container_login_home">
    <h1>{{ $t('Intro') }}</h1>
    <h5>{{ username }}</h5>
    <p>
        {{ $t('texto') }}
    </p>
    <div class="btn-menu">
        <button @click="verPerfil">{{ $t('Perfil') }}</button>
      <button @click="verCentros">{{ $t('Centros') }}</button>
      <router-link :to="{ name: 'Citas', params: { username } }" class="btn-registrar">
        {{ $t('Citas') }}
      </router-link>
    </div>

    <div class="container_unicos">
        <centro v-if="showCentros"/>
        <perfil v-if="showperfil"/>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService';
import { useCounterStore } from '../stores/counter'
import { useRoute } from 'vue-router'
import centro from '../components/main_centro.vue';
import perfil from '../components/main_perfil.vue';


const route = useRoute();  // Obtén la ruta actual

// const username = ref(route.currentRoute.value.params.username);
const username = ref(route.params.username || 'Usuario no disponible');

const showCentros = ref(false)
const showperfil=ref(false)

const verCentros = () => {
//   showCentros.value = !showCentros.value 
showCentros.value = true
showperfil.value = false
}
const verPerfil = () => {
    // showperfil.value = !showperfil.value 
    showperfil.value = true
    showCentros.value = false
}
</script>