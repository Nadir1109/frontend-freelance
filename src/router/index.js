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
    { path: '/jobs', name: 'JobsView', component: JobsOverview },
    { path: '/add-job', name: 'AddJob', component: AddJob },
    { path: '/jobs/:id/edit', name: 'EditJob', component: EditJob },
    { path: '/edit/:id', name: 'EditUser', component: EditUser },
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

    if (to.name === 'AddJob' && userRole !== 'CLIENT') {
        alert('Alleen clients mogen jobs toevoegen.');
        next({ name: 'JobsView' });
    } else if (to.name === 'EditJob' && userRole !== 'CLIENT') {
        alert('Alleen clients mogen jobs bewerken.');
        next({ name: 'JobsView' });
    } else {
        next();
    }
});

export default router;
