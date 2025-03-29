<script setup>
import { ref } from 'vue';
import ZzzAchievementImg1 from '@/assets/image/zzz-achievement-level-1.png';
import ZzzAchievementImg2 from '@/assets/image/zzz-achievement-level-2.png';
import ZzzAchievementImg3 from '@/assets/image/zzz-achievement-level-3.png';
import ZzzAchievementReward from '@/assets/image/zzz_achievement_reward.png'

const props = defineProps({
  achievement: Object,
})

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

const achievementReward = ref(props.achievement.reward_level * 5);

const completeButtonMsg = ref(props.achievement.complete === 1 ? "已完成" : "未完成")
const isComplete = ref(props.achievement.complete === 1)

const handleComplete = () => {
  if (isComplete.value) {
    alert('取消完成');
  } else {
    props.achievement.complete = 1;
  }
}
</script>

<template>
  <div class="zzz-table-row">
    <div class="zzz-table-col" style="flex: 2">
      <img :src="achievementImg" alt="achievement image" class="zzz-achievement-image" />
    </div>
    <div class="zzz-table-col" style="flex: 30">
      <div class="zzz-detail">
        <div class="zzz-name">
          {{ props.achievement.name }}
          <span v-if="props.achievement.hidden === 1" class="badge">
            隐藏
          </span>
        </div>
        <div class="zzz-desc">{{ props.achievement.description }}</div>
      </div>
    </div>
    <div class="zzz-table-col" style="flex: 4">{{ props.achievement.game_version }}</div>
    <div class="zzz-table-col" style="flex: 6">
      <el-badge :value="achievementReward" :offset="[-25, 50]">
        <img :src="ZzzAchievementReward" alt="achievement reward" class="zzz-achievement-reward-image" />
      </el-badge>
    </div>
    <div class="zzz-table-col" style="flex: 4">
      <el-button round :plain="!isComplete" type="primary" @click="handleComplete">
        {{ completeButtonMsg }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.zzz-table-row {
  display: flex;
  flex-direction: row;
}

.zzz-table-col {
  align-content: center;
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
  height: 50px;
  border-radius: 25px; /* 核心代码：让图片变圆 */
  object-fit: contain;   /* 保证图片不变形、居中裁剪 */
  border: 2px solid #686161; /* 可选的边框 */
  background-color: #000000;
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
  color: #2e2d2d;
}

.zzz-desc {
  flex: 1;
  text-align: left;
}

.badge {
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
  font-size: 15px;
  text-shadow:
      -2px -2px 2px black,
      2px -2px 2px black,
      -2px 2px 2px black,
      2px 2px 2px black;
}

</style>