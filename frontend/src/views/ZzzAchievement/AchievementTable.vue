<script setup>
import { ref, onMounted } from "vue";
import { zzzDefaultTable } from "@/api/zzz";
import ZzzTableRow from "@/views/ZzzAchievement/AchievementTableRow.vue"
import ZzzTableTopMenu from "@/views/ZzzAchievement/AchievementTableTopMenuBar.vue"
import ZzzTableLeftMenu from "@/views/ZzzAchievement/AchievementTableLeftMenuBar.vue"

const achievements = ref([]);
const loading = ref(true);
const errorMessage = ref('');

const category = ref('生活');
const categories = ['生活', '战术', '探索'];

const achievementClass = ref('丽都之旅');
const lifeClasses = ['丽都之旅', '绳匠业务', '代理人信赖', '法厄同纪事', '代理人秘闻', '独家视界', '际会之时', '绳网热议']
const tacticsClasses = ['迷失之地', '枯萎之都', '作战技巧', '敌对目标', '战斗成就']
const explorationClasses = ['空洞探索指南', '零号密钥']

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
    <zzz-table-top-menu v-model="category" :categories=categories />
  </div>
  <div class="zzz-table-main">
    <div class="zzz-table-main-left">
      <zzz-table-left-menu v-model="achievementClass"
                           :category="category"
                           :life-classes="lifeClasses"
                           :tacticsClasses="tacticsClasses"
                           :exploration-classes="explorationClasses" />
    </div>
    <div class="zzz-table-main-right">
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
  </div>

</template>

<style scoped>
.zzz-table-main {
  display: flex;
  flex-direction: row;
}

.zzz-table-main-left {
  flex: 1;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
}

.zzz-table-main-right {
  flex: 10;
  margin-left: 5px;
}
</style>