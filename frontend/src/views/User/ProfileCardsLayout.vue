<script setup>
import {ref, nextTick, onBeforeUnmount, onMounted} from "vue";
import AnnouncementCard from "@/views/User/AnnouncementCard.vue";
import EmptyCard from "@/views/User/EmptyCard.vue";
import ZzzStatisticCard from "@/views/User/ZzzStatisticCard.vue";
import SrStatisticCard from "@/views/User/SrStatisticCard.vue";

// 设置卡片墙高度
const cardsLayoutHeight = ref(500)
const calculateLayoutHeight = () => {
  const windowHeight = window.innerHeight
  const margin = 175

  cardsLayoutHeight.value = windowHeight - margin
}

onMounted(async () => {
  await nextTick()
  calculateLayoutHeight()
  window.addEventListener('resize', calculateLayoutHeight)
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateLayoutHeight)
})
</script>

<template>
  <el-scrollbar :max-height="cardsLayoutHeight" style="margin-left: 10px">
    <div class="profile-card-layout">
      <el-row :gutter="20">
        <el-col :span="14">
          <zzz-statistic-card class="profile-card" />
        </el-col>
        <el-col :span="10">
          <sr-statistic-card class="profile-card" />
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
  </el-scrollbar>
</template>

<style scoped>
.profile-card-layout {
  width: 98%;
}

.profile-card {
  max-height: 360px;
}
</style>