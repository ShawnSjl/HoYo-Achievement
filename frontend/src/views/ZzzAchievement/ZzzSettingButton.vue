<script setup>
import {computed, ref} from 'vue';
import { useZzzAchievementStore } from "@/stores/zzzAchievementsStore";
import {Check, Close, Warning} from '@element-plus/icons-vue';
import {ElMessageBox} from "element-plus";
import {showError, showSuccess} from "@/utils/notification";
import {useIsMobileStore} from "@/stores/isMobileStore";
import {zzzExport} from "@/utils/zzzExport";
import ZzzImportButton from "@/views/ZzzAchievement/ZzzImportButton.vue";

// 使用Pinia作为本地缓存
const achievementStore = useZzzAchievementStore();
const isMobileStore = useIsMobileStore();

const dialogVisible = ref(false);

// 移动端适配
const dialogWidth = computed(() => { return isMobileStore.isMobile? '100%' : '500px' });

const handleClick = () => {
  dialogVisible.value = true;
}

const handleClose = () => {
  dialogVisible.value = false;
}

const openWarn = () => {
  ElMessageBox.confirm(
      '强制更新会清理本地缓存数据，确认是否继续？',
      '警告',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
  )
      .then(() => {
        achievementStore.fetchAchievements()
        showSuccess('强制更新成功')
      })
      .catch(() => {
        showError('强制更新失败')
      })
}
</script>

<template>
  <el-button
      color="#ffd100"
      round
      @click="handleClick">
    选项
  </el-button>

  <div class="zzz-setting-dialog">
    <el-dialog
        v-model="dialogVisible"
        title="选项"
        :width="dialogWidth"
        :before-close="handleClose"
    >
      <div>
        <p>未完成的成就优先:</p>
        <el-switch
            v-model="achievementStore.isCompleteFirst"
            size="large"
            inline-prompt
            :active-icon="Check"
            :inactive-icon="Close"
        />
      </div>
      <div>
        <p>特殊文本性别:</p>
        <el-radio-group v-model="achievementStore.isMale">
          <el-radio :value="true" size="large">男</el-radio>
          <el-radio :value="false" size="large">女</el-radio>
        </el-radio-group>
      </div>
      <div>
        <p>导入:</p>
        <div style="display: flex">
          <zzz-import-button />
          <el-tooltip placement="top">
            <el-button :icon="Warning" circle text style="margin-left: 5px" />
            <template #content>
              <p>表格头匹配格式：</p>
              <p>成就ID：'ID', '成就ID', '编号'</p>
              <p>完成状态：'完成', '完成状态', '是否完成', '状态' </p>
            </template>
          </el-tooltip>
        </div>
      </div>
      <div>
        <p>导出:</p>
        <el-button type="primary" round dark @click="zzzExport()">导出成就表格</el-button>
      </div>
      <div>
        <p>强制更新数据:</p>
        <el-button round dark color="red" @click="openWarn">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-button {
  --el-button-outline-color: #fbfbfb;
}

.el-switch {
  --el-switch-off-color: #636363;
}

.zzz-setting-dialog :deep(.el-dialog) {
  --el-dialog-bg-color: #232524 !important;
  --background-color: #232524 !important;
}

.zzz-setting-dialog :deep(.el-dialog__title) {
  color: #d5d5d5 !important;
  font-weight: bold;
}

.zzz-setting-dialog :deep(.el-dialog__body) {
  color: #cacaca !important;
}
</style>
