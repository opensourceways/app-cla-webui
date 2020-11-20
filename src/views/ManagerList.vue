<template>

    <el-row id="userList">

        <el-col>
            <p id="tabName">{{$t('header.manager')}}</p>
            <el-row class="tableBox">
                <el-col>
                    <el-row>
                        <el-col align="left">
                            <button class="button" @click="createManager">{{$t('header.createManager')}}</button>
                            <!--<button class="button" @click="multipleChoice=true">{{$t('corp.batch')}}</button>-->
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-table
                                :empty-text="$t('corp.no_data')"
                                class="tableClass"
                                @selection-change="handleSelectionChange"
                                ref="multipleTable"
                                :data="tableData">
                            <el-table-column
                                    prop="id"
                                    :label="$t('corp.id')">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    :label="$t('corp.name')">
                            </el-table-column>
                            <el-table-column
                                    prop="email"
                                    :label="$t('corp.email')">
                            </el-table-column>
                            <el-table-column
                                    prop="role"
                                    :label="$t('corp.role')">
                            </el-table-column>
                            <el-table-column
                                    :label="$t('corp.operation')"
                                    v-if="!multipleChoice"
                                    key="2"
                                    align="center"
                                    width="200">
                                <template slot-scope="scope">
                                    <button class="deleteBt" @click="deleteUser(scope.row)">
                                        {{$t('corp.delete')}}
                                    </button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    key="3"
                                    v-if="multipleChoice"
                                    type="selection"
                                    align="center"
                                    width="200">
                            </el-table-column>
                        </el-table>
                    </el-row>
                    <el-row style="margin-top: 20px" v-if="multipleChoice">
                        <el-col align="left">
                            <button class="deleteBt" @click="deleteUser()">{{$t('corp.delete')}}</button>
                            <button class="cancelBt" @click="cancel()">{{$t('corp.cancel')}}</button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

            <corpReLoginDialog :message="corpReLoginMsg" :dialogVisible="corpReLoginDialogVisible"></corpReLoginDialog>
            <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
        </el-col>


        <el-dialog
                width="20%"
                title=""
                align="center"
                :show-close="false"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                {{$t('corp.deleteTips')}}
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">

                <button class="deleteBt" @click="submit()">{{$t('corp.yes')}}</button>
                <button class="cancelBt" @click="deleteUserVisible=false">{{$t('corp.no')}}</button>
            </el-row>

        </el-dialog>

    </el-row>

</template>

<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'
    import http from '../until/http'
    import corpReLoginDialog from '../components/CorpReLoginDialog'
    import reTryDialog from '../components/ReTryDialog'

    export default {
        name: "UserList",
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
        components: {
            corpReLoginDialog,
            reTryDialog
        },
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
            createManager() {
                this.$router.push('/createManager');
            },
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
                        this.emails.push({email: item.email})
                    })
                } else {
                    this.emails.push({email: row.email})
                }
                this.deleteUserVisible = true

            },
            getEmployeeManager() {
                http({
                    url: `${url.queryEmployeeManager}`,
                }).then(res => {
                    this.tableData = res.data.data;
                    this.setUserLimitAct(res.data.data.length)
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
            submit() {
                let obj = {
                    managers: this.emails
                }
                http({
                    url: url.deleteEmployeeManager,
                    method: 'delete',
                    data: obj,
                }).then(res => {
                    this.getEmployeeManager();
                    this.deleteUserVisible = false
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
        },
    }
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Regular.css";

    #userList {
        padding: 2rem 0;

        .actionRow {
            display: flex;
            justify-content: space-between;
        }

        .tableBox {
            border-radius: 1.5rem;
            margin-bottom: 2rem;
            padding: 3rem;
            background-color: white;
        }

        & .tableClass {
            border: 1px solid black;
            border-radius: 1.5rem;
        }

        & .marginTop1rem {
            margin-top: 1rem;
        }

        & .el-dialog {
            border-radius: 1rem;
        }

        & .cancelBt {
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

        & .cancelBt:focus {
            outline: none;
        }

        & .deleteBt {
            width: 5rem;
            height: 2rem;
            border-radius: 1rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #FF9D58, #E22424);
        }

        & .deleteBt:focus {
            outline: none;
        }

        & .button {
            width: 10rem;
            height: 2rem;
            border-radius: 1rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin-bottom: 1rem;
            user-select: none;
        }

        & .button:focus {
            outline: none;
        }

        & #tabName {
            user-select: none;
            font-family: Roboto-Regular, sans-serif;
            font-size: 2rem;
            text-align: left;
        }


        & .el-checkbox__inner {
            border: 1px solid #319E55;
        }

        & .el-checkbox__inner:hover {
            border: 1px solid #319E55;
        }

        & .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background: linear-gradient(to right, #FF9D58, #E22424);
            border-color: transparent;
        }

        & .el-checkbox__input.is-focus .el-checkbox__inner {
            border: 1px solid #319e55;
        }

        & .el-table__body, .el-table__footer, .el-table__header {
            padding: 0;
            width: auto;
        }

        & .el-table__body-wrapper {
            margin: 0 1rem;
        }

        .el-table__body tr:not(:last-of-type) td {
            border-bottom: 1px dashed lightgrey;
        }

        .el-table::before {
            height: 0;
        }


        & .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
            padding: 0;
            width: auto;
        }

        & .el-table__footer-wrapper, .el-table__header-wrapper {
            border-bottom: 1px solid black;
            border-radius: 1.5rem;
            padding: 0 1rem;
        }

    }
</style>