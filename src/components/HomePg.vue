<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { BookText } from 'lucide-vue-next';

</script>

<template>
    <section>
  <div class="home-card">
    <div class="link-list">
     
        <RouterLink to="/solicitacoes" >
        <div class="icons-link">
        <book-text/>
        </div>
        </RouterLink>
        <div class="icon-request">
        <RouterLink to="/solicitacoes" >
        <div class="icons-link"></div>
        </RouterLink>
        </div>
        <div class="icon-request">
        <RouterLink to="/solicitacoes" >
        <div class="icons-link"></div>
        </RouterLink>
        </div>
    </div>
    <div>

    </div>
  </div>
  </section>
</template>

<style scoped>
section{
      display: flex;
  font-family: "Inter", sans-serif;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding-top: 50px;
}
.home-card{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 40px;
    width: 1100px;
    height: 640px;
    background-color: white;
    border-radius: 20px;
}
.icons-link{
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    background-color: rgb(4, 4, 158);
    width: 100px;
    height: 100px;
    border-radius: 10px;
    color: white;

}
.link-list{
    display: flex;
    flex-direction: column;
    gap: 30px;
}
</style>
