<template>
  <div class="container_registro">
    <form @submit.prevent="registro">
      <h1>Registro</h1>

      <div class="input-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="name" placeholder="Nombre" required>
      </div>

      <div class="input-group">
        <label for="lastname">Apellido:</label>
        <input type="text" id="lastname" v-model="lastname" placeholder="Apellido" required>
      </div>

      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" placeholder="Correo Electrónico" required>
      </div>

      <div class="input-group">
        <label for="phone">Teléfono:</label>
        <input type="text" id="phone" v-model="phone" placeholder="Número de teléfono" required>
      </div>

      <div class="input-group">
        <label for="username">Usuario:</label>
        <input type="text" id="username" v-model="username" placeholder="Usuario" required>
      </div>

      <div class="input-group">
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" placeholder="Contraseña" required>
      </div>

      <div class="input-group">
        <label for="date">Fecha de nacimiento:</label>
        <input v-model="date" type="date" placeholder="Fecha de nacimiento" />
        <!-- <i class="bi bi-calendar-event"  @click="openCalendar"></i>
                <div class="calendar" v-if="showCalendar">
                  <VDatePicker v-model="date" mode="date" />
                </div> -->
      </div>

    <div class="btn-group">
        <button type="submit" class="btn-registrar">Registrarse</button>
        <router-link to="/" class="btn-registrar">
          Cancelar
        </router-link>
    </div>
</form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import 'v-calendar/style.css'
import { useRouter } from 'vue-router'
import apiService from '../services/apiService';

const router = useRouter();

// Variables reactivas
const name = ref('')
const lastname = ref('')
const email = ref('')
const phone = ref('')
const username = ref('')
const password = ref('')
const date = ref('')
const showCalendar = ref(false)

const formatDate = (selectedDate) => {
  if (!selectedDate) return ''

  // Si es string (del input type="date"), convertirlo a Date
  const dateObj = typeof selectedDate === 'string' 
    ? new Date(selectedDate + 'T00:00:00')  // Se añade hora para evitar desfase horario
    : selectedDate

  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')

  return `${day}/${month}/${year}`
}

// Función de registro
const registro = async () => {
  try {
    const formattedDate = formatDate(date.value)
    
    const userdata={
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      username: username.value,
      password: password.value,
      date: formattedDate
    }
    console.log('Datos enviados:', {
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      username: username.value,
      password: password.value,
      date: formattedDate
    })

    let response = await apiService.registerUser(userdata)
    const data= await response.json();
    console.log('Respuesta completa:', data)
    if (!response.ok) {
      alert('Error al registrar el usuario.')

    } else {
      alert('Usuario registrado correctamente.')
      router.push({ name: 'login'});
    }
  } catch (error) {
    console.error('Error de conexión:', error)
    alert('Error al conectar con el servidor.')
  }
}


    // const response = await fetch('http://127.0.0.1:5000/register', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     name: name.value,
    //     lastname: lastname.value,
    //     email: email.value,
    //     phone: phone.value,
    //     username: username.value,
    //     password: password.value,
    //     date: formattedDate  // <- Fecha bien formateada
    //   })
    // })


// Formatea la fecha al seleccionar (opcional, para enviar tipo string)
// const formatDate = (selectedDate) => {
//   if (selectedDate) {
//     const year = selectedDate.getFullYear()
//     const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
//     const day = String(selectedDate.getDate()).padStart(2, '0')
//     return `${day}/${month}/${year}`  // <- Devuelve la fecha formateada
//   }
//   return ''
// }

// const openCalendar = () => {
//     showCalendar.value = !showCalendar.value;
// }

</script>