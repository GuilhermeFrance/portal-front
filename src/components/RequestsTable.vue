<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Request } from "../interfaces/RequestInterface";
import axios from "axios";
import { Trash, ChevronRight, ChevronLeft } from "lucide-vue-next";
import RequestModal from "./RequestModal.vue";
import { useAuthStore } from "../auth/stores/auth";

const isLoading = ref(false);
const isModalOpen = ref(false);
const API_URL = "http://localhost:3000/requests/all";
const API_FOR_DELETE = "http://localhost:3000/requests"
const API_CURRENT_REQUEST_URL = "http://localhost:3000/requests/my-requests";
const requests = ref<Request[]>([]);
const userRequests = ref<Request[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const totalPages = ref(0);
const requestToEdit = ref<Request | null>(null);
const authStore = useAuthStore();

function OpenModalEdit(request: Request) {
  requestToEdit.value = request;
  isModalOpen.value = true;
}

function CloseModal() {
  requestToEdit.value = null;
  isModalOpen.value = false;
}

function handleRequestUpdated() {
  CloseModal();
  fetchRequest();
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    fetchRequest();
  }
}

function formatTime(dateTimeString: string | Date | undefined): string {
  if (!dateTimeString) return "N/A";

  try {
    const date = new Date(dateTimeString);
    if (isNaN(date.getTime())) {
      return "data invalida";
    }
    const dateparte = date.toLocaleDateString("pt-BR");

    return `${dateparte}`;
  } catch (e) {
    return "Erro de formatação";
  }
}

