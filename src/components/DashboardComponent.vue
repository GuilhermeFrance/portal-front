<script setup lang="ts">
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import type { DashboardRequest } from "../interfaces/DashboardRequest";

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const Requests = ref<DashboardRequest[]>([]);
const API_LINK = "http://localhost:3000/requests/api/dashboard";
let chartInstance: Chart | null = null;

async function handleDashboardInfos() {
  try {
    const response = await axios.get(API_LINK);
    Requests.value = response.data;
    console.log("Dados recebidos:", response.data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
}

function createChart() {
  const ctx = document.getElementById("myChart") as HTMLCanvasElement;

  if (ctx && Requests.value.length > 0) {
    // Destroi o chart anterior se existir
    if (chartInstance) {
      chartInstance.destroy();
    }

    const config = {
      type: "doughnut" as const,
      data: {
        labels: Requests.value.map((item) => item.statusKey.toUpperCase()),
        datasets: [
          {
            label: " Quantidade ",
            data: Requests.value.map((item) => item._count),
            borderWidth: 1,
            backgroundColor: ["#eaa468", "#6897ea", "#68ea76", "#ea6868"],
            borderColor: "#ffffff",
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Dashboard de Requests",
            color: "#333",
          },
          legend: {
            position: "bottom" as const,
          },
        },
        cutout: "70%",
        radius: "90%",
      },
    };

    chartInstance = new Chart(ctx, config);
  }
}

// Watch para reagir às mudanças nos dados
watch(
  Requests,
  (newRequests) => {
    if (newRequests.length > 0) {
      createChart();
    }
  },
  { deep: true }
);

onMounted(() => {
  handleDashboardInfos();
});
</script>

<template>
  <section>
    <div class="main-content">
      <span class="title">Dashboard</span>
      <div class="boxDashboard">
        <div class="dashboard">
          <canvas id="myChart"> </canvas>
        </div>
        <div class="modal-dashboard">
          <div class="type-card" v-for="request in Requests">
            <div class="title-status">
              <span>Status:</span>
              <span :class="{
                        isOpen: request.statusKey === 'aberto',
                        Processing: request.statusKey === 'processando',
                        Conclused: request.statusKey === 'concluido',
                        Rejected: request.statusKey === 'rejeitado',
                      }">{{ request.statusKey.toUpperCase() }}</span>
            </div>
             <div class="title-status">
              <span>Quantidade:</span>
              <span>{{ request._count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}

.main-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 1100px;
  height: 600px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 2px 2px 32px 2px rgba(66, 66, 66, 0.068);
}

.title {
  font-size: 40px;
  font-weight: 600;
  padding-left: 20px;
}

.dashboard {
  padding-top: 60px;
  width: 400px;
}
.boxDashboard {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  gap: 100px;
}
.modal-dashboard {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  padding: 10px;
  gap: 10px;
  height: 400px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 1px 1px 15px 1px rgb(228, 228, 228);
}
.type-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 40px;
  width: 400px;
  height: 80px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  border-radius: 20px;
  transition: 0.3s ease;
}
.type-card:hover{
  background-color: rgba(230, 230, 230, 0.541);
}
.title-status{
  display: flex;
  gap: 10px;
  font-weight: 300;
}

.isOpen {
  color: rgb(255, 153, 0);
}
.Processing {
  color: rgb(0, 140, 233);
}
.Conclused {
  color: green;
}
.Rejected {
  color: rgb(189, 0, 0);
}
</style>
