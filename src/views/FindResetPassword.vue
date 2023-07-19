<template>
  <div class="margin-top-5rem margin-bottom-3rem">
    <Step class="margin-top-5rem margin-bottom-2rem" :steping="1"></Step>
    <div class="findPwdBox">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
        <el-form-item prop="newPassword">
          <el-input
            :placeholder="$t('corp.input_new_pwd')"
            clearable=""
            type="password"
            v-model="ruleForm.newPassword"
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPasswordAgain">
          <el-input
            :disabled="!haveNewPwd"
            :placeholder="$t('corp.input_new_pwd_again')"
            clearable=""
            type="password"
            v-model="ruleForm.newPasswordAgain"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <button
            class="reset_pwd_button"
            type="button"
            @click="submitForm('ruleForm')"
          >
            {{ $t('corp.submit') }}
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
import cla from '../lang/global';

export default {
  name: 'ResetPwdDone',
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
  data() {
    var validateNewPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('corp.input_new_pwd')));
      } else if (
        value.length < cla.PWD_MIN_LENGTH ||
        value.length > cla.PWD_MAX_LENGTH ||
        util.checkIllegalChar(value)
      ) {
        callback(
          new Error(
            this.$t('corp.newPwd_contains_Illegal_character', {
              minLength: cla.PWD_MIN_LENGTH,
              maxLength: cla.PWD_MAX_LENGTH,
            })
          )
        );
      } else {
        this.haveNewPwd = true;
        callback();
      }
    };
    var validateNewPwdAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('corp.input_new_pwd_again')));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error(this.$t('corp.newPwd_diff')));
      } else {
        callback();
      }
    };
    return {
      haveNewPwd: false,
      ruleForm: { newPassword: '', newPasswordAgain: '' },
      rules: {
        newPassword: [
          {
            required: true,
            validator: validateNewPwd,
            trigger: ['blur', 'change'],
          },
        ],
        newPasswordAgain: [
          {
            required: true,
            validator: validateNewPwdAgain,
            trigger: ['blur', 'change'],
          },
        ],
      },
      link_id: '',
      key: '',
      asciiArray:[]
    };
  },
  created() {
    this.getParams();
  },
  methods: {
    getParams() {
      this.link_id = this.$route.query.link_id;
      this.key = this.$route.query.key;
      this.$store.commit('setLinkId', this.link_id);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitReset();
        } else {
          return false;
        }
      });
    },
    submitReset() {
      for (let i = 0; i < this.ruleForm.newPassword.length; i++) {
          this.asciiArray.push(this.ruleForm.newPassword.charCodeAt(i));
        }
      http({
        url: url.findPwdResetPwd + this.link_id,
        method: 'put',
        data: { password: this.asciiArray },
        headers: {
          'Password-Retrieval-Key': this.key,
        },
      })
        .then((res) => {
          this.asciiArray=[];
          this.$message.success({
            message: this.$t('tips.reset_password_success'),
            duration: 6000,
          });
          this.$router.push('/corporationManagerLogin');
        })
        .catch((err) => {
          util.catchErr(err, '', this);
        });
    },
  },
};
</script>

<style scoped></style>
