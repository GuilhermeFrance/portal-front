<script setup lang="ts">
import { Pencil, Inbox, Loader, ClipboardPlus, Headset, Calendar1 } from "lucide-vue-next";
import { useAuthStore } from "../auth/stores/auth";
import { getTime } from "vuetify/lib/labs/VCalendar/util/timestamp.mjs";
import { ref } from "vue";
import ProfileModal from "./ProfileModal.vue";
import type { ClientModel } from "../auth/models/ClientModel";
import { RouterLink } from "vue-router";

const isModalEditOpen = ref(false);
const authStore = useAuthStore();
const profileToEdit = ref<ClientModel | null>(null);

function openEditModal() {
  profileToEdit.value = authStore.currentUser ?? null;
  isModalEditOpen.value = true;
}

function closeModal() {
  isModalEditOpen.value = false;
}

function onProfileUpdated() {
  isModalEditOpen.value = false;
}

function formatTime(dateStringTime: string | Date | undefined): string {
  if (!dateStringTime) {
    return "N/A";
  }
  try {
    const date = new Date(dateStringTime);
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }
    const datePart = date.toLocaleDateString("pt-BR");
    return datePart;
  } catch (e) {
    return "Data inválida";
  }
}

function formatString(text: string | undefined, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength);
}
</script>

<template>
  <section>
    <ProfileModal
      v-if="isModalEditOpen"
      @close="closeModal"
      @profile-updated="onProfileUpdated"
      :initialProfile="profileToEdit"
    />
    <div class="profile-card">
      <div class="profile-title">
        <div class="profile-image"></div>
        <div class="profile-headera">
          <div class="header-row">
            <span style="font-size: 20px"
              >{{ authStore.currentUser?.firstName }}
              {{ authStore.currentUser?.surname }}</span
            >
            <button @click="openEditModal" class="edit-btn">
              <pencil class="icon" /> Editar
            </button>
          </div>
          <div
            class="profile-infos"
            style="
              display: flex;
              flex-direction: row;
              gap: 6px;
              margin-top: 10px;
              width: 900px;
              justify-content: flex-start;
            "
          >
            <div class="header-row-email">
              <span style="display: flex; align-items: center; gap: 10px">
                <Inbox size="18" /> {{ authStore.currentUser?.email }}</span
              >
              <span style="display: flex; align-items: center; gap: 10px">
                <Calendar1 size="18"/> entrou em
                {{ formatTime(authStore.currentUser?.createdAt) }}</span
              >
            </div>
          </div>
        </div>
      </div>
      <div class="profile-main-info">
        <div class="infos">
          <div class="card-info">
            <div>
              <h2>Informações pessoais</h2>
            </div>
            <div class="informacoes">
              <div class="info-column">
                <div class="info-title"><span>Nome</span></div>
                <div class="name-info">
                  <div class="info-card">
                    {{ authStore.currentUser?.firstName }}
                  </div>
                </div>
              </div>

              <div class="info-column">
                <div class="info-title">
                  <span>{{ authStore.currentUser?.surname }}</span>
                </div>
                <div class="name-info">
                  <div class="info-card">France</div>
                </div>
              </div>
            </div>
            <div class="info-column">
              <div class="info-title"><span>Email</span></div>
              <div class="name-info" style="width: 790px">
                <div class="info-card" style="width: 790px">
                  {{ authStore.currentUser?.email }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-side">
          <div class="profile-job">
           <div class="icon-request">
                  <RouterLink
                    to="/solicite"
                    style="text-decoration: none; color: black"
                  >
                    <div class="card-router">
                      <div class="icons-link">
                        <ClipboardPlus class="lucide-icon" />
                      </div>
                      <div>
                        <span class="link-title"> Faça uma solicitação</span>
                        <p class="link-desc">
                          Solicite algum <br />
                          serviço público.
                        </p>
                      </div>
                    </div>
                  </RouterLink>
                </div>
                 <div class="icon-request">
                <RouterLink
                  to="/solicitacoes"
                  style="text-decoration: none; color: black"
                >
                  <div class="card-router">
                    <div class="icons-link">
                      <Loader class="lucide-icon" />
                    </div>
                    <div>
                      <span class="link-title"> Status</span>
                      <p class="link-desc">
                        Acompanhe a <br />
                        sua solicitação.
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
              <div class="icon-request">
                <RouterLink
                  to="/solicitacoes"
                  style="text-decoration: none; color: black"
                >
                  <div class="card-router">
                    <div class="icons-link">
                      <Headset class="lucide-icon" />
                    </div>
                    <div>
                      <span class="link-title"> Ouvidoria</span>
                      <p class="link-desc">
                        Fale com um <br />
                        suporte.
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
          </div>
          <div class="profile-job2"><h2>Cargo</h2></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

.card-router:hover .lucide-icon {
  transform: scale(1.25);
}

.lucide-icon {
  width: 25px;
  height: 25px;
  transition: transform 0.17s ease-in-out;
}

.icons-link:hover {
  color: white;
  transition: background 0.2s ease;
}
.icons-link {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: linear-gradient(rgb(0, 162, 255), blue);
  width: 100px;
  height: 100px;
  border-radius: 10px;
  color: white;
}
.link-title {
  font-weight: 600;
}
.link-desc {
  font-weight: 200;
}
.card-router {
  display: flex;
  align-items: self-end;
  gap: 18px;
  width: 300px;
  border-radius: 10px;
  padding: 8px;
  transition: ease 0.4s;
}
.card-router:hover {
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.144);
  background-color: white;
}

