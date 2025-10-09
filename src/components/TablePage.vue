<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { User } from "../interfaces/UserInterface";
import axios from "axios";
import UserModal from "./UserModal.vue";

const isModalOpen = ref(false);

function OpenModal() {
  isModalOpen.value = true;
}

function CloseModal() {
  isModalOpen.value = false
}

function handleUsersCreated(){
  CloseModal()
  fetchUser()
}

const API_URL = "http://localhost:3000/users";
const users = ref<User[]>([]);

async function fetchUser() {
  try {
    const response = await axios.get<User[]>(API_URL);
    users.value = response.data;
  } catch (err) {
    console.log("Erro ao carregar os dados");
  }
}
onMounted(fetchUser);
</script>

<template>
  <section>
    <UserModal v-if="isModalOpen" @close="CloseModal" @user-created="handleUsersCreated"/>
    <div>
      <div class="header">
        <h2>FUNCIONÁRIOS:</h2>
        <button @click="OpenModal" class="btn-add">Adicionar Funcionário</button>
      </div>

      <div class="card">
        <div class="table">
          <table v-if="users.length">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Cargo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.cpf }}</td>
                <td>{{ user.role ? user.role.name : "N/A" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.card {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 500px;
  width: 900px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 1px 10px 10px rgb(179, 179, 179);
}

.header{
  display: flex;
  flex-direction: row;
  width: 900px;
  justify-content: space-between;
  margin-bottom: 10px;
}

.btn-add{
  width: 160px;
  border-radius: 10px;
  background-color: #f9f9f9;
  border: none;
  font-size: 14px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.24);
  font-family: 'Inter', sans-serif;
  padding: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-add:hover{
  background-color: #ffffff;
  transition: 0.1s;
}
.table {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 12px 15px;
  text-align: left; /* Alinha o texto à esquerda nas células */
}

thead th {
  border-bottom: 2px solid #27a9ff75;
}
tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
tbody tr:hover {
  background-color: #f2feff;
  transition: 0.2s; 
}
tbody td:nth-child(1) {
  width: 5%; 
}
tbody td:nth-child(2) {
  width: 35%; 
}
tbody td:nth-child(3) {
  width: 35%;
  font-weight: 300; 
}
tbody td:nth-child(4) {
  width: 25%;
  font-weight: 200; 
}
td {
  border-bottom: 2px solid rgba(139, 139, 139, 0.247);
}
h2 {
  margin-bottom: 20px;
}
</style>
