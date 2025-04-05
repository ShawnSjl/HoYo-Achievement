<script setup>
import {ref, computed, onMounted, watch} from "vue";
import DefaultAvatar from '@/assets/image/zzz.png'
import {useAuthStore} from "@/stores/authStore";
import {useZzzAchievementStore} from "@/stores/zzzAchievementsStore";
import {showError, showInfo} from "@/utils/notification";
import ZzzAchievementStatistic from "@/views/User/ZzzStatistic.vue"
import SrAchievementStatistic from "@/views/User/SrStatistic.vue"
import AnnouncementCard from "@/views/User/AnnouncementCard.vue";
import EmptyCard from "@/views/User/EmptyCard.vue";
import LoginDialog from "@/components/LoginDialog.vue";

// 使用Pinia作为本地缓存
const authStore = useAuthStore();
const zzzAchievementStore = useZzzAchievementStore()

const loginDialogVisible = ref(false);

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

const handleRegister = () => {
  showInfo('游客注册功能已关闭', '请联系网站管理员添加用户')
}
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
          <div v-if="isLoggedIn">
            <el-button round plain type="primary" class="profile-button">
              设置
            </el-button>
            <el-button round plain type="danger" class="profile-button" @click="authStore.logoutUser()">
              退出登录
            </el-button>
          </div>
          <div v-else>
            <el-button round plain type="primary" class="profile-button" @click="loginDialogVisible = true">
              登录
            </el-button>
            <el-button round plain type="primary" class="profile-button" @click="handleRegister">
              注册
            </el-button>
          </div>
        </div>
      </div>

      <el-divider></el-divider>

      <div class="profile-statistic">
        <el-row :gutter="20">
          <el-col :span="14">
            <zzz-achievement-statistic class="profile-card" />
          </el-col>
          <el-col :span="10">
            <sr-achievement-statistic class="profile-card" />
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px" :gutter="20">
          <el-col :span="10">
            <announcement-card class="profile-card"/>
          </el-col>
          <el-col :span="14">
            <empty-card class="profile-card" />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

  <login-dialog v-model="loginDialogVisible" @close="loginDialogVisible = false" />
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

.profile-button {
  margin-left: 20px;
}

.profile-info {
  margin-left: 30px;
  justify-self: center;
}

.profile-statistic {
  width: 80%;
  justify-self: center;
}

.profile-card {
  max-height: 360px;
}
</style>