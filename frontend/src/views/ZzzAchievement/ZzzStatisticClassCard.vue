<script setup>
import {computed} from 'vue';
import {useZzzAchievementStore} from "@/stores/zzzAchievementsStore";
import {zzzGetClassIdByName} from "@/utils/zzzAchievementClass";
import ZzzAchievementImg1 from '@/assets/image/zzz-achievement-level-1.png';
import ZzzAchievementImg2 from '@/assets/image/zzz-achievement-level-2.png';
import ZzzAchievementImg3 from '@/assets/image/zzz-achievement-level-3.png';

// 使用Pinia作为本地缓存
const achievementStore = useZzzAchievementStore()

const props = defineProps({
  achievementClass: String,
})

const totalNumber = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.class_id ===
      zzzGetClassIdByName(props.achievementClass)).length
      - achievementStore.getBranchAchievementsNumberByClass(zzzGetClassIdByName(props.achievementClass));
})

const completeNumber = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.class_id === zzzGetClassIdByName(props.achievementClass)
      && achievement.complete === 1).length;
})

const getLevel1Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 1
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)).length
      - achievementStore.getBranchAchievementNumberByClassAndLevel(zzzGetClassIdByName(props.achievementClass), 1);
})
const getCompleteLevel1Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 1
      && achievement.complete === 1
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)
  ).length;
})

const getLevel2Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 2
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)).length
      - achievementStore.getBranchAchievementNumberByClassAndLevel(zzzGetClassIdByName(props.achievementClass), 2);
})
const getCompleteLevel2Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 2
      && achievement.complete === 1
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)
  ).length;
})

const getLevel3Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 3
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)).length
      - achievementStore.getBranchAchievementNumberByClassAndLevel(zzzGetClassIdByName(props.achievementClass), 3);
})
const getCompleteLevel3Number = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.reward_level === 3
      && achievement.complete === 1
      && achievement.class_id === zzzGetClassIdByName(props.achievementClass)
  ).length;
})
</script>

<template>
  <el-card shadow="never" class="zzz-statistic-card-wrapper">
    <el-scrollbar>
      <div class="zzz-statistic-card">
        <div slot="header" class="zzz-statistic-total">
          <b class="card-text">{{props.achievementClass}}</b> 完成度:
          <br/>
          <b class="card-text">{{completeNumber}} / {{totalNumber}}</b>
        </div>
        <div class="zzz-statistic-level">
          <img :src="ZzzAchievementImg1" alt="achievement image" class="zzz-achievement-image" />
          <p> {{getCompleteLevel1Number}} / {{getLevel1Number}}</p>
        </div>
        <div class="zzz-statistic-level">
          <img :src="ZzzAchievementImg2" alt="achievement image" class="zzz-achievement-image" />
          <p> {{getCompleteLevel2Number}} / {{getLevel2Number}}</p>
        </div>
        <div class="zzz-statistic-level">
          <img :src="ZzzAchievementImg3" alt="achievement image" class="zzz-achievement-image" />
          <p> {{getCompleteLevel3Number}} / {{getLevel3Number}}</p>
        </div>
      </div>
    </el-scrollbar>
  </el-card>
</template>

<style scoped>
.zzz-statistic-card-wrapper {
  border-radius: 12px;
  margin-left: 10px;
  margin-right: 10px;
}

.zzz-statistic-card {
  display: flex;
  flex-direction: row;
  align-content: space-between;
}

.el-card {
  --el-card-bg-color: #161817;
  --el-card-border-color: #000000;
  color: #cacaca;
}

@media (max-width: 900px) {
  .zzz-statistic-card-wrapper {
    margin-left: 0;
    margin-right: 0;
  }

  :deep(.el-card__body) {
    padding: 5px 10px;
  }
}

/* 类别总计 */
.zzz-statistic-total {
  min-width: 180px;
}

.card-text {
  font-size: 20px;
}

@media (max-width: 900px) {
  .zzz-statistic-total {
    min-width: 137px;
    font-size: 13px;
  }

  .card-text {
    font-size: 15px;
  }
}

/* 级别统计 */
.zzz-statistic-level {
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
  border: 3px solid #000000; /* 可选的边框 */
  background-color: #000000;
}

p {
  margin-left: 10px;
}

@media (max-width: 900px) {
  .zzz-statistic-level {
    margin-left: 10px;
    min-width: 100px;
  }

  .zzz-achievement-image {
    width: 36px;
    height: 36px;
    border: 2px solid #000000; /* 可选的边框 */
  }

  p {
    font-size: 13px;
  }
}
</style>