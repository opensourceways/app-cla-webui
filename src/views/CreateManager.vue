<template>
    <el-row id="createUser">
        <el-col>
            <p id="tabName">{{$t('header.createManager')}}</p>
            <el-row class="createUserBack">
                <el-row class="emailRow" gutter="20" v-for="(item,index) in data">
                    <el-col :span="6">
                        <el-input
                                :placeholder="$t('tips.fill_name')" @blur="setAcount(item.name,index)" clearable=""
                                size="medium" v-model="item.name">
                        </el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input
                                :placeholder="$t('tips.not_fill_email')" clearable="" size="medium"
                                v-model="item.email">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input
                                :placeholder="$t('tips.not_fill_id')" clearable="" size="medium" v-model="item.id">
                        </el-input>
                    </el-col>
                    <el-col :span="4" align="right">
                        <button class="deleteBt" @click="myDeleteRow(index)">-</button>
                        <button class="button" @click="addRow(index)">+</button>
                    </el-col>
                </el-row>

                <el-row align="middle">
                    <el-col align="center">
                        <button class="submitBt" @click="createUser()">{{$t('corp.submit')}}</button>
                    </el-col>
                </el-row>
            </el-row>

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
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
        },
        data() {

            return {
                data: [{name: '', email: '', id: ''}],
                limit: 5,
            }
        },
        methods: {
            setAcount(name, index) {
                let reg = /^[a-zA-Z0-9_.]+$/;
                let myName = name.trim()
                if (reg.test(myName) && this.data[index].id.trim() === '') {
                    this.data[index].id = myName
                }
            },
            pressEnter() {
                if (event.keyCode === 13) {
                    this.createUser();
                }
            },
            addRow(index) {
                if (Number(this.$store.state.userLimit) + this.data.length >= this.limit) {
                    this.$message.closeAll()
                    this.$message.error(this.$t('corp.manager_limit', {limit: this.limit}))
                } else {
                    this.data.splice(index + 1, 0, {name: '', email: '', id: ''})
                }

            },
            myDeleteRow(index) {
                if (this.data.length === 1) {
                    this.data[0].name = ''
                    this.data[0].email = ''
                    this.data[0].id = ''

                } else {
                    this.data.splice(index, 1);
                }
            },
            createUser() {
                let managers = this.$store.state.managerList;
                let newManagers = [];
                let isCreate = true;
                for (let i = 0; i < this.data.length; i++) {
                    let email = this.data[i].email.trim();
                    let name = this.data[i].name.trim();
                    let id = this.data[i].id.trim();
                    if (!((email === '' && name === '' && id === '') || (email !== '' && name !== '' && id !== ''))) {
                        isCreate = false;
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('corp.fill_complete'),
                        });
                        break;
                    } else if (email !== '' && name !== '' && id !== '') {
                        newManagers.push({name: name, email: email, id: id})
                    }
                }
                for (let i = 0; i < this.data.length; i++) {
                    let flag = 0;
                    for (let j = i + 1; j < this.data.length; j++) {
                        if (this.data[i].email.trim() === this.data[j].email.trim()) {
                            isCreate = false;
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.same_email'),
                            });
                            flag = 1;
                            break;
                        }
                        if (this.data[i].id.trim() === this.data[j].id.trim()) {
                            isCreate = false;
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.same_id'),
                            });
                            flag = 1;
                            break;
                        }
                    }
                    if (flag) {
                        break;
                    }
                }
                for (let i = 0; i < managers.length; i++) {
                    let flag = 0;
                    for (let j = 0; j < this.data.length; j++) {
                        if (managers[i].email.trim() === this.data[j].email.trim()) {
                            isCreate = false;
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.exits_email'),
                            });
                            flag = 1;
                            break;
                        }
                        if (managers[i].id.trim() === this.data[j].id.trim()) {
                            isCreate = false;
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.exits_id'),
                            });
                            flag = 1;
                            break;
                        }
                    }
                    if (flag) {
                        break;
                    }
                }
                if (newManagers.length && isCreate) {
                    let obj = {managers: newManagers}
                    http({
                        url: url.addEmployeeManager,
                        method: 'post',
                        data: obj,
                    }).then(res => {
                        this.$message.closeAll()
                        this.$message.success(this.$t('tips.successTitle'))
                        setTimeout(() => {
                            this.$router.push('/managerList')
                        }, 500)
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
                                case 'cla.invalid_email':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.invalid_email'),
                                    });
                                    break;

                                case 'cla.num_of_corp_managers_exceeded':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.num_of_corp_managers_exceeded'),
                                    });
                                    break;
                                case 'cla.corp_manager_exists':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.corp_manager_exists'),
                                    });
                                    break;
                                case 'cla.not_same_corp':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.not_same_corp'),
                                    });
                                    break;
                                case 'cla.invalid_parameter':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('corp.manager_email_same_with_admin'),
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
                } else {

                }

            },
        },
    }
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Regular.css";

    #createUser {
        padding: 2rem 0;

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