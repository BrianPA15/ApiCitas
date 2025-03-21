import { useCounterStore } from '../stores/counter'
export default {

    BASE_URL: "http://127.0.0.1:5000",
    
    async registerUser(userData)
    {
        const response = await fetch(`${this.BASE_URL}/register`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        return  response;
    },
    
    async LoginUser(data){
        const response = await fetch(`${this.BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return  response;
    },

    async VerPerfil()
    {
        const store = useCounterStore();
        if (!store.getToken()) return;
        // const isValidToken = this.checkTokenExpiration();  // Verificar si el token es válido
        // if (!isValidToken) return;  // Si el token no es válido, no se hace la solicitud

        const apitoken=useCounterStore();
        const response = await fetch(`${this.BASE_URL}/profile`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apitoken.getToken()}`
            }
            })
            return response;
    },
    
    async VerCentros()
    {
        const store = useCounterStore();
        if (!store.getToken()) return;
        // const isValidToken = this.checkTokenExpiration();  // Verificar si el token es válido
        // if (!isValidToken) return;  // Si el token no es válido, no se hace la solicitud
        const apitoken=useCounterStore();
        const response = await fetch(`${this.BASE_URL}/centers`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apitoken.getToken()}`
            }
            })
            return  response;
    },

    async Pedircita(citas)
    {
        const store = useCounterStore();
        if (!store.getToken()) return;
        const apitoken=useCounterStore();
        const response = await fetch(`${this.BASE_URL}/date/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apitoken.getToken()}`
            },
            body: JSON.stringify(citas)
        })
        return response;
    },

    async CancelarCitas(citas)
    {
        const store = useCounterStore();
        if (!store.getToken()) return;
        // const isValidToken = this.checkTokenExpiration();  // Verificar si el token es válido
        // if (!isValidToken) return;  // Si el token no es válido, no se hace la solicitud
        const apitoken=useCounterStore();
        const response = await fetch(`${this.BASE_URL}/date/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apitoken.getToken()}`
            },
            body: JSON.stringify(citas)
        })
        return response;
    },

    async VerCitaOcupadas()
    {
        const store = useCounterStore();
        if (!store.getToken()) return;
        // const isValidToken = this.checkTokenExpiration();  // Verificar si el token es válido
        // if (!isValidToken) return;  // Si el token no es válido, no se hace la solicitud
        const apitoken=useCounterStore();
        const response = await fetch(`${this.BASE_URL}/dates`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apitoken.getToken()}`
            }
        });
            return response;
    },

    async getByDay(day)
    {
        const store = useCounterStore();
        if (!store.getToken()) return;
        // const isValidToken = this.checkTokenExpiration();  // Verificar si el token es válido
        // if (!isValidToken) return;  // Si el token no es válido, no se hace la solicitud
        const apitoken=useCounterStore();
        const response = await fetch(`${this.BASE_URL}/date/getByDay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apitoken.getToken()}`
            },
            body: JSON.stringify({ day }) // Formato DD/MM/YYYY
        });
        return response;
    },

    async getByUser()
    {
        const store = useCounterStore();
        if (!store.getToken()) return;
        // const isValidToken = this.checkTokenExpiration();  // Verificar si el token es válido
        // if (!isValidToken) return;  // Si el token no es válido, no se hace la solicitud
        const apitoken=useCounterStore();
        const response = await fetch(`${this.BASE_URL}/date/getByUser`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apitoken.getToken()}`
            }
            });
            return response;
    },
    
    async Cambiar(User){
        const store = useCounterStore();
        if (!store.getToken()) return;
        // const isValidToken = this.checkTokenExpiration();  // Verificar si el token es válido
        // if (!isValidToken) return;  // Si el token no es válido, no se hace la solicitud
        const apitoken=useCounterStore();
        const response = await fetch('http://127.0.0.1:5000/currentUser', {
            method: 'PATCH',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${apitoken.getToken()}`
            },
            body: JSON.stringify(User)
         });
         return response;
    }
}


    // Función para verificar si el token ha expirado
        // checkTokenExpiration() 
        // {
        //     const store = useCounterStore();
        //     const token = store.getToken();
        
        //     // Si no hay token, redirigir al login
        //     if (!token) {
        //     store.logout();
        //     window.location.href = '/';
        //     return false;
        //     }
        
        //     // Verificar si el token está expirado
        //     const tokenParts = token.split('.');
        //     if (tokenParts.length === 3) {
        //     const payload = JSON.parse(atob(tokenParts[1]));
        //     const expiration = payload.exp * 1000;  // convertir a milisegundos
        //     const now = Date.now();
        //     const expirationTime = 5 * 1000;  // 5 segundos
        
        //     if (now >= expiration) {
        //         // Si el token ha expirado
        //         store.logout();
        //         alert("Tu sesión ha expirado. Por favor, inicia sesión de nuevo.");
        //         window.location.href = '/';
        //         return false;
        //     }
        //     }
        //     return true;
        // },