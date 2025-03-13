<template>
    <div class="container_login">
        <form @submit.prevent="login">
            <h1>LOGIN</h1>
            <div class="input-group">
                <label for="username">Usuario:</label>
                <input type="text" id="username" v-model="username" placeholder="Usuario" required>
            </div>

            <div class="input-group">
                <label for="password">Contraseña:</label>
                <input type="password" id="password" v-model="password" placeholder="Contraseña" required>
            </div>

            <div class="btn-group">
                <button type="submit" class="btn-registrar">Entrar</button>
                <router-link to="/registrar" class="btn-registrar">Registrarse</router-link>
            </div>
        </form>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter'
import apiService from '@/services/apiService';

const router = useRouter();
const store = useCounterStore(); // Acceder al store para manejar la autenticación

const username = ref('')
const password = ref('')

const login = async () => {
  const user= {
  username: username.value,
  password: password.value
}
  let response= await apiService.LoginUser(user)
  const data = await response.json();

  if (!response.ok) {
    alert('Error al acceder el usuario.')
  } else {
    alert('Usuario correctamente.'),
    console.log("Token recibido : " + data.access_token);
    store.setToken(data.access_token); // Establecer el token y marcar al usuario como autenticado
    router.push({ name: 'username', params: { username: username.value } }); // Redirigir a la página de usuario o al perfil
  }
}
</script>
