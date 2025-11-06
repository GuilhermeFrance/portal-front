<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { User } from "../interfaces/UserInterface";
import axios from "axios";
import UserModal from "./UserModal.vue";

import {
  Trash,
  UserPen,
  ChevronRight,
  ChevronLeft,
  UserPlus,
  Eraser,
} from "lucide-vue-next";
import UserModalEdit from "./UserModalEdit.vue";
import { useAuthStore } from "../auth/stores/auth";
import type { Role } from "../interfaces/RoleInterface";
import { debounce } from "vuetify/lib/util/helpers.mjs";

const isModalOpen = ref(false);
const isModalEditOpen = ref(false);
const API_URL = "http://localhost:3000/users";
const API_ROLES = "http://localhost:3000/allroles";
const roles = ref<Role[]>([]);
const users = ref<User[]>([]);
const userToEdit = ref<User | null>(null);
const currentPage = ref(1);
const itemsPerPage = ref(9);
const totalItems = ref(0);
const totalPages = ref(0);
const isLoading = ref(true);
const authStore = useAuthStore();

const search = ref("");
const roleId = ref<number | null>(null);

const debouncedFetch = debounce(() => {
  currentPage.value = 1;
  fetchUser();
}, 450);

watch([search, roleId], () => {
  debouncedFetch();
});

console.log(authStore.decodedPayload);
console.log(authStore.hasBadge("admin"));

function OpenModal() {
  isModalOpen.value = true;
}

function CloseModal() {
  isModalOpen.value = false;
}

function formatCpf(cpfValue: string): string {
  if (!cpfValue) {
    return "N/A";
  }
  const cleanedCpf = cpfValue.replace(/[^\d]/g, "").substring(0, 11);
  return cleanedCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
function OpenModalEdit(user: User) {
  userToEdit.value = user;
  isModalEditOpen.value = true;
}
function CloseEditModal() {
  isModalEditOpen.value = false;
}
function handleUserUpdated() {
  CloseEditModal();
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
  } finally {
  }
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchUser(); // Busca os novos dados
  }
}

async function fetchUser() {
  isLoading.value = true;
  console.log("Filtros enviados:", {
    page: currentPage.value,
    limit: itemsPerPage.value,
    filter: search.value,
    roleId: roleId.value,
  });
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        page: currentPage.value,
        limit: itemsPerPage.value,
        filter: search.value,
        roleId: roleId.value,
      },
    });
    users.value = response.data.data;
    totalItems.value = response.data.total;
    totalPages.value = response.data.lastPage;
  } catch (err) {
    console.log("Erro ao carregar os dados");
  } finally {
    isLoading.value = false;
  }
}

async function fetchRoles() {
  try {
    const response = await axios.get<Role[]>(API_ROLES);
    roles.value = response.data;
  } catch (error) {}
}
onMounted(() => {
  fetchUser();
  fetchRoles();
});
</script>

<template>
  <section>
    <UserModal
      v-if="isModalOpen"
      @close="CloseModal"
      @user-created="handleUserUpdated"
    />
    <UserModalEdit
      v-if="isModalEditOpen"
      :initialUser="userToEdit"
      @close="CloseEditModal"
      @user-updated="handleUserUpdated"
    />
    <div>
      <div class="header">
        <h2>FUNCIONÁRIOS:</h2>
        <div
          style="
            display: flex;
            align-items: center;
            width: 640px;
            justify-content: space-between;
          "
        >
          <div style="display: flex; align-items: center; gap: 8px">
            <input
              class="app-filter"
              type="text"
              v-model="search"
              placeholder="Busque por id, nome ou CPF"
            />
            <button
              @click="
                () => {
                  search = '';
                  roleId = null;
                  fetchUser();
                }
              "
              class="btn-add"
              style="height: 44px; width: 50px; background: #0079ff"
            >
              <Eraser />
            </button>
          </div>
          <div>
            <select
              v-model.number="roleId"
              style="
                height: 50px;
                border-radius: 8px;
                padding: 4px;
                background-color: white;
                border: 1px solid gainsboro;
                font-size: 16px;
              "
            >
              <option value="null">Todos os cargos</option>
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}
              </option>
            </select>
          </div>

          <button
            @click="OpenModal"
            class="btn-add"
            v-if="authStore.hasBadge('admin')"
          >
            <UserPlus />Adicionar
          </button>
        </div>
      </div>

      <div class="card">
        <div v-if="isLoading" class="loading-overlay">
          <v-progress-circular
            indeterminate
            color="primary"
            size="44"
          ></v-progress-circular>
        </div>
        <div class="content-wrapper" v-else>
          <div class="table" v-if="users.length >= 1">
            <table v-if="users.length" id="users">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Cargo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.publicId }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ formatCpf(user.cpf) }}</td>
                  <td>{{ user.role ? user.role.name : "N/A" }}</td>
                  <td>
                    <div class="icons">
                      <UserPen
                        class="edit-i"
                        @click="OpenModalEdit(user)"
                        title="editar usuario"
                      />
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
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              align-content: center;
              margin-top: 250px;
              font-size: 20px;
              font-weight: 200;
            "
            v-else
          >
            Nenhum registro econtrado.
          </div>

          <div class="tfoot-div">
            <div class="pagination-info" v-if="users.length >= 1">
              <span style="font-weight: 200">
                Pagina
                <span style="font-weight: 400">{{ currentPage }}</span> de
                <span>{{ totalPages }}</span></span
              >
              <span>
                <span style="font-weight: 400"
                  >({{ totalItems }} resultados)</span
                >
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
.app-filter {
  height: 40px;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 6px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  border: 1px solid gainsboro;
}
.app-filter::placeholder{
  opacity: 50%;
  font-weight: 200;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.loading-overlay {
  position: absolute;
  height: 480px;
  width: 1040px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 10px 10px;
  background-color: rgba(255, 255, 255);

  z-index: 10;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  align-items: flex-start;
  height: 480px;
  width: 1040px;
  background-color: white;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 1px 10px 10px rgb(179, 179, 179);
}

.header {
  display: flex;
  flex-direction: row;
  width: 1040px;
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
  background-color: #0079ff;
  border: none;
  font-size: 15px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.24);
  font-family: "Inter", sans-serif;
  padding: 6px;
  cursor: pointer;
  font-weight: 500;
}
.btn-add:hover {
  background-color: #1b61f7;
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
  margin-top: 5px;
  color: rgb(194, 0, 0);
  height: 20px;
  width: 20px;
  cursor: pointer;
  transition: 0.2s;
}
.edit-i {
  margin-top: 5px;
  color: rgb(0, 15, 83);
  width: 20px;
  cursor: pointer;
  transition: 0.2s;
}
.delete-i:hover {
  color: red;
}
.edit-i:hover {
  color: rgb(1, 5, 204);
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
  width: 1020px;
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
  padding: 5px 20px;
  text-align: left; /* Alinha o texto à esquerda nas células */
}

thead th {
  border-bottom: 2px solid #00000049;
}
tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
tbody tr:hover {
  background-color: #f1f1f167;
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
