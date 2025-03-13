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
        <input v-model="date" type="date" placeholder="Fecha de nacimiento" />
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '../stores/counter'
const router = useRouter();
const route = useRoute();
const apitoken=useCounterStore();
// Extrae el username de la URL
const username = ref(route.params.username);

// Variables reactivas
const name = ref('')
const lastname = ref('')
const email = ref('')
const phone = ref('')
const date = ref('')


const formatDate = (selectedDate) => {
if (!selectedDate) return '';

// Si es string (del input type="date"), convertirlo a Date
const dateObj = typeof selectedDate === 'string'
  ? new Date(selectedDate + 'T00:00:00')  // Se añade hora para evitar desfase horario
  : selectedDate;


const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0');
const day = String(dateObj.getDate()).padStart(2, '0');


return `${day}/${month}/${year}`;  // Cambiado para que use el formato DD/MM/YYYY
}


const cambio = async () => {
  try {
    const formattedDate = formatDate(date.value)
    console.log('Datos enviados:', {
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      date: formattedDate
    })


    const response = await fetch('http://127.0.0.1:5000/currentUser', {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apitoken.getToken()}`
      },
      body: JSON.stringify({
        name: name.value,
        lastname: lastname.value,
        email: email.value,
        phone: phone.value,
        date: formattedDate
      })
    })
    const data= await response.json();
    console.log('Respuesta completa:', data)
    if (!response.ok) {
      alert('Error al cambiar los datos.')

    } else {
      alert('Has cambiado los datos correctamente')
      router.push({ name: 'username', params: { username: username.value } });
    }
  } catch (error) {
    console.error('Error de conexión:', error)
    alert('Error al conectar con el servidor.')
  }
}
</script>



<!-- <script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCounterStore } from '../stores/counter'


const router = useRouter();
const route = useRoute();
const apitoken = useCounterStore();


const username = ref(route.params.username)


const name = ref('')
const lastname = ref('')
const email = ref('')
const phone = ref('')
const date = ref('')


const formatDate = (selectedDate) => {
  if (!selectedDate) return '';


  const dateObj = typeof selectedDate === 'string'
      ? new Date(selectedDate + 'T00:00:00')
      : selectedDate;


  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');


  return `${day}/${month}/${year}`;
}


const cambio = async () => {
  try {
      const formattedDate = date.value ? formatDate(date.value) : '';


      // Crear objeto con solo los campos que tienen valor
      const updatedData = {};
      if (name.value.trim() !== '') updatedData.name = name.value;
      if (lastname.value.trim() !== '') updatedData.lastname = lastname.value;
      if (email.value.trim() !== '') updatedData.email = email.value;
      if (phone.value.trim() !== '') updatedData.phone = phone.value;
      if (formattedDate !== '') updatedData.date = formattedDate;


      console.log('Datos enviados:', updatedData);


      const response = await fetch('http://127.0.0.1:5000/currentUser', {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apitoken.getToken()}`
          },
          body: JSON.stringify(updatedData)  // Solo manda lo que tiene valor
      });


      const data = await response.json();
      console.log('Respuesta completa:', data);


      if (!response.ok) {
          alert('Error al cambiar los datos.');
      } else {
          alert('Has cambiado los datos correctamente.');
          router.push({ name: 'username', params: { username: username.value } });
      }


  } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error al conectar con el servidor.');
  }
}
</script> -->
