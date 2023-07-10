<template>
  <el-row id="signSuccessDialog">
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      :width="dialogWidth"
    >
      <div class="titleBox">
        <svg-icon icon-class="chenggong" class="dialogIcon"></svg-icon>
        <span>{{ $t("tips.successTitle") }}</span>
      </div>
      <el-row>
        <el-col align="center">
          <p :class="dialogMessage">{{ message }}</p>
          <button class="dialogBt" @click="clickGoHome()">
            {{ $t("tips.dialogBt") }}
          </button>
        </el-col>
      </el-row>
    </el-dialog>
  </el-row>
</template>

<script>
import * as util from "../util/util";
import cla from "../lang/global";

export default {
  name: "SignSuccessDialog",
  props: ["dialogVisible", "message"],
  computed: {
    dialogWidth() {
      if (this.IS_MOBILE) {
        return "80%";
      } else {
        return "30%";
      }
    },
    dialogMessage() {
      if (localStorage.getItem("lang") === this.english) {
        return "dialogMessageEn";
      } else if (localStorage.getItem("lang") === this.chinese) {
        return "dialogMessage";
      }
    },
  },
  data() {
    return {
      domain: this.$store.state.domain,
      chinese: "Chinese",
      english: "English",
    };
  },
  methods: {
    clickGoHome() {
      this.$store.commit("setSignSuccess", {
        dialogVisible: false,
        dialogMessage: "",
      });

      if (window.location.origin === cla.OPENLOOKENG_SIGN_URL) {
        let path = cla.SIGN_ROUTER;
        this.$router.replace(path);
      } else {
        let path = `${cla.SIGN_ROUTER}/${this.$store.state.linkId}`;
        this.$router.replace(path);
      }
    },
  },
};
</script>

<style lang="less">
#signSuccessDialog {
  .dialogBt {
    margin-top: 3rem;
    width: 8rem;
    height: 3rem;
    background: linear-gradient(to right, #97db30, #319e55);
    border-radius: 1.5rem;
    border: none;
    color: white;
    cursor: pointer;
    outline: none;
  }

  .el-dialog__header {
    padding: 0;
  }

  .el-dialog__body {
    padding: 20px;
  }

  .titleBox {
    text-align: left;
    font-size: 1.5rem;
    color: #319e55;
    margin-bottom: 1rem;

    .dialogIcon {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 1rem;
    }
  }
}
</style>
