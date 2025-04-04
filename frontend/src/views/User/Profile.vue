<script setup>
import {ref, computed} from "vue";
import DefaultAvatar from '@/assets/avatar.png'
import {useAuthStore} from "@/stores/authStore";

const authStore = useAuthStore();

const userName = computed(() => {return authStore.getUserName()})

</script>

<template>
  <div class="profile-page">
    <el-card class="profile-card">
      <div class="profile-header">
        <el-avatar size="large" :src="DefaultAvatar" />
        <div class="profile-info">
          <h2>{{ userName }}</h2>
        </div>
      </div>

      <el-divider></el-divider>


    </el-card>
  </div>
</template>

<style scoped>

</style>