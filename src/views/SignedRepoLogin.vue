<template>
    <el-row>
        <el-col :offset="8" :span="8">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm" style="padding: 2rem">
                <el-form-item label="account" prop="account">
                    <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="password" prop="pass">
                    <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">SUBMIT</el-button>
                    <el-button @click="resetForm('ruleForm')">RESET</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../until/api'

    export default {
        name: "SignedRepoLogin",
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
            }
        },
        methods: {
            login(userName, pwd) {
                this.$router.push('/rootManager')
                let obj = {userName: userName, pwd: pwd};
                this.$axios({
                    url: '/api' + url.relogin,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    this.$router.push('/rootManager')

                }).catch(err => {
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    }
</script>

<style scoped lang="less">

</style>