import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import Register from '@/components/Register.vue';
import EditUser from '@/components/EditUser.vue';
import UsersView from "@/components/UsersView.vue"; // Zorg dat dit overeenkomt met je bestandsnaam

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/register', name: 'Register', component: Register },
    { path: '/users', name: 'UsersView', component: UsersView }, // Correcte naam
    { path: '/edit/:id', name: 'EditUser', component: EditUser }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
