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

// 正则表达式：禁止输入包含特殊字符
const passwordCharPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{}]{8,50}$/;

// 表单规则
const confirmValidator = (rule, value, callback) => {
  if (value !== passwordChangeForm.newPassword) {
    callback(new Error('两次密码不一致'))
  } else {
    callback()
  }
}
const rules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: ['blur', 'change'] },
    {
      pattern: passwordCharPattern,
      message: '密码格式错误，需包含字母和数字，可包含部分特殊字符',
      trigger: ['blur', 'change']
    }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: ['blur', 'change'] },
    { min: 8, max: 50, message: '长度在8到50个字符', trigger: ['blur', 'change'] },
    {
      pattern: passwordCharPattern,
      message: '密码格式错误，需包含字母和数字，可包含部分特殊字符',
      trigger: ['blur', 'change']
    }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: ['blur', 'change'] },
    { min: 8, max: 50, message: '长度在8到50个字符', trigger: ['blur', 'change'] },
    {
      pattern: passwordCharPattern,
      message: '密码格式错误，需包含字母和数字，可包含部分特殊字符',
      trigger: ['blur', 'change']
    },
    { validator: confirmValidator, trigger: ['blur', 'change'] },
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
            @keyup.enter.native="submitForm"
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