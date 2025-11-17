<script setup lang="ts">
import {
  Asterisk,
  ChevronLeft,
  ChevronRight,
  Dices,
  FolderCode,
  Pyramid,
} from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";
import imgPreview1 from "../assets/img-preview.png";
import imgPreview2 from "../assets/img-preview2.png";
import imgPreview3 from "../assets/img-preview3.png";

interface GuideStep {
  icon: any;
  title: string;
  description: string;
  code: string;
}

const AUTOPLAY_DELAY = 5000;
const USER_INTERACTION_DELAY = 4000;
const TRANSITION_DURATION = 400;

const images = [imgPreview1, imgPreview2, imgPreview3];

const guideSteps: GuideStep[] = [
  {
    icon: FolderCode,
    title: "Clone os repositórios",
    description:
      "Adapte um .env para um banco que rodará<br>localmente e rode:",
    code: "npm run dev",
  },
  {
    icon: Pyramid,
    title: "Rode o Prisma Studio",
    description:
      "Estabeleça conexão com Prisma<br>Studio para melhor visualização<br>de dados.",
    code: "npx prisma studio",
  },
  {
    icon: Dices,
    title: "Comece a testar",
    description: "Agora, basta rodar o frontend<br>e interagir com o site:",
    code: "npx vite",
  },
];

// Reactive state
const autoPlayTimeout = ref<number | undefined>(undefined);
const autoplayInterval = ref<number | undefined>(undefined);
const currentImageIndex = ref(0);
const isTransitioning = ref(false);
const isUserInteracting = ref(false);

function startAutoplay() {
  autoplayInterval.value = setInterval(() => {
    nextImage();
  }, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = undefined;
  }
}

function restartAutoplayAfterDelay() {
  stopAutoplay();
  if (autoPlayTimeout.value) {
    clearTimeout(autoPlayTimeout.value);
  }
  isUserInteracting.value = true;

  autoPlayTimeout.value = setTimeout(() => {
    isUserInteracting.value = false;
    startAutoplay();
  }, USER_INTERACTION_DELAY);
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

  await new Promise((resolve) => setTimeout(resolve, TRANSITION_DURATION));

  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;

  setTimeout(() => {
    isTransitioning.value = false;
  }, 50);
}

