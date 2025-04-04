<script setup>
import ZzzStatisticClass from "@/views/ZzzAchievement/AchievementStatisticClass.vue";
import ZzzTableRow from "@/views/ZzzAchievement/AchievementTableRow.vue";

defineProps({
  achievementClass: String,
  sortedAchievements: Array,
  tableHeight: Number,
})
</script>

<template>
  <zzz-statistic-class :achievement-class="achievementClass" style="margin-bottom: 10px" />
  <el-table :data="sortedAchievements" style="width: 100%" :show-header="false" :max-height="tableHeight">
    <el-table-column>
      <template #default="{ row }">
        <zzz-table-row :achievement="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.el-table {
  --el-table-border-color: #232524;
  --el-table-border: 2px solid;
  --el-table-row-hover-bg-color: rgb(58, 58, 58);
  --el-table-bg-color: #232524;
  --el-table-tr-bg-color: #232524;
  --el-table-expanded-cell-bg-color: #232524;
}

::v-deep(.el-table tr) {
  background-color: #161817 !important;
}
</style>