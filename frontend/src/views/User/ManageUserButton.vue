<script setup>
import {computed, ref, watch} from "vue";
import {showError} from "@/utils/notification";
import {getAllUsers} from "@/api/user";
import AddUserButton from "@/views/User/AddUserButton.vue";
import {useAuthStore} from "@/stores/authStore";

// 使用Pinia作为本地缓存
const authStore = useAuthStore();

const manageDialogVisible = ref(false);
const allUsers = ref([]);
const needToUpdate = ref(false);

const formatTime = (time) => {
  return new Date(time).toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false
  });
}

const fetchAllUsers = async () => {
  try {
    const response = await getAllUsers();
    allUsers.value = response.users;
  } catch (e) {
    showError('获取用户列表失败', e);
    authStore.loadUser()
  } finally {
    needToUpdate.value = false;
  }
}

watch(needToUpdate, () => {
  if (needToUpdate.value) {
    fetchAllUsers();
  }
})
</script>

<template>
  <el-button round plain type="warning" @click="manageDialogVisible = true; fetchAllUsers()" style="margin-top: 10px">
    管理用户
  </el-button>

  <div class="manage-dialog">
    <el-dialog
      v-model="manageDialogVisible"
      title="管理用户"
      @close="manageDialogVisible = false"
      class="manage-dialog">
      <div>
        <el-table :data="allUsers" max-height="400" style="margin-bottom: 10px">
          <el-table-column label="ID" prop="user_id" width="50" />
          <el-table-column label="用户名" prop="username" width="300" />
          <el-table-column label="权限" prop="role" width="150" />
          <el-table-column label="创建时间" prop="created_at" width="270">
            <template #default="{ row }">
              {{ formatTime(row.created_at) }}
            </template>
          </el-table-column>
        </el-table>
        <add-user-button v-model="needToUpdate"/>
      </div>
    </el-dialog>

  </div>
</template>

<style scoped>
.manage-dialog :deep(.el-dialog) {
  min-width: 300px;
  max-width: 810px;
}

.manage-dialog :deep(.el-dialog__title) {
  font-weight: bold;
}
</style>