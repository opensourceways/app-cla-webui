<template>
    <el-row>
        <el-col class="formBack" :offset="7" :span="10">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="" prop="oldPassword" label-width="0">
                    <el-input @blur="checkNewPwd" placeholder="please input old password" type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item @blur="checkOldPwd" label="" prop="newPassword" label-width="0">
                    <el-input placeholder="please input new password" type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="checkPwd" label-width="0">
                    <el-input placeholder="Please enter the new password again" type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label-width="0">
                    <button class="button" @click="submit('ruleForm')">Submit</button>
                    <button class="cancelBt" @click="reset('ruleForm')">Reset</button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../until/api'
    export default {

        name: "ResetPassword",
        computed:{
            orgValue(){
                return this.$store.state.loginInfo.orgValue
            },
            userInfo(){
                return this.$store.state.loginInfo.userInfo
            },

        },
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input old password'));
                } else if (value === this.ruleForm.newPassword) {
                    callback(new Error('The new password cannot be the same as the old password'));
                }else{
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input new password'));
                } else if (value === this.ruleForm.oldPassword) {
                    callback(new Error('The new password cannot be the same as the old password'));
                }else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('please input the new password again'));
                } else if (value !== this.ruleForm.newPassword) {
                    callback(new Error('The two passwords are not the same'));
                }else{
                    callback();
                }
            };
            return {
                cla_org_id:this.$store.state.loginInfo.cla_org_id,
                email:this.$store.state.loginInfo.email,
                ruleForm: {
                    oldPassword: '',
                    newPassword: '',
                    checkPwd:'',
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
            checkNewPwd(){

            },
            checkOldPwd(){

            },
            resetPassword() {
                let obj ={cla_org_id:this.cla_org_id,email:this.email,old_password:this.ruleForm.oldPassword,new_password:this.ruleForm.newPassword}
                this.$axios({
                    url:'/api'+url.resetPassword,
                    method:'put',
                    data:obj,
                    headers:{
                        token:this.userInfo[this.orgValue].token
                    }
                }).then(res => {
                    this.$message.closeAll()
                    this.$message.success('success')
                    this.$router.push('/userList')
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error('Please enter the correct old password')
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

<style  lang="less">
    .formBack{

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

        & .el-form-item{
            margin-bottom: 28px
        }


    }
    .button {
        width: 5rem;
        height: 2rem;
        border-radius: 1rem;
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
        margin-bottom: 1rem;
    }
    .button:focus {
        outline: none;
    }
    .cancelBt {
        width: 5rem;
        height: 2rem;
        border-radius: 1rem;
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