function limitDescription(text: string, maxLength: number): string {
  if (!text) {
    return "";
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
}

async function fetchRequest() {
  isLoading.value = true;
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        page: currentPage.value,
        limit: itemsPerPage.value,
      },
    });
    requests.value = response.data.data;
    totalItems.value = response.data.total;
    totalPages.value = response.data.lastPage;
    console.log(response.data.data[0]);
  } catch (err) {
    console.log("Erro ao carregar os dados");
  } finally {
    isLoading.value = false;
  }
}
async function fetchCurrentRequest() {
  isLoading.value = true;
  try {
    const token = authStore.token;
    const response = await axios.get(`${API_CURRENT_REQUEST_URL}`, {
      params: {
        page: currentPage.value,
        limit: itemsPerPage.value,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    userRequests.value = response.data.data;
    totalItems.value = response.data.total;
    totalPages.value = response.data.lastPage;
    console.log(response.data.data[0]);
  } catch (err) {
    console.log("Erro ao carregar os dados");
  } finally {
    isLoading.value = false;
  }
}
async function deleteRequest(requestId: number) {
  if (!confirm(`Tem certeza que deseja remover a solicitação ${requestId}?`)) {
    return;
  }
  try {
    await axios.delete(`${API_FOR_DELETE}/${requestId}`);
    requests.value = requests.value.filter(
      (request) => request.id !== requestId
    );
    fetchRequest();
  } catch (error) {
    alert("Erro ao excluir");
    fetchRequest();
  }
}
async function deleteCurrentRequest(requestId: number) {
  if (!confirm(`Tem certeza que deseja remover a solicitação ${requestId}?`)) {
    return;
  }
  try {
    await axios.delete(`${API_CURRENT_REQUEST_URL}/${requestId}`);
    userRequests.value = userRequests.value.filter(
      (userRequest) => userRequest.id !== requestId
    );
    fetchRequest();
  } catch (error) {
    alert("Erro ao excluir");
    fetchRequest();
  }
}
onMounted(() => {
  fetchRequest();
  fetchCurrentRequest();
});
</script>

<template>
  <section>
    <RequestModal
      v-if="isModalOpen"
      :initialRequest="requestToEdit"
      @close="CloseModal"
      @request-updated="handleRequestUpdated"
    />
    <div>
      <div class="header">
        <h2>Solititações:</h2>
      </div>

      <div
        class="card"
        v-if="authStore.hasBadge('admin') || authStore.hasBadge('manager')"
      >
        <div class="content-wrapper">
          <div v-if="isLoading" class="loading-overlay">
            <v-progress-circular
              indeterminate
              color="primary"
              size="44"
            ></v-progress-circular>
          </div>
          <div class="table" v-if="requests.length >= 1">
            <table v-if="requests.length" id="users">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Endereço</th>
                  <th>STATUS</th>
                  <th>Serviço</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="request in requests"
                  :key="request.id"
                  @click="OpenModalEdit(request)"
                >
                  <td>{{ request.id }}</td>
                  <td>{{ limitDescription(request.name, 18) }}</td>
                  <td>- {{ limitDescription(request.description, 37) }}</td>
                  <td>{{ limitDescription(request.adress, 19) }}</td>
                  <td>
                    <span
                      class="status-pill"
                      :class="{
                        isOpen: request.statusKey === 'aberto',
                        Processing: request.statusKey === 'processando',
                        Conclused: request.statusKey === 'concluido',
                        Rejected: request.statusKey === 'rejeitado',
                      }"
                    >
                      {{ request.statusKey ? request.status.name : "N/A" }}
                    </span>
                  </td>
                  <td>{{ request.type ? request.type.name : "N/A" }}</td>
                  <td>{{ formatTime(request.createdAt) }}</td>
                  <td>
                    <div class="icons" v-if="authStore.hasBadge('admin')">
                      <Trash
                        class="delete-i"
                        title="excluir funcionário"
                        @click.stop="deleteRequest(request.id)"
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
            <div class="pagination-info" v-if="requests.length >= 1">
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
            <div class="pagination-btns" v-if="requests.length >= 1">
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
      <!--TABELA DO USUARIO-->
      <div class="card" v-if="authStore.hasBadge('requester')">
        <div class="content-wrapper">
          <div v-if="isLoading" class="loading-overlay">
            <v-progress-circular
              indeterminate
              color="primary"
              size="44"
            ></v-progress-circular>
          </div>
          <div class="table" v-if="userRequests.length >= 1">
            <table v-if="userRequests.length" id="users">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Endereço</th>
                  <th>STATUS</th>
                  <th>Serviço</th>
                  <th>Data</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="request in userRequests"
                  :key="request.id"
                  @click="OpenModalEdit(request)"
                >
                  <td>{{ request.id }}</td>
                  <td>{{ limitDescription(request.name, 18) }}</td>
                  <td>- {{ limitDescription(request.description, 37) }}</td>
                  <td>{{ limitDescription(request.adress, 19) }}</td>
                  <td>
                    <span
                      class="status-pill"
                      :class="{
                        isOpen: request.statusKey === 'aberto',
                        Processing: request.statusKey === 'processando',
                        Conclused: request.statusKey === 'concluido',
                        Rejected: request.statusKey === 'rejeitado',
                      }"
                    >
                      {{ request.statusKey ? request.status.name : "N/A" }}
                    </span>
                  </td>
                  <td>{{ request.type ? request.type.name : "N/A" }}</td>
                  <td>{{ formatTime(request.createdAt) }}</td>
                  <td>
                    <div class="icons">
                      <Trash
                        class="delete-i"
                        alt="excluir funcionário"
                        @click.stop="deleteCurrentRequest(request.id)"
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
            <div class="pagination-info" v-if="userRequests.length >= 1">
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
            <div class="pagination-btns" v-if="userRequests.length >= 1">
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

.card {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 500px;
  max-height: 600px;
  width: 1300px;
  background-color: white;
  border-radius: 10px 10px 10px 10px;
  box-shadow: 1px 10px 10px rgb(179, 179, 179);
}

.header {
  display: flex;
  flex-direction: row;
  width: 1300px;
  justify-content: space-between;
  margin-bottom: 10px;
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
  height: 510px;
  width: 1300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 10px 10px;
  background-color: rgba(255, 255, 255);

  z-index: 10;
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
  margin-top: 0px;
  color: rgb(194, 0, 0);
  height: 20px;
  width: 20px;
  cursor: pointer;
  padding: 4px;
}
.delete-i:hover {
  color: rgb(241, 0, 0);
  transition: 0, 3s;
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
.status-pill {
  font-weight: 500;
  font-size: 15px;
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
  width: 1280px;
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
  border-bottom: 1px solid #00000049;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
tbody tr:hover {
  background-color: #f1f1f167;
  transition: 0.2s;
  cursor: pointer;
}
tbody td:nth-child(1) {
  width: 2%;
}
tbody td:nth-child(2) {
  width: 25%;
  padding-right: 0px;
}
tbody td:nth-child(3) {
  width: 45%;
  font-weight: 500;
  color: rgb(145, 145, 145);
  padding-left: 0px;
}
tbody td:nth-child(4) {
  width: 25%;
  font-weight: 200;
}
tbody td:nth-child(5) {
  color: green;
  width: 15%;
  font-weight: 600;
}
tbody td:nth-child(6) {
  width: 15%;
  font-weight: 200;
}
tbody td:nth-child(7) {
  width: 10%;
  font-weight: 200;
}
tbody td:nth-child(8) {
  width: 10%;
  font-weight: 200;
}
td {
  border-bottom: 2px solid rgba(139, 139, 139, 0.247);
}
h2 {
  margin-bottom: 20px;
}
.isOpen {
  color: rgb(255, 153, 0);
}
.Processing {
  color: rgb(0, 140, 233);
}
.Conclused {
  color: green;
}
.Rejected {
  color: rgb(189, 0, 0);
}
</style>
