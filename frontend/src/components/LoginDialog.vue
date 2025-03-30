<script setup>
import {computed, ref} from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { showWarn, showSuccess, showError} from "@/utils/notification";

// 使用Pinia作为本地缓存
const authStore = useAuthStore();

const dialogVisible =defineModel();

const loginForm = ref({
  username: '',
  password: ''
});

const allFilled = computed( () => {
  return loginForm.value.username !== '' && loginForm.value.password !== '';
})

const handleLogin = async () => {
  try {
    await authStore.loginUser({
      username: loginForm.value.username,
      password: loginForm.value.password,
    })
    showSuccess('登录成功');
    handleClose();
  } catch (error) {
    showError('登录失败', error);
  }
}

const handleClose = () => {
  loginForm.value.username = ''
  loginForm.value.password = ''
  dialogVisible.value = false;
}
</script>

<template>
  <el-dialog
      v-model="dialogVisible"
      title="登录"
      width="30%"
      :before-close="handleClose"
  >
    <div>
      <el-input v-model="loginForm.username" placeholder="用户名" />
      <el-input v-model="loginForm.password" placeholder="密码" type="password" />
    </div>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :disabled="!allFilled" @click="handleLogin">登录</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>