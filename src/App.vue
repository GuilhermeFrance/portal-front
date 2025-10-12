<script setup lang="ts">

import SideBar from './components/SideBar.vue';
import EmployeePage from './pages/EmployeePage.vue';
import TablePage from './components/TablePage.vue';
import { RouterView } from 'vue-router';



</script>

<template>
  <main>
    <SideBar/>
    <div class="main-content">
    <RouterView/>
    </div>
  </main>
</template>

<style scoped>
main{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  align-content: center;
  gap: 300px;
  margin-top: 150px;
}
.main-content{
  margin-left: 300px;
  margin-top: 0px;
}
</style>
