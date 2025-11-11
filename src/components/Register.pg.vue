<script setup lang="ts">
import { ChevronDown, ChevronUp, Dices, Eye, EyeOff } from "lucide-vue-next";
import { ref } from "vue";
import type { NewClientDto } from "../interfaces/NewClientDto";
import axios from "axios";
import { useRouter } from "vue-router";
import UsersPicks from "./UsersPicks.vue";
import { useAuthStore } from "../auth/stores/auth";
import UsersPickCreate from "./UsersPickCreate.vue";
import { useAlertStore } from "../auth/stores/alertStore";

const authStore = useAuthStore();
const router = useRouter();
const isModalPickAvatarOpen = ref(false);
const isSectionPickAvatarOPen = ref(false)
const alertStore = useAlertStore();

function handleSectionPick(){
  isSectionPickAvatarOPen.value = !isSectionPickAvatarOPen.value
}
function openModalPick() {
  isModalPickAvatarOpen.value = true;
}
function closeModalPick() {
  isModalPickAvatarOpen.value = false;
}

const NewClient = ref<NewClientDto>({
  firstName: "",
  surname: "",
  cpf: "",
  email: "",
  password: "",
  profileImageId: 1,
});

const isPasswordVisible = ref(false);

function handlePasswordVisible() {
  isPasswordVisible.value = !isPasswordVisible.value;
}

const API_CLIENT_URL = "http://localhost:3000/clients/register";

const formError = ref<string | null>(null);

function handleUrlImage() {
  switch(NewClient.value.profileImageId){
    case 1: return 'http://localhost:3000/avatars/id/1'
    case 2: return 'http://localhost:3000/avatars/id/2'
    case 3: return 'http://localhost:3000/avatars/id/3'
    case 4: return 'http://localhost:3000/avatars/id/4'
    case 5: return 'http://localhost:3000/avatars/id/5'
    case 6: return 'http://localhost:3000/avatars/id/6'
  }
  
}
function handleAvatarSelected(avatarData: {id: number, url: string}){
  NewClient.value.profileImageId = avatarData.id;
  closeModalPick()
  console.log('Avatar selecionado: ', avatarData.id)
}
async function handleSubmit() {
  if (
    !NewClient.value.firstName ||
    !NewClient.value.surname ||
    !NewClient.value.cpf ||
    !NewClient.value.email ||
    !NewClient.value.password
  ) {
    return (formError.value = "Preencha todos os campos obrigatórios");
  }
  const cleanedCpf = NewClient.value.cpf.replace(/[^\d]/g, "");
  if (cleanedCpf.length !== 11) {
    formError.value = "CPF deve ter 11 dígitos.";
    return;
  }
  try {
    await axios.post(API_CLIENT_URL, NewClient.value);
    alertStore.showAlert("Usuário criado com sucesso!", 'success', 4000)
    router.push("/login");
  } catch (error) {
    console.log("Erro na criação do funcionário");
  }
}
</script>

<template>
  <UsersPickCreate v-if="isModalPickAvatarOpen" @close-pick="closeModalPick"
  @avatar-selected="handleAvatarSelected" />
  <section>
    <div class="card-register">
      <div class="header">
        <span class="title"> <Dices /> Criar uma nova conta</span>
        <span class="subtitle">é rápido e fácil.</span>
      </div>
      <div class="register-inputs">
        <form @submit.prevent="handleSubmit">
          <div class="names">
            <div class="register-input-name">
              <label for="input">Nome:</label>
              <input
                placeholder="Insira seu nome completo"
                type="text"
                v-model="NewClient.firstName"
              />
            </div>
            <div class="register-input-name">
              <label for="input">Sobrenome:</label>
              <input
                placeholder="Insira seu nome completo"
                type="text"
                v-model="NewClient.surname"
              />
            </div>
          </div>

          <div class="register-input">
            <label for="input">CPF:</label>
            <input
              placeholder="Insira seu CPF (somente números)"
              type="text"
              v-model="NewClient.cpf"
            />
          </div>
          <div class="register-input">
            <label for="input">Email:</label>
            <input
              placeholder="Insira seu email"
              type="text"
              v-model="NewClient.email"
            />
          </div>
          <div class="register-input">
            <label for="input">Senha:</label>
            <div class="input-sub">
              <div class="password-wrapper">
                <input
                  placeholder="Nova senha"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  v-model="NewClient.password"
                />
                <span class="toggle-password" @click="handlePasswordVisible">
                  <Eye v-if="isPasswordVisible" />
                  <EyeOff v-else />
                </span>
              </div>
              <p class="subtitleinp">
                (A senha deve conter no mínimo uma letra maiúscula e um
                caractere especial)
              </p>
            </div>
          </div>
          <div style="width: 800px; height: 1px; background-color: gainsboro;"></div>
          <div class="header-avatar-pick"> 
            <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 10px;">
            <span>Avatar:</span>
            <ChevronDown @click="handleSectionPick" v-if="isSectionPickAvatarOPen"/>
            <ChevronUp @click="handleSectionPick" v-else />
            </div>
            <Transition name="expand">
            <div class="avatar-section" v-if="isSectionPickAvatarOPen">
              <img
                style="width: 18%"
                :src="handleUrlImage()"
              />
              <button @click="openModalPick" class="btn-change-avatar">
                Escolher avatar
              </button>
            </div>
            </Transition>
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
  display: grid;
  place-items: center;
 padding-top: 150px;
  align-content: center;
  background-image: radial-gradient(
    farthest-corner at 40px 40px,
    #33f1ff 0%,
    #4433ee 100%
  );
  min-height: 100vh;
  padding: 0px;
  
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
.avatar-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-avatar-pick{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out, opacity 0.3s ease-in-out;
}
.btn-change-avatar {
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid rgb(204, 204, 204);
  font-weight: 600;
  cursor: pointer;
  transition: 0.4s;
}
.btn-change-avatar:hover {
  background-color: #3633ff;
  border: 1px solid #3633ff;
  color: #ffffff;
}
.expand-enter-from,
.expand-leave-to{
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
.expand-enter-to,
.expand-leave-from{
  max-height: 300px;
  opacity: 1;
  transform: translateY(0px);
}
.expand-enter-active,
.expand-leave-active{
  transition:  all 0.4s ease-in-out;
}
.card-register {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 900px;
  min-height: 580px;
  max-height: none;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 2px 2px 15px 2px rgba(146, 146, 146, 0.315);
}
.names {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.register-input {
  display: flex;
  flex-direction: column;
  width: 800px;
  gap: 6px;
}
.register-input-name {
  display: flex;
  flex-direction: column;
  width: 390px;
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
.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 800px;
}
.password-wrapper input {
  padding-right: 40px;
  width: 800px;
}
.toggle-password {
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #777;
  display: flex;
  height: 100%;
  align-items: center;
  user-select: none;
}

.toggle-password:hover {
  color: #333;
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
