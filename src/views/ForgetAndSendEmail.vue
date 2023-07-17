<template>
  <div id="forgetAndSendEmail" class="margin-top-3rem margin-bottom-3rem">
    <Step class="margin-top-5rem margin-bottom-2rem" :steping="0"></Step>
    <div class="findPwdBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
        <el-form-item prop="email">
          <el-input
            :placeholder="$t('corp.email_input_holder')"
            size="small"
            v-model="ruleForm.email"
            clearable=""
          ></el-input>
        </el-form-item>
        <el-form-item>
          <button
            class="reset_pwd_button"
            type="button"
            @click="submitForm('ruleForm')"
          >
            {{ $t('corp.send') }}
          </button>
        </el-form-item>
      </el-form>
    </div>
    <ReTryDialog
      :dialogVisible="reTryDialogVisible"
      :message="reLoginMsg"
    ></ReTryDialog>
  </div>
</template>

<script>
import Step from '../components/FindPwdSteps';
import http from '../util/_axios';
import * as url from '../util/api';
import * as util from '../util/util';
import ReTryDialog from '../components/ReTryDialog';
import claConfig from '../lang/global';

export default {
  name: 'ForgetAndSendEmail',
  components: {
    Step,
    ReTryDialog,
  },
  watch: {
    '$i18n.locale'() {
      util.verifyMsgChangeLang('ruleForm', this);
    },
  },
  computed: {
    reLoginMsg() {
      return this.$store.state.dialogMessage;
    },
    reTryDialogVisible() {
      return this.$store.state.reTryDialogVisible;
    },
  },
  created() {
    this.getLinkId();
  },
  data() {
    return {
      ruleForm: { email: '' },
      rules: {
        email: [
          {
            required: true,
            validator: this.verifyFormEmail,
            trigger: ['blur', 'change'],
          },
        ],
      },
    };
  },
  methods: {
    getLinkId() {
      this.$store.commit('setLinkId', this.$route.params.link_id);
    },
    async verifyFormEmail(rule, value, callback) {
      let email = value.trim();
      if (claConfig.EMAIL_REG.test(email)) {
        callback();
      } else {
        callback(new Error(this.$t('tips.invalid_email')));
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendEmail();
        } else {
          return false;
        }
      });
    },
    sendEmail() {
      let email = this.ruleForm.email.trim();
      let _url = '';
      try {
        _url = `${url.findPwdSendEmail}/${this.$store.state.linkId}`;
      } catch (e) {
        this.$store.commit('errorCodeSet', {
          dialogVisible: true,
          dialogMessage: this.$t('tips.page_error'),
        });
        return;
      }
      http({
        url: _url,
        method: 'post',
        data: { email },
      })
        .then((res) => {
          this.$message.closeAll();
          this.$message.success({
            message: this.$t('tips.send_reset_password_email'),
            duration: 6000,
          });
          this.$refs['ruleForm'].resetFields();
        })
        .catch((err) => {
          util.catchErr(err, '', this);
        });
    },
  },
};
</script>

<style lang="less">
#forgetAndSendEmail {
  .el-button.is-disabled,
  .el-button.is-disabled:focus,
  .el-button.is-disabled:hover {
    cursor: pointer;
    border: none;
    background: linear-gradient(to right, #97db30, #319e55);
  }

  & .el-input.el-input--small.el-input-group.el-input-group--append {
    position: relative;
  }

  & .el-button.el-button--default {
    top: 0;
    left: 0;
    width: 100%;
    height: 2.5rem;
    border-radius: 1.25rem;
    font-size: 1rem;
    color: white;
    margin: 0;
    font-family: Roboto-Light, sans-serif;
    background: linear-gradient(to right, #97db30, #319e55);
  }

  & .el-input-group__append {
    position: absolute;
    right: 0;
    top: 0;
    background: linear-gradient(to right, #97db30, #319e55);
    width: 11rem;
    height: 2.5rem;
    border-radius: 1.25rem;
    padding: 0;
  }

  & .fontSize12 {
    font-size: 1.2rem;
  }

  & .el-input--small .el-input__inner {
    height: 2.5rem;
  }

  & .el-form-item__label {
    font-size: 1.2rem;
  }

  & .el-input__inner {
    background-color: #f3f3f3;
    border-radius: 1.25rem;
    border: 1px solid #f3f3f3;
    font-size: 1rem;
  }

  .el-input__inner:focus {
    border-color: #319e55;
  }

  & .el-form-item {
    margin-bottom: 28px;
  }
}
</style>
