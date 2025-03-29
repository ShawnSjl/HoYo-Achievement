<script setup>
import { ref, onMounted } from "vue";
import { zzzDefaultTable } from "@/api/zzz";

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
      hidden: item.hidden,
    }));
    console.log(achievements.value);
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
      <el-table :data="achievements" style="width: 100%">
        <el-table-column prop="achievement_id" label="ID" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="description" label="Description" />
        <el-table-column prop="game_version" label="Game Version" />
        <el-table-column prop="hidden" label="Hidden" />
      </el-table>
    </pre>
  </div>

</template>

<style scoped>

</style>