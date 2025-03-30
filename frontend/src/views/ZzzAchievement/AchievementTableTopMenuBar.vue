<script setup>
import Avatar from "@/components/Avatar.vue";

const props = defineProps({
  categories: Array[Option],
})
const category = defineModel();

</script>

<template>
  <div class="zzz-top-bar">
    <div class="zzz-top-bar-left">
      <avatar />
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
  justify-content: space-between;
  align-content: center;
}

.zzz-top-bar-left {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-items: center;
  flex: 1;
}

.zzz-top-bar-right {
  align-content: center;
  font-weight: bold;
  flex: 1;
}

.el-segmented {
  --el-segmented-item-selected-color: var(--el-text-color-primary);
  --el-segmented-item-selected-bg-color: #ffd100;
  --el-border-radius-base: 16px;
}
</style>