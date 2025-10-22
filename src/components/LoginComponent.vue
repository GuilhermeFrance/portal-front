<script setup lang="ts">
import { ref } from "vue";
import type { LoginDto } from "../interfaces/LoginDto";
import { Eye, EyeClosed } from "lucide-vue-next";
import axios from "axios";

const NewLogin = ref<LoginDto>({
  email: "",
  password: "",
});
const formError = ref<string | null>(null);
const API_LOGIN_URL = "http://localhost:3000/login";

const isPasswordVisible = ref(false);

function handlePasswordVisible() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

async function handleSubmit() {
  if (!NewLogin.value.email || !NewLogin.value.password) {
    return "Preencha todos os campos obrigatorios";
  }
  try {
    const response = await axios.post(API_LOGIN_URL, NewLogin.value);
    console.log(response, "Login feito com sucesso!");
  } catch (error) {
    console.error("Erro na criação do funcionário", error);
    const backEndMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Falha ao salvar. Verifique o sevidor.";

    formError.value = Array.isArray(backEndMessage)
      ? backEndMessage.join(", ")
      : backEndMessage;
    console.log("Erro ao fazer login");
  }
}
</script>

<template>
  <section>
    <div class="main">
      <div class="side">
        <img
          src="../assets/codes.png"
          alt=""
          style="width: 760px; height: 1000px; opacity: 15%"
        />
      </div>
      <div class="login">
        <div class="input-box">
          <img
            src="../assets/Design sem nome (3).png"
            style="width: 60%"
            alt=""
          />
          <div class="input-area">
            <form @submit.prevent="handleSubmit">
              <div class="input">
                <label for="input">Email:</label>
                <input
                  type="text"
                  placeholder="Insira o seu e-mail"
                  v-model="NewLogin.email"
                />
              </div>
              <div class="input">
                <label for="input">Senha:</label>
                <div class="password-wrapper">
                  <input
                    :type="isPasswordVisible ? 'text' : 'password'"
                    placeholder="Insira a sua senha"
                    v-model="NewLogin.password"
                    id="password"
                  />
                  <span class="toggle-password" @click="handlePasswordVisible">
                    <Eye class="icon" v-if="isPasswordVisible" />
                    <EyeClosed class="icon" v-else />
                  </span>
                </div>
              </div>
              <div class="forgot">
                <a class="forgot-link" href="">Esqueci a senha</a>
              </div>
              <div class="login-btns">
                <button class="login-btn" type="submit">Entrar</button>
              </div>
            </form>
            <div class="signup-field">
              <span href="" style="font-weight: 300">Não tem cadastro? </span>
              <RouterLink class="signup" to="/signup">Cadastre-se</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");
section {
  font-family: "Inter", sans-serif;
}
input {
  height: 30px;
  border-radius: 6px;
  border: 1px solid rgba(58, 58, 58, 0.486);
  padding-left: 10px;
  font-size: 16px;
  font-family: "Inter", sans-serif;
}
input:focus {
  background-color: aliceblue;
}
input::placeholder {
  color: rgb(196, 196, 196);
}
form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100vh;
}

.side {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  height: 100vh;
  background: linear-gradient(#00c4cc, #4d40fe);
}
.logos {
  display: flex;
  justify-content: center;
  width: 600px;
}
.input {
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 6px;
}
.input-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  height: 480px;
  width: 600px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 2px 15px 2px rgba(124, 124, 124, 0.267);
}
.input-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.password-wrapper {
  position: relative;
  display: flex;
  width: 400px;
  align-items: center;
}
.password-wrapper input {
  width: 100%;
  align-items: center;
}
.toggle-password {
  position: absolute;
  right: 6px;
  cursor: pointer;
  color: #777;
  display: flex;
  height: 100%;
  align-items: center;
  user-select: none;
  transition: 0.4s;
}
.toggle-password:hover {
  color: black;
}
.icon {
  width: 90%;
}
.login-btns {
  display: flex;
  justify-content: center;
  width: 400px;
}
.login-btn {
  padding: 8px;
  width: 400px;
  border-radius: 6px;
  font-size: 16px;
  color: white;
  background-color: #3358ec;
  border: 2px solid #3358ec;
  transition: 0.4s;
  cursor: pointer;
}

.login-btn:hover {
  border: 2px solid #4b6fff;
}

.signup-field {
  display: flex;
  justify-content: center;
  gap: 6px;
}
.forgot {
  display: flex;
  justify-content: flex-end;
}
.signup {
  text-decoration: none;
  color: rgb(42, 77, 233);
  transition: 0.2s;
  font-weight: 500;
}
.signup:hover {
  text-decoration: underline;
}
.forgot-link {
  text-decoration: none;
  color: rgb(42, 77, 233);
}
.forgot-link:hover {
  text-decoration: underline;
}
</style>
