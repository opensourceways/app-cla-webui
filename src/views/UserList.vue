<template>

    <el-row id="tableStyle" class="marginTop1rem">

        <el-col>
            <el-row>
                <el-col align="left">
                    <button class="button" @click="multipleChoice=true">Multiple choice</button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        class="tableClass"
                        @selection-change="handleSelectionChange"
                        ref="multipleTable"
                        :data="tableData">

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
                            v-if="!multipleChoice"
                            key="2"
                            align="center"
                            width="200">
                        <template slot-scope="scope">
                            <button  class="deleteBt" @click="deleteUser(scope.row)">
                                Delete
                            </button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            key="3"
                            v-if="multipleChoice"
                            type="selection"
                            width="100">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row style="margin-top: 20px" v-if="multipleChoice">
                <el-col align="left">
                    <button class="deleteBt" @click="deleteUser()">Delete</button>
                    <button class="cancelBt" @click="cancel()">Cancel</button>
                </el-col>
            </el-row>
        </el-col>


        <el-dialog
                width="20%"
                title=""
                align="center"
                :show-close="false"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                Are you sure to delete ?
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">

                <button class="deleteBt" @click="submit()">Yes</button>
                <button class="cancelBt" @click="deleteUserVisible=false">No</button>
            </el-row>

        </el-dialog>

    </el-row>

</template>

<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'

    export default {
        name: "UserList",
        computed: {
            orgValue() {
                return this.$store.state.loginInfo.orgValue
            },
            userInfo() {
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
                    headers: {
                        token: this.userInfo[this.orgValue].token
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
                    headers: {
                        token: this.userInfo[this.orgValue].token
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

<style  lang="less">
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

    .deleteBt {
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

    .tableClass {
        border: 1px solid black;
        border-radius: 1rem;
    }

    .marginTop1rem {
        margin-top: 1rem;
    }

    #tableStyle {
        border-radius: 1.5rem;
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;

        & .el-dialog {
            border-radius: 1rem;
        }
        & .el-dialog__body{
            padding-top: 0;
        }
        & .el-checkbox__inner{
            border: 1px solid #319E55;
        }
        & .el-checkbox__inner:hover{
            border: 1px solid #319E55;
        }
        & .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background: linear-gradient(to right, #FF9D58, #E22424);
            border-color: transparent;
        }
        & .el-checkbox__input.is-focus .el-checkbox__inner{
            border: none;
        }
        & .el-table__body, .el-table__footer, .el-table__header{
            padding: 0;
        }
        & .el-table__body-wrapper{
            margin: 0 1rem;
        }
        & .el-table__body-wrapper:not(:last-child){
            border-top: 2px dashed lightgrey;

        }
        & .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
            padding: 0;
        }
        & .el-table__footer-wrapper, .el-table__header-wrapper{
            border: 1px solid black;
            border-radius: 1.5rem;
            padding-left: 1rem;
        }

    }
</style>