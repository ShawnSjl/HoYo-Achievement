<script setup>

const props = defineProps({
  categories: Array[Option],
})
const category = defineModel();

</script>

<template>
  <div class="zzz-top-bar">
    <div class="zzz-top-bar-left">
      {{category}}
    </div>
    <div class="zzz-top-bar-right">
      <el-segmented v-model="category" :options="props.categories" size="large" block/>
    </div>
  </div>
</template>

<style scoped>
.zzz-top-bar {
  display: flex;
  flex-direction: row;
}

.zzz-top-bar-left {
  flex: 1;
  align-content: flex-start;
}

.zzz-top-bar-right {
  flex: 1;
  font-weight: bold;
}

.el-segmented {
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #ffd100;
  --el-border-radius-base: 16px;
}
</style>