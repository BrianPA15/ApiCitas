<template>
  <div class="container_registro2">
    <form @submit.prevent="cambio">
      <h1>{{ $t('CambioDatos') }}</h1>

      <div class="input-group">
        <label for="name">{{ $t('Nombre') }}:</label>
        <input type="text" id="name" v-model="name" :placeholder="$t('Nombre')" >
      </div>

      <div class="input-group">
        <label for="lastname">{{ $t('Apellidos') }}:</label>
        <input type="text" id="lastname" v-model="lastname" :placeholder="$t('Apellidos')" >
      </div>

      <div class="input-group">
        <label for="email">{{ $t('Email') }}:</label>
        <input type="email" id="email" v-model="email" :placeholder="$t('Email')" >
      </div>

      <div class="input-group">
        <label for="phone">{{ $t('Telefono') }}:</label>
        <input type="text" id="phone" v-model="phone" :placeholder="$t('txttelefono')" >
      </div>

      <div class="input-group">
        <label for="date">{{ $t('Fecha') }}:</label>
        <strong>{{ date }}</strong>
      </div>

      <div class="btn-group">
        <button type="submit" class="btn-registrar">{{ $t('Cambiar') }}</button>
        <router-link :to="{ name: 'username', params: { username: username.value } }" class="btn-registrar">
          {{ $t('Cancelar') }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '../stores/counter'
import apiService from '../services/apiService';

const router = useRouter();
const route = useRoute();
const apitoken = useCounterStore();

// Extrae el username de la URL
const username = ref(route.params.username);
const { proxy } = getCurrentInstance();

// Variables reactivas
const name = ref('');
const lastname = ref('');
const email = ref('');
const phone = ref('');
const date = ref('');
const perfilList = ref({});

onMounted(async () => {
    try {
        const response = await apiService.VerPerfil();
        const data = await response.json();

        // Asigna los datos del perfil a las variables reactivas
        name.value = data.name || '';
        lastname.value = data.lastname || '';
        email.value = data.email || '';
        phone.value = data.phone || '';
        date.value = data.date || '';

        console.log("Datos del perfil:", data);
    } catch (error) {
        console.error("Error al cargar el perfil:", error);
    }
});

const cambio = async () => {
    try {
    const Data={
      name:name.value,
      lastname:lastname.value,
      email:email.value,
      phone:phone.value
    };
    const response = await apiService.Cambiar(Data);
      const data = await response.json();
      console.log('Respuesta completa:', data);

      if (!response.ok) {
        proxy.$swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al cambiar los datos.'
        });
      } else {
        proxy.$swal.fire({
        icon: 'success',
        title: 'Informacion',
        text: 'Has cambiado los datos correctamente.'
      });
          // alert('Has cambiado los datos correctamente');
          router.push({ name: 'username', params: { username: username.value } });
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error al conectar con el servidor.');
    }
}
</script>