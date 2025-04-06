<script setup>
import {computed, reactive, ref} from "vue";
import {changePassword} from "@/api/user";
import {showError, showSuccess} from "@/utils/notification";

const passwordChangeDialogVisible = ref(false);

const formRef = ref(null);

// 表单对象
const passwordChangeForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});

// 表单规则
const pwdValidator = (rule, value, callback) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/
  if (!regex.test(value)) {
    callback(new Error('密码需包含大小写字母以及数字'))
  } else {
    callback()
  }
}
const comfirmValidator = (rule, value, callback) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,24}$/
  if (!regex.test(value)) {
    callback(new Error('密码需包含大小写字母以及数字'))
  }
  else if (value !== passwordChangeForm.newPassword) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
const rules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: ['blur', 'change'] },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: ['blur', 'change'] },
    { min: 8, max: 24, message: '长度在8到24个字符', trigger: ['blur', 'change'] },
    { validator: pwdValidator, trigger: ['blur', 'change'] },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: ['blur', 'change'] },
    { min: 8, max: 24, message: '长度在8到24个字符', trigger: ['blur', 'change'] },
    { validator: comfirmValidator, trigger: ['blur', 'change'] },
  ],
}

const handleClose = () => {
  formRef.value.resetFields()
  passwordChangeDialogVisible.value = false;
}

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      handleSubmit()
    } else {
      showError('请正确填写密码')
    }
  })
}
const handleSubmit = async () => {
  try {
    const credentials = { password: passwordChangeForm.oldPassword, newPassword: passwordChangeForm.newPassword }
    await changePassword(credentials);

    showSuccess('更改密码成功');
    handleClose();
  } catch (error) {
    showError('更改密码失败', error);
  }
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
            ref="formRef"
            :model="passwordChangeForm"
            :rules="rules"
            label-width="auto"
        >
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="passwordChangeForm.oldPassword" type="password" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passwordChangeForm.newPassword" type="password" />
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input v-model="passwordChangeForm.confirmPassword" type="password" />
          </el-form-item>
        </el-form>
      </div>

      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" style="margin-left: 10px" @click="submitForm">更改密码</el-button>
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