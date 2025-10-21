<script setup lang="ts">
import { Dices } from "lucide-vue-next";
import { ref } from "vue";
import type { NewClientDto } from "../interfaces/NewClientDto";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter()

const NewClient = ref<NewClientDto>({
  name: "",
  cpf: "",
  email: "",
  password: "",
});

const API_CLIENT_URL = "http://localhost:3000/register";

const formError = ref<string | null>(null);

async function handleSubmit() {
  if(!NewClient.value.name ||
  !NewClient.value.cpf  ||
  !NewClient.value.email||
  !NewClient.value.password) {
    return formError.value = "Preencha todos os campos obrigatórios"
  }
  const cleanedCpf = NewClient.value.cpf.replace(/[^\d]/g, "");
  if (cleanedCpf.length !== 11) {
    formError.value = "CPF deve ter 11 dígitos.";
    return;
  }
  try {
  await axios.post(API_CLIENT_URL, NewClient.value)
  console.log("Cliente criado com sucesso!")
  router.push("/login")
  } catch (error) {
  console.log("Erro na criação do funcionário")
  }
}

</script>

<template>
  <section>
    <div class="card-register">
      <div class="header">
        <span class="title"> <Dices /> Criar uma nova conta</span>
        <span class="subtitle">é rápido e fácil.</span>
      </div>
      <div class="register-inputs">
        <form @submit.prevent="handleSubmit">
          <div class="register-input">
            <label for="input">Nome:</label>
            <input placeholder="Insira seu nome completo" type="text" v-model="NewClient.name" />
          </div>
          <div class="register-input">
            <label for="input">CPF:</label>
            <input placeholder="Insira seu CPF (somente números)" type="text" v-model="NewClient.cpf"/>
          </div>
          <div class="register-input">
            <label for="input">Email:</label>
            <input placeholder="Insira seu email" type="text" v-model="NewClient.email" />
          </div>
          <div class="register-input">
            <label for="input">Senha:</label>
            <div class="input-sub">
              <input placeholder="Nova senha" type="password" v-model="NewClient.password"/>
              <p class="subtitleinp">
                (A senha deve conter no mínimo uma letra maiúscula e um
                caractere especial)
              </p>
            </div>
          </div>
          <footer>
            <div>
              <span href="" style="font-weight: 300">Já possui uma conta?</span>
              <RouterLink
                to="/login"
                class="link"
                style="text-decoration: none; color: blue; font-weight: 500"
              >
                Entrar
              </RouterLink>
            </div>

            <button type="submit" class="send-btn">Registrar</button>
          </footer>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

section {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background-image: radial-gradient(
    farthest-corner at 40px 40px,
    #33f1ff 0%,
    #4433ee 100%
  );
  height: 97.9vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
label {
  font-family: "Inter", sans-serif;
}
input {
  height: 36px;
  border-radius: 6px;
  border: 1px solid rgb(192, 192, 192);
  background-color: rgb(248, 248, 248);
  padding-left: 8px;
  font-size: 17px;
  font-family: "Inter", sans-serif;
}

input::placeholder {
  font-weight: 300;
  opacity: 60%;
}

footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
.card-register {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 900px;
  height: 600px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 2px 15px 2px rgba(146, 146, 146, 0.315);
}

.register-input {
  display: flex;
  flex-direction: column;
  width: 800px;
  gap: 6px;
}

.register-inputs {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.input-sub {
  display: flex;
  flex-direction: column;
  width: 800px;
}
.subtitleinp {
  color: rgb(165, 165, 165);
  margin-top: 2px;
  font-weight: 300;
  font-size: 14px;
}
.send-btn {
  background-color: #3633ff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  width: 120px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  transition: 0.3s;
  height: 40px;
}
.send-btn:hover {
  background-color: #1612fd;
}

.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 30px;
  font-family: "Inter", sans-serif;
  font-weight: 700;
}

.subtitle {
  font-weight: 200;
}
</style>
