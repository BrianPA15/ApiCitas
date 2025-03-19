<template>
<div class="container_login_citas3">
        <form @submit.prevent="PedirCitas">
            <h2>{{ $t('txt1') + ' ' + username }}</h2>
            <div class="input-group">
                <label for="centro">{{ $t('centro') }}:</label>
                <select v-model="centro">
                    <option v-for="centroItem in Centrolist" :key="centroItem.name" :value="centroItem.name">
                        {{ centroItem.name }}
                    </option>
                </select>
            </div>

            <div class="input-fecha">
                <label for="fecha">{{ $t('dia') }}:</label>
                <i class="bi bi-calendar-event"  @click="openCalendar"></i>
                <div class="calendar" v-if="showCalendar">
                    <VDatePicker ref="datePicker" v-model="date" mode="dateTime" is24hr class="fecha"/>
                </div>
            </div>

            <div class="btn-group">
                <button type="submit" class="btn-citas">{{ $t('Enviar') }}</button>
                <router-link :to="{ name: 'Citas', params: { username } }" class="btn-citas">{{ $t('Cancelar') }}</router-link>
            </div>
        </form>

        <div class="btn-group">
          <button @click="verOcupados" class="btn-citas">{{ $t('Ocupados') }}</button>
        </div>

        <ocupada v-if="showOcupado"/>
    </div>
</template>

<script setup>
import { ref ,onMounted, getCurrentInstance } from 'vue'
import apiService from '../services/apiService';
import { useCounterStore } from '../stores/counter'
import { useRoute, useRouter  } from 'vue-router'
import ocupada from '../components/main_citaOpcupadas.vue';

const route= useRoute();
const router = useRouter() 
const { proxy } = getCurrentInstance();
const apitoken=useCounterStore();
const Centrolist=ref([]);
const centro = ref('');
const date = ref('');
const showCalendar = ref(false);
const showOcupado = ref(false);


const username = ref(route.params.username || 'Usuario no disponible');

onMounted(async () => {
    const response = await apiService.VerCentros();
        const data = await response.json();
        console.log(data)
        Centrolist.value= data;
}); 

const openCalendar = () => {
    showCalendar.value = !showCalendar.value;
}


const formatDateTime = (selectedDate) => {
    if (!selectedDate) return ''

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const hours = String(selectedDate.getHours()).padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:00:00`
}

const PedirCitas = async () => {
    const fechaformat = formatDateTime(date.value)
    const citaData={
        center: centro.value,
        date: fechaformat
    };
    let response = await apiService.Pedircita(citaData);
    const data= await response.json();

    if (!response.ok) {
        let message= data.msg || 'Error al crear la cita';

        if(data.msg === 'Date and hour already taken'){
            message = 'La fecha y la hora ya están ocupadas';
        }
        proxy.$swal.fire({
            icon: 'error',
            title: 'Error',
            text:message
        });
        // alert(message);

    } else {
        proxy.$swal.fire({
        icon: 'success',
        title: 'Informacion',
        text: 'Cita creada correctamente'
        });
        // alert('Cita creada correctamente')
        router.push({ name: 'Citas', params: { username } })
    }
}

const verOcupados = () => {
    showOcupado.value = !showOcupado.value
}

</script>
