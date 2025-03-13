<template>
    <div class="listperfil">
        <h2>Perfil</h2>
        <ul v-if="perfilList">
            <li>{{ "Nombre completo : " +  perfilList?.name +  " " + perfilList?.lastname }}</li>
            <li>{{ "Email : " +  perfilList?.email}}</li>
            <li>{{ "Telefono : " +  perfilList?.phone}}</li>
            <li>{{ "Fecha Nacimiento : " +  perfilList?.date}}</li>
        </ul>
        <router-link :to="{ name: 'cambio', params: { username } }">Cambiar Datos</router-link>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService';
import { useCounterStore } from '../stores/counter'
import { useRoute } from 'vue-router'


const perfilList=ref([]);
const apitoken=useCounterStore();
const route = useRoute();  // Obtener la ruta actual
const username = ref(route.params.username || 'Usuario no disponible'); // Se pasa el username desde la ruta
onMounted(async () => {
    const response = await apiService.VerPerfil();
        const data = await response.json();
        console.log(data)
        perfilList.value= data;
});
</script>


// const response = await fetch('http://127.0.0.1:5000/profile',{
    // method: 'GET',
    // headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${apitoken.getToken()}`
    // }
    // })