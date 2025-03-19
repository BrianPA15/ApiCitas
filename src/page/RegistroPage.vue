<template>
  <div class="container_registro">
    <form @submit.prevent="registro" >
      <div class="text-center">
        <img src="../assets/img/user.png" alt="">
        <h1 class="text-center">{{$t('Registro2')}}</h1>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="mb-3">
            <label for="name" class="form-label">{{$t('Nombre')}}:</label>
            <input type="text" id="name" v-model="name" class="form-control" :placeholder="$t('Nombre')" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">{{ $t('email') }}:</label>
            <input type="email" id="email" v-model="email" class="form-control" :placeholder="$t('email')" required>
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">{{$t('User')}}:</label>
            <input type="text" id="username" v-model="username" class="form-control" :placeholder="$t('User')" required>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="mb-3">
            <label for="lastname" class="form-label">{{$t('Apellidos')}}:</label>
            <input type="text" id="lastname" v-model="lastname" class="form-control" :placeholder="$t('Apellidos')"  required>
          </div>
          <div class="mb-3">
            <label for="phone" class="form-label">{{$t('Telefono')}}:</label>
            <input type="text" id="phone" v-model="phone" class="form-control" :placeholder="$t('Telefono')" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">{{$t('pass')}}:</label>
            <input type="password" id="password" v-model="password" class="form-control" :placeholder="$t('pass')"  required>
          </div>
        </div>
      </div>
      
      <div class="mb-2">
        <label for="date" class="form-label">{{$t('Fecha')}}:</label>
        <input v-model="date" type="date" class="form-control" :placeholder="$t('Fecha')" />
      </div>
      
      <div class="btn-group">
        <button type="submit" class="btn-registrar">{{ $t('Registro2') }}</button>
        <router-link to="/" class="btn-registrar">
          {{ $t('Cancelar') }}
        </router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import 'v-calendar/style.css'
import { useRouter } from 'vue-router'
import apiService from '../services/apiService';

const router = useRouter();

// Acceder a la instancia de Vue para utilizar $swal
const { proxy } = getCurrentInstance();

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
      // alert('Error al registrar el usuario.')
      proxy.$swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al registrar el usuario.'
    });

    } else {
      // alert('Usuario registrado correctamente.')
      proxy.$swal.fire({
      icon: 'success',
      title: 'Informacion!',
      text: 'Usuario registrado correctamente'
    });

      router.push({ name: 'login'});
    }
  } catch (error) {
    console.error('Error de conexión:', error)
    alert('Error al conectar con el servidor.')
  }
}
</script>