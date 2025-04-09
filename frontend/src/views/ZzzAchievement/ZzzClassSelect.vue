<script setup>
import {categories, zzzGetClassByCategory} from "@/utils/zzzAchievementClass"

const achievementClass = defineModel()
</script>

<template>
  <el-select
      v-model="achievementClass"
      popper-class="zzz-class-select"
  >
    <el-option-group
        v-for="category in categories"
        :label="category"
    >
      <el-option
          v-for="achieveClass in zzzGetClassByCategory(category)"
          :key="achieveClass"
          :label="achieveClass"
          :value="achieveClass"
      />
    </el-option-group>
  </el-select>
</template>

<style scoped>
:deep(.el-select) {
  --el-select-input-focus-border-color: #616161;
}

/* placeholder字体 */
:deep(.el-select__placeholder) {
  font-weight: bold;
  color: #000000;
}

/* 菜单打开时placeholder字体 */
:deep(.el-select__placeholder.is-transparent) {
  font-weight: bold;
  color: #000000;
}

/* 菜单按钮 */
:deep(.el-select__wrapper) {
  background-color: #ffd100;
  box-shadow: 0 0 0 1px #615b5b;
}

:deep(.el-select__wrapper.is-focused) {
  box-shadow: 0 0 0 1px #615b5b;
}

:deep(.el-select-group__title) {
  color: #cacaca;
  background-color: #161817;
}

/* 菜单中的选项背景 */
:deep(.el-select-dropdown__item) {
  color: #cacaca;
  background-color: #161817;
  font-weight: bold;
}

/* 菜单中被选中的选项字体 */
:deep(.el-select-dropdown__item.is-selected) {
  color: #000000;
}

/* 菜单中被选中的选项背景 */
:deep(.el-select-dropdown__item.is-hovering) {
  background-color: #ffd100;
}
</style>

<style>
/* 菜单的背景 */
.zzz-class-select {
  background: #161817 !important;
  border: 1px solid #161817 !important;
  .el-popper__arrow::before {
    background: #161817 !important;
    border: 1px solid #161817 !important;
  }
}
</style>
