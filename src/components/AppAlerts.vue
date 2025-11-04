<script setup lang="ts">
import { TransitionGroup } from 'vue';
import { useAlertStore } from '../auth/stores/alertStore';

const store = useAlertStore();

function getClass(type: string){
    switch(type){
        case 'success': return 'alert-success';
        case 'error': return 'alert-error;';
        case 'warning': return 'alert-warining';
        default: return 'alert-info'
    }
}
</script>
<template>
    <div class="alerts-container">
    <TransitionGroup name="alert-transition">
        <div
        v-for="alert in store.alerts"
        :key="alert.id"
        :class="['app-alert', getClass(alert.type)]"
        >
        <p>{{ alert.message }}</p>
        <button @click="store.removeAlert(alert.id)">x</button>
        </div>
    </TransitionGroup>
    </div>
</template>

<style scoped>

.alerts-container {
  position: fixed; /* Fixa o container na tela */
  top: 20px;
  right: 20px;
  z-index: 2000; /* Garante que fique acima de tudo */
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.app-alert {
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 300px;
  font-family: Arial, sans-serif;
  color: white;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  margin-left: 15px;
}

/* ⭐️ ESTILOS DE CORES ⭐️ */
.alert-success { background-color: #4CAF50; } /* Verde */
.alert-error { background-color: #f44336; } /* Vermelho */
.alert-warning { background-color: #ff9800; } /* Laranja */
.alert-info { background-color: #2196F3; } /* Azul */

/* ⭐️ ANIMAÇÃO DE ENTRADA/SAÍDA ⭐️ */
/* Usa o componente TransitionGroup */
.alert-transition-enter-active,
.alert-transition-leave-active {
  transition: all 0.5s ease;
}

.alert-transition-enter-from,
.alert-transition-leave-to {
  opacity: 0;
  transform: translateX(100%); /* Faz o alerta deslizar da direita */
}

/* Para garantir que elementos que saem não interfiram no layout */
.alert-transition-leave-active {
  position: absolute;
}
</style>