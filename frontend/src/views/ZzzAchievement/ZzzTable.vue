<script setup>
import ZzzStatisticClassCard from "@/views/ZzzAchievement/ZzzStatisticClassCard.vue";
import ZzzTableRow from "@/views/ZzzAchievement/ZzzTableRow.vue";
import ZzzClassSelect from "@/views/ZzzAchievement/ZzzClassSelect.vue";
import {useIsMobileStore} from "@/stores/isMobileStore";

defineProps({
  sortedAchievements: Array,
  tableHeight: Number,
})
const achievementClass = defineModel()

const isMobileStore = useIsMobileStore();
</script>

<template>
  <div v-if="isMobileStore.isMobile" class="zzz-table-header">
    <zzz-class-select v-model="achievementClass" class="zzz-table-header-select" />
    <zzz-statistic-class-card :achievement-class="achievementClass" class="zzz-table-header-card" />
  </div>
  <div v-else>
    <zzz-statistic-class-card :achievement-class="achievementClass" style="margin-bottom: 10px" />
  </div>

  <el-table :data="sortedAchievements" style="width: 100%" :show-header="false" :max-height="tableHeight">
    <el-table-column>
      <template #default="{ row }">
        <zzz-table-row :achievement="row" />
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
@media (max-width: 830px) {
  .zzz-table-header {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
  }

  .zzz-table-header-select {
    align-self: center;
    min-width: 128px;
    flex: 1;
  }

  .zzz-table-header-card {
    margin-left: 5px;
    flex: 3;
  }
}

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