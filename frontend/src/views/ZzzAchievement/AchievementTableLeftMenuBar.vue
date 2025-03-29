<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  category: String,
  lifeClasses: Array[Option],
  tacticsClasses: Array[Option],
  explorationClasses: Array[Option],
})
const achievementClass = defineModel()

// get class list by given category
const getClasses = (category) => {
  switch (category) {
    case '生活':
      return props.lifeClasses;
    case '战术':
      return props.tacticsClasses;
    case '探索':
      return props.explorationClasses;
    default:
      return props.lifeClasses;
  }
}
const classes = computed(() => getClasses(props.category));

// update achievement class when category changed
watch(classes, (newClasses) => {
  achievementClass.value = newClasses[0];
}, { immediate: true });
</script>

<template>
  <div class="zzz-left-bar">
    <el-segmented v-model="achievementClass" :options="classes" size="large" direction="vertical"/>
  </div>
</template>

<style scoped>
.zzz-left-bar {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

.el-segmented {
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #ffd100;
  --el-border-radius-base: 16px;
}
</style>