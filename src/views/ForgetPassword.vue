<template>
  <div id="forgetPwd">
    <Header></Header>
    <div>
      <div id="forgetPwd_section">
        <router-view></router-view>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/NewHeader';
import Footer from '../components/NewFooter';
import * as util from '../util/util';

window.onresize = () => {
  if (
    util.getClientHeight() > document.getElementById('forgetPwd').offsetHeight
  ) {
    document.getElementById('forgetPwd').style.height =
      util.getClientHeight() + 'px';
  }
};
export default {
  name: 'ForgetPassword',
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.setClientHeight();
  },
  methods: {
    setClientHeight() {
      this.$nextTick(() => {
        document.getElementById('forgetPwd').style.minHeight = '0px';
        if (
          util.getClientHeight() >
          document.getElementById('forgetPwd').offsetHeight
        ) {
          document.getElementById('forgetPwd').style.minHeight =
            util.getClientHeight() + 'px';
        } else {
          document.getElementById('forgetPwd').style.minHeight =
            document.getElementById('forgetPwd').offsetHeight + 'px';
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
@media screen and (min-width: 1200px) {
  #forgetPwd_section {
    width: 1200px;
    margin: auto;
  }
}

#forgetPwd {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;

  & > div:nth-of-type(2) {
    flex-grow: 1;
    background-color: #f0f2f5;
    padding: 0 1rem;
  }
}
</style>
