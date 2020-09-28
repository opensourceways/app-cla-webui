<template>
    <el-row id="createUser">
        <el-col :offset="6" :span="12">
            <p>Create User</p>
            <el-row class="createUserBack">
                <el-row class="emailRow" gutter="20" v-for="(item,index) in emails">
                    <el-col :span="16">
                        <el-input
                                placeholder="please input email" clearable="" size="medium" v-model="item.email">
                        </el-input>
                    </el-col>
                    <el-col :span="8" align="right">
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


        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../until/api'

    export default {
        name: "CreateUser",
        computed: {
            orgValue() {
                return this.$store.state.loginInfo.orgValue
            },
            userInfo() {
                return this.$store.state.loginInfo.userInfo
            },

        },
        data() {

            return {
                emails: [{email: ''}],
                limit: 5,
            }
        },
        methods: {
            addRow(index) {
                if (Number(this.$store.state.userLimit) + this.emails.length >= this.limit) {
                    this.$message.closeAll()
                    this.$message.error(`Create up to ${this.limit} users`)
                } else {
                    this.emails.splice(index + 1, 0, {email: ''})
                }

            },
            myDeleteRow(index) {
                if (this.emails.length === 1) {
                    this.emails[0].email = ''

                } else {
                    this.emails.splice(index, 1);
                }
            },
            createUser() {
                let myEmails = []
                this.emails.forEach(item => {
                    myEmails.push(item.email)
                })
                let obj = {cla_org_id: this.userInfo[this.orgValue].cla_org_id, emails: myEmails}
                this.$axios({
                    url: '/api' + url.addEmployeeManager,
                    method: 'post',
                    data: obj,
                    headers: {
                        token: this.userInfo[this.orgValue].token,
                    }
                }).then(res => {

                    this.$message.closeAll()
                    this.$message.success('success')
                    setTimeout(() => {
                        this.$router.push('/userList')
                    }, 500)
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data.data)
                })
            },
        },
        created() {
        }
    }
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Regular.css";

    #createUser {
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

        & p {
            font-family: Roboto-Regular, sans-serif;
            font-size: 2rem;
            text-align: left;
        }

        & .emailRow {
            margin-bottom: 1rem;
        }

        & .submitBt {
            width: 6rem;
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