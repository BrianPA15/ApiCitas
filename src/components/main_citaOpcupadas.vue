<template>
    <div class="info_ocupados">
        <h3>Fechas Registradas o Ocupadas</h3>
        <ul>
            <li v-for="(ocupado, index) in listOcupado" :key="index">
                <p>Fecha: {{ ocupado.date }} </p>
                <p>Centro: {{ ocupado.center }} </p>
                <p>Usuario: {{ ocupado.username }}</p>
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


<!-- <script>
import { useCounterStore } from '../stores/counter'
import { ref, onMounted } from 'vue'
const listOcupado=ref([]);
const apitoken = useCounterStore() 

onMounted(async () => {
  try {
        const response = await fetch('http://127.0.0.1:5000/dates', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apitoken.getToken()}`
            }
        });

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

</script> -->