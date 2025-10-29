import { defineStore } from "pinia";
import type { ClientModel } from "../models/ClientModel";
import { computed, ref } from "vue";
import axios from "axios";
import router from "../../router";

export const useAuthStore = defineStore("auth", () => {
  const alert = ref<string | null>(null);
  const clientLogin = ref<ClientModel>({
    email: "",
    password: "",
  });
  const currentUser = ref<ClientModel | null>(null);
  const token = ref<string | null>(localStorage.getItem("auth_token"));
  const isLoading = ref(false);

  const isAuthenticated = computed(() => !!currentUser.value);
  const API_URL_CLIENT = "http://localhost:3000/login";
  const API_URL_CURRIENT = "http://localhost:3000/clients";

  async function handleSubmitLogin() {
    if (!clientLogin.value.email || !clientLogin.value.password) {
      return (alert.value = "Preencha todos os campos obrigatórios");
    }
    try {
      isLoading.value = true;

      const response = await axios.post(API_URL_CLIENT, clientLogin.value);
      const authToken = response.data.acess_token || response.data;

      token.value = authToken;

      localStorage.setItem("auth_token", authToken);
      localStorage.setItem('user_email', clientLogin.value.email);

      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;

      await getCurrentUser();

      console.log(response);

      await router.push({ name: "home" });

      console.log("Login feito com sucesso!");

    } catch (error) {
      console.error("Erro na criação do funcionário", error);

      const backEndMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Falha ao salvar. Verifique o sevidor.";

      alert.value = Array.isArray(backEndMessage)
        ? backEndMessage.join(", ")
        : backEndMessage;
      console.log("Erro ao fazer login");
    } finally {
      isLoading.value = false;
    }
  }

  async function getCurrentUser() {
    if (!token.value) return;
    try {
        const userEmail = clientLogin.value.email || localStorage.getItem('user_email')
      const response = await axios.get(
        `${API_URL_CURRIENT}/${clientLogin.value.email}`
      );
      if(!userEmail) {
        console.log("Email não encontrado para buscar dados")
        await logout();
        return;
      }
      currentUser.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário", error);
      await logout();
    }
  }

  async function logout() {
    try {
      isLoading.value = true;
      token.value = null;
      currentUser.value = null;
      clientLogin.value = {
        email: "",
        password: "",
      };
      localStorage.removeItem("auth_token");
      delete axios.defaults.headers.common["Authorization"];
      alert.value = null;

      console.log("Logout realizado com sucesso!");
      await router.push({ name: "Login" });
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    } finally {
      isLoading.value = false;
    }
  }
  async function initializeAuth() {
  if(token.value) {
    try {
        await getCurrentUser()
    }
  
  }

  return {
    clientLogin,
    currentUser,
    token,
    isLoading,
    isAuthenticated,
    alert,
    handleSubmitLogin,
    logout,
    initializeAuth,
    getCurrentUser,
  };
});
