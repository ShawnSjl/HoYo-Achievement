<script setup>
</script>

<template>
  <div class="card-bg">
    <el-card shadow="never">
      <template #header>
        <div slot="header">
          崩坏：星穹铁道
          <br/>
          成就完成度统计
        </div>
      </template>

    <div>
      施工中...
    </div>
    </el-card>
  </div>
</template>

<style scoped>
.card-bg {
  min-height: 360px;
  background-image: url("@/assets/image/sr-pg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  border-radius: 16px;
  overflow: hidden;
}

.el-card {
  --el-card-bg-color: rgba(22, 24, 23, 0);
  --el-card-border-color: rgba(35, 37, 36, 0);
  --el-card-border-width: 2px;
}
</style>