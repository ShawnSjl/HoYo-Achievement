<script setup>
import {ref, computed} from "vue";
import DefaultAvatar from '@/assets/image/zzz.png'
import {useAuthStore} from "@/stores/authStore";
import ZzzAchievementStatistic from "@/views/User/ZzzStatistic.vue"
import SrAchievementStatistic from "@/views/User/SrStatistic.vue"

const authStore = useAuthStore();

const userName = computed(() => {return authStore.getUserName()})

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
          <el-button round plain type="danger" class="profile-button">
            退出登录
          </el-button>
          <el-button round plain type="primary" class="profile-button">
            设置
          </el-button>
        </div>
      </div>

      <el-divider></el-divider>

      <div class="profile-statistic">
        <el-row :gutter="20">
          <el-col :span="14">
            <zzz-achievement-statistic class="profile-statistic-card" />
          </el-col>
          <el-col :span="10">
            <sr-achievement-statistic class="profile-statistic-card" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-empty :image-size="200" description="敬请期待"/>
          </el-col>
        </el-row>
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

.profile-statistic-card {
  max-height: 360px;
}
</style>