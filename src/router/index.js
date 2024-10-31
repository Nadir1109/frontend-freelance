import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import EditUser from '@/components/EditUser.vue';
import UsersView from "@/components/UsersView.vue";
import JobsOverview from "@/components/JobsOverview.vue";
import AddJob from '@/components/AddJob.vue';
import EditJob from "@/components/EditJob.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/users', name: 'UsersView', component: UsersView },
    { path: '/jobs', name: 'JobsView', component: JobsOverview },
    { path: '/add-job', name: 'AddJob', component: AddJob },
    { path: '/jobs/:id/edit', name: 'EditJob', component: EditJob },
    { path: '/edit/:id', name: 'EditUser', component: EditUser }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
