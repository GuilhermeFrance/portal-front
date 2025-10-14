<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Type } from "../interfaces/TypeRequest";
import axios from "axios";
import type { NewRequestDto } from "../interfaces/NewRequestDto";

const API_REQUESTS_URL = "http://localhost:3000/requests";

const createInitialRequest = (): NewRequestDto => ({
  name: "",
  description: "",
  adress: "",
  typeId: null,
});

const newRequest = ref<NewRequestDto>(createInitialRequest());

const emit = defineEmits(["close", "request-created"]);

const API_URL_TYPES = "http://localhost:3000/v1/types";
const types = ref<Type[]>([]);

function resetForm(){
    newRequest.value=createInitialRequest()
}

function handleRoleChange(e: Event) {
  const target = e.target as HTMLSelectElement;

  const newTypeId = parseInt(target.value, 10);

  newRequest.value.typeId = newTypeId;
}
async function fetchRequest() {
  try {
    const response = await axios.get<Type[]>(API_URL_TYPES);
    types.value = response.data;
  } catch (err) {
    console.log("Erro ao carregar dados");
  }
}

function handleClose() {
  emit("close");
}


async function handleSubmit() {
  if (
    !newRequest.value.name ||
    !newRequest.value.adress ||
    !newRequest.value.typeId ||
    !newRequest.value.description
  ) {
    alert("Preencha todos os campos obrigatórios");
    return
  }

  try {
    const response = await axios.post(API_REQUESTS_URL, newRequest.value);
    console.log("Solicitacao criada com sucesso");
    emit("request-created");
    resetForm()
   
    alert("Solicitação criada com sucesso")
  } catch (error) {
    console.log("Erro na criação da solicitacao");
  }
}
onMounted(fetchRequest)
</script>

<template>
  <section>
    <div class="form">
      <div class="header">
        <span>Faça uma solicitação</span>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-items">
          <div class="form-item">
            <label for="input">Título:</label>
            <input
              class="form-input"
              placeholder="Adicione um título para sua solicitação"
              type="text"
              v-model="newRequest.name"
              required
            />
          </div>
          <div class="form-item">
            <label for="input">Endereço:</label>
            <input
              class="form-input"
              placeholder="Informe o endereço para suporte"
              type="text"
              v-model="newRequest.adress"
              required
            />
          </div>
       
          <div class="form-item">
            <label for="input">Título:</label>
            <select
              name=""
              id="cargo"
              :value="newRequest.typeId"
              @change="handleRoleChange"
              required
            >
              <option value="null" disabled>Selecione um cargo</option>
              <option v-for="type in types" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </div>
          <div class="form-item">
            <label for="input">Descrição:</label>
            <textarea
              class="form-input-text"
              placeholder="Descreva o motivo do pedido..."
              name=""
              id=""
              v-model="newRequest.description"
              required
            ></textarea>
          </div>
        </div>
        <div class="form-btns">
          <button class="send">Enviar</button>
          <button class="cancel">Cancelar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

.header{
    font-family: 'Inter',sans-serif;
    font-size: 26px;
    margin-bottom: 60px;
    font-weight: 700;
   
}
section {
  display: flex;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
select{
    height: 40px;
    border: 1px solid rgba(20, 17, 0, 0.158);
    border-radius: 8px;
    background-color: white;
    font-size: 15px;
     padding-left: 10px;
}
.form {
  padding: 30px;
  width: 700px;
  height: 620px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 2px 15px 2px rgba(112, 112, 112, 0.521);
}
.form-items {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.form-item {
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 9px;
}
.form-input {
  border: 1px solid rgba(20, 17, 0, 0.158);
  height: 30px;
  border-radius: 10px;
  font-size: 16px;
   padding-left: 10px;
}
.form-input-adress {
  border: 1px solid rgba(20, 17, 0, 0.158);
  height: 30px;
  border-radius: 10px;
}
.form-input-text::placeholder {
  font-style: italic;
  font-family: "Inter", sans-serif;
  padding-left: 10px;
  color: rgb(190, 190, 190);
}
.form-input::placeholder {
  font-style: italic;
  font-family: "Inter", sans-serif;
  padding-left: 10px;
  color: rgb(190, 190, 190);
}
.form-input-text {
  border: 1px solid rgba(20, 17, 0, 0.158);
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;
  height: 140px;
  resize: vertical;
  font-size: 16px;
  font-family: "Inter", sans-serif;
}
label {
  font-weight: 600;
}
.form-btns {
  display: flex;
  justify-content: flex-end;
  height: 50px;
  gap: 40px;
}

button {
  width: 100px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
}
.send {
  background-color: rgb(57, 57, 255);
  color: white;
  transition: 0.3s;
}
.cancel {
  background-color: rgb(53, 53, 53);
  color: white;
  transition: 0.3s;
}
.send:hover {
  background-color: rgb(17, 17, 218);
}
.cancel:hover {
  background-color: rgb(10, 10, 10);
}
</style>
