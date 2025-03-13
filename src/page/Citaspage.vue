<template>
    <div class="container_login_citas">
        <div class="menu_button">
            <router-link :to="{ name: 'pedir', params: { username } }" class="btn-citas">Pedir Citas</router-link>
            <!-- <button>Pedir Citas</button> -->
            <router-link :to="{ name: 'consultar', params: { username } }" class="btn-citas">Consultar tus citas</router-link>
            <!-- <button>Consultar tus citas</button> -->

            <router-link :to="{ name: 'canelarCitas', params: { username } }" class="btn-citas">Cancelar citas</router-link>
            <!-- <button>Cancelar citas</button> -->
            <router-link :to="{ name: 'username', params: { username } }" class="btn-citas">Volver</router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
const username = ref(route.params.username || 'Usuario no disponible');
</script>
