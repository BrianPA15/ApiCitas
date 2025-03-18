<template>
  <div class="container_registro">
    <form @submit.prevent="cambio">
      <h1>Cambio de datos</h1>

      <div class="input-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="name" placeholder="Nombre" >
      </div>

      <div class="input-group">
        <label for="lastname">Apellido:</label>
        <input type="text" id="lastname" v-model="lastname" placeholder="Apellido" >
      </div>

      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="Correo Electrónico" >
      </div>

      <div class="input-group">
        <label for="phone">Teléfono:</label>
        <input type="text" id="phone" v-model="phone" placeholder="Número de teléfono">
      </div>

      <div class="input-group">
        <label for="date">Fecha de nacimiento:</label>
        <strong>{{ date }}</strong>
      </div>

      <div class="btn-group">
        <button type="submit" class="btn-registrar">Cambiar</button>
        <router-link :to="{ name: 'username', params: { username: username.value } }" class="btn-registrar">
          Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '../stores/counter'
import apiService from '../services/apiService';

const router = useRouter();
const route = useRoute();
const apitoken = useCounterStore();

// Extrae el username de la URL
const username = ref(route.params.username);

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
      // const response = await fetch('http://127.0.0.1:5000/currentUser', {
      //    method: 'PATCH',
      //    headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${apitoken.getToken()}`
      //    },
      //    body: JSON.stringify({
      //       name: name.value,
      //       lastname: lastname.value,
      //       email: email.value,
      //       phone: phone.value,
      //    })
      // });

      const data = await response.json();
      console.log('Respuesta completa:', data);

      if (!response.ok) {
         alert('Error al cambiar los datos.');
      } else {
         alert('Has cambiado los datos correctamente');
         router.push({ name: 'username', params: { username: username.value } });
      }
   } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error al conectar con el servidor.');
   }
}
</script>