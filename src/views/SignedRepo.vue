<template>
  <div id="signedRepo" :style="section">
    <Header></Header>
    <div>
      <div id="signedRepo_section" class="padding-top-bottom-2rem">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import * as url from '../util/api';
import * as util from '../util/util';
import axios from 'axios';
import Header from '@components/NewHeader';
import Footer from '@components/NewFooter';

window.onresize = () => {
  if (
    util.getClientHeight() > document.getElementById('signedRepo').offsetHeight
  ) {
    document.getElementById('signedRepo').style.height =
      util.getClientHeight() + 'px';
  }
};
export default {
  name: 'SignedRepo',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      user: this.$store.state.loginInfo,

      active: 'first',
      section: {
        height: '',
      },
      deleteId: '',
      listDialogVisible: false,
      tableDataOther: [
        {
          repository: 'ooo',
          cla: 'test',
          sharedGist: 'Yes',
          contributors: '0',
        },
      ],
      tableTotal: 0,
      currentPage: 1,
      inactiveData: [
        { id: 0, name: 'jack', email: '10577507@qq.com', isUsed: false },
        {
          id: 1,
          name: 'Rose',
          email: '105507@163.com',
          isUsed: false,
        },
      ],
      activeData: [
        { id: 0, name: 'tom', email: '10577507@qq.com', isUsed: true },
        {
          id: 1,
          name: 'helen',
          email: '105507@163.com',
          isUsed: true,
        },
      ],
    };
  },
  methods: {
    changeActive(id, active) {
      let data = { id: id, active: active };
      axios({
        url: `/api${url.changeActive}`,
        method: 'post',
        data: data,
      })
        .then((res) => {})
        .catch((err) => {
          this.$message.closeAll();
          this.$message.error(err.response.data);
        });
    },
    deleteContributor() {
      axios({
        url: `/api${url.deleteCon}/${this.deleteId}`,
        method: 'delete',
      })
        .then((res) => {})
        .catch((err) => {
          this.$message.closeAll();
          this.$message.error(err.response.data);
        });
    },
    changePage(page) {},
    setClientHeight() {
      this.$nextTick(() => {
        util.getClientHeight() >
        document.getElementById('signedRepo').offsetHeight
          ? (this.section.height = util.getClientHeight() + 'px')
          : (this.section.height =
              document.getElementById('signedRepo').offsetHeight);
      });
    },
    loginOut() {
      sessionStorage.clear();
      this.$router.push('/corporationManagerLogin');
    },
  },
  mounted() {
    this.setClientHeight();
  },
};
</script>

<style lang="less">
@media screen and (min-width: 1200px) {
  #signedRepo_section {
    width: 1200px;
    margin: auto;
  }
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
