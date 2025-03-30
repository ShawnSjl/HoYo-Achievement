<script setup>
import {ref, onMounted, onBeforeUnmount, nextTick, watch, computed} from "vue";
import { useZzzAchievementStore } from "@/stores/zzzAchievementsStore"
import { useAuthStore } from '@/stores/authStore';
import { zzzGetClassId } from  "@/utils/zzzClassId"
import ZzzTableRow from "@/views/ZzzAchievement/AchievementTableRow.vue"
import ZzzTableTopMenu from "@/views/ZzzAchievement/AchievementTableTopMenuBar.vue"
import ZzzTableLeftMenu from "@/views/ZzzAchievement/AchievementTableLeftMenuBar.vue"

// 使用Pinia作为本地缓存
const achievementStore = useZzzAchievementStore()
const authStore = useAuthStore();

const loading = ref(true);
const errorMessage = ref('');

// 选择大类别
const category = ref('生活');
const categories = ['生活', '战术', '探索'];

// 选择小类别
const achievementClass = ref('丽都之旅');
const lifeClasses = ['丽都之旅', '绳匠业务', '代理人信赖', '法厄同纪事', '代理人秘闻', '独家视界', '际会之时', '绳网热议']
const tacticsClasses = ['迷失之地', '枯萎之都', '作战技巧', '敌对目标', '战斗成就']
const explorationClasses = ['空洞探索指南', '零号密钥']

// 设置表格高度
const tableHeight = ref(500) // 初始值，防止第一次加载为 0
const calculateTableHeight = () => {
  const windowHeight = window.innerHeight

  const headerEl = document.querySelector('.el-header') // 获取头部高度
  const headerHeight = headerEl ? headerEl.offsetHeight : 0

  const margin = 20 // 预留的 padding/margin（可调）

  tableHeight.value = windowHeight - headerHeight - margin
}

const filteredAchievements = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.class_id ===
      zzzGetClassId(achievementClass.value))
})

const fetchData = async () => {
  try {
    loading.value = true;
    authStore.loadUser();
    await achievementStore.updateAchievements();
    errorMessage.value = '';
  } catch (e) {
    errorMessage.value = 'Load data failed';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});

watch(achievementClass, async (newClass) => {
  await fetchData();
});

const userName = computed(() => authStore.getUserName());
watch(userName, async (newUserName) => {
  console.log(newUserName);
  await fetchData();
});

onMounted(async () => {
  await nextTick()
  calculateTableHeight()
  window.addEventListener('resize', calculateTableHeight)
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', calculateTableHeight)
})
</script>

<template>
  <el-container class="zzz-container" style="height: 100vh">
    <el-header class="zzz-container-header">
      <zzz-table-top-menu v-model="category" :categories=categories />
    </el-header>

    <el-container>
      <el-aside class="zzz-container-aside">
        <zzz-table-left-menu v-model="achievementClass"
                             :category="category"
                             :life-classes="lifeClasses"
                             :tacticsClasses="tacticsClasses"
                             :exploration-classes="explorationClasses" />
      </el-aside>
      <el-main class="zzz-container-main">
        <p v-if="loading">加载中...</p>
        <p v-else-if="errorMessage">{{ errorMessage }}</p>
        <div v-else >
          <el-table :data="filteredAchievements" style="width: 100%" :show-header="false" :max-height="tableHeight">
            <el-table-column>
              <template #default="{ row }">
                <zzz-table-row :achievement="row" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.zzz-container-header {
  margin-top: 8px;
}

.zzz-container-aside {
  margin-left: 8px;
}

.zzz-container-main {
  height: 100%;
  padding: 5px;
}
</style>