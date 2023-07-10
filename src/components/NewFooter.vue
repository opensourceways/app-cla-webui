<template>
  <div class="parentBox">
    <el-row class="newFooter" align="middle">
      <el-col class="footer">
        <div class="box" @click="join">
          <svg-icon icon-class="github" class="footerIcon"></svg-icon>
        </div>
        <div class="box">
          <div class="copyright">
            <span>{{ copyright }}</span>
            <span class="pointer" @click="previewPrivacy">{{
              $t("signPage.privacy")
            }}</span>
            | <span class="pointer" @click="checkIcp">{{ icp }}</span> |
            <span class="pointer" @click="checkPoliceRecord">
              {{ policeRecord }}</span
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as util from "../util/util";
import cla from "../lang/global";

export default {
  name: "NewFooter",
  data() {
    return {
      copyright: cla.COPYRIGHT,
      icp: cla.ICP,
      icpLink: cla.ICP_LINK,
      policeRecord: cla.POLICE_RECORD,
      policeRecordLink: cla.POLICE_RECORD_LINK,
    };
  },
  methods: {
    ...mapActions(["viewPrivacy"]),
    previewPrivacy() {
      util.toPrivacy(this);
    },
    checkIcp() {
      open(this.icpLink);
    },
    checkPoliceRecord() {
      open(this.policeRecordLink);
    },
    join() {
      window.open("https://github.com/opensourceways/app-cla-server");
    },
  },
};
</script>

<style scoped lang="less">
@import "../assets/font/css/huaweisans-bold.css";
@import "../assets/font/css/HuaweiSans-Thin.css";
@import "../assets/font/css/HuaweiSans-Light.css";
@import "../assets/font/css/HuaweiSans-Regular.css";

@media screen and (min-width: 1200px) {
  .newFooter {
    width: 1200px;
    margin: auto;
  }
}

@media screen and (max-width: 1200px) {
  .newFooter {
    width: 100%;
  }
}

.parentBox {
  box-sizing: border-box;
  width: 100%;
  border-top: 2px solid #f2f2f2;
}

.newFooter {
  background-color: white;
  padding: 0 1rem;

  .footer {
    font-family: HuaweiSans-Regular, sans-serif;
    display: flex;
    justify-content: space-between;
    height: 5.5rem;
  }

  .footerIcon {
    width: 3rem;
    height: 3rem;
  }

  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .copyright {
    font-size: 0.5rem;
    /*font-family: HuaweiSans-Light,sans-serif;*/
  }

  .join_us {
    font-size: 1.8rem;
  }
}
</style>
