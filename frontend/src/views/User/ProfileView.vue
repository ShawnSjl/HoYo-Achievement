<script setup>
import {ref, computed, onMounted, watch} from "vue";
import DefaultAvatar from '@/assets/image/zzz.png'
import {useAuthStore} from "@/stores/authStore";
import {useZzzAchievementStore} from "@/stores/zzzAchievementsStore";
import {showError, showInfo} from "@/utils/notification";
import ProfileSettingButton from "@/views/User/ProfileSettingButton.vue";
import LoginButton from "@/components/LoginButton.vue";
import LogoutButton from "@/components/LogoutButton.vue";
import RegisterButton from "@/components/RegisterButton.vue";
import ProfileCardsLayout from "@/views/User/ProfileCardsLayout.vue";

// 使用Pinia作为本地缓存
const authStore = useAuthStore();
const zzzAchievementStore = useZzzAchievementStore()

const isLoggedIn = computed(() => {return authStore.isAuthenticated()})

// 同步数据
const fetchData = async () => {
  try {
    authStore.loadUser();
    await zzzAchievementStore.updateAchievements();
  } catch (e) {
    showError('Load data failed');
  }
};
onMounted(() => {
  fetchData();
});

// 获取用户名，并处理用户登录登出
const userName = computed(() => {return authStore.getUserName()})
watch(userName, async (newUserName) => {
  console.log(newUserName);
  await fetchData();
});
</script>

<template>
  <div class="profile-bg">
    <div class="profile-content">

      <div class="profile-header">
        <div class="profile-header-start">
          <el-avatar size="large" :src="DefaultAvatar" />
          <div class="profile-info">
            <h2>{{ userName }}</h2>
          </div>
        </div>

        <div class="profile-header-end">
          <div v-if="isLoggedIn" class="profile-header-end">
            <logout-button style="margin-left: 20px" />
            <profile-setting-button />
          </div>
          <div v-else class="profile-header-end">
            <register-button style="margin-left: 20px" />
            <login-button/>
          </div>
        </div>
      </div>

      <el-divider></el-divider>

      <div class="profile-statistic">
        <profile-cards-layout style="margin-left: 15px" />
      </div>
    </div>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.profile-bg {
  background-color: #f6f6f6;
  height: 100%;
  width: 100%;
  z-index: -1;
  inset: 0;
  position: fixed;
}

.profile-content {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-header {
  padding-top: 20px;
  width: 70%;
  justify-self: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.profile-header-start {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.profile-header-end{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.profile-info {
  margin-left: 30px;
  justify-self: center;
}

.profile-statistic {
  width: 85%;
  justify-self: center;
}
</style>