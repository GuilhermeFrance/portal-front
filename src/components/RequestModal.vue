<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from "vue";
import type { Role } from "../interfaces/RoleInterface";
import axios from "axios";
import type { NewUserDTO } from "../interfaces/NewUserDto";
import type { User } from "../interfaces/UserInterface";
import type { Type } from "../interfaces/TypeRequest";
import type { UpdateRequestDto } from "../interfaces/UpdateRequestDto";
import type { Request } from "../interfaces/RequestInterface";


const API_USERS_URL = "http://localhost:3000/users";

const props = defineProps({
  initialRequest: {
    type: Object as PropType<Request | null>,
    required: true,
  },
});

const editedRequest = ref<UpdateRequestDto>({
  name: "",
  description: "",
  adress: "",
  typeId: null,
  status: "ABERTO"
});

const emit = defineEmits(["close", "request-updated"]);

const API_TYPES_URL = "http://localhost:3000/v1/types";
const API_REQUESTS_URL = "http://localhost:3000/requests";

const types = ref<Type[]>([]);
const formError = ref<string | null>(null);

watch(() => props.initialRequest, (newVal) => {
  if(newVal){
  editedRequest.value = {
    name: newVal.name,
    description: newVal.description,
    adress: newVal.adress,
    typeId: newVal.typeId || null,
    status: newVal.status

    }
  }
}, { immediate: true });


async function fetchType() {
  try {
    const response = await axios.get<Type[]>(API_TYPES_URL);
    types.value = response.data;
  } catch (err) {
    console.log("Erro ao carregar os dados");
  }
}
function handleClose() {
  emit("close");
}

async function handleSubmit() {
  formError.value = null

  const requestId = props.initialRequest?.id

  if(!requestId){
    formError.value = "Erro: ID da solicitacao nao encontrado para edicao"
    return
  }

  try {
    await axios.patch(`${API_REQUESTS_URL}/${requestId}`, editedRequest.value)
    console.log('Solicitacao editada com sucesso')
    emit('request-updated')
  } catch (error) {
    formError.value = "Falha na atualização. Verifique os dados.";
  }
}
  
onMounted(fetchType);
</script>

<template>
  <div class="modal-background" @click.self="handleClose">
    <div class="modal-content">
      <header>
        <h3>Solicitacao {{ initialRequest?.id }}</h3>
        <button class="closeModal" @click="handleClose">X</button>
      </header>
      <div class="input-box">
        <form @submit.prevent="handleSubmit">
          

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
  color: white;
  background-color: rgb(243, 96, 96);
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
