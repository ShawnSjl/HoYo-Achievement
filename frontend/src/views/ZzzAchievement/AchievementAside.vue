<script setup>
import { computed, watch } from "vue";
import { zzzGetClassByCategory } from "@/utils/zzzAchievementClass";
import ZzzStatisticTotal from "@/views/ZzzAchievement/AchievementStatisticTotal.vue";

const props = defineProps({
  category: String,
})
const achievementClass = defineModel()

// get class list by given category
const classes = computed(() => zzzGetClassByCategory(props.category));

// update achievement class when category changed
watch(classes, (newClasses) => {
  achievementClass.value = newClasses[0];
}, { immediate: true });
</script>

<template>
  <div class="zzz-aside">
    <el-segmented v-model="achievementClass" :options="classes" size="large" direction="vertical"/>
    <zzz-statistic-total class="zzz-container-statistic-total" />
  </div>
</template>

<style scoped>
.zzz-aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  font-weight: bold;
}

.zzz-container-statistic-total {
  margin: 10px 10px 18px;
  max-height: 300px;
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