<template>
    <div id="forgetAndResetPwd" class="margin-top-3rem margin-bottom-3rem">
        <Step class="margin-top-5rem margin-bottom-2rem" :steping="0"></Step>
        <div class="findPwdBox">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
                <el-form-item prop="email">
                    <el-input :placeholder="$t('corp.email_input_holder')" size="small"
                              v-model="ruleForm.email" clearable=""></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-row align="middle" :gutter="20">
                        <el-col :span="16">
                            <el-input v-model="ruleForm.code" :placeholder="$t('signPage.verifyCodeHolder')"
                                      size="small" clearable="">
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button :disabled="sendBtTextFromLang!==$t('signPage.sendCode')"
                                       @click="sendCode()">{{sendBtTextFromLang}}
                            </el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="newPassword">
                    <el-input :placeholder="$t('corp.input_new_pwd')" clearable=""
                              type="password"
                              v-model="ruleForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item prop="newPasswordAgain">
                    <el-input :disabled="!haveNewPwd" :placeholder="$t('corp.input_new_pwd_again')" clearable=""
                              type="password"
                              v-model="ruleForm.newPasswordAgain"></el-input>
                </el-form-item>
                <el-form-item>
                    <button class="reset_pwd_button" type="button" @click="submitForm('ruleForm')">
                        {{$t('corp.submit')}}
                    </button>
                </el-form-item>
            </el-form>
        </div>
        <ReTryDialog :dialogVisible="reTryDialogVisible" :message="reLoginMsg"></ReTryDialog>
    </div>
</template>

<script>
    import Step from '../components/FindPwdSteps'
    import http from '../util/_axios'
    import * as url from '../util/api'
    import * as util from '../util/util'
    import ReTryDialog from '../components/ReTryDialog'

    export default {
        name: "ForgetAndResetPwd",
        components: {
            Step,
            ReTryDialog,
        },
        computed: {
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
            reTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
            sendBtTextFromLang: {
                get: function () {
                    return this.sendBtText;
                },
                set: function (value) {
                    this.sendBtText = value
                }
            },
        },
        watch: {
            '$i18n.locale'() {
                if (this.sendBtTextFromLang === 'send code' || this.sendBtTextFromLang === '发送验证码') {
                    this.sendBtTextFromLang = this.$t('signPage.sendCode')
                } else {
                    this.sendBtTextFromLang = this.$t('signPage.reSendCode', {second: this.second})
                }
                this.$refs['ruleForm'] && this.$refs['ruleForm'].fields.forEach(item => {
                    if (item.validateState === 'error') {
                        this.$refs['ruleForm'].validateField(item.labelFor)
                    }
                });
            },
        },
        data() {
            var validateNewPwd = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('corp.input_new_pwd')));
                } else if (value.length < PWD_MIN_LENGTH || value.length > PWD_MAX_LENGTH) {
                    callback(new Error(this.$t('corp.newPwd_length_err')));
                } else if (this.checkIllegalChar(value)) {
                    callback(new Error(this.$t('corp.newPwd_contains_Illegal_character')));
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
                second: '',
                haveNewPwd: false,
                sendBtText: this.$t('signPage.sendCode'),
                ruleForm: {email: '', code: '', newPassword: '', newPasswordAgain: ''},
                rules: {
                    email: [{required: true, validator: this.verifyFormEmail, trigger: ['blur', 'change']}],
                    code: [{required: true, validator: this.verifyCodeCheck, trigger: ['blur', 'change']}],
                    newPassword: [{required: true, validator: validateNewPwd, trigger: ['blur', 'change']}],
                    newPasswordAgain: [{required: true, validator: validateNewPwdAgain, trigger: ['blur', 'change']}]
                },
            }
        },
        methods: {
            checkIllegalChar(str) {
                for (let char of str) {
                    if (char.charCodeAt() > PWD_MAX_ASCII || char.charCodeAt() < PWD_MIN_ASCII) {
                        return true
                    }
                }
                return false
            },
            async verifyFormEmail(rule, value, callback) {
                let email = value.trim();
                if (EMAIL_REG.test(email)) {
                    callback();
                } else {
                    callback(new Error(this.$t('tips.invalid_email')))
                }
            },
            async verifyCodeCheck(rule, value, callback) {
                if (value) {
                    callback();
                } else {
                    callback(new Error(this.$t('tips.fill_verification_code')))
                }
            },
            submitVerifyCode() {
                let org_repo = {};
                try {
                    if (this.$store.state.repoInfo.repo_id) {
                        org_repo = {
                            platform: this.$store.state.repoInfo.platform,
                            org_id: this.$store.state.repoInfo.org_id,
                            repo_id: this.$store.state.repoInfo.repo_id,
                        }
                    } else {
                        org_repo = {
                            platform: this.$store.state.repoInfo.platform,
                            org_id: this.$store.state.repoInfo.org_id,
                        }
                    }
                } catch (e) {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.page_error'),
                    });
                    return
                }
                http({
                    url: url.submitVerifyCode,
                    method: 'post',
                    data: {
                        code: this.ruleForm.code.trim(),
                        email: this.ruleForm.email.trim(),
                        org_repo: org_repo,
                        password: this.ruleForm.newPassword.trim(),
                    }
                }).then(res => {
                    console.log(res);
                    this.$router.push('/reset-done')
                }).catch(err => {
                    util.catchErr(err, '', this)
                })
            },
            submitForm(formName) {
                console.log(formName);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitVerifyCode()
                    } else {
                        return false;
                    }
                });
            },
            sendCode() {
                let email = this.ruleForm.email.trim();
                if (email && EMAIL_REG.test(email)) {
                    let _url = '';
                    try {
                        if (this.$store.state.repoInfo.repo_id) {
                            _url = `${url.findPwdSendCode}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}:${this.$store.state.repoInfo.repo_id}/${email}`
                        } else {
                            _url = `${url.findPwdSendCode}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}/${email}`
                        }
                    } catch (e) {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.page_error'),
                        });
                        return
                    }
                    http({
                        url: _url,
                        method: 'post'
                    }).then(res => {
                        this.$message.closeAll();
                        this.$message.success({message: this.$t('tips.sending_email'), duration: 5000});
                        this.second = 60;
                        let codeInterval = setInterval(() => {
                            if (this.second !== 0) {
                                this.second--;
                                this.sendBtTextFromLang = this.$t('signPage.reSendCode', {second: this.second})
                            } else {
                                this.sendBtTextFromLang = this.$t('signPage.sendCode');
                                clearInterval(codeInterval)
                            }
                        }, 1000)
                    }).catch(err => {
                        util.catchErr(err, '', this)
                    })
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.not_fill_email'))
                }

            },
        }
    }
</script>

<style lang="less">
    #forgetAndResetPwd {
        .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
            cursor: pointer;
            border: none;
            background: linear-gradient(to right, #97DB30, #319E55);
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
            background: linear-gradient(to right, #97DB30, #319E55);
        }

        & .el-input-group__append {
            position: absolute;
            right: 0;
            top: 0;
            background: linear-gradient(to right, #97DB30, #319E55);
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
            background-color: #F3F3F3;
            border-radius: 1.25rem;
            border: 1px solid #F3F3F3;
            font-size: 1rem;
        }

        .el-input__inner:focus {
            border-color: #319E55
        }

        & .el-form-item {
            margin-bottom: 28px
        }


    }
</style>