async function prevImage() {
  if (isTransitioning.value) return;

  isTransitioning.value = true;

  await new Promise((resolve) => setTimeout(resolve, TRANSITION_DURATION));

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

  await new Promise((resolve) => setTimeout(resolve, TRANSITION_DURATION));

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
          <div
            style="
              display: flex;
              align-items: center;
              width: 120px;
              justify-content: flex-end;
              gap: 10px;
            "
          >
            <a
              target="_blank"
              href="https://github.com/GuilhermeFrance?tab=repositories"
              ><img class="gith-logo" src="../assets/github.svg" alt=""
            /></a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/guilherme-france-de-oliveira-santos-9435aa360/"
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
              font-size: 50px;
              font-weight: 600;
            "
            >Simples, rápido e prático.</span
          >
          <span
            style="
              font-size: 20px;
              font-family: 'Inter', sans-serif;
              color: rgb(0, 0, 0, 0.8);
              font-weight: 200;
              text-align: justify;
              line-height: 1.5;
            "
            >O Portal Control é um projeto em desenvolvimento que reúne recursos
            essenciais do desenvolvimento web, como banco de dados em tempo
            real, autenticação e autorização, servindo como um repositório
            prático de aprendizado para quem deseja evoluir do nível básico ao
            intermediário.</span
          >
          <RouterLink class="btn-letsgo" to="/signup">Vamos lá!</RouterLink>
        </div>
        <div class="center-side">
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
        <div class="right-class-side">
          
          <div class="right-side">
            <span style="font-weight: 600">Tecnologias:</span>
            <div class="tech-imgs">
              <a href="https://vuejs.org/" target="_blank">
                <img
                  class="tech-item"
                  src="../assets/vues.svg"
                  alt=""
                  title="Vue3"
              /></a>
              <a href="https://nestjs.com/" target="_blank"
                ><img
                  class="tech-item"
                  src="../assets/nestjs.svg"
                  alt=""
                  title="NestJS"
              /></a>
              <a href="https://www.postgresql.org/" target="_blank"
                ><img
                  class="tech-item"
                  src="../assets/psql.svg"
                  alt=""
                  title="PostgreSQL"
              /></a>
              <a
                href="https://www.prisma.io/?via=anh&gad_source=1&gad_campaignid=23230812950&gbraid=0AAAABB9xcA9Cu43OOHsJ2AuDPIPUoUSl0&gclid=Cj0KCQiArOvIBhDLARIsAPwJXOYnmTFiSjfmfpQvOLl0cMaSxcOSkr8S7oZQJGcCvh60_8J-DIG5_aUaAiTjEALw_wcB"
                target="_blank"
              >
                <img
                  class="tech-item"
                  src="../assets/prisma.svg"
                  alt=""
                  title="Prisma ORM"
              /></a>
              <a href="https://www.docker.com/" target="_blank"
                ><img
                  class="tech-item"
                  src="../assets/docker.svg"
                  alt=""
                  title="Docker"
              /></a>
              <a href="https://casl.js.org/v6/en/" target="_blank"
                ><img
                  class="tech-item"
                  src="../assets/casl.png"
                  alt=""
                  title="CASL Permissions"
              /></a>
            </div>
            
          </div>
          <div class="processing-feature">
            <span style="display: flex; align-items: center; gap: 10px;"> <div class="rec"></div>Em processo atualmente:</span>
            <div class="processing-item">
              <span class="item-p"> <Asterisk/> Dashboard</span>
              <span class="item-p"> <Asterisk/>  Alteração no campo endereço</span>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-steps">
        <div class="column-infos">
          <template v-for="(step, index) in guideSteps" :key="step.title">
            <div class="column-info">
              <component :is="step.icon" class="icon-guide" />
              <div class="guide">
                <span
                  class="text-guide"
                  v-html="
                    step.title === 'Clone os repositórios'
                      ? `Clone os <a href='https://github.com/GuilhermeFrance?tab=repositories' target='_blank' style='text-decoration: none; color: white; font-weight: 700'>repositórios</a>`
                      : step.title === 'Rode o Prisma Studio'
                      ? `Rode o <a style='font-weight: 700; text-decoration: none; color: white;' target='_blank' href='https://www.prisma.io/studio'>Prisma Studio</a>`
                      : step.title.replace(
                          'testar',
                          '<span style=\'font-weight: 700;\'>testar</span>'
                        )
                  "
                ></span>
                <span v-html="step.description"></span>
                <span class="code-text">{{ step.code }}</span>
              </div>
            </div>
            <div v-if="index < guideSteps.length - 1" class="arrow-guide">
              <ChevronRight />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  scale: 1;
  justify-content: center;
  align-items: center;
  gap: 60px;
  align-content: center;
  height: 100vh;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
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
  justify-content: space-between;
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
  box-shadow: 0px 12px 32px rgba(83, 83, 83, 0.1);
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
  background-color: #3633ff;
}
.carousel-btn-next {
  right: 15px;
}
.carousel-btn-next:hover {
  background-color: #3633ff;
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
.right-class-side {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
}
.right-side {
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: flex-start;
  gap: 20px;
  align-content: center;
  align-items: center;
  padding: 10px;
  width: 300px;
  height: 200px;
  border-radius: 30px;
  box-shadow: 0px 2px 32px 4px rgba(221, 221, 221, 0.5);
  background-color: #000000;
}
.rec{
  width: 10px;
  height: 10px;
  background-color: rgb(0, 196, 0);
  animation-name: RecAnimation;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  border-radius: 50%;
  opacity: 100%;
}
@keyframes RecAnimation{
  0% {opacity: 0%;}
  50% {opacity: 100%;}
  100% {opacity: 0%;}
}
.processing-feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 290px;
  gap: 10px;
  border-radius: 20px;
  background-color: rgb(250, 250, 250);
  border: 1px solid rgba(128, 128, 128, 0.062);
  box-shadow: 2px 2px 32px 2px rgba(202, 202, 202, 0.281);
  height: 140px;
}
.processing-item{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.item-p{
  display: flex;
  align-items: center;
  color: rgb(59, 59, 59);
  font-weight: 600;
}
.tech-item {
  width: 44px;
  padding: 4px 6px;
  border-radius: 6px;
  filter: contrast(0);
  transition: 0.4s;
  cursor: pointer;
}
.tech-item:hover {
  width: 44px;
  padding: 4px 6px;
  border-radius: 6px;
  filter: contrast(1);
}
.arrow-guide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 171px;
  color: white;
}

.tech-imgs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 200px;
  flex-wrap: wrap;
  gap: 10px;
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
  align-items: flex-start;
  gap: 120px;
}
.column-info {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  gap: 10px;
  padding: 14px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 181px;
  max-width: 300px;
  color: white;
  transition: 0.3s ease;
}
.column-info:hover {
  transform: translateY(-3px);
}
.icon-guide {
  width: 40px;
  height: 30px;
}
.text-guide {
  font-size: 18px;
}
.guide {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 260px;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
}
.code-text {
  font-family: "Google Sans Code", sans-serif;
  background-color: rgb(46, 46, 46);
  padding: 10px;
  padding-left: 20px;
  border-radius: 8px;
}
.btn-letsgo {
  background-color: #3633ff;
  color: whitesmoke;
  text-align: center;
  text-decoration: none;
  border: 1px solid blue;
  font-size: 18px;
  width: 130px;
  padding: 14px;
  border-radius: 30px;
  transition: all 0.4s ease;
}
.btn-letsgo:hover {
  transform: translateY(-4px);
  color: white;
  font-weight: 600;
  box-shadow: 0 8px 32px 2px rgba(0, 17, 255, 0.322);
}

/* Getting Started Section */
.getting-started {
  background: linear-gradient(135deg, #3633ff 0%, #7a32ff 100%);
  margin: 4rem 0;
  padding: 4rem 2rem;
  border-radius: 2rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.steps-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.step-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  color: white;
  flex: 1;
  max-width: 300px;
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
}

.step-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  color: #fff;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 0;
}

.step-title :deep(.repo-link) {
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  border-bottom: 2px solid rgba(255, 255, 255, 0.5);
  transition: border-color 0.3s ease;
}

.step-title :deep(.repo-link):hover {
  border-color: #fff;
}

.step-description {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.step-code {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.9rem;
  display: block;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.step-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 3rem;
}

.step-arrow svg {
  width: 24px;
  height: 24px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .steps-container {
    flex-direction: column;
    align-items: center;
  }

  .step-arrow {
    transform: rotate(90deg);
    margin: 1rem 0;
  }
}
</style>
