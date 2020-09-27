<template>

    <el-row class="marginTop1rem tableStyle">

        <el-col>
            <el-row>
                <el-col align="left">
                    <button class="button" @click="multipleChoice=true" >Multiple choice</button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        class="tableClass"
                        @selection-change="handleSelectionChange"
                        ref="multipleTable"
                        :data="tableData">
                    <el-table-column
                            v-if="multipleChoice"
                            type="selection"
                            width="55">
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop="name"-->
                            <!--label="userName">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            prop="email"
                            label="email">
                    </el-table-column>
                    <el-table-column
                            prop="role"
                            label='role'>
                    </el-table-column>
                    <el-table-column
                            width="100">
                        <template slot-scope="scope">
                            <button v-if="!multipleChoice" class="deleteBt" @click="deleteUser(scope.row)">
                                Delete
                            </button>
                        </template>

                    </el-table-column>
                </el-table>
            </el-row>
            <el-row style="margin-top: 20px" v-if="multipleChoice">
                <el-col align="left">
                    <button class="deleteBt"  @click="deleteUser()">Delete</button>
                    <button class="cancelBt" @click="cancel()">Cancel</button>
                </el-col>
            </el-row>
        </el-col>


        <el-dialog
                style="border-radius: 1rem"
                width="20%"
                title=""
                align="center"
                :show-close="false"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                Are you sure to delete ?
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">

                <button class="deleteBt"  @click="submit()">Yes</button>
                <button class="cancelBt"  @click="deleteUserVisible=false">No</button>
            </el-row>

        </el-dialog>

    </el-row>

</template>

<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'

    export default {
        name: "UserList",
        computed:{
            orgValue(){
                return this.$store.state.loginInfo.orgValue
            },
            userInfo(){
                return this.$store.state.loginInfo.userInfo
            },

        },
        components: {},
        data() {
            return {
                emails: [],
                multipleChoice: false,
                multipleSelection: [],
                row: '',
                deleteUserVisible: false,
                tableData: [],
            }
        },
        created() {
            this.getEmployeeManager();
        },
        methods: {
            ...mapActions(['setUserLimitAct']),
            cancel() {
                this.$refs.multipleTable.clearSelection();
                this.multipleChoice = false

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            deleteUser(row) {
                this.emails = [];
                if (this.multipleChoice) {
                    this.multipleSelection.forEach(item => {
                        this.emails.push(item.email)
                    })
                } else {
                    this.emails.push(row.email)
                }
                this.deleteUserVisible = true

            },
            getEmployeeManager() {
                let obj = {
                    cla_org_id: this.userInfo[this.orgValue].cla_org_id, email: this.userInfo[this.orgValue].email
                }
                this.$axios({
                    url: '/api' + url.queryEmployeeManager,
                    params: obj,
                    headers:{
                        token:this.userInfo[this.orgValue].token
                    }
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data.data;
                    this.setUserLimitAct(res.data.data.length)
                }).catch(err => {
                })
            },
            submit() {
                let obj = {
                    cla_org_id: this.userInfo[this.orgValue].cla_org_id, emails: this.emails
                }
                this.$axios({
                    url: '/api' + url.deleteEmployeeManager,
                    method: 'delete',
                    data: obj,
                    headers:{
                        token:this.userInfo[this.orgValue].token
                    }
                }).then(res => {
                    console.log(res);
                    this.getEmployeeManager();
                    this.deleteUserVisible = false
                }).catch(err => {
                })
            },
        },
    }
</script>

<style scoped lang="less">
    .cancelBt{
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
    .deleteBt{
        width: 5rem;
        height: 2rem;
        border-radius: 1rem;
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        background: linear-gradient(to right, #FF9D58, #E22424);
    }
    .deleteBt:focus {
        outline: none;
    }

    .button {
        width: 10rem;
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
    .tableClass{
        border: 1px solid black;
        border-radius: 1rem;
    }
    .marginTop1rem {
        margin-top: 1rem;
    }

    .tableStyle {
        border-radius: 1rem;
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }
</style>