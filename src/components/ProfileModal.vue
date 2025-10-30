<script setup lang="ts">
import { ref, watch, type PropType } from "vue";
import axios from "axios";
import type { UpdateProfileDto } from "../interfaces/UpdateProfileDto";
import { X } from "lucide-vue-next";
import type { ClientModel } from "../auth/models/ClientModel";
import { useAuthStore } from "../auth/stores/auth";

const props = defineProps({
  initialProfile: {
    type: Object as PropType<ClientModel | null >,
    required: true,
  },
});

const authStore = useAuthStore();

const editedProfile = ref<UpdateProfileDto>({
  name: "",
  email: "",
  cpf: "",
});

const emit = defineEmits(["close", "profile-updated"]);

const API_CLIENTS_URL = "http://localhost:3000/clients";

const formError = ref<string | null>(null);

watch(
  () => props.initialProfile,
  (newVal) => {
    if (newVal) {
      editedProfile.value = {
        name: newVal.name ?? "",
        email: newVal.email ?? "",
        cpf: (newVal as any).cpf ?? "",
      };
    }else {
      editedProfile.value = { name: "", email: "", cpf: ""}
    }
  },
  { immediate: true }
);

function handleClose() {
  if(!confirm("Tem certeza que deseja cancelar a operação?")){
  return 
  }else{
    emit("close")
  }
  
}


async function handleSubmit() {
  formError.value = null;

  const clientId = props.initialProfile?.id;

  if (!clientId) {
    formError.value = "Erro: ID da solicitacao nao encontrado para edicao";
    return;
  }

  try {
    await axios.patch(`${API_CLIENTS_URL}/${clientId}`, editedProfile.value);
    console.log("Usuário editado com sucesso");
    alert("Usuário editado com sucesso")
    emit("profile-updated");
    window.location.reload()

  } catch (error) {
    formError.value = "Falha na atualização. Verifique os dados.";
  }
}
</script>

<template>
  <div class="modal-background" @click.self="handleClose">
    <div class="modal-content">
      <header>
        <h3>Solicitacao {{ initialProfile?.id }}</h3>
        <button class="closeModal" @click="handleClose"><X /></button>
      </header>

      <div class="infos-box">
        <form @submit.prevent="handleSubmit">
          <div class="infos">
            <label for="span"> Nome: </label>
            <input class="info-box" type="text" v-model="editedProfile!.name">
          </div>
          <div class="infos">
            <label for="span"> Endereço: </label>
            <span class="info-box">{{ initialProfile?.email }}</span>
          </div>
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
  width: 940px;
  margin-bottom: 20px;
}
label {
  font-size: 17px;
}
.infos {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.info-box {
  font-size: 16px;
  font-weight: 500;
  background-color: rgba(221, 221, 221, 0.315);
  height: 30px;
  border: 1px solid rgba(0, 0, 0, 0.322);
  display: flex;
  align-items: flex-end;
  padding: 6px;
  border-radius: 8px;
}
.infos-box {
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: center;
  width: 940px;
}
.info-box-desc {
  font-weight: 300;
  border: 1px solid rgba(0, 0, 0, 0.322);
  background-color: rgba(221, 221, 221, 0.315);
  height: 80px;
  display: flex;
  align-items: flex-start;
  padding: 6px;
  border-radius: 8px;
}
.modal-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 320px;
  width: 1000px;
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
  background-image: linear-gradient(rgb(11, 41, 212), rgb(9, 45, 206));
  border: none;
}

.btn-save:hover {
  background-image: linear-gradient(
    rgba(36, 13, 241, 0.678),
    rgba(0, 15, 231, 0.904)
  );
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
