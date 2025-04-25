<script setup>
import {computed} from "vue";
import {srClasses} from "@/utils/srAchievementClass";
import {showInfo} from "@/utils/notification";

const achievementClass = defineModel()

// 获取成就类别图片
// const achievementImg = computed(() => {
//   const class_id = srClasses.indexOf(achievementClass.value) + 1;
//   return `/src/assets/image-sr/sr-class-${class_id}.png`;
// })
function getAchievementImg(cls) {
  const class_id = srClasses.indexOf(cls) + 1;
  return new URL(`/src/assets/image-sr/sr-class-${class_id}.png`, import.meta.url).href
}

const handleSelect = async (srClass) => {
  achievementClass.value = srClass;
}
</script>

<template>
  <div class="sr-button-group">
    <el-scrollbar max-height="750px">
      <div class="sr-button-wrapper">
        <div
            v-for="srClass in srClasses"
            :key="srClass"
            :class="['selector-button', { active: srClass === achievementClass }]"
            @click="handleSelect(srClass)"
        >
          <img :src="getAchievementImg(srClass)" :alt="srClass" class="sr-button-image" />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
.sr-button-group {
  overflow: hidden;
  width: 80px;
}

.sr-button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 8px;
}

.selector-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgba(85, 85, 85, 0.42);

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.selector-button.active {
  background-color: #409EFF;
}

.sr-button-image {
  height: 50px;
  width: 50px;
  object-fit: contain;
}

.el-button+.el-button {
  margin-left: 0;
}
</style>