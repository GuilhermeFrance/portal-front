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
        labels: Requests.value.map((item) => item.statusKey),
        datasets: [
          {
            label: "Requests por Status",
            data: Requests.value.map((item) => item._count),
            borderWidth: 1,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
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
        cutout: "60%",
        radius: "80%",
      },
    };

    chartInstance = new Chart(ctx, config);
  }
}

// Watch para reagir às mudanças nos dados
watch(Requests, (newRequests) => {
  if (newRequests.length > 0) {
    createChart();
  }
}, { deep: true });

onMounted(() => {
  handleDashboardInfos();
});
</script>

<template>
  <section>
    <div class="main-content">
      <div>
        <canvas id="myChart"> </canvas>
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
  padding: 20px;
  width: 1200px;
  height: 600px;
  background-color: rgb(255, 255, 255);
  border-radius: 30px;
  box-shadow: 2px 2px 32px 2px rgba(66, 66, 66, 0.068);
}
</style>
