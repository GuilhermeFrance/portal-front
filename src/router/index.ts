import { createRouter, createWebHistory } from "vue-router";
import EmployeePage from "../pages/EmployeePage.vue";
import RequestPage from "../pages/RequestsPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import HomePage from "../pages/HomePage.vue";
import FormPage from "../pages/FormPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import DashBoardLayout from "../components/DashBoardLayout.vue";
import RegisterPage from "../pages/RegisterPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: LoginPage,
      meta: {
        title: "Faça Login ou Cadastre-se",
      },
    },
     {
      path: "/signup",
      name: "Register",
      component: RegisterPage,
      meta: {
        title: "Cadastre-se",
      },
    },
    {
      path: "/",
      redirect: { name: "Login" },
    },
    {
      path: "/app",
      name: "AppLayout",
      component: DashBoardLayout,
      meta: {
        title: "Faça Login ou Cadastre-se",
      },
      children: [
        {
          path: "/inicio",
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
          path: "/perfil",
          name: "profile",
          component: ProfilePage,
          meta: {
            title: "Perfil",
          },
        },
        {
          path: "/solicite",
          name: "form-request",
          component: FormPage,
          meta: {
            title: "Faça uma solicitação",
          },
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string;
  document.title = title ? title : "Portal";

  next();
});

export default router;
