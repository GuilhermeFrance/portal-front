<script setup lang="ts">
import {
  ChevronLeft,
  ChevronRight,
  Cog,
  Dices,
  FolderCode,
  Phone,
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
      "Adapte um .env para um banco<br> que rodará localmente e rode:",
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
        </div>
      </div>
    </header>
    <div class="main">
      <div class="main-infos">
        <div class="left-side">
          <span class="portal-title">Simples, rápido e prático.</span>
          <span class="portal-desc"
            >O Portal Control é um projeto em desenvolvimento que reúne recursos
            essenciais do desenvolvimento web, como banco de dados em tempo
            real, autenticação e autorização, servindo como um repositório
            prático de aprendizado para quem deseja evoluir do nível básico ao
            intermediário.</span
          >
          <div class="buttons">
            <RouterLink class="btn-letsgo" to="/signup">Navegar</RouterLink>
            <a
              class="btn-repo"
              href="https://github.com/GuilhermeFrance?tab=repositories"
              target="_blank"
              >Repositórios</a
            >
          </div>
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
              <ChevronRight style="width: 80px; height: 80px" />
            </div>
          </template>
        </div>
      </div>

      <div class="right-class-side">
        <div
          class="technologies"
          style="display: flex; flex-direction: column; gap: 30px"
        >
          <span
            style="
              font-family: 'Inter', sans-serif;
              font-size: 50px;
              font-weight: 600;
            "
            >Tecnologias:</span
          >
          <div class="right-side">
            <div class="tech-imgs">
              <div class="tech-items">
                <a href="https://vuejs.org/" target="_blank">
                  <img
                    class="tech-item"
                    src="../assets/vues.svg"
                    alt=""
                    title="Vue3"
                /></a>
                <div class="tech-infos">
                  <span class="tech-title"> Vue3</span>
                  <span class="tech-desc"> Interface reativa e moderna.</span>
                </div>
              </div>
              <div class="tech-items">
                <a href="https://nestjs.com/" target="_blank"
                  ><img
                    class="tech-item"
                    src="../assets/nestjs.svg"
                    alt=""
                    title="NestJS"
                /></a>
                <div class="tech-infos">
                  <span class="tech-title"> NestJS</span>
                  <span class="tech-desc"> Backend robusto e escalável.</span>
                </div>
              </div>
              <div class="tech-items">
                <a href="https://www.postgresql.org/" target="_blank"
                  ><img
                    class="tech-item"
                    src="../assets/psql.svg"
                    alt=""
                    title="PostgreSQL"
                /></a>
                <div class="tech-infos">
                  <span class="tech-title"> PostgreSQL</span>
                  <span class="tech-desc">
                    Banco de dados relacional poderoso.</span
                  >
                </div>
              </div>
              <div class="tech-items">
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
                <div class="tech-infos">
                  <span class="tech-title"> Prisma ORM</span>
                  <span class="tech-desc">ORM para acesso seguro a dados.</span>
                </div>
              </div>
              <div class="tech-items">
                <a href="https://www.docker.com/" target="_blank"
                  ><img
                    class="tech-item"
                    src="../assets/docker.svg"
                    alt=""
                    title="Docker"
                /></a>
                <div class="tech-infos">
                  <span class="tech-title"> Docker </span>
                  <span class="tech-desc">
                    Isolamento de ambiente e deploy.</span
                  >
                </div>
              </div>
              <div class="tech-items">
                <a href="https://casl.js.org/v6/en/" target="_blank"
                  ><img
                    class="tech-item"
                    src="../assets/casl.png"
                    alt=""
                    title="CASL Permissions"
                /></a>
                <div class="tech-infos">
                  <span class="tech-title"> CASL</span>
                  <span class="tech-desc">
                    Gestão flexível de permissões (ACL).</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="processing-feature">
          <span style="display: flex; align-items: center; gap: 10px; color: white; font-weight: 300; font-size: 18px;"> <div class="rec"></div> Em estado de implementação/manutenção:</span>
          <div style="display: flex; flex-direction: column; gap: 6px; height: 120px; justify-content: center;">
          <div class="processing-item">
            <Cog class="process-icon"/> Campos de endereço do usuário
          </div>
          <div class="processing-item">
            <Cog class="process-icon"/> Tratamento de erros
          </div>
          <div class="processing-item">
            <Cog class="process-icon"/> Imagem do usuário
          </div>
          </div>
        </div>
      </div>
    </div>
    <footer>
      <div class="footer-box">
        <a
          target="_blank"
          href="https://github.com/GuilhermeFrance?tab=repositories"
          title="Github"
          ><img class="gith-logo" src="../assets/github.svg" alt=""
        /></a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/guilherme-france-de-oliveira-santos-9435aa360/"
          title="Linkedin"
          ><img class="kedin-logo" src="../assets/kedin.png" alt=""
        /></a>

        <a
          href="https://contato-psi-ruddy.vercel.app/"
          target="_blank"
          title="Contate-me"
          style="text-decoration: none; color: black"
          ><div class="contact"><Phone /></div
        ></a>
      </div>
    </footer>
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
  padding-top: 100px;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
}
.main-infos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 80px;
  max-width: 1400px;
  width: 100%;
  margin-top: 60px;
  padding: 0 2rem;
}
.left-side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
  gap: 30px;
}
.portal-title {
  font-family: "Inter", sans-serif;
  transform: translateX(0);
  font-size: 50px;
  font-weight: 600;
  animation-name: TextComes;
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-delay: 0s;
  opacity: 1;
}
.buttons {
  display: flex;
  gap: 24px;
  transform: translateY(0);
  animation-name: Opacity;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  animation-timing-function: ease;
  opacity: 1;
}
.portal-desc {
  font-size: 20px;
  transform: translateX(0);
  font-family: "Inter", sans-serif;
  color: rgb(0, 0, 0, 0.8);
  font-weight: 200;
  text-align: justify;
  line-height: 1.5;
  animation-name: TextComes;
  animation-duration: 1.2s;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  animation-delay: 0;
  opacity: 1;
}

