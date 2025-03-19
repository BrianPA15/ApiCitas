import 'bootstrap-icons/font/bootstrap-icons.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Importa BootstrapVue3 y sus estilos
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';
import { createI18n } from 'vue-i18n';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const messages = {
    en: {
        logo: "Community of Madrid",
        Registro: "Register",
        Registro2: "Sign Up",
        Sesion: "Login",
        NotSesion: "Logout",
        User: "Username",
        pass: "Password",
        Nombre: "Name",
        Apellidos: "Last Name",
        Telefono: "Phone",
        txttelefono:"phone number",
        Email: "Email",
        Fecha: "Date of Birth",
        Cancelar: "Cancel",
        Perfil: "View Profile",
        Centros: "View Centers",
        Citas: "Appointments",
        Pedir: "Request Appointments",
        Consultar: "Check Appointments",
        Volver: "Back",
        CancelarCitas: "Cancel Appointments",
        Enviar: "Send",
        dia: "The day",
        centro: "The center",
        Ocupados: "Scheduled Appointments",
        btn1: "Search by Day",
        btn2: "Remove Filter",
        Consulta: "Health Center",
        ConsultaFH: "Date and Time",
        txt1: "Your appointment",
        txt2: "My Appointments",
        txt3: "Cancel your appointments",
        txt3:"Date Registered or Occupied",
        txt4:"Date",
        Intro: "Welcome!",
        texto: "This is your personal space where you can view and manage your personal data, appointments, and explore the centers available to you.",
        Datos1: "Full Name",
        Datos2: "Email",
        Datos3: "Phone",
        Datos4: "Date of Birth",
        CambioDatos: "Change Data",
        Cambiar:"Change",
        mainCentro:"Centers",
        mainPerfil:"Profile"
    },
    es: {
        logo: "Comunidad de Madrid",
        Registro: "Registrar",
        Registro2: "Registrarse",
        Sesion: "Inicio Sesión",
        NotSesion: "Cerrar Sesión",
        User: "Usuario",
        pass: "Contraseña",
        Nombre: "Nombre",
        Apellidos: "Apellidos",
        Telefono: "Teléfono",
        txttelefono:"Numero de teleéfono",
        email: "Correo Electrónico",
        Fecha: "Fecha de Nacimiento",
        Cancelar: "Cancelar",
        Perfil: "Ver Perfil",
        Centros: "Ver Centros",
        Citas: "Citas",
        Pedir: "Pedir Citas",
        Consultar: "Consultar Citas",
        Volver: "Volver",
        CancelarCitas: "Cancelar Citas",
        Enviar: "Enviar",
        dia: "El día",
        centro: "El centro",
        Ocupados: "Citas Programadas",
        btn1: "Buscar Por Día",
        btn2: "Quitar Filtrado",
        Consulta: "Centro de Salud",
        ConsultaFH: "Fecha y Hora",
        txt1: "Tu cita",
        txt2: "Mis Citas",
        txt3: "Cancela tus citas",
        txt3:"Fecha Regsitradas oOcupadas ",
        txt4:"Fecha",
        Intro: "¡Bienvenido!",
        texto: "Este es tu espacio personal donde podrás ver y gestionar tus datos personales, tus citas y explorar los centros disponibles para ti.",
        Datos1: "Nombre Completo",
        Datos2: "Correo Electrónico",
        Datos3: "Teléfono",
        Datos4: "Fecha de Nacimiento",
        CambioDatos: "Cambiar Datos",
        Cambiar:"Cambiar",
        mainCentro:"Centros",
        mainPerfil:"Perfil"
    },
    fr: {
        logo: "Communauté de Madrid",
        Registro: "S'inscrire",
        Registro2: "Créer un compte",
        Sesion: "Connexion",
        NotSesion: "Déconnexion",
        User: "Nom d'utilisateur",
        pass: "Mot de passe",
        Nombre: "Prénom",
        Apellidos: "Nom",
        Telefono: "Téléphone",
        txttelefono:"Numéro de téléphone",
        Email: "Email",
        Fecha: "Date de naissance",
        Cancelar: "Annuler",
        Perfil: "Voir le profil",
        Centros: "Voir les centres",
        Citas: "Rendez-vous",
        Pedir: "Prendre un rendez-vous",
        Consultar: "Consulter les rendez-vous",
        Volver: "Retour",
        CancelarCitas: "Annuler les rendez-vous",
        Enviar: "Envoyer",
        dia: "Le jour",
        centro: "Le centre",
        Ocupados: "Rendez-vous programmés",
        btn1: "Rechercher par jour",
        btn2: "Supprimer le filtre",
        Consulta: "Centre de santé",
        ConsultaFH: "Date et heure",
        txt1: "Votre rendez-vous",
        txt2: "Mes rendez-vous",
        txt3: "Annulez vos rendez-vous",
        txt3:"Date d'inscription ou d'occupation",
        txt4:"Date",
        Intro: "Bienvenue!",
        texto: "Ceci est votre espace personnel où vous pouvez voir et gérer vos données personnelles, vos rendez-vous et explorer les centres disponibles pour vous.",
        Datos1: "Nom complet",
        Datos2: "Email",
        Datos3: "Téléphone",
        Datos4: "Date de naissance",
        CambioDatos: "Modifier les données",
        Cambiar:"Modifier",
        mainCentro:"Centres",
        mainPerfil:"Profil"
    }
};

// Crear la instancia de i18n
const i18n = createI18n({
    legacy: false, // Usar el modo de composición
    locale: 'es',  // Idioma por defecto
    fallbackLocale: 'en', // Idioma de respaldo
    messages,      // Los mensajes de traducción
});


const app = createApp(App)
library.add(far, fab, fas)
app.use(createPinia())
app.use(router)
app.use(BootstrapVue3)  // Asegúrate de registrar BootstrapVue3
app.use(VCalendar, {})
app.use(VueSweetalert2)
app.use(i18n)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount('#app')
