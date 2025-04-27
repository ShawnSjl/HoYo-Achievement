<script setup>
import Avatar from "@/components/Avatar.vue";
import GameSwitch from "@/components/GameSwitch.vue";
import SrAchievement from "@/assets/image-sr/sr-achievement.png"
</script>

<template>
  <div class="sr-header-content">
    <div class="sr-header-left">
      <div class="sr-header-title-wrapper">
        <img :src="SrAchievement" class="sr-header-title-img" alt="sr achievement">
        <div class="sr-header-title">成就</div>
      </div>

<!--      <div class="sr-header-statistic-wrapper">-->
<!--        统计-->
<!--      </div>-->
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

  display: flex;
  flex-direction: row;
  align-items: center;
}

.sr-header-title-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.sr-header-title-img {
  height: 50px;
  object-fit: contain;
}

.sr-header-right {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-start;
  align-items: center;
}
</style>