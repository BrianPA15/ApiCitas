<template>
    <div class="info_ocupados">
        <h3>{{ $t('txt3') }}</h3>
        <div v-if="listOcupado.length === 0">
            <h4>{{ $t('NoHayCitasOcupadas') }}</h4>
        </div>
        <ul v-else>
            <li v-for="(ocupado, index) in listOcupado" :key="index">
                <p>{{$t('txt4')}}: {{ ocupado.date }} </p>
                <p>{{$t('mainCentro')}}: {{ ocupado.center }} </p>
                <p>{{$t('User')}}: {{ ocupado.username }}</p>
            </li>
        </ul>
    </div>
</template>



<script>
import { useCounterStore } from '../stores/counter';
import apiService from '../services/apiService';
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const listOcupado = ref([]);
        const apitoken = useCounterStore(); // Asegúrate de llamar a la store dentro de setup()

        onMounted(async () => {
            try {
                const response= await apiService.VerCitaOcupadas();
                if (!response.ok) {
                    throw new Error('Error al obtener citas');
                }

                const data = await response.json();
                console.log('Datos recibidos:', data); // Verifica qué datos llegan

                listOcupado.value = data; 

            } catch (error) {
                console.error(error);
                alert('Error al obtener citas');
            }
        });

        return { listOcupado };
    }
}
</script>