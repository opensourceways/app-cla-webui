<template>
  <div id="signedRepo" :style="section">
    <Header></Header>
    {{ user }}
    <div>
      <div id="signedRepo_section" class="padding-top-bottom-2rem">
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
import { useCorpStore } from '@/stores/corp';
const useCorp = useCorpStore();
const user = ref(useCorp.loginInfo);
const active = ref('first');
const section = ref({
  height: '',
});
const deleteId = ref('');
const listDialogVisible = ref(false);
const tableDataOther = ref([
  {
    repository: 'ooo',
    cla: 'test',
    sharedGist: 'Yes',
    contributors: '0',
  },
]);
const tableTotal = ref(0);
const currentPage = ref(1);
const inactiveData = ref([
  { id: 0, name: 'jack', email: '10577507@qq.com', isUsed: false },
  {
    id: 1,
    name: 'Rose',
    email: '105507@163.com',
    isUsed: false,
  },
]);
const activeData = ref([
  { id: 0, name: 'tom', email: '10577507@qq.com', isUsed: true },
  {
    id: 1,
    name: 'helen',
    email: '105507@163.com',
    isUsed: true,
  },
]);

const changeActive =(id, active)=>{
  const data = { id: id, active: active };
}
</script>

<style scoped lang="scss">
#signedRepo_section {
  width: 1200px;
  margin: auto;
}

#signedRepo {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  & > div:nth-of-type(2) {
    flex-grow: 1;
    background-color: #f0f2f5;
    padding: 0 1rem;
  }

  & .tableStyle {
    margin-bottom: 2rem;
    padding: 3rem;
    background-color: white;
  }

  & .pointer {
    cursor: pointer;
  }

  & .marginTop1rem {
    margin-top: 1rem;
  }

  & .contentTitle {
    font-size: 1.2rem;
  }
}
</style>
