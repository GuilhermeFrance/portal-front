import { defineStore } from "pinia";
import { ref } from "vue";

interface Alert{
    id: number;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    timeout: number;
}

export const useAlertStore = defineStore("alert", () => {
    const alerts = ref<Alert[]>([]);
    let nextId = 0;
    
    function showAlert(message: string, type: Alert['type'] = 'info', timeout: number){
        const id = nextId++;
        const newAlert: Alert = {id, message, type, timeout};

        alerts.value.push(newAlert);

        setTimeout(() => {
            removeAlert(id);
        }, timeout);
    }

    function removeAlert(id: number){
        alerts.value = alerts.value.filter(alert => alert.id !== id);
    }

    return { alerts, showAlert, removeAlert}
} )