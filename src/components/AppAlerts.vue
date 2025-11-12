<script setup lang="ts">
import { TransitionGroup } from 'vue';
import { useAlertStore } from '../auth/stores/alertStore';
import { X } from 'lucide-vue-next';

const store = useAlertStore();

function getClass(type: string){
    switch(type){
        case 'success': return 'alert-success';
        case 'error': return 'alert-error';
        case 'warning': return 'alert-warning';
        case 'alert': return 'alert'
        case 'all-ok': return 'all-ok'
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
        <p style="font-weight: 800;">{{ alert.message }}</p>
        <button @click="store.removeAlert(alert.id)" title="fechar" style="background:  none; border: none; cursor: pointer;"><span style="color: white;"><X/></span></button>
        </div>
    </TransitionGroup>
    </div>
</template>

<style scoped>

.alerts-container {
  position: fixed; 
  bottom: 30px;
  right: 30px;
  z-index: 2000; 
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.app-alert {
  padding: 15px 20px;
  border-radius: 8px;
  max-width: 400px;
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

.alert-success { background-color: #4CAF50; } 
.alert-error { background-color: #f44336; } 
.alert-warning { background-color: #ff9800; } 
.alert-info { background-color: #2196F3; } 
.alert{background: #FF00E6;
background: linear-gradient(90deg,rgba(255, 0, 230, 1) 0%, rgba(0, 206, 247, 1) 100%);}
.all-ok{background: #7f06cf;
background: linear-gradient(90deg,rgba(127, 6, 207, 1) 35%, rgba(0, 12, 140, 1) 100%);}

.alert-transition-enter-active,
.alert-transition-leave-active {
  transition: all 0.6s ease;
}

.alert-transition-enter-from,
.alert-transition-leave-to {
  opacity: 0;
  transform: translateX(100%); 
}

</style>