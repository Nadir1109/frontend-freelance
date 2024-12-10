import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import EditUser from '@/components/EditUser.vue';
import JobsOverview from "@/components/JobsOverview.vue";
import AddJob from '@/components/AddJob.vue';
import EditJob from "@/components/EditJob.vue";
import RegisterUser from '@/components/RegisterUser.vue';
import LoginUser from "@/components/LoginUser.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/jobs', name: 'JobsView', component: JobsOverview, meta: { requiresAuth: true } },
    { path: '/add-job', name: 'AddJob', component: AddJob, meta: { requiresAuth: true, role: 'CLIENT' } },
    { path: '/jobs/:id/edit', name: 'EditJob', component: EditJob, meta: { requiresAuth: true, role: 'CLIENT' } },
    { path: '/edit/:id', name: 'EditUser', component: EditUser, meta: { requiresAuth: true } },
    { path: '/login', name: 'Login', component: LoginUser, meta: { requiresGuest: true } },
    { path: '/register', name: 'Register', component: RegisterUser, meta: { requiresGuest: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    // Controleer of de route alleen toegankelijk is voor gasten
    if (to.meta.requiresGuest && token) {
        alert('Je bent al ingelogd!');
        return next({ name: 'Home' });
    }

    // Controleer of de route alleen toegankelijk is voor ingelogde gebruikers
    if (to.meta.requiresAuth && !token) {
        alert('Je moet ingelogd zijn om deze pagina te bekijken.');
        return next({ name: 'Login' });
    }

    // Controleer de rol voor routes met specifieke rechten
    if (to.meta.role && userRole !== to.meta.role) {
        alert(`Alleen gebruikers met de rol ${to.meta.role} hebben toegang.`);
        return next({ name: 'JobsView' });
    }

    next();
});

export default router;
