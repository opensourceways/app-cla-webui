<template>
  <el-row id="signPage">
    <Header ref="header"></Header>
    <div id="content">
      <keep-alive exclude="Privacy">
        <router-view
          @getLangOptions="getLangOptions"
          @initHeader="initHeader"
        ></router-view>
      </keep-alive>
    </div>
    <Footer></Footer>
  </el-row>
</template>

<script>
import Header from '@components/NewHeader';
import Footer from '@components/NewFooter';
import * as util from '../util/util';

export default {
  name: 'SignPage',
  components: {
    Header,
    Footer,
  },
  provide() {
    return {
      setClientHeight: this.setClientHeight,
    };
  },
  methods: {
    initHeader(value) {
      this.$refs.header.init(value);
    },
    getLangOptions(data) {
      this.$refs.header.updateLangOptions(data);
    },
    setClientHeight() {
      this.$nextTick(() => {
        document.getElementById('signPage').style.minHeight = '0px';
        if (
          util.getClientHeight() >
          document.getElementById('signPage').offsetHeight
        ) {
          document.getElementById('signPage').style.minHeight =
            util.getClientHeight() + 'px';
          document.getElementById('content').style.minHeight =
            util.getClientHeight() -
            parseInt(
              window.getComputedStyle(
                document.getElementsByClassName('parentBox')[0]
              ).height
            ) *
              2 +
            'px';
        } else {
          document.getElementById('signPage').style.minHeight =
            document.getElementById('signPage').offsetHeight + 'px';
        }
      });
    },
  },
  mounted() {
    this.setClientHeight();
    window.onresize = () => {
      if (
        util.getClientHeight() >
        document.getElementById('signPage').offsetHeight
      ) {
        document.getElementById('signPage').style.minHeight =
          util.getClientHeight() + 'px';
        document.getElementById('content').style.minHeight =
          util.getClientHeight() -
          parseInt(
            window.getComputedStyle(
              document.getElementsByClassName('parentBox')[0]
            ).height
          ) *
            2 +
          'px';
      }
    };
  },
  destroyed() {
    window.onresize = null;
  },
};
</script>
