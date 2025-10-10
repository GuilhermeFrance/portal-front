T<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { User } from "../interfaces/UserInterface";
import axios from "axios";
import UserModal from "./UserModal.vue";
import UserModaEdit from "./UserModalEdit.vue";
import { Trash, UserPen, ChevronRight, ChevronLeft, UserPlus } from "lucide-vue-next";


const isModalOpen = ref(false);
const isModalEditOpen = ref(false);
const API_URL = "http://localhost:3000/users";
const users = ref<User[]>([]);
const userToEdit = ref<User | null>(null)
const currentPage = ref(1);
const itemsPerPage = ref(8);
const totalItems = ref(0);
const totalPages = ref(0);

function OpenModal() {
  isModalOpen.value = true;
}

function CloseModal() {
  isModalOpen.value = false;
}

function OpenModalEdit(user: User){
  userToEdit.value = user
  isModalEditOpen.value = true;
}
function CloseEditModal() {
  isModalEditOpen.value = false;
}
function handleUserUpdated() {
    CloseModal();
    fetchUser(); // Recarrega os dados para mostrar as mudanças
}

async function deleteUser(userId: number) {
  if (!confirm(`Tem certeza que deseja remover o usuário ${userId}?`)) {
    return;
  }
  try {
    await axios.delete(`${API_URL}/${userId}`);
    users.value = users.value.filter((user) => user.id !== userId);
  } catch (error) {
    alert("Erro ao excluir");
    fetchUser();
  }
}

function handleUsersCreated() {
  CloseModal();
  fetchUser();
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchUser(); // Busca os novos dados
  }
}

async function fetchUser() {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        page: currentPage.value,
        limit: itemsPerPage.value,
      },
    });
    users.value = response.data.data;
    totalItems.value = response.data.total;
    totalPages.value = response.data.lastPage;
  } catch (err) {
    console.log("Erro ao carregar os dados");
  }
}
onMounted(fetchUser);
</script>

<template>
  <section>
    <UserModal
      v-if="isModalOpen"
      @close="CloseModal"
      @user-created="handleUsersCreated"
    />
    <UserModalEdit
      v-if="isModalEditOpen"
    />
    <div>
      <div class="header">
        <h2>FUNCIONÁRIOS:</h2>
        <button @click="OpenModal" class="btn-add">
          <UserPlus/>Adicionar 
        </button>
      </div>

      <div class="card">
        <div class="table" v-if="users.length >= 1">
          <table v-if="users.length" id="users">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Cargo</th>
                <tH></tH>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.cpf }}</td>
                <td>{{ user.role ? user.role.name : "N/A" }}</td>
                <td>
                  <div class="icons">
                   
                    <UserPen class="edit-i" @click="OpenModalEdit(user)" title="editar usuario"/>
                     <Trash
                      class="delete-i"
                      alt="excluir funcionário"
                      @click="deleteUser(user.id)"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="display: flex; justify-content: center;
        align-items: center; align-content: center; margin-top: 250px; font-size: 20px; font-weight: 200;" v-else> Nenhum registro econtrado. </div>
      </div>

      <div class="tfoot-div">
        <div class="pagination-info" v-if="users.length >= 1">
          <span style="font-weight: 200">
            Pagina <span style="font-weight: 400">{{ currentPage }}</span> de
            <span>{{ totalPages }}</span></span
          >
          <span>
            <span style="font-weight: 400">({{ totalItems }} resultados)</span>
          </span>
        </div>
        <div class="pagination-btns" v-if="users.length >= 1">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
          >
            <ChevronLeft />
          </button>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
          >
            <ChevronRight />
          </button>
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
  border-radius: 20px 20px 0px 0px;
  box-shadow: 1px 10px 10px rgb(179, 179, 179);
}

.header {
  display: flex;
  flex-direction: row;
  width: 900px;
  justify-content: space-between;
  margin-bottom: 10px;
}

.btn-add {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 150px;
  height: 50px;
  border-radius: 10px;
  font-weight: bolder;
  color: white;
  background-color: #0ac7e0;
  border: none;
  font-size: 15px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.24);
  font-family: "Inter", sans-serif;
  padding: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-add:hover {
  background-color: #0999ac;
  transition: 0.3s;
}
.pagination-btns {
  display: flex;
  gap: 3px;
  margin: 10px;
}
.pagination-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 250px;
  margin-left: 20px;
}
.table {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.delete-i {
  margin-top: 10px;
  color: rgb(194, 0, 0);
  height: 20px;
  width: 20px;
  cursor: pointer;
}
.edit-i {
  margin-top: 10px;
  color: rgb(0, 15, 83);
  width: 20px;
  cursor: pointer;
}
.icons {
  display: flex;
  gap: 4px;
}
.tfoot-div button {
  border: 1px solid rgba(128, 128, 128, 0.226);
  border-radius: 4px;
  cursor: pointer;
}
.tfoot-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 880px;
  padding: 10px;
  background-color: white;
  height: 40px;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 1px 10px 10px rgb(179, 179, 179);
  border-top: 1px solid rgba(128, 128, 128, 0.199);
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 10px 20px;
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
