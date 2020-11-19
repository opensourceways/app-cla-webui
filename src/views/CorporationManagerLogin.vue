<template>
    <el-row style="height: 100%">
        <el-col align="right" class="formBox">
            <div class="formBack_Box">
                <div class="formBack">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0">
                        <el-form-item :required="true" prop="userName">
                            <el-input v-model="ruleForm.userName" autocomplete="off" :placeholder="$t('corp.id')"
                                      @keydown.native="pressEnter"></el-input>
                        </el-form-item>
                        <el-form-item :required="true" label="" prop="pwd">
                            <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"
                                      :placeholder="$t('corp.pwd')" @keydown.native="pressEnter"></el-input>
                        </el-form-item>
                        <el-form-item style="text-align: right">
                            <span class="pointer" @click="findPwd" id="forgetPwd">{{$t('corp.forget_pwd')}}</span>
                        </el-form-item>
                        <el-form-item style="text-align: center">
                            <button class="button" type="button" @click="submitForm('ruleForm')">
                                {{$t('corp.login_in')}}
                            </button>
                        </el-form-item>
                    </el-form>

                </div>
            </div>

            <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
        </el-col>

    </el-row>

</template>

<script>
    import * as url from '../until/api'
    import http from '../until/http'
    import {mapActions} from 'vuex'
    import reTryDialog from '../components/ReTryDialog'


    export default {
        name: "RepoSelect",
        components: {
            reTryDialog,
        },
        computed: {
            corpReLoginMsg() {
                return this.$store.state.dialogMessage
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
        },
        data() {
            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('tips.not_fill_email')));
                } else {
                    callback()
                }

            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('tips.fill_pwd')));
                } else {
                    callback()
                }

            };
            return {

                myStyle: {
                    height: '',
                },
                rules: {
                    userName: [
                        {required: true, validator: validateAccount, trigger: ['blur', 'change']}
                    ],
                    pwd: [
                        {required: true, validator: validatePass, trigger: ['blur', 'change']}
                    ],
                },
                ruleForm: {
                    userName: '',
                    pwd: '',
                },
            };
        },
        inject: ['setClientHeight'],
        methods: {
            ...mapActions(['setLoginInfoAct', 'setCorpTokenAct']),
            pressEnter() {
                if (event.keyCode === 13) {
                    this.submitForm('ruleForm')
                }
            },
            findPwd() {
            },
            login(userName, pwd) {
                let obj = {
                    user: userName.trim(),
                    password: pwd.trim()
                };
                http({
                    url: url.corporationManagerAuth,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    let data = [];
                    if (res.data) {
                        data = res.data.data
                    }
                    if (data.length) {
                        new Promise((resolve, reject) => {
                            let userInfo = {userInfo: data}
                            Object.assign(userInfo, {userName: userName})
                            this.setLoginInfoAct(userInfo)
                            if (data.length > 1) {
                                this.$router.push('/orgSelect')
                            } else {
                                this.setCorpTokenAct(data[0].token)
                                Object.assign(userInfo, {orgValue: 0})
                                this.$store.commit('setPwdIsChanged', data[0].initial_pw_changed)
                                this.setLoginInfoAct(userInfo)
                                if (data[0].initial_pw_changed) {
                                    if (data[0].role === 'admin') {
                                        this.$router.push('/rootManager')
                                    } else {
                                        this.$router.push('/signedRepo')
                                    }

                                } else {
                                    this.$router.push('/resetPassword')
                                }
                            }
                            resolve('completed');
                        }).then(res => {
                        }, err => {
                        })
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.id_pwd_err'),
                        })
                    }
                }).catch(err => {
                    if (err.data&&err.data.hasOwnProperty('data')) {
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
                            case 'cla.no_db_record':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.id_pwd_err'),
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login(this.ruleForm.userName, this.ruleForm.pwd)
                    } else {
                        return false;
                    }
                });
            },
        },
        mounted() {
            this.setClientHeight()
        }
    }
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Regular.css";
    @import "../assets/font/css/FZLTHJW.css";

    .formBack_Box {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .formBack {
        width: 18rem;
        box-shadow: 0 0 20px 10px #F3F3F3;
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
            background-color: #F3F3F3;
            border-radius: 1.5rem;
            border: 1px solid #F3F3F3;
            font-size: 1.2rem;
        }

        & .el-form-item:not(:last-child) {
            margin-bottom: 28px
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
            background: linear-gradient(to right, #97DB30, #319E55);
        }

        & .button:focus {
            outline: none;
        }
    }

    .pointer {
        cursor: pointer;
    }

    #forgetPwd {
        font-family: FZLTHJW, sans-serif;
    }

    #forgetPwd:hover {
        text-decoration: underline;
    }
</style>