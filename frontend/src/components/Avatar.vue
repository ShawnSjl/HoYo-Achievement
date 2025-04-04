<script setup>
import {computed, ref} from 'vue';
import Zzz from '@/assets/image/zzz.png'
import {useAuthStore} from "@/stores/authStore";
import ProfilePopover from '@/components/ProfilePopover.vue'
import LoginDialog from "@/components/LoginDialog.vue";
import RegisterDialog from "@/components/RegisterDialog.vue";

const authStore = useAuthStore();

const loginDialogVisible = ref(false);
const registerDialogVisible = ref(false);

const userName = computed(() => {return authStore.getUserName()})
</script>

<template>
  <el-popover
    placement="right"
    width="300"
    trigger="click">

    <template #reference>
      <div class="avatar-container">
        <el-avatar size="large" :src="Zzz" />
        <div class="avatar-side">
          <p class="avatar-username">{{userName}}</p>
        </div>
      </div>
    </template>

    <template #default>
      <profile-popover
          v-model:loginDialogVisible=loginDialogVisible
          v-model:registerDialogVisible=registerDialogVisible
      />
    </template>
  </el-popover>

  <login-dialog v-model="loginDialogVisible" @close="loginDialogVisible = false" />
  <register-dialog v-model="registerDialogVisible" @close="registerDialogVisible = false" />
</template>

<style scoped>
.avatar-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  background-color: rgba(158, 157, 157, 0.36);
  border-radius: 28px;
  border: 1px solid rgba(113, 107, 107, 0.41);
}

.avatar-side {
  margin-left: 8px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}

.avatar-username {
  font-size: 16px;
  font-weight: bold;
  color: #ededed;
}

::v-deep(p) {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>