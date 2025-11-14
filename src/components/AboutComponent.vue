<script setup lang="ts">
import { Dices } from "lucide-vue-next";
import { ref } from "vue";

const currentImageIndex = ref(0);
const images = [
  "../assets/img-preview.png",
  "../assets/img-preview2.png",
  "../assets/img-preview3.png",
];
function nextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
}
function prevImage() {
  currentImageIndex.value =
    currentImageIndex.value === 0
      ? images.length - 1
      : currentImageIndex.value - 1;
}
function goToImage(index: number){
    currentImageIndex.value = index;
}
</script>

<template>
  <section>
    <header class="header-about">
      <div class="header-itens">
        <div>
          <img src="../assets/logo-portal.png" style="width: 200px" alt="" />
        </div>
        <div class="auth-side">
          <RouterLink class="sigin-btn" to="/Login">Entrar</RouterLink>
          <RouterLink class="signup-btn" to="/signup">Registre-se</RouterLink>
        </div>
      </div>
    </header>
    <div class="main">
      <div class="main-infos">
        <div class="left-side">
          <span
            style="
              font-family: 'Inter', sans-serif;
              font-size: 56px;
              font-weight: 600;
            "
            >Simples, rápido e prático.</span
          >
          <span style="font-size: 22px"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            deleniti saepe a consequuntur odio dignissimos accusamus voluptatum,
            fugit nobis cumque aut molestias maiores assumenda, asperiores
            adipisci. Harum nisi quis excepturi.</span
          >
          <RouterLink class="btn-letsgo" to="/signup">Vamos lá</RouterLink>
        </div>
        <div class="rigth-side">
          <div class="img-layout">
            <div class="carousel-container">
                <img 
                v-for="(image, index) in images"
                :key="index"
                :src="image"
                :alt="`Preview ${index + 1}`"
                :class="['carousel-image', '{ active': index === currentImageIndex }]"/>
            </div>
            
          </div>
        </div>
      </div>
      <div class="modal-steps">
        <div class="column-infos">
          <div class="column-info">
            <Dices />
            <span>Teste</span>
            <span
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio praesentium commodi delectus cupiditate, aut sapiente
              provident ipsum veniam, officia vel, et veritatis nihil
              dignissimos sed accusantium rerum animi ullam expedita.</span
            >
          </div>
          <div class="column-info">
            <Dices />
            <span>Teste</span>
            <span
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio praesentium commodi delectus cupiditate, aut sapiente
              provident ipsum veniam, officia vel, et veritatis nihil
              dignissimos sed accusantium rerum animi ullam expedita.</span
            >
          </div>
          <div class="column-info">
            <Dices />
            <span>Teste</span>
            <span
              >Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio praesentium commodi delectus cupiditate, aut sapiente
              provident ipsum veniam, officia vel, et veritatis nihil
              dignissimos sed accusantium rerum animi ullam expedita.</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);

  justify-content: center;
  align-items: center;
  gap: 60px;
  align-content: center;
  height: 100vh;
}
.main-infos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 1700px;
  margin-top: 120px;
}
.left-side {
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 30px;
}
.header-about {
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 1000;

  align-items: center;

  background-color: rgb(255, 255, 255);
  height: 80px;
  /* box-shadow: 2px 2px 2px rgb(235, 235, 235); */
  box-sizing: border-box;
}
.header-itens {
  display: flex;
  width: 1700px;
  justify-content: space-between;
  align-items: center;
}
.modal-steps {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background: #0086bf;
  background: linear-gradient(
    90deg,
    rgb(0, 60, 191) 35%,
    rgb(122, 50, 255) 100%
  );
  width: 1700px;
  border-radius: 30px;
  height: 260px;
}
.img-layout {
  background-color: blue;
  width: 500px;
  height: 300px;
}
.auth-side {
  width: 200px;
  display: flex;
  height: 40px;
  justify-content: space-between;
}
.header-div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sigin-btn {
  background-color: #3633ff;
  color: #fff;
  text-decoration: none;
  border: 1px solid rgb(214, 214, 214);
  padding: 8px 10px;
  border-radius: 8px;
  font-weight: 300;
  transition: 0.3s ease;
  width: 50px;
  text-align: center;
  display: inline-block;
}
.sigin-btn:hover {
  background-color: #1b18ce;
  font-weight: 400;
}
.signup-btn {
  background-color: #fff;
  color: rgb(43, 43, 43);
  text-decoration: none;
  border: 1px solid rgb(226, 226, 226);
  padding: 8px 12px;
  text-align: center;
  display: inline-block;
  width: 90px;
  border-radius: 8px;
  font-weight: 300;
  transition: 0.3s ease;
}
.signup-btn:hover {
  font-weight: 400;
  border: 1px solid rgb(146, 146, 146);
}
.column-infos {
  display: flex;
  gap: 120px;
}
.column-info {
  display: flex;
  flex-direction: column;

  width: 300px;
  color: white;
}
.btn-letsgo {
  background-color: #3633ff;
  color: whitesmoke;
  text-align: center;
  text-decoration: none;
  border: 1px solid blue;
  width: 120px;
  padding: 12px;
  border-radius: 30px;
}
</style>
