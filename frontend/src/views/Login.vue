<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    await authStore.loginUser({
      username: username.value,
      password: password.value,
    })
    console.log('Login successful');
    router.push('/');
  } catch (error) {
    console.log(error);
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

</script>

<template>
  <div>
    <h2>用户登录 / 注册</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <button @click="handleRegister">注册</button>
    <button @click="handleLogin">登录</button>
  </div>
</template>

<style scoped>

</style>