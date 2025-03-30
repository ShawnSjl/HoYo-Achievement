<script setup>
import {computed, ref} from 'vue';
import DefaultAvatar from '@/assets/avatar.png'
import {useAuthStore} from "@/stores/authStore";
import LoginDialog from '@/views/User/Login.vue'

const authStore = useAuthStore();

const userName = computed(() => {return authStore.getUserName()})

const dialogVisible = ref(false)
</script>

<template>
  <div class="avatar-container" @click="dialogVisible = true">
    <el-avatar size="large" :src="DefaultAvatar" />
    <div class="avatar-side">
      <p class="avatar-username">{{userName}}</p>
      <span class="avatar-note">点击登录</span>
    </div>
  </div>

  <login-dialog v-model="dialogVisible" @close="dialogVisible = false" />

</template>

<style scoped>
.avatar-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  background-color: rgba(172, 171, 171, 0.41);
  border-radius: 26px;
}

.avatar-side {
  margin-left: 8px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.avatar-username {
  font-size: 16px;
  font-weight: bold;
}

.avatar-note {
  font-size: 13px;
  font-weight: initial;
}

::v-deep(p) {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>