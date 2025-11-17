<script setup lang="ts">
import { ChevronLeft, ChevronRight, Dices } from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";
import imgPreview1 from "../assets/img-preview.png";
import imgPreview2 from "../assets/img-preview2.png";
import imgPreview3 from "../assets/img-preview3.png";

const autoPlayTimout = ref<number | undefined>(undefined);
const autoplayInterval = ref<number | undefined>(undefined);
const currentImageIndex = ref(0);
const isTransitioning = ref(false);

const isUserInteracting = ref(false);
const userInteractionDelay = 4000;

const images = [imgPreview1, imgPreview2, imgPreview3];

function startAutoplay() {
  autoplayInterval.value = setInterval(() => {
    nextImage();
  }, 5000);
}

function stopAutoplay() {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = undefined;
  }
}

function restartAutoplayAfterDelay() {
  stopAutoplay();
  if (autoPlayTimout.value) {
    clearTimeout(autoPlayTimout.value);
  }
  isUserInteracting.value = true;

  autoPlayTimout.value = setTimeout(() => {
    isUserInteracting.value = false;
    startAutoplay();
  }, userInteractionDelay);
}

async function nextImageWithDelay() {
  restartAutoplayAfterDelay();
  return nextImage();
}

async function prevImageWithDelay() {
  restartAutoplayAfterDelay();
  return prevImage();
}
async function goToImageWithDelay(index: number) {
  restartAutoplayAfterDelay();
  return goToImage(index);
}

async function nextImage() {
  if (isTransitioning.value) return;

  isTransitioning.value = true;

  await new Promise((resolve) => setTimeout(resolve, 400));

  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;

  setTimeout(() => {
    isTransitioning.value = false;
  }, 50);
}

async function prevImage() {
  if (isTransitioning.value) return;

  isTransitioning.value = true;

  await new Promise((resolve) => setTimeout(resolve, 400));

  currentImageIndex.value =
    currentImageIndex.value === 0
      ? images.length - 1
      : currentImageIndex.value - 1;

  setTimeout(() => {
    isTransitioning.value = false;
  }, 50);
}

async function goToImage(index: number) {
  if (isTransitioning.value) return;

  isTransitioning.value = true;

  await new Promise((resolve) => setTimeout(resolve, 400));

  currentImageIndex.value = index;

  setTimeout(() => {
    isTransitioning.value = false;
  }, 50);
}

onMounted(() => startAutoplay());
onUnmounted(() => clearInterval(autoplayInterval.value));
</script>

<template>
  <section>
    <header class="header-about">
      <div class="header-itens">
        <div>
          <img src="../assets/logo-portal.png" style="width: 300px" alt="" />
        </div>
        <div class="auth-side">
          <RouterLink class="sigin-btn" to="/Login">Entrar</RouterLink>
          <RouterLink class="signup-btn" to="/signup">Registre-se</RouterLink>
          <div style="display: flex; align-items: center; width: 120px; justify-content: flex-start; gap: 10px;">
            <a
              target="_blank"
              href="https://github.com/GuilhermeFrance?tab=repositories"
              ><img class="gith-logo" src="../assets/github.svg" alt=""
            /></a>
            <a
              target="_blank"
              href="https://github.com/GuilhermeFrance?tab=repositories"
              ><img class="kedin-logo" src="../assets/kedin.png" alt=""
            /></a>
          </div>
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
                :key="currentImageIndex"
                :src="images[currentImageIndex]"
                :alt="`Preview ${currentImageIndex + 1}`"
                :class="['carousel-image', { transitioning: isTransitioning }]"
              />
              <button
                @click="prevImageWithDelay"
                class="carousel-btn carousel-btn-prev"
              >
                <ChevronLeft />
              </button>
              <button
                @click="nextImageWithDelay"
                class="carousel-btn carousel-btn-next"
              >
                <ChevronRight />
              </button>
              <div class="carousel-indicators">
                <button
                  v-for="(_, index) in images"
                  :key="index"
                  @click="goToImageWithDelay(index)"
                  :class="[
                    'indicator',
                    { active: index === currentImageIndex },
                  ]"
                ></button>
              </div>
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
  justify-content: flex-start;
  gap: 180px;
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
.gith-logo {
  width: 40px;
  filter: contrast(0%);
  transition: 0.3s ease;
}
.gith-logo:hover {
  filter: contrast(100%);
}
.kedin-logo {
  width: 45px;
  filter: contrast(0%);
  transition: 0.3s ease;
}
.kedin-logo:hover {
  filter: contrast(100%);
}
.img-layout {
  width: 700px;
  height: 420px;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 17, 255, 0.1);
}
.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f0f0f0;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease-in-out;
  opacity: 1;
  filter: blur(0px);
}

.carousel-image.transitioning {
  opacity: 0;
}

.carousel-btn {
  display: flex;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(114, 114, 114, 0.5);
  color: white;
  border: none;
  padding: 14px 14px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  opacity: 0;
  transition: 0.5s;
}
.img-layout:hover .carousel-btn {
  opacity: 1;
}

.carousel-btn-prev {
  left: 15px;
}
.carousel-btn-prev:hover {
  background-color: #0063bf;
}
.carousel-btn-next {
  right: 15px;
}
.carousel-btn-next:hover {
  background-color: #0063bf;
}

.carousel-indicators {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.indicator.active {
  background-color: #3633ff;
}

.auth-side {
  width: 340px;
  display: flex;
  height: 40px;
  justify-content: space-between;
  align-items: center;
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
  transition: 0.6s;
}
.btn-letsgo:hover {
  color: white;
  font-weight: 600;
  box-shadow: 0 8px 32px 2px rgba(0, 17, 255, 0.7);
}
</style>
