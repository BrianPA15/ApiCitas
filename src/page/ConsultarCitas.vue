<template>
    <div class="container_login_citas2">
        <div class="info_citas">
            <router-link :to="{ name: 'Citas', params: { username } }" class="btn-citas">Volver</router-link>
            <!-- <h2>{{ username }}</h2> -->
            <h3>Mis Citas</h3>

            <button @click="filtrar" class="btn-citas">Buscar por día</button>
            <input type="date" id="day" v-model="day" placeholder="DD/MM/YYYY">
            <button @click="Cancelar" class="btn-citas">Quitar Filtrar</button>
            
            <ul v-for="consult in consultList" :key="consult.id">
                <li>
                    <div>
                        <h5>{{ "Centro de Salud: " + consult.center }}</h5>
                        <p>{{ "Fecha y Hora: " + consult.date }}</p>
                    </div>
                    <div>
                        <a @click="CancelarCita(consult.center, consult.date)">
                            <i class="bi bi-x-circle"></i>
                        </a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCounterStore } from '../stores/counter'
import apiService from '../services/apiService';
const route = useRoute();
const username = ref(route.params.username || 'Usuario no disponible');
const apitoken=useCounterStore();

const isLoading = ref(false);
const consultList= ref([]);
const day= ref('');

onMounted(async () => {
    await cargarlista();
}); 

const formatDate = (selectedDate) => 
{
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

const cargarlista= async () => {
    let response = await apiService.getByUser();
        if (!response.ok) {
            console.error('Error al cargar las citas:', response.status);
            return;
        }
        const data = await response.json();
        console.log(data)
        consultList.value= data;
}

const filtrar = async () => {
    if (isLoading.value) return;
    isLoading.value = true;

    if (!day.value) {
        alert("Por favor, ingrese una fecha válida");
        isLoading.value = false;
        return;
    }
    const formattedDate = formatDate(day.value)


    try {
        let response = await apiService.getByDay(formattedDate);
        if (!response.ok) throw new Error("Error al filtrar las citas");

        const data = await response.json();

        console.log("📌 Citas recibidas desde el backend:", data); // 🔍 Verifica en la consola

        if (!Array.isArray(data)) {
            console.error("❌ Error: La respuesta no es una lista de citas.", data);
            return;
        }

        if (data.length === 0) {
            alert("No se encontraron citas para esta fecha.");
        }

        consultList.value = data; // Actualiza la lista de citas en Vue
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);
    } finally {
        isLoading.value = false;
    }
};

const CancelarCita = async (center, date) => {
    const Cancelado={
        center,
        date
    }
    try {
        const response = await apiService.CancelarCitas(Cancelado);
        const data = await response.json();

        if (!response.ok) {
            alert(data.msg || 'No se pudo cancelar la cita');
        } else {
            alert('La cita ha sido cancelada correctamente.');
            await cargarlista(); // Recargamos la lista de citas para reflejar los cambios
        }
    } catch (error) {
        console.error("Error al cancelar la cita:", error);
        alert("Hubo un error al cancelar la cita.");
    }
};

const Cancelar = async () => 
{
    day.value = '';
    await cargarlista();
}
</script>
