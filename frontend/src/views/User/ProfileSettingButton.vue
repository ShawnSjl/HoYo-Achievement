<script setup>
import {ref, computed} from "vue";
import PasswordChangeButton from "@/views/User/ChangePasswordButton.vue";
import DeleteAccountButton from "@/views/User/DeleteAccountButton.vue";

const isAdmin = computed(() => {
  const role = JSON.parse(localStorage.getItem("user")).role
  return role === "admin";
})
</script>

<template>
  <el-popover
      placement="bottom"
      width="200"
      trigger="click">

    <template #reference>
      <el-button round plain type="primary">
        设置
      </el-button>
    </template>

    <template #default>
      <div class="profile-popover">
        <password-change-button/>
        <delete-account-button/>
      </div>
      <div v-if="isAdmin" class="profile-popover">
        <el-button round plain type="danger" class="profile-popover-button">
          管理用户列表
        </el-button>
      </div>
    </template>
  </el-popover>
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