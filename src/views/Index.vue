<script lang="ts" setup>
import BgImg from "@/assets/images/backgroundx1.png";
</script>

<template>
  <header><AppHeader /></header>
  <AppContent :pcTop="0">
    <div class="home-main" :style="{ backgroundImage: `url(${BgImg})` }">
      <div class="home-left">
        <div class="title">
          <p><span>C</span>ontributor</p>
          <p><span>L</span>icense</p>
          <p><span>A</span>greement</p>
        </div>
      </div>
      <div class="home-right">
        <router-view></router-view>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.home-main {
  display: flex;
  width: 100%;
  height: 720px;
  background-repeat: no-repeat;
  background-position: 80% center;

  .home-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    width: 58%;
    .title {
      font-size: 80px;
      color: #424242;
      font-weight: 500;
      line-height: 100px;
      span {
        font-weight: 600;
      }
    }
  }
  .home-right{
    flex: 1;
  }
}
</style>