/* Keyframes Animations */
@keyframes TextComes {
  0% {
    opacity: 0;
    transform: translateX(-200px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes Opacity {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes ModalStepsAnimation {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
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
  max-width: 1400px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
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
  max-width: 1400px;
  width: 100%;
  margin: 0 2rem;
  border-radius: 30px;
  height: 260px;
  animation-name: ModalStepsAnimation;
  animation-duration: 1.5s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  animation-delay: 0.4s;
  animation-fill-mode: both;
}
.gith-logo {
  width: 40px;
  filter: contrast(0%) invert(0);
  transition: 0.3s ease;
}
.gith-logo:hover {
  filter: contrast(100%) invert(1);
}
.kedin-logo {
  width: 45px;
  filter: contrast(0%);
  transition: 0.3s ease;
}
.kedin-logo:hover {
  filter: contrast(100%);
}
.contact {
  background-color: gray;
  color: rgb(0, 0, 0);
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  transition: 0.3s ease;
}
.contact:hover {
  background-color: rgb(6, 218, 165);
}
.img-layout {
  width: 700px;
  height: 420px;
  border-radius: 15px;
  overflow: hidden;
  transform: translateY(0);
  box-shadow: 0px 12px 32px rgba(83, 83, 83, 0.1);
  animation-name: Opacity;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-delay: 0s;
  animation-timing-function: ease;
  opacity: 1;
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
  padding-top: 100px;
  width: 1400px;
  align-items: flex-start;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  padding-bottom: 120px;
}
.right-side {
  display: flex;
  flex-direction: column;
  color: rgb(0, 0, 0);
  justify-content: center;
  gap: 30px;
  align-content: center;
  align-items: center;
  padding: 10px;
  width: 820px;
  height: 400px;
  border-radius: 30px;
  box-shadow: 0px 2px 32px 4px rgba(221, 221, 221, 0.5);
  background-color: #ffffff;
}
.rec {
  width: 10px;
  height: 10px;
  background-color: rgb(2, 235, 2);
  animation-name: RecAnimation;
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
  border-radius: 50%;
  opacity: 100%;
}
@keyframes RecAnimation {
  0% {
    opacity: 0%;
  }
  50% {
    opacity: 100%;
  }
  100% {
    opacity: 0%;
  }
}
.processing-feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 500px;
  gap: 40px;
  border-radius: 20px;
  background-color: rgb(65, 65, 65);
  border: 1px solid rgba(128, 128, 128, 0.062);
  box-shadow: 2px 2px 32px 2px rgba(202, 202, 202, 0.281);
  height: 240px;
}
.processing-item {
  display: flex;
  gap: 10px;
  font-size: 19px;
  font-weight: 200;
  flex-direction: row;
  align-items: center;
  color: white;
  align-items: flex-start;
}
.item-p {
  display: flex;
  align-items: center;
  color: rgb(59, 59, 59);
  font-weight: 600;
}
.process-icon{
  animation-name: Rotate;
  animation-duration: 30s;
  animation-iteration-count: infinite;
  animation-delay: 0s;
  transform: rotateZ(0);
}

@keyframes Rotate{
  0% {transform: rotateZ(0);}
  100% {transform: rotateZ(360deg);}
}

.tech-items {
  display: flex;
  font-family: "Inter", sans-serif;
  align-items: center;
  gap: 10px;
  height: 70px;
  padding: 14px;
  border-radius: 10px;
  transition: 0.3s ease;
  border: 1px solid white;
  width: 320px;
}
.tech-items:hover {
  background-color: rgba(134, 134, 134, 0.1);
  border: 1px solid rgb(199, 199, 199);
  transform: translateY(-3px);
}
.tech-item {
  width: 44px;
  padding: 4px 6px;
  border-radius: 6px;

  transition: 0.4s;
  cursor: pointer;
}
.tech-item:hover {
  width: 44px;
  padding: 4px 6px;
  border-radius: 6px;
}
.tech-infos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.tech-title {
  font-size: 15px;
  font-weight: 700;
}
.tech-desc {
  font-family: "Inter", sans-serif;
  color: #5a5a5a;
}
.arrow-guide {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 211px;
  color: white;
}

.tech-imgs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 800px;
  flex-wrap: wrap;
  gap: 20px;
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
  width: 350px;
  display: flex;
  height: 40px;
  gap: 14px;
  justify-content: flex-end;
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
  justify-content: center;
  align-items: flex-start;
  gap: 100px;
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
.btn-repo {
  background-color: #000000;
  color: whitesmoke;
  text-align: center;
  text-decoration: none;
  border: 1px solid rgb(0, 0, 0);
  font-size: 18px;
  width: 130px;
  padding: 14px;
  border-radius: 30px;
  transition: all 0.4s ease;
}
.btn-repo:hover {
  transform: translateY(-4px);
  color: white;
  font-weight: 600;
  box-shadow: 0 8px 32px 2px rgba(0, 2, 36, 0.322);
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

footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  background-color: black;
}

.footer-box {
  display: flex;
  gap: 10px;
}
@media (max-width: 1200px) {
  .main-infos {
    max-width: 1000px;
    gap: 60px;
  }

  .header-itens {
    max-width: 1000px;
  }

  .modal-steps {
    max-width: 1000px;
  }
}

@media (max-width: 768px) {
  .main-infos {
    flex-direction: column;
    gap: 40px;
    padding: 0 1rem;
  }

  .left-side {
    width: 100%;
    text-align: center;
  }

  .portal-title {
    font-size: 36px;
  }

  .portal-desc {
    font-size: 18px;
  }

  .header-itens {
    padding: 0 1rem;
  }

  .modal-steps {
    margin: 0 1rem;
    height: auto;
    padding: 2rem 1rem;
  }

  .column-infos {
    flex-direction: column;
    gap: 2rem;
  }

  .steps-container {
    flex-direction: column;
    align-items: center;
  }

  .step-arrow {
    transform: rotate(90deg);
    margin: 1rem 0;
  }
}

@media (max-width: 480px) {
  .portal-title {
    font-size: 28px;
  }

  .portal-desc {
    font-size: 16px;
  }

  .img-layout {
    width: 100%;
    height: 250px;
  }
}
</style>
