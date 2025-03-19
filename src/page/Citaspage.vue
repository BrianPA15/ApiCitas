<template>
    <div class="container_login_citas">
        <img src="../assets/img/unnamed.png" alt="" style="width: 50%; margin-bottom: 20px;">
        <div class="menu_button">
            <router-link :to="{ name: 'pedir', params: { username } }" class="btn-citas">
        {{ $t('Pedir') }}
      </router-link>

      <router-link :to="{ name: 'consultar', params: { username } }" class="btn-citas">
        {{ $t('Consultar') }}
      </router-link>

      <router-link :to="{ name: 'canelarCitas', params: { username } }" class="btn-citas">
        {{ $t('CancelarCitas') }}
      </router-link>

      <router-link :to="{ name: 'username', params: { username } }" class="btn-citas">
        {{ $t('Volver') }}
      </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
const username = ref(route.params.username || 'Usuario no disponible');
</script>
