<script setup>
import { ref } from 'vue';
import { register, login, getProfile } from '@/utils/auth.js';

const username = ref('');
const password = ref('');
const profile = ref(null);

const handleRegister = async () => {
  try {
    await register(username.value, password.value);
    alert('注册成功');
  } catch (error) {
    alert('注册失败');
  }
};

const handleLogin = async () => {
  try {
    await login(username.value, password.value);
    alert('登录成功');
  } catch (error) {
    alert('登录失败');
  }
};

const fetchProfile = async () => {
  try {
    const response = await getProfile();
    profile.value = response.data;
  } catch (error) {
    alert('获取用户信息失败');
  }
};
</script>

<template>
  <div>
    <h2>用户登录 / 注册</h2>
    <input v-model="username" placeholder="用户名" />
    <input v-model="password" type="password" placeholder="密码" />
    <button @click="handleRegister">注册</button>
    <button @click="handleLogin">登录</button>

    <h3>用户信息</h3>
    <button @click="fetchProfile">获取用户信息</button>
    <p v-if="profile">用户名: {{ profile.username }}</p>
  </div>
</template>
