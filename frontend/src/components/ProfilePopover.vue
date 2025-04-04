<script setup>
import {ref, computed} from "vue";
import {useAuthStore} from "@/stores/authStore";
import router from "@/router";
import { showInfo } from "@/utils/notification";

const authStore = useAuthStore();

const loginDialogVisible = defineModel('loginDialogVisible');

const isLoggedIn = computed(() => {return authStore.isAuthenticated()})

const handleRegister = () => {
  showInfo('游客注册功能已关闭', '请联系网站管理员添加用户')
}

const handleProfile = () => {
  router.push({ path: '/space' });
}
</script>

<template>
  <div v-if="!isLoggedIn" class="profile-popover">
    <el-button round plain type="primary" @click="loginDialogVisible = true" class="profile-popover-button">
      登录
    </el-button>
    <el-button round plain type="primary" @click="handleRegister" class="profile-popover-button">
      注册
    </el-button>
  </div>
  <div v-else class="profile-popover">
    <el-button round plain type="primary" @click="handleProfile" class="profile-popover-button">
      个人空间
    </el-button>
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