section {
  display: flex;
  font-family: "Inter", sans-serif;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding-top: 50px;
}
.profile-card {
  display: flex;
  flex-direction: column;
  gap: 45px;
}
.profile-title {
  display: flex;

  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgb(252, 252, 252);
  gap: 30px;
  height: 250px;
  width: 1200px;
  margin-top: 0px;
  border-radius: 20px;
  border: 1px solid rgb(215, 215, 215);
}
.edit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  gap: 10px;
  padding: 6px;
  width: 110px;
  background-color: white;
  border: 1px solid rgba(219, 219, 219, 0.425);
  border-radius: 8px;
  cursor: pointer;
  font-family: "Inter", sans-serif;
}
.edit-btn:hover {
  background-color: rgb(247, 247, 247);
  border: 1px solid rgba(179, 179, 179, 0.425);
  transition: 0.3s;
}
.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 900px;
}
.profile-image {
  width: 160px;
  height: 160px;
  background-color: rgb(93, 213, 250);
  border-radius: 100px;
}
.header-row {
  font-size: 18px;
  display: flex;
  align-items: center;
  width: 900px;
  justify-content: space-between;
}
.header-row-email {
  color: rgb(124, 124, 124);
  font-weight: 300;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  width: 300px;
  justify-content: flex-start;
  gap: 8px;
}
.icon {
  width: 18px;
  height: 18px;
}
.profile-main-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.infos {
  font-family: "Inter", sans-serif;
  width: 800px;
  background-color: rgb(252, 252, 252);
  height: 664px;
  margin-bottom: 20px;
  border: 1px solid rgb(215, 215, 215);
  border-radius: 20px;
  padding: 20px;
}
.name-info {
  display: flex;
  justify-content: space-between;
  width: 400px;
  align-items: end;

  gap: 50px;
}
.info-card {
  background-color: rgb(244, 244, 244);
  width: 360px;
  padding: 8px;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.671);
}
.info-title {
  display: flex;
  width: 300px;
  font-weight: 400;
}
.info-column {
  display: flex;
  flex-direction: column;
  width: 340px;
  gap: 8px;
  font-weight: 300;
  color: rgb(0, 0, 0);
}
.informacoes {
  display: flex;
  flex-direction: row;
  justify-content: space-center;
  gap: 74px;
}
.card-info {
  display: flex;
  flex-direction: column;
  background-color: rgb(252, 252, 252);
  height: 500px;
  gap: 30px;
  padding-left: 5px;
}
.profile-job {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 6px;
  background-color: rgb(252, 252, 252);
  border-radius: 20px;
  width: 305px;
  height: 360px;
  border: 1px solid rgb(215, 215, 215);
  padding: 20px;
}
.profile-job2 {
  background-color: rgb(252, 252, 252);
  border-radius: 20px;
  width: 305px;
  height: 240px;
  border: 1px solid rgb(215, 215, 215);
  padding: 20px;
}
.profile-side {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}
</style>
