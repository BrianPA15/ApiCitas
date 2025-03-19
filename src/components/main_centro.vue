<template>
    <div class="listcentros">
        <h2>{{ $t('mainCentro') }}</h2>
        <ul v-for="centro in Centrolist" :key="centro.id">
            <li>
                <h5>{{ centro.name }}</h5>
                <span>{{ centro.address }}</span>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import apiService from '../services/apiService';
import { useCounterStore } from '../stores/counter'
import { useRoute } from 'vue-router'

const Centrolist=ref([]);
const apitoken=useCounterStore();

onMounted(async () => {
        const response = await apiService.VerCentros();
        const data = await response.json();
        console.log(data)
        Centrolist.value= data;
}); 
</script>
