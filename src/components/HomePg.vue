<script setup lang="ts">
import { RouterLink } from "vue-router";
import { BookText, SquareUserRound, ClipboardPlus } from "lucide-vue-next";
</script>

<template>
  <section>
    <div class="home-card">
      <div class="link-list">
        <div class="card-link">
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
                    Acesse a caixa de <br> entrada de solicitações. 
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <div class="card-link">
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
              to="/solicitacoes"
              style="text-decoration: none; color: black"
            >
              <div class="card-router">
                <div class="icons-link">
                  <SquareUserRound class="lucide-icon" />
                </div>
                <div>
                  <span class="link-title"> Faça uma solicitação</span>
                  <p class="link-desc">
                    Solicite algum serviço público.
                  </p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
        </div>
      </div>
      <div></div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  font-family: "Inter", sans-serif;
  justify-content: center;
  align-items: center;
  align-content: center;
  padding-top: 50px;
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
  background-color: rgb(236, 236, 236);
}
.home-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 40px;
  width: 1100px;
  height: 640px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.315);
}
.icons-link:hover {
  background: linear-gradient(rgb(1, 133, 209), rgb(1, 1, 189));
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
  border: 1px solid rgb(215, 215, 215);
  border-radius: 10px;
}
.lucide-icon {
  width: 30px;
  height: 30px;
  transition: transform 0.3s ease-in-out;
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
