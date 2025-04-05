<script setup>
import {ref, computed} from "vue";
import {useAuthStore} from "@/stores/authStore";
import LoginButton from "@/components/LoginButton.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import RegisterButton from "@/components/RegisterButton.vue";

const authStore = useAuthStore();

const isLoggedIn = computed(() => {return authStore.isAuthenticated()})
</script>

<template>
  <div v-if="!isLoggedIn" class="avatar-popover">
    <login-button />
    <register-button style="margin-top: 10px"/>
  </div>
  <div v-else class="avatar-popover">
    <logout-button />
  </div>
</template>

<style scoped>
.avatar-popover {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

::v-deep(.el-button+.el-button) {
  margin-left: 0;
}
</style>