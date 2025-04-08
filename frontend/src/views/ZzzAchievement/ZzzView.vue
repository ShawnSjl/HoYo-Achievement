<script setup>
import {ref, onMounted, onBeforeUnmount, nextTick, watch, computed} from "vue";
import { useZzzAchievementStore } from "@/stores/zzzAchievementsStore";
import { useAuthStore } from '@/stores/authStore';
import { categories, lifeClasses, zzzGetClassIdByName } from "@/utils/zzzAchievementClass";
import ZzzTable from "@/views/ZzzAchievement/ZzzTable.vue";
import ZzzHeader from "@/views/ZzzAchievement/ZzzHeader.vue";
import ZzzAside from "@/views/ZzzAchievement/ZzzAside.vue";

// 使用Pinia作为本地缓存
const achievementStore = useZzzAchievementStore()
const authStore = useAuthStore();

const loading = ref(true);
const errorMessage = ref('');

// 选择大类别
const category = ref(categories[0]);
// 选择小类别
const achievementClass = ref(lifeClasses[0]);

// 设置表格高度
const tableHeight = ref(500) // 初始值，防止第一次加载为 0
const calculateTableHeight = () => {
  const windowHeight = window.innerHeight

  const headerEl = document.querySelector('.el-header') // 获取头部高度
  const headerHeight = headerEl ? headerEl.offsetHeight : 0

  const margin = 142 // 预留的 padding/margin（可调）

  tableHeight.value = windowHeight - headerHeight - margin
}

// 根据类别筛选成就
const filteredAchievements = computed(() => {
  return achievementStore.achievements.filter(achievement => achievement.class_id ===
      zzzGetClassIdByName(achievementClass.value))
});

// 根据条件排序
const sortedAchievements = computed(() => {
  if (achievementStore.isCompleteFirst) {
    return [...filteredAchievements.value].sort((a, b) => {
      // 1️⃣ 优先按 complete 状态：complete === 1 的放后面
      if (a.complete === 1 && b.complete !== 1) return 1;
      if (a.complete !== 1 && b.complete === 1) return -1;

      // 2️⃣ 如果 complete 相同，按 id 升序排序
      return a.id - b.id;
    });
  } else {
    return filteredAchievements.value;
  }
});

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
  <div class="zzz-bg-page">
    <div class="zzz-content">
      <el-container class="zzz-container" style="height: 100vh">
        <el-header class="zzz-container-header">
          <zzz-header v-model="category" />
        </el-header>

        <el-container>
          <el-aside class="zzz-container-aside">
            <zzz-aside v-model="achievementClass"
                                 :category="category" />
          </el-aside>
          <el-main class="zzz-container-main">
            <p v-if="loading">加载中...</p>
            <p v-else-if="errorMessage">{{ errorMessage }}</p>
            <div v-else >
              <zzz-table :achievement-class="achievementClass"
                         :sorted-achievements="sortedAchievements"
                         :table-height="tableHeight" />
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped>
.zzz-bg-page {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/image/zzz-bg-1.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  z-index: -1;
  inset: 0;
  position: fixed;
}

.zzz-content {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
  border-radius: 8px;
}

.zzz-container-header {
  margin-top: 8px;
}

.zzz-container-aside {
  margin-left: 8px;
  margin-top: 12px;
}

.zzz-container-main {
  height: 100%;
  padding: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
}
</style>