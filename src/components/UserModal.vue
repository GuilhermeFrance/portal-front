<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Role } from "../interfaces/RoleInterface";
import axios from "axios";
import type { NewUserDTO } from "../interfaces/NewUserDto";
import { X } from "lucide-vue-next";
import { useAlertStore } from "../auth/stores/alertStore";

const API_USERS_URL = "http://localhost:3000/users";
const alertStore = useAlertStore()
const newUser = ref<NewUserDTO>({
  name: "",
  email: "",
  cpf: "",
  roleId: null,
});

const emit = defineEmits(["close", "user-created", "user-updated"]);

const API_URL = "http://localhost:3000/allroles";
const roles = ref<Role[]>([]);
const formError = ref<string | null>(null);

function handleRoleChange(e: Event) {
  const target = e.target as HTMLSelectElement;

  const newRoleId = parseInt(target.value, 10);

  newUser.value.roleId = newRoleId;
}

async function fetchRole() {
  try {
    const response = await axios.get<Role[]>(API_URL);
    roles.value = response.data;
  } catch (err) {
    console.log("Erro ao carregar os dados");
  }
}
function handleClose() {
  emit("close");
}
async function handleSubmit() {
  if (
    !newUser.value.name ||
    !newUser.value.email ||
    !newUser.value.cpf ||
    !newUser.value.roleId
  ) {
    formError.value = "Preencha todos os campos obrigatórios";
    return;
  }
  const cleanedCpf = newUser.value.cpf.replace(/[^\d]/g, "");
  if (cleanedCpf.length !== 11) {
    formError.value = "CPF deve ter 11 dígitos.";
    return;
  }
  try {
    const response = await axios.post(API_USERS_URL, newUser.value);
    console.log("Funcionário criado com sucesso:", response.data);
    console.log("Tentativa de E-mail:", newUser.value.email);
    emit("user-created");
    alertStore.showAlert(`Funcionário(a) ${newUser.value.name} criado com sucesso`, 'success', 5000)
    handleClose();
  } catch (err) {
    console.error("Erro na criação do funcionário", err);
    const backEndMessage =
      axios.isAxiosError(err) && err.response?.data?.message
        ? err.response.data.message
        : "Falha ao salvar. Verifique o sevidor.";

    formError.value = Array.isArray(backEndMessage)
      ? backEndMessage.join(", ")
      : backEndMessage;

      alertStore.showAlert(formError.value, 'warning', 8000)
  }
}

onMounted(fetchRole);
</script>

<template>
  <div class="modal-background" @click.self="handleClose">
    <div class="modal-content">
      <header>
        <h3>Novo funcionário</h3>
        <button class="closeModal" @click="handleClose"><X /></button>
      </header>
      <div class="input-box">
        <form @submit.prevent="handleSubmit">
          <label for="input">Nome:</label>
          <input
            class="user-input"
            placeholder="Nome Completo"
            type="text"
            name=""
            id=""
            v-model="newUser.name"
            required
          />
          <label for="input">Email:</label>
          <input
            class="user-input"
            placeholder="Digite o seu email.."
            type="email"
            name=""
            id=""
            v-model="newUser.email"
            required
          />
          <label for="input">CPF:</label>
          <input
            class="user-input"
            placeholder="CPF sem '.' ou '-'"
            type="text"
            inputmode="numeric"
            name=""
            id=""
            v-model="newUser.cpf"
            required
          />
          <label for="input">Cargo:</label>
          <select
            id="cargo"
            :value="newUser.roleId"
            @change="handleRoleChange"
            required
          >
            <option value="null" disabled>Selecione um cargo</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>

          <footer>
            <button type="submit" class="btn-save">Salvar</button>
            <button @click="handleClose" class="btn-cancel">Cancelar</button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

* {
  font-family: "Inter", sans-serif;
}

.modal-background {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 500px;
}

.modal-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 470px;
  width: 550px;
  border-radius: 20px;
}

footer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  height: 30px;
  margin-top: 20px;
  gap: 10px;
}

.closeModal {
  color: rgb(151, 151, 151);
  font-size: 20px;
  background-color: rgb(255, 255, 255);
  border: none;
  border-radius: 20px;
  width: 30px;
  height: 30px;
  font-weight: 300;
  cursor: pointer;
}

.closeModal:hover {
  color: rgb(97, 97, 97);
  transition: 0.3s;
}

.input-box {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 500px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 100px;
}

footer button {
  height: 50px;
  background-color: rgb(255, 255, 255);
  border: none;
  border: 1px solid gray;
  border-radius: 10px;
  width: 120px;
  cursor: pointer;
}

.btn-save {
  font-weight: 800;
  color: white;
  background-image: linear-gradient(
    rgba(22, 169, 206, 0.678),
    rgba(29, 204, 195, 0.616)
  );

  border: none;
}

.btn-save:hover {
  background-image: linear-gradient(rgb(22, 169, 206), rgb(29, 204, 195));
  transition: 0.8s;
}

.btn-cancel {
  font-weight: 800;
  color: white;
  background-image: linear-gradient(
    rgba(102, 102, 102, 0.664),
    rgba(107, 107, 107, 0.692)
  );
  border: none;
}

.btn-cancel:hover {
  background-image: linear-gradient(rgb(102, 102, 102), rgb(107, 107, 107));
  transition: 0.8s;
}

.user-input {
  font-size: 16px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid black;
  padding-left: 10px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

select {
  height: 44px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.068);
  font-size: 15px;
}
</style>
