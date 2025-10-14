import { createRouter, createWebHistory } from "vue-router";
import EmployeePage from "../pages/EmployeePage.vue";
import RequestPage from "../pages/RequestsPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: {
        title: "Página Inicial",
      },
    },
    {
      path: "/solicitacoes",
      name: "solicitacoes",
      component: RequestPage,
      meta: {
        title: "Solicitações",
      },
    },
    {
      path: "/funcionarios",
      name: "funcionarios",
      component: EmployeePage,
      meta: {
        title: "Funcionários",
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
      meta: {
        title: "Perfil",
      },
    },
  ],

});

   router.beforeEach((to, from, next) => {
    const title = to.meta.title as string;
    if(title){
      document.title = title
    }else {
      document.title = 'Portal'
    }
    next()

    })

export default router;
