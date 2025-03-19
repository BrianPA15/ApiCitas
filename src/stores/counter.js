import { defineStore } from 'pinia'

export const useCounterStore =  defineStore('counter', {
  state: () => ({
    token: null,
    Autenticacion:false,
    expirationTime: null,
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken
      this.Autenticacion = true; // Cambiar a autenticado cuando se establece el token
      this.expirationTime = Date.now() +  30 * 1000; 

      // Iniciar temporizador para eliminar el token después de 5 segundos
      setTimeout(() => {
        if (Date.now() >= this.expirationTime) {
          this.logout();
          alert("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
          window.location.href = '/';
        }
      }, 30 * 1000);
    },
    getToken() {
      return this.token
    },
    logout() {
      this.token = null;
      this.Autenticacion = false; // Cambia el estado a no autenticado
    },
  }
})
