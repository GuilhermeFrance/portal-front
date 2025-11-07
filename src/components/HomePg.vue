<script setup lang="ts">
import { RouterLink } from "vue-router";
import {
  BookText,
  SquareUserRound,
  ClipboardPlus,
  Loader,
  ChartNoAxesCombined,
  User,
  Headset,
  MousePointer,
  Lightbulb,
} from "lucide-vue-next";
import { useAuthStore } from "../auth/stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <section>
    <div class="home-page">
      <img src="../assets/logo-portal.png" class="logo" alt="" />
      <div style="display: flex; flex-direction: column; align-items: center; width: 480px;">
      <img src="../assets/dice3.png" alt="" class="logo-png">
      <div class="hello-current"><span>Seja bem vindo(a), <span class="current-hello">{{authStore.currentUser!.firstName}}</span></span></div>
      </div>
      <div :class="{'home-card': authStore.hasBadge('admin') , 'home-card-user': !authStore.hasBadge('admin')}">
        <div class="home">
          <div class="link-list">
            <div
              class="card-link"
              v-if="
                authStore.hasBadge('admin') || authStore.hasBadge('manager')
              "
            >
              <div class="icon-request">
                <RouterLink
                  to="/solicitacoes"
                  style="text-decoration: none; color: black"
                >
                  <div class="card-router">
                    <div class="icons-link">
                      <BookText class="lucide-icon" />
                    </div>
                    <div>
                      <span class="link-title"> Solicitações</span>
                      <p class="link-desc">
                        Acesse a caixa de <br />
                        entrada de solicitações.
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>

            <div
              class="card-link"
              v-if="
                authStore.hasBadge('admin') || authStore.hasBadge('manager')
              "
            >
              <div class="icon-request">
                <RouterLink
                  to="/funcionarios"
                  style="text-decoration: none; color: black"
                >
                  <div class="card-router">
                    <div class="icons-link">
                      <SquareUserRound class="lucide-icon" />
                    </div>
                    <div>
                      <span class="link-title"> Funcionários</span>
                      <p class="link-desc">
                        Acesse a lista de <br />
                        funcionários.
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
            <div class="link-list">
              <div class="card-link">
                <div class="icon-request">
                  <RouterLink
                    to="/solicite"
                    style="text-decoration: none; color: black"
                  >
                    <div class="card-router">
                      <div class="icons-link">
                        <ClipboardPlus class="lucide-icon" />
                      </div>
                      <div>
                        <span class="link-title"> Faça uma solicitação</span>
                        <p class="link-desc">
                          Solicite algum <br />
                          serviço público.
                        </p>
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="link-list" v-if="!authStore.hasBadge('admin')">
              <div class="card-link">
                <div class="icon-request">
                  <RouterLink
                    to="/solicitacoes"
                    style="text-decoration: none; color: black"
                  >
                    <div class="card-router">
                      <div class="icons-link">
                        <Lightbulb class="lucide-icon" />
                      </div>
                      <div>
                        <span class="link-title"> Sugestõess</span>
                        <p class="link-desc">Deixe alguma sugestão.</p>
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          

          <div class="link-list">
            <div class="card-link">
              <div class="icon-request">
                <RouterLink
                  to="/solicitacoes"
                  style="text-decoration: none; color: black"
                >
                  <div class="card-router">
                    <div class="icons-link">
                      <Loader class="lucide-icon" />
                    </div>
                    <div>
                      <span class="link-title"> Status</span>
                      <p class="link-desc">
                        Acompanhe a <br />
                        sua solicitação.
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>

            <div
              class="card-link"
              v-if="
                authStore.hasBadge('admin') || authStore.hasBadge('manager')
              "
            >
              <div class="icon-request">
                <RouterLink
                  to="/funcionarios"
                  style="text-decoration: none; color: black"
                >
                  <div class="card-router">
                    <div class="icons-link">
                      <ChartNoAxesCombined class="lucide-icon" />
                    </div>
                    <div>
                      <span class="link-title"> Dashboard</span>
                      <p class="link-desc">
                        Acompanhar progresso <br />
                        das solicitações.
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>
            <div class="link-list">
              <div class="card-link">
                <div class="icon-request">
                  <RouterLink
                    to="/perfil"
                    style="text-decoration: none; color: black"
                  >
                    <div class="card-router">
                      <div class="icons-link">
                        <User class="lucide-icon" />
                      </div>
                      <div>
                        <span class="link-title"> Perfil</span>
                        <p class="link-desc">
                          Visualize ou <br />
                          edite seu perfil.
                        </p>
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          <div class="link-list">
            <div class="card-link">
              <div class="icon-request">
                <RouterLink
                  to="/solicitacoes"
                  style="text-decoration: none; color: black"
                >
                  <div class="card-router">
                    <div class="icons-link">
                      <Headset class="lucide-icon" />
                    </div>
                    <div>
                      <span class="link-title"> Ouvidoria</span>
                      <p class="link-desc">
                        Fale com um <br />
                        suporte.
                      </p>
                    </div>
                  </div>
                </RouterLink>
              </div>
            </div>

            <div class="card-link">
              <div class="icon-request">
                <a
                  
                  href="https://www.pmvc.ba.gov.br/"
                  target="_blank"
                  to="/funcionarios"
                  style="text-decoration: none; color: black"
                >
                  <div class="card-router">
                    <div class="icons-link">
                      <MousePointer class="lucide-icon" />
                    </div>
                    <div>
                      <span class="link-title"> Site Oficial</span>
                      <p class="link-desc">
                        Clique para acessar <br />
                        o site oifical PMVC.
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div class="link-list" v-if="authStore.hasBadge('admin') || authStore.hasBadge('manager')">
              <div class="card-link">
                <div class="icon-request">
                  <RouterLink
                    to="/solicitacoes"
                    style="text-decoration: none; color: black"
                  >
                    <div class="card-router">
                      <div class="icons-link">
                        <Lightbulb class="lucide-icon" />
                      </div>
                      <div>
                        <span class="link-title"> Sugestões</span>
                        <p class="link-desc">Deixe alguma sugestão.</p>
                      </div>
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
section {
  display: flex;
  font-family: "Inter", sans-serif;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding-top: 50px;
}
.logo {
  width: 40%;
}

