<script setup>
import Avatar from "@/components/Avatar.vue";
import GameSwitch from "@/components/GameSwitch.vue";
</script>

<template>
  <div class="sr-header-content">
    <div class="sr-header-left">
      <div class="sr-header-title">成就</div>
    </div>

    <div class="sr-header-right">
      <game-switch style="margin-right: 30px" />
      <avatar />
    </div>
  </div>
</template>

<style scoped>
.sr-header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  width: 100%;

  color: #ededed;
}

.sr-header-left {
  flex: 1;
}

.sr-header-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  align-items: center;
}
</style>