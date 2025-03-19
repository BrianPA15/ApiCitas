<template>
    <div class="container_login">
        <form @submit.prevent="login">
          <div class="text-center">
                <img src="../assets/img/user.png" alt="">
                <h1>
                  {{ $t('Sesion') }}
                </h1>
            </div>
            <div class="input-group">
                <label for="username">{{ $t('User') }}:</label>
                <input type="text" id="username" v-model="username" :placeholder="$t('User')" required>
            </div>

            <div class="input-group">
                <label for="password">{{ $t('pass') }}:</label>
                <input type="password" id="password" v-model="password" :placeholder="$t('pass')" required>
            </div>

            <div class="btn-group">
                <button type="submit" class="btn-registrar">{{ $t('Sesion') }}</button>
                <router-link to="/registrar" class="btn-registrar">{{ $t('Registro2') }}</router-link>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '../stores/counter'
import apiService from '@/services/apiService';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

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
      text: proxy.$t('loginError')
    });
  } else {
    // Usando $swal desde la instancia
    proxy.$swal.fire({
      icon: 'success',
      title: proxy.$t('loginSuccessTitle'), // Traducción del título de éxito
      text: proxy.$t('loginSuccessText')
    });

    console.log("Token recibido : " + data.access_token);
    store.setToken(data.access_token); // Establecer el token y marcar al usuario como autenticado
    router.push({ name: 'username', params: { username: username.value } }); // Redirigir a la página de usuario o al perfil
  }
}

</script>