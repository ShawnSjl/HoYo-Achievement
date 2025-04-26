<script setup>
import {useSrAchievementStore} from "@/stores/srAchievementStore";
import {computed} from "vue";
import SrAchievementImg1 from '@/assets/image-sr/sr-achievement-level-1.png';
import SrAchievementImg2 from '@/assets/image-sr/sr-achievement-level-2.png';
import SrAchievementImg3 from '@/assets/image-sr/sr-achievement-level-3.png';

// 使用Pinia作为本地缓存
const achievementStore = useSrAchievementStore()

const props = defineProps({
  achievementClass: String,
})

const totalNumber = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.class === props.achievementClass).length;
})
const completeNumber = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.class === props.achievementClass &&
      achievement.complete === 1).length;
})

const getLevel1Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 1
      && achievement.class === props.achievementClass).length;
})
const getCompleteLevel1Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 1
      && achievement.complete === 1
      && achievement.class === props.achievementClass
  ).length;
})

const getLevel2Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 2
      && achievement.class === props.achievementClass).length;
})
const getCompleteLevel2Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 2
      && achievement.complete === 1
      && achievement.class === props.achievementClass
  ).length;
})

const getLevel3Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 3
      && achievement.class === props.achievementClass).length;
})
const getCompleteLevel3Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 3
      && achievement.complete === 1
      && achievement.class === props.achievementClass
  ).length;
})
</script>

<template>
  <div class="sr-statistic-class">
    <div class="sr-statistic-left">
      <p class="sr-statistic-title">{{props.achievementClass}}</p>
      <p class="sr-statistic-count">成就进度 {{completeNumber}}/{{totalNumber}}</p>
    </div>
    <div class="sr-statistic-level">
      <img :src="SrAchievementImg3" alt="achievement image" class="sr-statistic-img" />
      <p class="sr-statistic-level-count">{{getCompleteLevel3Number}}/{{getLevel3Number}}</p>
    </div>
    <div class="sr-statistic-level">
      <img :src="SrAchievementImg2" alt="achievement image" class="sr-statistic-img" />
      <p class="sr-statistic-level-count">{{getCompleteLevel2Number}}/{{getLevel2Number}}</p>
    </div>
    <div class="sr-statistic-level">
      <img :src="SrAchievementImg1" alt="achievement image" class="sr-statistic-img" />
      <p class="sr-statistic-level-count">{{getCompleteLevel1Number}}/{{getLevel1Number}}</p>
    </div>
  </div>
</template>

<style scoped>
.sr-statistic-class {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  align-items: center;
}

.sr-statistic-left {
  display: flex;
  flex-direction: column;
}

.sr-statistic-title {
  color: #ffffff;
  font-weight: bold;
  font-size: 36px;
}

.sr-statistic-count {
  color: #fae5c0;
  font-weight: bold;
  font-size: 18px;
}

.sr-statistic-level {
  margin-left: 45px;
  position: relative;

  display: flex;
}

.sr-statistic-level+.sr-statistic-level {
  margin-left: 75px;
}

.sr-statistic-img {
  max-height: 65px;
  object-fit: contain;
}

.sr-statistic-level-count {
  position: absolute;
  margin-left: 55px;
  margin-top: 40px;

  color: #fae5c0;
  font-weight: bold;
  font-size: 18px;
}

p {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>