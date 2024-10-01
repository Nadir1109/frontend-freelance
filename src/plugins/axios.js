import axios from 'axios';

// Maak een axios instance aan met een basis-URL en standaard headers
const instance = axios.create({
    baseURL: '/api', // De proxy naar je Spring Boot backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optioneel: Interceptors toevoegen voor foutafhandeling of authenticatie
instance.interceptors.response.use(
    response => response, // Gewoon het response object teruggeven als er geen fouten zijn
    error => {
        // Als er een fout is, kun je deze hier afhandelen
        console.error('Er is een fout opgetreden bij het maken van een request:', error.response);
        return Promise.reject(error); // Fout doorgeven zodat je deze in de component kunt afhandelen
    }
);

export default instance;
