<template>
    <el-row id="addSubemail">
        <el-col class="addSubemail" :offset="6" :span="12">
            <p class="tabName">{{$t('corp.addSubEmail')}}
                <el-tooltip effect="light" :content="$t('corp.subEmailDesc')"
                            placement="right">
                    <svg-icon class="pointer" icon-class="tips"/>
                </el-tooltip>
            </p>
            <el-form class="addSubemailForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0">
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
                <el-form-item>
                    <button class="reset_pwd_button" type="button" @click="submitForm('ruleForm')">
                        {{$t('corp.submit')}}
                    </button>
                </el-form-item>
            </el-form>
            <corpReLoginDialog :message="corpReLoginMsg" :dialogVisible="corpReLoginDialogVisible"></corpReLoginDialog>
            <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../util/api'
    import http from '../util/http'
    import * as util from '../util/util'
    import corpReLoginDialog from '../components/CorpReLoginDialog'
    import reTryDialog from '../components/ReTryDialog'

    export default {
        name: "AddSubemail",
        components: {
            corpReLoginDialog,
            reTryDialog
        },
        computed: {
            corpReLoginDialogVisible() {
                return this.$store.state.dialogVisible
            },
            corpReLoginMsg() {
                return this.$store.state.dialogMessage
            },
            corpReTryDialogVisible() {
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
            return {
                second: '',
                sendBtText: this.$t('signPage.sendCode'),
                ruleForm: {email: '', code: ''},
                rules: {
                    email: [{required: true, validator: this.verifyFormEmail, trigger: ['blur', 'change']}],
                    code: [{required: true, validator: this.verifyCodeCheck, trigger: ['blur', 'change']}],
                },
            }
        },
        methods: {
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
            isExistSuffix(suffixArr, suffix) {
                if (!suffixArr) {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.noSession'));
                    return
                }
                let isExist = false;
                for (let i = 0; i < suffixArr.length; i++) {
                    if (suffixArr[i] === suffix) {
                        isExist = true;
                        break
                    }
                }
                return isExist
            },
            submitSubEmail() {
                let subEmailSplit = this.ruleForm.email.trim().split('@');
                if (this.isExistSuffix(this.$store.state.emailSuffixArr, subEmailSplit[subEmailSplit.length - 1])) {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.sameEmailSuffix'),
                    });
                    return
                }
                http({
                    url: url.addSubEmail,
                    method: 'post',
                    data: {
                        verification_code: this.ruleForm.code.trim(),
                        sub_email: this.ruleForm.email.trim(),
                    }
                }).then(res => {
                    util.successMessage(this);
                    this.$router.push('/subemail')
                }).catch(err => {
                    util.catchErr(err, 'errorSet', this);
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.compareEmailSuffix(this.$store.state.loginInfo.userName, this.ruleForm.email.trim())) {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.subemailErr'),
                            });
                            return
                        }
                        this.submitSubEmail()
                    } else {
                        return false;
                    }
                });
            },
            compareEmailSuffix(loginEmailOrID, subemail) {
                let loginSuffix, subSuffix = '';
                let loginSuffixArr, subSuffixArr = [];
                if (loginEmailOrID.indexOf('@') !== -1) {
                    let suffixArr = loginEmailOrID.split('@');
                    loginSuffix = suffixArr[suffixArr.length - 1]
                } else {
                    let suffixArr = loginEmailOrID.split('_');
                    loginSuffix = suffixArr[suffixArr.length - 1]
                }
                let suffixArr = subemail.split('@');
                subSuffix = suffixArr[suffixArr.length - 1];
                loginSuffixArr = loginSuffix.split('.');
                subSuffixArr = subSuffix.split('.');
                if (loginSuffixArr.length >= 2 && subSuffixArr.length >= 2) {
                    let isPass = true;
                    for (let i = 0; i < 2; i++) {
                        if (loginSuffixArr[loginSuffixArr.length - 1 - i] !== subSuffixArr[subSuffixArr.length - 1 - i]) {
                            isPass = false;
                            break
                        }
                    }
                    return isPass
                } else {
                    return false
                }
            },
            sendCode() {
                let email = this.ruleForm.email.trim();
                if (email && EMAIL_REG.test(email)) {
                    if (!this.compareEmailSuffix(this.$store.state.loginInfo.userName, email)) {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.subemailErr'),
                        });
                        return
                    }
                    http({
                        url: `${url.sendVerifyCode}/${email}`,
                        method: 'post',
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
                        util.catchErr(err, 'errorSet', this);
                    })
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.not_fill_email'))
                }
            },
        },
    }
</script>

<style lang="less">
    #addSubemail {


        .addSubemailForm {
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem 2rem 0;
            background-color: white;
            border-radius: 1rem;
        }

        .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
            cursor: pointer;
            border: none;
            background: linear-gradient(to right, #97DB30, #319E55);
        }

        .el-input.el-input--small.el-input-group.el-input-group--append {
            position: relative;
        }

        .el-button.el-button--default {
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

        .el-input-group__append {
            position: absolute;
            right: 0;
            top: 0;
            background: linear-gradient(to right, #97DB30, #319E55);
            width: 11rem;
            height: 2.5rem;
            border-radius: 1.25rem;
            padding: 0;
        }

        .el-input--small .el-input__inner {
            height: 2.5rem;
        }

        .el-form-item__label {
            font-size: 1.2rem;
        }

        .el-input__inner {
            background-color: #F3F3F3;
            border-radius: 1.25rem;
            border: 1px solid #F3F3F3;
            font-size: 1rem;
        }

        .el-input__inner:focus {
            border-color: #319E55
        }

        .el-form-item {
            margin-bottom: 28px
        }
    }
</style>
