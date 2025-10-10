<script></script>

<template>
  <div class="side-bar">
    <div>
      <div class="navigation-side-bar">
        <span class="side-item"
          >Home
          <div class="on-side"></div
        ></span>
        <span class="side-item">Solicitações</span>
        <span class="side-item">Funcionários</span>
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
}
.navigation-side-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 30px;
}
.side-item {
  display: flex;
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
.on-side {
  height: 50px;
  width: 5px;
  background-color: rgb(16, 180, 221);
}
.on-side:hover{
    background-color: red;
}
</style>
