<script setup>
import {computed, watch} from "vue";
import { useZzzAchievementStore } from "@/stores/zzzAchievementsStore";
import {zzzGetClassByCategory, zzzGetClassIdByName} from "@/utils/zzzAchievementClass";
import ZzzStatisticTotalCard from "@/views/ZzzAchievement/ZzzStatisticTotalCard.vue";

// 使用Pinia作为本地缓存
const achievementStore = useZzzAchievementStore()

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

const completePercentage = computed(() => {
  return (className) => {
    const classId = zzzGetClassIdByName(className);

    const numberTotal = achievementStore.achievements.filter(achievement => achievement.class_id === classId).length
      - achievementStore.getBranchAchievementsNumberByClass(classId);

    const numberComplete = achievementStore.achievements.filter(achievement => achievement.class_id === classId &&
        achievement.complete === 1).length;

    if (numberTotal === 0) return 0; // 避免除以 0

    return Math.floor((numberComplete / numberTotal) * 1000) / 10;
  };
});
</script>

<template>
  <div class="zzz-aside">
    <el-segmented v-model="achievementClass" :options="classes" size="large" direction="vertical">
      <template #default="each">
        <div class="zzz-class-option">
          <div style="flex: 1"></div>
          <div style="flex: 1">
            <p>{{each.item}}</p>
          </div>
          <div class="zzz-class-option-percentage">
            <p>{{completePercentage(each.item)}}%</p>
          </div>
        </div>
      </template>
    </el-segmented>
    <zzz-statistic-total-card class="zzz-container-statistic-total" />
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
  max-height: 360px;
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

.zzz-class-option {
  display: flex;
  flex-direction: row;
}

.zzz-class-option-percentage  {
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
}

p {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>