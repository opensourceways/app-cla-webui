<template>
    <el-row style="height: 100%">
        <el-col  align="right" class="formBox">
            <div class="formBack_Box">
                <div class="formBack">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0">
                        <el-form-item label="" prop="account">
                            <el-input v-model="ruleForm.userName" autocomplete="off" placeholder="Account"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="pass">
                            <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"
                                      placeholder="Password"></el-input>
                        </el-form-item>
                        <el-form-item style="text-align: right">
                            <span class="pointer" @click="findPwd" id="forgetPwd">Forget the password?</span>
                        </el-form-item>
                        <el-form-item style="text-align: center">
                            <button class="button" type="button" @click="submitForm('ruleForm')">
                                Login in
                            </button>
                        </el-form-item>
                    </el-form>

                </div>
            </div>

        </el-col>
    </el-row>

</template>

<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'

    export default {
        name: "RepoSelect",
        data() {
            var validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input account number'));
                }
                callback();
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input password'));
                }
                callback();
            };
            return {
                rules: {
                    userName: [
                        {validator: validateAccount, trigger: 'blur'}
                    ],
                    pwd: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                },
                ruleForm: {
                    userName: '',
                    pwd: '',
                },
            };
        },
        methods: {
            ...mapActions(['setLoginInfoAct']),
            findPwd() {
            },
            login(userName, pwd) {
                let obj = {
                    user: userName,
                    password: pwd
                };
                this.$axios({
                    url: '/api' + url.corporationManagerAuth,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    new Promise((resolve, reject) => {
                        let userInfo = {userInfo: res.data}
                        Object.assign(userInfo, {userName: userName})
                        this.setLoginInfoAct(userInfo)
                        if (res.data.length > 1) {
                            this.$router.push('/orgSelect')
                        } else {
                            Object.assign(userInfo, {orgValue: 0})
                            this.setLoginInfoAct(userInfo)
                            if (res.data[0].role === 'admin') {
                                this.$router.push('/rootManager')
                            } else {
                                this.$router.push('/signedRepo')
                            }
                        }
                        resolve('completed');
                    }).then(res => {
                    }, err => {
                    })

                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data.data)
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
        }
    }
</script>

<style  lang="less">
    @import "../assets/font/css/Roboto-Regular.css";
    @import "../assets/font/css/FZLTHJW.css";
    .button {
        font-family:Roboto-Regular,sans-serif ;
        width: 15rem;
        height: 4rem;
        border-radius: 2rem;
        border: none;
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
    }

    .button:focus {
        outline: none;
    }
    .formBack_Box{
        width: 100%;
        display: flex;
        flex-direction: row;
       justify-content: flex-end;
    }
    .formBack{
        width: 18rem;
        box-shadow: 0 0 20px 10px #F3F3F3;
        padding: 2rem 2rem 0;
        background-color: white;
        border-radius: 1rem;
        & .fontSize12 {
            font-size: 1.2rem;
        }

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
        & .el-form-item:last-child{
            margin-bottom: -2rem;

        }

    }
    .formBox {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .pointer {
        cursor: pointer;
    }
    #forgetPwd{
        font-family: FZLTHJW,sans-serif;
    }
    #forgetPwd:hover {
        text-decoration: underline;
    }
</style>