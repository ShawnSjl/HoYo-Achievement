<script setup>
import {computed, ref} from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { showWarn, showSuccess, showError} from "@/utils/notification";

// 使用Pinia作为本地缓存
const authStore = useAuthStore();

const loginDialogVisible = ref(false);

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
  loginDialogVisible.value = false;
}
</script>

<template>
  <el-button round plain type="primary" @click="loginDialogVisible = true">
    登录
  </el-button>

  <div class="login-dialog">
    <el-dialog
        v-model="loginDialogVisible"
        title="登录"
        :before-close="handleClose"
        class="login-dialog"
    >
      <div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          status-icon
          label-width="auto"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :disabled="!allFilled" @click="handleLogin" style="margin-left: 10px">登录</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.login-dialog :deep(.el-dialog) {
  min-width: 300px;
  max-width: 500px;
}

.login-dialog :deep(.el-dialog__title) {
  font-weight: bold;
}
</style>