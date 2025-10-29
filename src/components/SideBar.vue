<script setup lang="ts">
import { UserRound, LogOut } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { useAuthStore } from "../auth/stores/auth";

const authStore = useAuthStore();
async function handleLogout(){
  authStore.logout()
}

function formatString(text: string | undefined, maxLength: number){
  if(!text){
    return ""
  }
  if(text.length <= maxLength){
    return text;
  }
  return text.substring(0, maxLength);
}
</script>

<template>
  <div class="side-bar">
    <div class="side-items">
      <div class="navigation-side-bar">
        <RouterLink to="/inicio" class="side-item"
          >Início
          <div class="on-side"></div
        ></RouterLink>
        <RouterLink to="/solicitacoes" class="side-item"
          >Solicitações
          <div class="on-side"></div
        ></RouterLink>
        <RouterLink to="/funcionarios" class="side-item"
          >Funcionários
          <div class="on-side"></div
        ></RouterLink>
      </div>
      <div class="side-item-last">
        
        <RouterLink to="/perfil" class="user-style-last">
          <UserRound class="lucide-icon" />
          <span>{{ formatString(authStore.currentUser?.name, 17) }}</span>
          
        </RouterLink>
        <LogOut @click.stop="handleLogout"/>
        
  
      </div>
    </div>
  </div>
</template>

<style>
.side-bar {
  display: flex;
  background-color: white;
  height: 100vh;
  width: 300px;
  box-shadow: 1px 5px 5px 1px rgba(0, 0, 0, 0.274);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.side-items {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.side-item-last{
   display: flex;
  color: black;
  text-decoration: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  border: 1px solid rgb(255, 255, 255);
  padding: 10px;
  padding-left: 0px;
  padding-right: 0px;
  transition: 0.3s;
  width: 296px;
}
.side-item-last:hover{
  cursor: pointer;
  background-color: rgb(238, 238, 238);
}
.navigation-side-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;
}
.user-link {
  display: flex;
  text-decoration: none;
  gap: 10px;
  flex-direction: row;
  text-decoration: dotted;
  align-items: center;
  height: 30px;
  border: 1px solid rgb(255, 255, 255);
  padding: 10px;
  padding-left: 30px;
  padding-right: 0px;
  transition: 0.3s;
  width: 268px;
  color: black;
}
.user-link:hover {
  background-color: rgb(238, 238, 238);
  cursor: pointer;
  color:#0079FF;
}
.user-style-last{
  display: flex;
  font-weight: 500;
  color: black;
  align-items: center;
  padding-left: 30px;
  height: 50px;
  text-decoration: none;
  gap: 10px;
}
.side-item-last:hover .user-style-last span{
  
  color:#0079FF;
}
.side-item-last:hover .user-style-last .lucide-icon{
  
  color:#0079FF;
}
.user-style-last.router-link-exact-active .lucide-icon {
  color:#0079FF;
}
.user-style-last.router-link-exact-active {
  color:#0079FF;
}
.user-style {
  display: flex;
  font-weight: 500;
  color: black;
  align-items: center;
  padding-left: 30px;
  height: 50px;
  text-decoration: none;
  gap: 10px;
}
.user-style:hover {
  background-color: rgb(238, 238, 238);
  cursor: pointer;
  color: #0079FF;
  transition: 0.3s;
}
.user-style.router-link-exact-active {
  color: #0079FF;
  font-weight: 600;
}
.side-item {
  display: flex;
  color: black;
  text-decoration: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  border: 1px solid rgb(255, 255, 255);
  padding: 10px;
  padding-left: 30px;
  padding-right: 0px;
  transition: 0.3s;
  width: 268px;
}

.side-item:hover {
  background-color: rgb(238, 238, 238);
  cursor: pointer;
  color: #0079FF;
}
.side-item.router-link-exact-active {
  color: #0079FF;
  font-weight: 700;
}
.side-item.router-link-exact-active .on-side {
  height: 50px;
  width: 5px;
  background-color: #0079FF;
  transition: 0.5s;
}
.on-side:hover {
  background-color: red;
}
</style>
