<script setup lang="ts">

import SideBar from './components/SideBar.vue';
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
  display: grid;
  grid-template-columns: 300px 1fr;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
.main-content{
  grid-column: 2;
  padding: 20px;
  min-height: 100hve;
}
</style>
