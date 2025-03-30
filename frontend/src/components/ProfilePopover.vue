<script setup>
import {ref, computed} from "vue";
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore();

const loginDialogVisible = defineModel('loginDialogVisible');
const registerDialogVisible = defineModel('registerDialogVisible');

const isLoggedIn = computed(() => {return authStore.isAuthenticated()})
</script>

<template>
  <div v-if="!isLoggedIn" class="profile-popover">
    <el-button round plain type="primary" @click="loginDialogVisible = true" class="profile-popover-button">
      登录
    </el-button>
    <el-button round plain type="primary" @click="registerDialogVisible = true" class="profile-popover-button">
      注册
    </el-button>
  </div>
  <div v-else class="profile-popover">
<!--    <el-button round plain type="primary" class="profile-popover-button">-->
<!--      简介-->
<!--    </el-button>-->
    <el-button round plain type="danger" @click="authStore.logoutUser()" class="profile-popover-button">
      退出登录
    </el-button>
  </div>
</template>

<style scoped>
.profile-popover {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}

.profile-popover-button {
  flex: 1;
  max-width: 100px;
  margin-top: 10px;
}

::v-deep(.el-button+.el-button) {
  margin-left: 0;
}
</style>