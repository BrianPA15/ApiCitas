<template>
    <div class="container_login">
        <form @submit.prevent="login">
          <div class="text-center">
                <img src="../assets/img/user.png" alt="">
                <h1>LOGIN</h1>
            </div>
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
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter'
import apiService from '@/services/apiService';

const router = useRouter();
const store = useCounterStore();

const username = ref('')
const password = ref('')

// Acceder a la instancia de Vue para utilizar $swal
const { proxy } = getCurrentInstance();

// Función login
const login = async () => {
  const user = {
    username: username.value,
    password: password.value
  }

  let response = await apiService.LoginUser(user)
  const data = await response.json();

  if (!response.ok) {
    // Usando $swal desde la instancia
    proxy.$swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al acceder el usuario.'
    });
  } else {
    // Usando $swal desde la instancia
    proxy.$swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Usuario correctamente autenticado.'
    });

    console.log("Token recibido : " + data.access_token);
    store.setToken(data.access_token); // Establecer el token y marcar al usuario como autenticado
    router.push({ name: 'username', params: { username: username.value } }); // Redirigir a la página de usuario o al perfil
  }
}
</script>