<script setup>
import {computed} from 'vue';
import {useIsMobileStore} from "@/stores/isMobileStore";
import ZzzAchievementReward from "@/assets/image/zzz-achievement-reward.png";

// 使用Pinia作为本地缓存
const isMobileStore = useIsMobileStore();

// 传入参数
const props = defineProps({
  achievement: Object,
})

// 获取按钮状态
const completeButtonMsg = computed(() => {
  if (props.achievement.complete === 0) {return "未完成"}
  else if (props.achievement.complete === 1) {return "已完成"}
  else {return "分支已完成"}
})
const isComplete = computed(() => {return props.achievement.complete === 1});
const disableButton = computed(() => {return props.achievement.complete === 2});
</script>

<template>
  <div class="sr-table-row">
    <div class="sr-table-row-left">
      <img :src="ZzzAchievementReward" alt="achievement image" class="sr-achievement-image" />
      <div class="sr-detail">
        <div class="sr-name">
          {{ props.achievement.name }}
          <span v-if="props.achievement.hidden === 1" class="sr-hidden-badge">
            隐藏
          </span>
        </div>
        <div class="sr-desc">{{ props.achievement.description }}</div>
      </div>
    </div>

    <div class="sr-table-row-right">
      <div class="sr-game-version" >{{ props.achievement.game_version }}</div>
      <img :src="ZzzAchievementReward" alt="achievement reward" class="sr-achievement-reward-image" />
      <el-button round :disabled="disableButton" :plain="!isComplete" color="#ffd100" dark @click="handleComplete"
                 class="sr-complete-button">
        {{ completeButtonMsg }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>

</style>