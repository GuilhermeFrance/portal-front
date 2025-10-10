<script setup lang="ts">

import SideBar from './components/SideBar.vue';
import EmployeePage from './pages/EmployeePage.vue';
import TablePage from './components/TablePage.vue';



</script>

<template>
  <main>
    <SideBar/>
    <TablePage/>
  </main>
</template>

<style scoped>
main{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  gap: 300px;
}
.main-content{
  margin-left: 300px;
  margin-top: 0px;
}
</style>
