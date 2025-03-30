<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

// 使用Pinia作为本地缓存
const authStore = useAuthStore();
const router = useRouter();

const dialogVisible =defineModel();

const loginForm = ref({
  username: '',
  password: ''
});

const handleLogin = async () => {
  try {
    await authStore.loginUser({
      username: loginForm.value.username,
      password: loginForm.value.password,
    })
    console.log('Login successful');
  } catch (error) {
    console.log(error);
  } finally {
    dialogVisible.value = false; // 登录成功后关闭弹窗
    await router.push('/');
  }
}

const handleRegister = async () => {
  try {
    await authStore.registerUser({
      username: username.value,
      password: password.value,
    })
    console.log('Register successful');
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}

const handleClose = () => {
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
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>