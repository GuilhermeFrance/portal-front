<script setup lang="ts">
import {
  Pencil,
  Inbox,
  MapPin,
  Phone,
  ClipboardClock,
  ClipboardClockIcon,
} from "lucide-vue-next";
import { useAuthStore } from "../auth/stores/auth";

const authStore = useAuthStore();
function formatString(text: string | undefined, maxLength: number){
  if(!text) return "";
  if(text.length <= maxLength){
    return text;
  }
  return text.substring(0, maxLength);
}
</script>

<template>
  <section>
    <div class="profile-card">
      <div class="profile-title">
        <div class="profile-image"></div>
        <div class="profile-header">
          <div class="header-row">
            <span style="font-size: 20px">{{ formatString(authStore.currentUser?.name, 17) }}</span>
            <button class="edit-btn"><pencil class="icon" /> Editar</button>
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
                <Inbox size="18" /> guilhermefrance9@gmail.com</span
              >
              <span style="display: flex; align-items: center; gap: 10px">
                <MapPin size="18" /> Via Local O, 13, Vila Serrana I</span
              >
            </div>
            <div class="header-row-email">
              <span style="display: flex; align-items: center; gap: 10px">
                <Phone size="18" /> 77 98865-3938</span
              >
              <span style="display: flex; align-items: center; gap: 10px">
                <ClipboardClockIcon size="18" /> entrou em 13/10/25</span
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
                  <div class="info-card">Guilherme</div>
                </div>
              </div>

              <div class="info-column">
                <div class="info-title"><span>Sobrenome</span></div>
                <div class="name-info">
                  <div class="info-card">France</div>
                </div>
              </div>
            </div>
            <div class="info-column">
              <div class="info-title"><span>Email</span></div>
              <div class="name-info" style="width: 790px">
                <div class="info-card" style="width: 790px">
                  guilhermefrance9@gmail.com
                </div>
              </div>
            </div>
            <div class="info-column">
              <div class="info-title"><span>Telefone</span></div>
              <div class="name-info" style="width: 790px">
                <div class="info-card" style="width: 790px">77 98865-3938</div>
              </div>
            </div>
            <div class="info-column">
              <div class="info-title"><span>Endereço</span></div>
              <div class="name-info" style="width: 790px">
                <div class="info-card" style="width: 790px">
                  Via Local O, 13, Vila Serrana I
                </div>
              </div>
            </div>
           
          </div>
          
        </div>
        <div class="profile-side">
         <div class="profile-job"><h2>Setor</h2></div>
         <div class="profile-job2"><h2>Cargo</h2></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap");

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
  border: 1px solid rgba(168, 168, 168, 0.425);
  border-radius: 8px;
  cursor: pointer;
  font-family: "Inter", sans-serif;
}
.edit-btn:hover {
  background-color: rgb(247, 247, 247);
  border: 1px solid rgba(133, 131, 131, 0.425);
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
  height: 600px;
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
  height: 550px;
  gap: 30px;
  padding-left: 5px;
}
.profile-job {
   background-color: rgb(252, 252, 252);
   border-radius: 20px;
  width: 290px;
  height: 300px;
  border: 1px solid rgb(215, 215, 215);
  padding: 20px;

}.profile-job2 {
   background-color: rgb(252, 252, 252);
   border-radius: 20px;
  width: 290px;
  height: 240px;
  border: 1px solid rgb(215, 215, 215);
  padding: 20px;
}
.profile-side{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}
</style>
