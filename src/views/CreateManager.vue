<template>
    <el-row id="createUser">
        <el-col>
            <p id="tabName">Create Manager</p>
            <el-row class="createUserBack">
                <el-row class="emailRow" gutter="20" v-for="(item,index) in data">
                    <el-col :span="6">
                        <el-input
                                placeholder="please input name" @blur="setAcount(item.name,item.acount)" clearable="" size="medium" v-model="">
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input
                                placeholder="please input email" clearable="" size="medium" v-model="item.email">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input
                                placeholder="please input acount" clearable="" size="medium" v-model="item.acount">
                        </el-input>
                    </el-col>
                    <el-col :span="4" align="right">
                        <button class="deleteBt" @click="myDeleteRow(index)">-</button>
                        <button class="button" @click="addRow(index)">+</button>
                    </el-col>
                </el-row>

                <el-row align="middle">
                    <el-col align="center">
                        <button class="submitBt" @click="createUser()">Submit</button>
                    </el-col>
                </el-row>
            </el-row>

            <corpReLoginDialog :title="corpReLoginDialogTitle" :message="corpReLoginMsg" :dialogVisible="corpReLoginDialogVisible"></corpReLoginDialog>
            <reTryDialog :title="corpReLoginDialogTitle" :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../until/api'
    import http from '../until/http'
    import corpReLoginDialog from '../components/CorpReLoginDialog'
    import reTryDialog from '../components/ReTryDialog'
    export default {
        name: "CreateUser",
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
            corpReLoginDialogTitle() {
                return `cla sign prompt you`
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
        },
        data() {

            return {
                data:[{name:'',email:'',acount:''}],
                limit: 5,
            }
        },
        methods: {
            setAcount(name,acount){
                let reg = /[a-zA-Z0-9_.]+/;
                let myName = name.trim()
                if (reg.test(myName)&&acount.trim()!==''){
                    acount=myName
                }
            },
            pressEnter(){
                if (event.keyCode === 13) {
                    this.createUser();
                }
            },
            addRow(index) {
                if (Number(this.$store.state.userLimit) + this.data.length >= this.limit) {
                    this.$message.closeAll()
                    this.$message.error(`Create up to ${this.limit} users`)
                } else {
                    this.data.splice(index + 1, 0, {name:'',email: '',acount:''})
                }

            },
            myDeleteRow(index) {
                if (this.data.length === 1) {
                    this.data[0].name = ''
                    this.data[0].email = ''
                    this.data[0].acount = ''

                } else {
                    this.data.splice(index, 1);
                }
            },
            createUser() {
                let managers = []
                this.data.forEach(item => {
                    let email = item.email.trim();
                    let name = item.name.trim();
                    let acount = item.acount.trim();

                    if (!((email === '' && name === ''&&acount === '')||(email !== '' && name !== ''&& acount !== ''))){
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'Please fill in the complete information.',
                        });
                    }else if (email!==''&&name!==''&&acount!==''){
                        managers.push({name:name,email:email,acount:acount})
                    }
                })
                let obj = {managers: managers}
                http({
                    url: url.addEmployeeManager,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    this.$message.closeAll()
                    this.$message.success('success')
                    setTimeout(() => {
                        this.$router.push('/managerList')
                    }, 500)
                }).catch(err => {
                    if (err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'Token expired, please login again.',
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'Token invalid, please login again.',
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'Token invalid, please login again.',
                                });
                                break;

                            case 'cla.num_of_corp_managers_exceeded':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'The number of managers exceeds the limit.',
                                });
                                break;
                            case 'cla.corp_manager_exists':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'The name is exists already.',
                                });
                                break;
                            case 'cla.not_same_corp':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'Email does not belong to the corporation.',
                                });
                                break;
                            case 'cla.invalid_parameter':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'Email for manager should be different from Administrator’s.',
                                });
                                break;
                            case 'cla.system_error':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: 'System error, please try again',
                                });
                                break;
                        }
                    }else{
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'System error, please try again',
                        })
                    }
                })
            },
        },
    }
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Regular.css";

    #createUser {
        & .el-dialog {
            border-radius: 1rem;
        }
        & .createUserBack {
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem;
            background-color: white;
            border-radius: 1rem;
        }

        & .el-input__inner {
            height: 3rem;
            background-color: #F3F3F3;
            border-radius: 1.5rem;
            border: 1px solid #F3F3F3;
            font-size: 1.2rem;
        }

        & #tabName {
            font-family: Roboto-Regular, sans-serif;
            font-size: 2rem;
            text-align: left;
        }

        & .emailRow {
            margin-bottom: 1rem;
        }

        & .submitBt {
            margin: 1rem 0;
            width: 10rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
        }

        & .submitBt:focus {
            outline: none;
        }

        & .button {
            width: 3rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
        }

        & .button:focus {
            outline: none;
        }

        & .deleteBt {
            width: 3rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #FF9D58, #E22424);
            margin-right: 1rem;
        }

        & .deleteBt:focus {
            outline: none;
        }
    }

</style>