<script setup lang="ts">

import { computed } from 'vue';
import SideBar from './components/SideBar.vue';
import { RouterView, useRoute } from 'vue-router';
import AppAlerts from './components/AppAlerts.vue';

const route = useRoute()


const PagesNoSide = ['Register', 'Login', 'NotFound', 'About']
const PagesNoBackground = ['Login', 'Register', 'form-request', 'About'] 

const showSideBar = computed(() => {
  const currentRouteNAme = (route.name ?? '') as string;
  return !PagesNoSide.includes(currentRouteNAme)
})

const showBackground = computed(() => {
  const currentRouteNAme = (route.name ?? '') as string;
  return !PagesNoBackground.includes(currentRouteNAme)
})


</script>

<template>
  
  <main :class="{'has-sidebar': showSideBar}">
    <SideBar v-if="showSideBar"/>
    <div class="main-content" :class="{'has-background': showBackground}">
    <RouterView/>
    <AppAlerts />
    </div>
  </main>
 
</template>

<style scoped>
main{
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

.has-sidebar{
  display: grid;
  grid-template-columns: 300px 1fr;
}
.has-sidebar .main-content {
    grid-column: 2;
}
.main-content{
  grid-column: 2;
  min-height: 100vh;
}

.main-content.has-background{
  background-image: url('./assets/background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

</style>
