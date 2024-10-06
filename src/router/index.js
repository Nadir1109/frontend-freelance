import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import Register from '@/components/Register.vue';
import EditUser from '@/components/EditUser.vue';
import UsersView from "@/components/UsersView.vue";
import Login from "@/components/Login.vue"; // Zorg dat dit overeenkomt met je bestandsnaam

const routes = [
    { path: '/', name: 'Home', component: HomePage, meta: { requiresAuth: true } },  // Home is beveiligd
    { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },
    { path: '/users', name: 'UsersView', component: UsersView, meta: { requiresAuth: true } },  // UsersView is beveiligd
    { path: '/edit/:id', name: 'EditUser', component: EditUser, meta: { requiresAuth: true } }  // EditUser is beveiligd
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Router Guard om te controleren of de gebruiker is ingelogd
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('authToken');  // Controleer of er een token is opgeslagen

    // Controleer of de route beveiliging vereist en de gebruiker niet is ingelogd
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        // Gebruiker is niet ingelogd, stuur naar de loginpagina
        next({ path: '/login' });
    } else {
        // Gebruiker is ingelogd of de route vereist geen beveiliging, laat doorgaan
        next();
    }
});

export default router;
