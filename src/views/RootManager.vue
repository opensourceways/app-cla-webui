<template>
  <div id="rootManager">
    <Header></Header>
    <div>
      <div id="rootManager_section" class="padding-top-bottom-2rem">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import Header from '@/components/AppHeader.vue';
import Footer from '@/components/AppFooter.vue';
const active = ref('first');
const setClientHeight = () => {
  this.$nextTick(() => {
    document.getElementById('rootManager').style.minHeight = '0px';
    if (
      util.getClientHeight() >
      document.getElementById('rootManager').offsetHeight
    ) {
      document.getElementById('rootManager').style.minHeight =
        util.getClientHeight() + 'px';
    } else {
      document.getElementById('rootManager').style.minHeight =
        document.getElementById('rootManager').offsetHeight + 'px';
    }
  });
};
</script>
<style scoped lang="scss">
#rootManager_section {
  width: 1200px;
  margin: auto;
}
#rootManager {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  & > div:nth-of-type(2) {
    flex-grow: 1;
    background-color: #f0f2f5;
    padding: 0 1rem;
  }
}

.tableBox {
  border-radius: 1.5rem;
  margin-bottom: 2rem;
  padding: 3rem;
  background-color: white;
}

.tableClass {
  border: 1px solid black;
  border-radius: 1.5rem;
}

.el-dialog {
  border-radius: 1rem;
}

.tabName {
  user-select: none;
  font-family: Roboto-Regular, sans-serif;
  font-size: 2rem;
  text-align: left;
}
</style>
