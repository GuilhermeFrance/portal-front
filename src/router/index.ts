import { createRouter, createWebHistory } from 'vue-router'
import EmployeePage from '../pages/EmployeePage.vue'
import TablePage from '../pages/TablePage.vue'
import RequestPage from '../pages/RequestsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TablePage 
    },
     {
      path: '/solicitacoes',
      name: 'solicitacoes',
      component: RequestPage 
    },
    {
      path: '/funcionarios',
      name: 'funcionarios',
      component: EmployeePage 
    },
    
  ]
})

export default router