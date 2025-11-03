import { createRouter, createWebHistory } from "vue-router";
import EmployeePage from "../pages/EmployeePage.vue";
import RequestPage from "../pages/RequestsPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import HomePage from "../pages/HomePage.vue";
import FormPage from "../pages/FormPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import DashBoardLayout from "../components/DashBoardLayout.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import NotFound from "../pages/NotFound.vue";
import { useAuthStore } from "../auth/stores/auth";


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
        requiresAuth: true,
        title: "Faça Login ou Cadastre-se",
      },
      children: [
        {
          path: "/inicio",
          name: "home",
          component: HomePage,
          meta: {
            requiresAuth: true,
            title: "Página Inicial",
          },
        },
        {
          path: "/solicitacoes",
          name: "solicitacoes",
          component: RequestPage,
          meta: {
            requiresAuth: true,
            title: "Solicitações",
          },
        },
        {
          path: "/funcionarios",
          name: "funcionarios",
          component: EmployeePage,
          meta: {
            requiresAuth: true,
            title: "Funcionários",
          },
        },
        {
          path: "/perfil",
          name: "profile",
          component: ProfilePage,
          meta: {
            requiresAuth: true,
            title: "Perfil",
          },
        },
        {
          path: "/solicite",
          name: "form-request",
          component: FormPage,
          meta: {
            requiresAuth: true,
            title: "Faça uma solicitação",
          },
        },
        {
          path: "/:pathMatch(.*)*", 
          name: "NotFound",
          component: NotFound,
          meta: {
            title: "404 - Pagina nao encontrada"
          }
        },
      ],
    },
  ],
});



router.beforeEach(async (to) => {
  const title = to.meta.title as string;
  document.title = title ? title : "Portal";
  
  const authStore = useAuthStore();
  await authStore.initializeAuth();
  const requiresAuth = to.meta.requiresAuth === true;
  if(requiresAuth && !authStore.token){
    return {name: 'Login', query: {redirect: to.fullPath}}
  }
  if(authStore.token && to.name === 'Login'){
    const redirect = (to.query.redirect as string) ?? { name: 'home'}
    return redirect;
  }
});

export default router;
