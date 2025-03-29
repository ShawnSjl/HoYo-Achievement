<script>
import {login, register} from '@/api/user';

export default {
  data () {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleLogin () {
      try {
        const response = await login({
          username: this.username,
          password: this.password,
        });

        if (response.token) {
          localStorage.setItem('jwt_token', response.token);
          this.$router.push('/');
        }
      } catch (error) {
        console.log("Login failed:", error);
        alert("Login failed, invalid username or password.");
      }
    },
    async handleRegister () {
      try {
        const response = await register({
          username: this.username,
          password: this.password,
        });

        if (response.token) {
          localStorage.setItem('jwt_token', response.token);
          this.$router.push('/');
        }
      } catch (error) {
        console.log("Register failed:", error);
        alert("Register failed, please try another username.");
      }
    }
  },
};
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