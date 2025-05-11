<script setup>

</script>

<template>
  <div class="card-bg">
    <el-card shadow="never" style="height: 360px">
      <template #header>
        <div slot="header">
          网站公告 版本：v1.1.0
        </div>
      </template>

      <div>
        <b>新增功能</b>
        <p>1. 使用hash实现内容定位，页面刷新时不会退回到第一个内容选项</p>
        <b>修复</b>
        <p>1. 修复在使用平板等低分辨率的场景下的布局错误</p>
        <p>2. 优化移动端模式检测逻辑</p>
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