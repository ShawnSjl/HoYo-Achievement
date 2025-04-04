<script setup>
import { categories } from "@/utils/zzzAchievementClass";
import Avatar from "@/components/Avatar.vue";
import ZzzSetting from "@/views/ZzzAchievement/AchievementSetting.vue";

const category = defineModel();
</script>

<template>
  <div class="zzz-top-bar">
    <div class="zzz-top-bar-left">
      <avatar />
      <div class="zzz-top-bar-left-right">
        <zzz-setting />
      </div>
    </div>
    <div class="zzz-top-bar-right">
      <el-segmented v-model="category" :options="categories" size="large" block/>
    </div>
  </div>
</template>

<style scoped>
.zzz-top-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;
}

.zzz-top-bar-left {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  align-items: center;
  flex: 1;
}

.zzz-top-bar-left-right {
  margin-right: 20px;
}

.zzz-top-bar-right {
  align-content: center;
  font-weight: bold;
  flex: 1;
}

.el-segmented {
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #ffd100;
  --el-border-radius-base: 16px;
  --el-segmented-color: #cacaca;
  --el-segmented-bg-color: #161817;
  --el-segmented-item-hover-bg-color: rgb(58, 58, 58);
  --el-segmented-item-hover-color: #fbfbfb;
  --el-segmented-item-active-bg-color: #3f4242;
}
</style>