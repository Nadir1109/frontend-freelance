import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://freelance-back-end:8080/api',
    // baseURL: 'http://81.17.103.220:9000/api',
    // baseURL: 'http://localhost:8080/api',
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        // Haal het token op uit localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {

        console.error('Request Interceptor Fout:', error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Controleer op 401 (Unauthorized) en onderneem actie, bijvoorbeeld uitloggen
        if (error.response && error.response.status === 401) {
            console.error('Niet geautoriseerd! Token is ongeldig of verlopen.');
            // Verwijder het token zonder de pagina opnieuw te laden
            localStorage.removeItem('authToken');
        }
        return Promise.reject(error);
    }
);

export default instance;
