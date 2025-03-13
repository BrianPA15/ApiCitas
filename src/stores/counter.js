import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore =  defineStore('counter', {
  state: () => ({
    token: null,
    Autenticacion:false
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken
      this.Autenticacion = true; // Cambiar a autenticado cuando se establece el token
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
