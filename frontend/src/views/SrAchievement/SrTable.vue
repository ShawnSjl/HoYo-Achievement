<script setup>
import SrTableRow from "@/views/SrAchievement/SrTableRow.vue";

defineProps({
  sortedAchievements: Array,
  tableHeight: Number,
})
const achievementClass = defineModel()
</script>

<template>
  <el-table :data="sortedAchievements" style="width: 100%" :show-header="false" :max-height="tableHeight">
    <el-table-column>
      <template #default="{ row }">
        <sr-table-row :achievement="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>