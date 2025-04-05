<script setup>
import {computed, ref} from "vue";

const passwordChangeDialogVisible = ref(false);

const passwordChangeForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

const allFilled = computed( () => {
  return passwordChangeForm.value.oldPassword !== ''
      && passwordChangeForm.value.newPassword !== ''
      && passwordChangeForm.value.confirmPassword !== '';
})

const handleClose = () => {
  passwordChangeForm.value.oldPassword = ''
  passwordChangeForm.value.newPassword = ''
  passwordChangeForm.value.confirmPassword = ''
  passwordChangeDialogVisible.value = false;
}
</script>

<template>
  <el-button round plain type="primary" @click="passwordChangeDialogVisible = true">
    修改密码
  </el-button>

  <div class="login-dialog">
    <el-dialog
        v-model="passwordChangeDialogVisible"
        title="更改密码"
        :before-close="handleClose"
        class="login-dialog"
    >
      <div>
        <el-form
            ref="loginFormRef"
            :model="passwordChangeForm"
            status-icon
            label-width="auto"
        >
          <el-form-item label="旧密码" prop="username">
            <el-input v-model="passwordChangeForm.oldPassword" type="password" />
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="passwordChangeForm.newPassword" type="password" />
          </el-form-item>
          <el-form-item label="确认新密码" prop="password">
            <el-input v-model="passwordChangeForm.confirmPassword" type="password" />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :disabled="!allFilled" style="margin-left: 10px">更改密码</el-button>
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