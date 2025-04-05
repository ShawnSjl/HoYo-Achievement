<script setup>

</script>

<template>
  <div class="card-bg">
    <el-card shadow="never" style="height: 360px">
      <template #header>
        <div slot="header">
          网站公告
        </div>
      </template>

      <div>
        <p>网站版本：v1.0</p>
        <p>网站部分功能仍在施工中...</p>
        <p>预计实现的功能：</p>
        <p>1. 数据导入导出</p>
        <p>2. 星铁的成就页面</p>
        <p>...</p>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.card-bg {
  min-height: 360px;
  border-radius: 16px;
  overflow: hidden;
}

</style>