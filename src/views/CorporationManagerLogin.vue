<template>
  <el-row id="corpManagerLogin" style="height: 100%">
    <el-col align="right" class="formBox">
      <div class="formBack_Box">
        <div class="formBack">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="0"
          >
            <el-form-item :required="true" prop="userName">
              <el-input
                clearable=""
                v-model="ruleForm.userName"
                autocomplete="off"
                :placeholder="$t('corp.id')"
                @keydown.native="pressEnter"
              ></el-input>
            </el-form-item>
            <el-form-item :required="true" label="" prop="pwd">
              <el-input
                clearable=""
                type="password"
                v-model="ruleForm.pwd"
                autocomplete="off"
                :placeholder="$t('corp.pwd')"
                @keydown.native="pressEnter"
              ></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
              <span @click="findPwd" class="pointer" id="forgetPwd">{{
                $t('corp.forget_pwd')
              }}</span>
            </el-form-item>
            <el-form-item style="text-align: center">
              <HttpButton
                :text="$t(`corp.${loginText}`)"
                :width="loginBtWidth"
                :buttonDisable="loginButtonDisable"
                @httpSubmit="submitForm('ruleForm')"
              >
              </HttpButton>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <reTryDialog
        :message="corpReLoginMsg"
        :dialogVisible="corpReTryDialogVisible"
      ></reTryDialog>
    </el-col>
  </el-row>
</template>

<script>
import * as url from '../util/api';
import http from '../util/http';
import { mapActions } from 'vuex';
import * as util from '../util/util';
import reTryDialog from '../components/ReTryDialog';
import HttpButton from '../components/HttpButton';

export default {
  name: 'RepoSelect',
  components: {
    reTryDialog,
    HttpButton,
  },
  computed: {
    corpReLoginMsg() {
      return this.$store.state.dialogMessage;
    },
    corpReTryDialogVisible() {
      return this.$store.state.reTryDialogVisible;
    },
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('tips.not_fill_email')));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('tips.fill_pwd')));
      } else {
        callback();
      }
    };
    return {
      loginBtWidth: '15rem',
      loginText: 'login_in',
      loginButtonDisable: false,
      myStyle: {
        height: '',
      },
      rules: {
        userName: [
          {
            required: true,
            validator: validateAccount,
            trigger: ['blur', 'change'],
          },
        ],
        pwd: [
          {
            required: true,
            validator: validatePass,
            trigger: ['blur', 'change'],
          },
        ],
      },
      ruleForm: {
        userName: '',
        pwd: '',
      },
      asciiArray:[]
    };
  },
  inject: ['setClientHeight'],
  methods: {
    ...mapActions(['setLoginInfoAct', 'setCorpTokenAct']),
    pressEnter() {
      if (event.keyCode === 13) {
        this.submitForm('ruleForm');
      }
    },
    findPwd() {
      this.$router.push(`/password/${this.$store.state.linkId}`);
    },
    login(userName, pwd) {
      let linkId = '';
      if (this.$store.state.linkId) {
        linkId = this.$store.state.linkId;
      } else {
        this.$store.commit('errorCodeSet', {
          dialogVisible: true,
          dialogMessage: this.$t('tips.page_error'),
        });
        return;
      }
      let obj = {
        user: userName.trim(),
        password: util.getAsciiArray(this.asciiArray,pwd),
        link_id: linkId,
      };
      this.loginButtonDisable = true;
      this.loginText = 'logining';
      http({
        url: url.corporationManagerAuth,
        method: 'post',
        data: obj,
      })
        .then((res) => {
          let data = [];
          this.asciiArray=[];
          if (res.data) {
            data = res.data.data;
          }
          this.loginButtonDisable = false;
          this.loginText = 'login_in';
          if (data.length) {
            new Promise((resolve, reject) => {
              let userInfo = { userInfo: data };
              Object.assign(userInfo, { userName: userName });
              this.setLoginInfoAct(userInfo);
              if (data.length > 1) {
                this.$router.push('/orgSelect');
              } else {
                this.setCorpTokenAct(data[0].token);
                Object.assign(userInfo, { orgValue: 0 });
                this.$store.commit(
                  'setPwdIsChanged',
                  data[0].initial_pw_changed
                );
                this.setLoginInfoAct(userInfo);
                if (data[0].initial_pw_changed) {
                  if (data[0].role === 'admin') {
                    this.$router.push('/rootManager');
                  } else {
                    this.$router.push('/signedRepo');
                  }
                } else {
                  this.$router.push('/resetPassword');
                }
              }
              resolve('completed');
            }).then(
              (res) => {},
              (err) => {}
            );
          } else {
            this.$store.commit('errorCodeSet', {
              dialogVisible: true,
              dialogMessage: this.$t('tips.id_pwd_err'),
            });
          }
        })
        .catch((err) => {
          this.asciiArray=[];
          this.loginButtonDisable = false;
          this.loginText = 'login_in';
          util.catchErr(err, 'errorSet', this);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login(this.ruleForm.userName, this.ruleForm.pwd);
        } else {
          return false;
        }
      });
    },
  },
  created() {
    util.clearManagerSession(this);
  },
  mounted() {
    this.setClientHeight();
  },
};
</script>

<style lang="less">
@import '../assets/font/css/Roboto-Regular.css';

#corpManagerLogin {
  .formBack_Box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  .formBack {
    width: 18rem;
    box-shadow: 0 0 20px 10px #f3f3f3;
    padding: 2rem 2rem 0;
    background-color: white;
    border-radius: 1rem;

    & .el-input__inner {
      height: 3rem;
    }

    & .el-form-item__label {
      font-size: 1.2rem;
    }

    & .el-input__inner {
      background-color: #f3f3f3;
      border-radius: 1.5rem;
      border: 1px solid #f3f3f3;
      font-size: 1.2rem;
    }

    & .el-form-item:not(:last-child) {
      margin-bottom: 1.8rem;
    }

    & .el-form-item:last-child {
      margin-bottom: -2rem;
    }
  }

  .formBox {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .el-dialog {
      border-radius: 1rem;
      text-align: center;
    }

    & .button {
      font-family: Roboto-Regular, sans-serif;
      width: 15rem;
      height: 4rem;
      border-radius: 2rem;
      border: none;
      color: white;
      font-size: 1.3rem;
      cursor: pointer;
      background: linear-gradient(to right, #97db30, #319e55);
    }

    & .button:focus {
      outline: none;
    }
  }

  .pointer {
    cursor: pointer;
  }

  #forgetPwd {
    font-size: 1rem;
  }

  #forgetPwd:hover {
    text-decoration: underline;
  }

  .el-form-item__error {
    font-size: 0.8rem;
  }
}
</style>
