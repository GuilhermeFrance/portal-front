<script>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="side-bar">
    <div>
      <div class="navigation-side-bar">
        <RouterLink to="/" class="side-item"
          >Home
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
    </div>
  </div>
</template>

<style>
.side-bar {
  background-color: white;
  height: 100vh;
  width: 300px;
  box-shadow: 1px 5px 5px 1px rgba(0, 0, 0, 0.274);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
.navigation-side-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;
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
  color: rgb(10, 135, 207);
}
.side-item.router-link-exact-active {
  color: rgb(16, 180, 221);
  font-weight: 700;

}
.side-item.router-link-exact-active .on-side {
  height: 50px;
  width: 5px;
  background-color: rgb(16, 180, 221);
  transition: 0.5s;
}
.on-side:hover {
  background-color: red;
}
</style>
