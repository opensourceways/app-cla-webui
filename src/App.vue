<script setup lang="ts"></script>

<template>
  <div id="app" class="ly-default">
    <router-view />
  </div>
</template>

<style lang="scss">
.ly-default {
  --header-height: 80px;
  --header-zIndex: 20;
  --header-max-width: 1920px;
  --header-padding: 64px;
  --content-max-width: 1200px;
  --content-padding: 12px;
  --footer-height: 288px;
  @media (min-width: 600px) and (max-width: 1680px) {
    --header-padding: 32px;
  }
  @media (min-width: 0px) and (max-width: 1200px) {
    --header-height: 48px;
    --footer-height: 200px;
    --content-padding: 32px;
  }
  @media (min-width: 0px) and (max-width: 600px) {
    --content-padding: 24px;
    --footer-height: 200px;
    --header-padding: 24px;
  }
}
</style>
