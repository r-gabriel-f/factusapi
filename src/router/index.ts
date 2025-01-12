import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },

    {
      path: '/verfacturas',
      name: 'VerFacturas',
      component: () => import('../components/facturas/FacturasTable.vue'),
    },
    {
      path: '/facturacion',
      name: 'Facturacion',
      component: () => import('../components/crearFactura/Facturacion.vue'),
    },
  ],
});

export default router;
