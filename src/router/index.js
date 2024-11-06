import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import EditUser from '@/components/EditUser.vue';
import JobsOverview from "@/components/JobsOverview.vue";
import AddJob from '@/components/AddJob.vue';
import EditJob from "@/components/EditJob.vue";
import RegisterUser from '@/components/RegisterUser.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/jobs', name: 'JobsView', component: JobsOverview },
    { path: '/add-job', name: 'AddJob', component: AddJob },
    { path: '/jobs/:id/edit', name: 'EditJob', component: EditJob },
    { path: '/edit/:id', name: 'EditUser', component: EditUser },
    { path: '/register', name: 'Register', component: RegisterUser }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
