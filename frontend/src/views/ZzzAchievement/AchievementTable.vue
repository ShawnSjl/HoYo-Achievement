<script setup>
import { ref, onMounted } from "vue";
import { zzzDefaultTable } from "@/api/zzz";
import ZzzTableRow from "@/views/ZzzAchievement/AchievementTableRow.vue"

const achievements = ref([]);
const loading = ref(true);
const errorMessage = ref('');

const fetchData = async () => {
  try {
    loading.value = true;
    const response = await zzzDefaultTable();
    achievements.value = response.achievements.map(item => ({
      achievement_id: item.achievement_id,
      name: item.name,
      description: item.description,
      game_version: item.game_version,
      reward_level: item.reward_level,
      hidden: item.hidden,
      complete: item.complete,
    }));
  } catch (e) {
    errorMessage.value = 'Load data failed';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

<template>
  <div>
    <p v-if="loading">加载中...</p>
    <p v-else-if="errorMessage">{{ errorMessage }}</p>
    <pre v-else>
      <el-table :data="achievements" style="width: 100%" :show-header="false" >
        <el-table-column>
          <template #default="{ row }">
            <zzz-table-row :achievement="row" />
          </template>
        </el-table-column>
      </el-table>
    </pre>
  </div>

</template>

<style scoped>

</style>