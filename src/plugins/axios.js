import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:8080/api', // Pas dit aan naar jouw backend-URL
    timeout: 10000, // Optioneel: timeout instellen voor requests
});

instance.interceptors.request.use(
    (config) => {
        // Haal het token op uit localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Behandel fouten in het verzoek
        console.error('Request Interceptor Fout:', error);
        return Promise.reject(error);
    }
);

// Voeg een interceptor toe om reacties te loggen of fouten af te handelen
instance.interceptors.response.use(
    (response) => {
        // Succesvolle reactie
        return response;
    },
    (error) => {
        // Controleer op 401 (Unauthorized) en onderneem actie, bijvoorbeeld uitloggen
        if (error.response && error.response.status === 401) {
            console.error('Niet geautoriseerd! Token is ongeldig of verlopen.');
            // Optioneel: redirect of logout logica
            localStorage.removeItem('token'); // Verwijder token
            window.location.href = '/login'; // Optioneel: stuur gebruiker naar login-pagina
        }
        return Promise.reject(error);
    }
);

export default instance;
