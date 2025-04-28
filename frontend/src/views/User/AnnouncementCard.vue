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
        <p>网站版本：v1.1</p>
        <p>网站基础功能已施工完成</p>
        <p>已知问题：</p>
        <p>1. 处理导入的星铁成就表格时，页面会无响应一段时间。原因：后台处理时将前端状态更新堵死。</p>
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