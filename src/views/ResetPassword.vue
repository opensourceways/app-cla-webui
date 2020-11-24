<template>
    <el-row>
        <el-col class="resetPwdFormBox" :offset="6" :span="12">
            <p id="tabName">{{$t('header.resetPwd')}}</p>
            <el-form class="resetPwdForm" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="" prop="oldPassword" label-width="0">
                    <el-input :placeholder="$t('corp.input_old_pwd')" clearable="" type="password"
                              v-model="ruleForm.oldPassword" @keydown.native="pressEnter"></el-input>
                </el-form-item>
                <el-form-item label="" prop="newPassword" label-width="0">
                    <el-input :placeholder="$t('corp.input_new_pwd')" clearable="" type="password"
                              v-model="ruleForm.newPassword" @keydown.native="pressEnter"></el-input>
                </el-form-item>
                <el-form-item label="" prop="checkPwd" label-width="0">
                    <el-input :placeholder="$t('corp.input_new_pwd_again')" clearable="" type="password"
                              v-model="ruleForm.checkPwd" @keydown.native="pressEnter"></el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <button class="button" type="button" @click="submit('ruleForm')">{{$t('corp.submit')}}</button>
                    <button class="cancelBt" type="reset" @click="reset('ruleForm')">{{$t('corp.reset')}}</button>
                </el-form-item>
            </el-form>
            <corpReLoginDialog :message="corpReLoginMsg" :dialogVisible="corpReLoginDialogVisible"></corpReLoginDialog>
            <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../until/api'
    import http from '../until/http'
    import corpReLoginDialog from '../components/CorpReLoginDialog'
    import reTryDialog from '../components/ReTryDialog'

    export default {

        name: "ResetPassword",
        components: {
            corpReLoginDialog,
            reTryDialog
        },
        computed: {
            orgValue() {
                return this.$store.state.loginInfo.orgValue
            },
            userInfo() {
                return this.$store.state.loginInfo.userInfo
            },
            corpReLoginDialogVisible() {
                return this.$store.state.dialogVisible
            }
            ,
            corpReLoginMsg() {
                return this.$store.state.dialogMessage
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('corp.input_old_pwd')));
                } else if (value === this.ruleForm.newPassword) {
                    callback(new Error(this.$t('corp.newPwd_diff_with_oldPwd')));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('corp.input_new_pwd')));
                } else if (value === this.ruleForm.oldPassword) {
                    callback(new Error(this.$t('corp.newPwd_diff_with_oldPwd')));
                } else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('corp.input_new_pwd_again')));
                } else if (value !== this.ruleForm.newPassword) {
                    callback(new Error(this.$t('corp.newPwd_diff')));
                } else {
                    callback();
                }
            };
            return {
                cla_org_id: this.$store.state.loginInfo.cla_org_id,
                email: this.$store.state.loginInfo.email,
                ruleForm: {
                    oldPassword: '',
                    newPassword: '',
                    checkPwd: '',
                },
                rules: {
                    oldPassword: [
                        {require: true, validator: validatePass, trigger: 'blur'}
                    ],
                    newPassword: [
                        {require: true, validator: validatePass2, trigger: 'blur'}
                    ],
                    checkPwd: [
                        {require: true, validator: validatePass3, trigger: 'blur'}
                    ],

                }
            }
        },
        methods: {
            pressEnter() {
                if (event.keyCode === 13) {
                    this.submit('ruleForm')
                }
            },
            resetPassword() {
                let obj = {
                    cla_org_id: this.cla_org_id,
                    email: this.email,
                    old_password: this.ruleForm.oldPassword,
                    new_password: this.ruleForm.newPassword
                }
                http({
                    url: url.resetPassword,
                    method: 'patch',
                    data: obj,
                }).then(res => {
                    this.$store.commit('setPwdIsChanged', true)
                    this.$message.closeAll()
                    this.$message.success(this.$t('tips.successTitle'))
                    if (this.$store.state.loginInfo.userInfo[0].role === 'manager') {
                        this.$router.push('/employeeList')
                    } else {
                        this.$router.push('/managerList')
                    }
                }).catch(err => {
                    if (err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token'),
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token'),
                                });
                                break;

                            case 'cla.invalid_parameter':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_parameter'),
                                });
                                break;
                            case 'cla.invalid_account_or_pw':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_account_or_pw'),
                                });
                                break;
                            case 'cla.no_db_record':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_account_or_pw'),
                                });
                                break;
                            case 'cla.system_error':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.system_error'),
                                });
                                break;
                        }
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.system_error'),
                        })
                    }
                })
            },
            submit(formName) {
                this.$refs[formName].validate((valid => {
                    if (valid) {
                        this.resetPassword()
                    } else {
                        return false;
                    }
                }))
            },
            reset(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };

</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Regular.css";

    .resetPwdFormBox {
        & .el-dialog {
            border-radius: 1rem;
        }

        & .resetPwdForm {
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem 2rem 0;
            background-color: white;
            border-radius: 1rem;

        }

        & #tabName {
            font-family: Roboto-Regular, sans-serif;
            font-size: 2rem;
            text-align: left;
        }

        & .el-form-item__label {
            font-size: 1.2rem;
        }

        & .el-input__inner {
            height: 3rem;
            background-color: #F3F3F3;
            border-radius: 1.5rem;
            border: 1px solid #F3F3F3;
            font-size: 1.2rem;
        }

        & .el-form-item {
            margin-bottom: 2rem
        }

        & .button {
            width: 6rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin-bottom: 1rem;
        }

        & .button:focus {
            outline: none;
        }

    }

    .cancelBt {
        width: 6rem;
        height: 3rem;
        border-radius: 1.5rem;
        border: 1px solid black;
        color: black;
        font-size: 1rem;
        cursor: pointer;
        background-color: white;
        margin-left: 1rem;
    }

    .cancelBt:focus {
        outline: none;
    }
</style>