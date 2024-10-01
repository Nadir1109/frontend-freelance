import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import Register from '@/components/Register.vue';
import UserList from '@/components/UserList.vue';
import EditUser from '@/components/EditUser.vue';

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/register', name: 'Register', component: Register },
    { path: '/users', name: 'UserList', component: UserList },
    { path: '/edit/:id', name: 'EditUser', component: EditUser }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
