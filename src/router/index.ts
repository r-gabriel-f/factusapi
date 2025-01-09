import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'Login' }, // Redirige automáticamente a Login
    },

    {
      path: '/login',
      name: 'Login',
      component: Login, // Asegúrate de usar la ruta '/login' para Login
    },

    {
      path: '/facturacion',
      name: 'Facturacion',
      component: () => import('../components/Facturacion.vue'),
    },
  ],
});

export default router;
