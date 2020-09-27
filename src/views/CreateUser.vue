<template>
    <el-row>
        <el-col :offset="7" :span="10">
            <el-row class="emailRow" gutter="20" v-for="(item,index) in emails">
                <el-col :span="16">
                    <el-input
                            placeholder="please input email" clearable="" size="medium" v-model="item.email">
                    </el-input>
                </el-col>
                <el-col :span="8" align="right">
                    <el-button @click="addRow(index)" size="medium">+</el-button>
                    <el-button @click="myDeleteRow(index)" size="medium">-</el-button>
                </el-col>
            </el-row>

            <el-row align="middle">
                <el-col align="center">
                    <el-button type="primary" size="medium" @click="createUser()">Submit</el-button>
                </el-col>
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
                    this.emails[0].email =''

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
                    setTimeout(()=>{this.$router.push('/userList')},500)
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

<style scoped lang="less">
    .emailRow {
        margin-bottom: 1rem;
    }
</style>