.hello-current{

  opacity: 0%;
  padding-bottom: 40px;
  position: relative;
  animation-name: TextDown;
  animation-duration: 0.9s;
  animation-delay: 0.3s ;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  font-family:  'Montserrat', sans-serif;
  font-size: 30px;
  font-weight: 200;
  color: #003eaa;
 
}
.logo-png{
  width: 10%;
  position: relative;
  animation-name: DiceDown;
  animation-duration: 5s;
  animation-delay: 0s;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.210, 0.345, 0.145);
}

@keyframes DiceDown{
  0%    {opacity: 0%; right: 180px; top: -1000px; transform: rotate(0deg);}
  25%   {opacity: 100%; right: 180px; top: 0px; transform: rotate(0deg);}
  100%  {opacity: 0%; right: -180px; top: 0px; transform: rotate(720deg);}
 
}

@keyframes TextDown {
  from {opacity: 0%;top: -20px;}
  to   {opacity: 100%;top:0px;}
}

.current-hello{
  opacity: 0%;
  padding-bottom: 40px;
  position: relative;
  animation-name: TextDown;
  animation-duration: 0.4s;
  animation-delay: 0.8s ;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
  animation-timing-function: ease-in-out;
  font-family:  'Montserrat', sans-serif;
  font-size: 30px;
  font-weight: 600;
  color: #488AFF;
 
}

.home-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.home {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1200px;
  gap: 24px;
}
.card-router {
  display: flex;
  align-items: self-end;
  gap: 18px;
  width: 300px;
  border-radius: 10px;
  padding: 8px;
  transition: ease 0.4s;
}
.card-router:hover {
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.144);
  background-color: white;
}
.home-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
  width: 1100px;
  height: 500px;
  background-color: #fcfcfc;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.158);
}
.home-card-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
  width: 1100px;
  height: 370px;
  background-color: #fcfcfc;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.158);
}
.icons-link:hover {
  color: white;
  transition: background 0.2s ease;
}
.icons-link {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: linear-gradient(rgb(0, 162, 255), blue);
  width: 100px;
  height: 100px;
  border-radius: 10px;
  color: white;
}
.link-title {
  font-weight: 600;
}
.link-desc {
  font-weight: 200;
}
.card-link {
  display: flex;
  flex-direction: row;
  gap: 18px;
  align-items: self-end;
  border: 1px solid rgba(215, 215, 215, 0.527);
  border-radius: 10px;
}
.lucide-icon {
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease-in-out;
}
.link-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.card-router:hover .lucide-icon {
  transform: scale(1.25);
}
</style>
