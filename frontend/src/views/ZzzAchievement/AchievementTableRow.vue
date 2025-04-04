<script setup>
import {computed, ref} from 'vue';
import { useZzzAchievementStore } from "@/stores/zzzAchievementsStore";
import ZzzAchievementImg1 from '@/assets/image/zzz-achievement-level-1.png';
import ZzzAchievementImg2 from '@/assets/image/zzz-achievement-level-2.png';
import ZzzAchievementImg3 from '@/assets/image/zzz-achievement-level-3.png';
import ZzzAchievementReward from '@/assets/image/zzz-achievement-reward.png';

// 使用Pinia作为本地缓存
const achievementStore = useZzzAchievementStore()

// 传入参数
const props = defineProps({
  achievement: Object,
})

// 获取成就图片
const getAchievementImg = (level) => {
  switch (level) {
    case 3:
      return ZzzAchievementImg3
    case 2:
      return ZzzAchievementImg2
    default:
      return ZzzAchievementImg1
  }
}
const achievementImg = ref(getAchievementImg(props.achievement.reward_level))

// 获取奖励数量
const achievementReward = ref(props.achievement.reward_level * 5);

// 获取按钮状态
const completeButtonMsg = computed(() => {return  props.achievement.complete === 1 ? "已完成" : "未完成"})
const isComplete = computed(() => {return props.achievement.complete === 1});

const handleComplete = async () => {
  const newState = props.achievement.complete === 1 ? 0 : 1;
  await achievementStore.completeAchievement(props.achievement.achievement_id, newState);
}

// 处理特殊文本
const maleTextPattern = /\{M#([^\}]+)\}/
const femaleTextPattern = /\{F#([^\}]+)\}/
const getAchievementName = computed(() => {
  if (maleTextPattern.test(props.achievement.name) || femaleTextPattern.test(props.achievement.name)) {
    return props.achievement.name.match(achievementStore.isMale ? maleTextPattern : femaleTextPattern)[1]
  } else {
    return props.achievement.name
  }
})
</script>

<template>
  <div class="zzz-table-row">
    <div class="zzz-table-row-left">
      <img :src="achievementImg" alt="achievement image" class="zzz-achievement-image" />
      <div class="zzz-detail">
        <div class="zzz-name">
          {{ getAchievementName }}
          <span v-if="props.achievement.hidden === 1" class="zzz-hidden-badge">
            隐藏
          </span>
        </div>
        <div class="zzz-desc">{{ props.achievement.description }}</div>
      </div>
    </div>

    <div class="zzz-table-row-right">
      <div class="zzz-game-version" >{{ props.achievement.game_version }}</div>
      <el-badge :value="achievementReward" :offset="[-45, 47]">
        <img :src="ZzzAchievementReward" alt="achievement reward" class="zzz-achievement-reward-image" />
      </el-badge>
      <el-button round :plain="!isComplete" color="#ffd100" dark @click="handleComplete" class="zzz-complete-button">
        {{ completeButtonMsg }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.zzz-table-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-content: center;
}

.zzz-table-row-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
}

.zzz-table-row-right {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
}

.zzz-achievement-image {
  width: 53px;
  height: 53px;
  border-radius: 50%; /* 核心代码：让图片变圆 */
  object-fit: cover;   /* 保证图片不变形、居中裁剪 */
  border: 3px solid #686161; /* 可选的边框 */
  background-color: #000000;
}

.zzz-achievement-reward-image {
  width: 70px;
  height: 46px;
  border-radius: 25px; /* 核心代码：让图片变圆 */
  object-fit: contain;   /* 保证图片不变形、居中裁剪 */
  border: 2px solid #686161; /* 可选的边框 */
  background-color: rgba(0, 0, 0, 0.78);
  margin-right: 20px;
}

.zzz-detail {
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  gap: 10px;
  padding: 15px;
}

.zzz-name {
  flex: 1;
  font-weight: bold;
  font-size: 17px;
  color: #cccccc;
}

.zzz-game-version {
  font-weight: normal;
  font-size: 17px;
  margin-right: 25px;
  color: #acacac;
}

.zzz-desc {
  flex: 1;
  text-align: left;
  word-break: break-word;
  color: #acacac;
}

.zzz-complete-button {
  margin-right: 10px;
}

.zzz-hidden-badge {
  background-color: #f11a1a;
  color: #fff;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
  position: relative;
  top: -10px;
  left: -10px;
}

::v-deep(.el-badge__content) {
  color: #fff;
  border: #000000;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0);
  font-size: 16px;
  text-shadow:
      -2px -2px 2px black,
      2px -2px 2px black,
      -2px 2px 2px black,
      2px 2px 2px black;
}
</style>