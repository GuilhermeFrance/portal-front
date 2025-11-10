<script setup lang="ts">
import { X } from "lucide-vue-next";
import type { ImageDto } from "../interfaces/ImageDto";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useAuthStore } from "../auth/stores/auth";
const image = ref<ImageDto[]>([]);

const selectedId = ref<number | null>(null)
const emit = defineEmits<{(e: "close-pick") : void; (e: "avatar-selected", payload: {id: number; url: string}): void;}>()
const API_PICK_URL = "http://localhost:3000/avatars/all";
const API_CLIENT = "http://localhost:3000/clients/id"
const authStore = useAuthStore()


async function fetchImages() {
  try {
    const response = await axios.get<ImageDto[]>(API_PICK_URL);
    image.value = response.data;
    console.log(response);
    console.log(response.data)
  } catch (error) {
    console.log("Erro ao puxar as imagens", error);
  }
}
async function updateProfileImage(imageId: number){
  try {
    await axios.patch(`${API_CLIENT}/${authStore.currentUser?.id}`, { profileImageId: imageId
    }, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    
    })
    if(authStore.currentUser){authStore.currentUser!.profileImageId = imageId;}
    
  } catch (error) {
    
  }
}
function handleClose() {
  emit("close-pick");
}
onMounted(fetchImages);
</script>

<template>
  <div class="modal-background" @click.self="handleClose">
    <div class="card">
      <div class="header">
        <span class="header-title">Escolha um avatar</span>
        <span @click="handleClose" style="cursor: pointer"><X /></span>
      </div>

      <div class="card-imgs">
        <!-- <img src="../assets/icon.png" alt="" />
        <img src="../assets/icon2.png" alt="" />
        <img src="../assets/icon3.png" alt="" /> -->
        <template v-if="image.length">
          <div
            v-for="avatar in image"
            :key="avatar.id"
            class="images-selector"
            :value="avatar.id"
            :class="{ selected: selectedId === avatar.id }"
            @click="updateProfileImage(avatar.id)"
          >
            <img :src="avatar.url" :alt="avatar.url">
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-background {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 750px;
  padding: 20px;
  font-family: "Inter", sans-serif;
}
.images-selector{
    display: flex;
    justify-content: center;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 0px;
  width: 800px;
  height: 400px;
  border-radius: 20px;
  background: rgb(255, 255, 255);
}

.card-imgs {
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0px;
  cursor: pointer;
}
img {
  width: 70%;

  transition: 0.2s ease;
}

img:hover {
  -webkit-filter: drop-shadow(2px 2px 2px #a8a8a8);
  filter: drop-shadow();
}
</style>
