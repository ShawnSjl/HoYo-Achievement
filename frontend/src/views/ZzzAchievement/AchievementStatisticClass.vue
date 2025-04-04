<script setup>
import { computed } from 'vue';
import { useZzzAchievementStore } from "@/stores/zzzAchievementsStore";
import { zzzGetClassIdByName } from "@/utils/zzzAchievementClass";
import ZzzAchievementImg1 from '@/assets/image/zzz-achievement-level-1.png';
import ZzzAchievementImg2 from '@/assets/image/zzz-achievement-level-2.png';
import ZzzAchievementImg3 from '@/assets/image/zzz-achievement-level-3.png';

// 使用Pinia作为本地缓存
const achievementStore = useZzzAchievementStore()

const props = defineProps({
  achievementClass: String,
})

const completePercentage = computed(() => {
  const numberTotal = achievementStore.achievements.filter(achievement => achievement.class_id ===
      zzzGetClassIdByName(props.achievementClass)).length
  const numberComplete = achievementStore.achievements.filter(achievement => achievement.class_id === zzzGetClassIdByName(props.achievementClass)
      && achievement.complete === 1).length;

  return Math.floor((numberComplete / numberTotal) * 1000) / 10;
})

const getLevel1Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 1
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)).length;
})

const getCompleteLevel1Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 1
      && achievement.complete === 1
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)
  ).length;
})
const getLevel2Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 2
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)).length;
})

const getCompleteLevel2Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 2
      && achievement.complete === 1
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)
  ).length;
})
const getLevel3Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 3
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)).length;
})

const getCompleteLevel3Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 3
      && achievement.complete === 1
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)
  ).length;
})
</script>

<template>
  <el-card shadow="never">
    <div class="zzz-statistic-card-class">
      <div slot="header" style="min-width: 180px">
        <b style="font-size: 20px">{{props.achievementClass}}</b> 完成度:
        <br/>
        <b style="font-size: 20px">{{completePercentage}}%</b>
      </div>
      <div class="zzz-statistic-class">
        <img :src="ZzzAchievementImg1" alt="achievement image" class="zzz-achievement-image" />
        <p> {{getCompleteLevel1Number}} / {{getLevel1Number}}</p>
      </div>
      <div class="zzz-statistic-class">
        <img :src="ZzzAchievementImg2" alt="achievement image" class="zzz-achievement-image" />
        <p> {{getCompleteLevel2Number}} / {{getLevel2Number}}</p>
      </div>
      <div class="zzz-statistic-class">
        <img :src="ZzzAchievementImg3" alt="achievement image" class="zzz-achievement-image" />
        <p> {{getCompleteLevel3Number}} / {{getLevel3Number}}</p>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.zzz-statistic-card-class {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.zzz-statistic-class {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  margin-left: 20px;
  min-width: 140px;
}

.zzz-achievement-image {
  width: 53px;
  height: 53px;
  border-radius: 50%; /* 核心代码：让图片变圆 */
  object-fit: cover;   /* 保证图片不变形、居中裁剪 */
  border: 3px solid #686161; /* 可选的边框 */
  background-color: #000000;
}

.el-card {
  --el-card-bg-color: #161817;
  --el-card-border-color: #232524;
  color: #cacaca;
}

p {
  margin-left: 10px;
}
</style>