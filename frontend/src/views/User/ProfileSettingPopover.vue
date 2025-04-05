<script setup>
import {ref, computed} from "vue";

const isAdmin = computed(() => {
  const role = JSON.parse(localStorage.getItem("user")).role
  return role === "admin";
})
</script>

<template>
  <div class="profile-popover">
    <el-button round plain type="primary" class="profile-popover-button">
      修改密码
    </el-button>
    <el-button round plain type="danger" class="profile-popover-button">
      注销账号
    </el-button>
  </div>
  <div v-if="isAdmin" class="profile-popover">
    <el-button round plain type="danger" class="profile-popover-button">
      管理用户列表
    </el-button>
  </div>
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