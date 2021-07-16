<template>
    <div id="employeeList">
        <p id="tabName">{{$t('signType.emp')}}</p>
        <el-tabs v-model="active">
            <el-tab-pane :label="$t('corp.inactive')" name="first" style="margin-top: 1rem">
                <div style="margin-bottom: 1rem" class="tableStyle">
                    <el-row :gutter="10">
                        <el-col :offset="15" :span="6">
                            <el-input
                                    clearable
                                    :placeholder="$t('corp.email_input_holder')"
                                    @input="searchEmail(inactiveSearchValue,inactiveOriginData)"
                                    v-model="inactiveSearchValue">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-button @click="searchEmail(inactiveSearchValue,inactiveOriginData)"
                                       class="searchButton">
                                {{$t('corp.search')}}
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-table
                            :empty-text="$t('corp.no_data')"
                            class="tableClass"
                            :data="inactivePageData"
                            align="center"
                            style="width: 100%;">
                        <el-table-column
                                prop="name"
                                :label="$t('corp.name')">
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                :label="$t('corp.email')">
                        </el-table-column>
                        <el-table-column
                                :label="$t('corp.operation')"
                                align="center">
                            <template slot-scope="scope">
                                <el-row class="mySwitch">
                                    <el-col :offset="4" :span="8">
                                        <el-switch
                                                @change="changeActive(scope.row.cla_org_id,scope.row.email,scope.row.enabled)"
                                                v-model="scope.row.enabled"
                                                class="mySwitch"
                                                :disabled="scope.row.enabled"
                                                width="3rem"
                                                active-color="#409EFF"
                                                :active-text="$t('corp.active')"
                                                :inactive-text="$t('corp.inactive')"
                                                inactive-color="#EBEEF5">
                                        </el-switch>

                                    </el-col>
                                    <el-col :span="8">
                                        <button class="deleteBt"
                                                @click="deleteEmployee(scope.row.cla_org_id,scope.row.email,scope.row.enabled)">
                                            {{$t('corp.delete')}}
                                        </button>
                                    </el-col>
                                </el-row>

                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            class="pagination-class"
                            layout="prev, pager, next"
                            :page-size="pageSize"
                            :current-page="inactiveCurrentPage"
                            :pager-count="pagerPage"
                            @current-change="changeInActivePage"
                            :hide-on-single-page="true"
                            :total="inactiveTotal">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('corp.active')" name="second" style="margin-top: 1rem">
                <div style="margin-bottom: 1rem" class="tableStyle">
                    <el-row :gutter="10">
                        <el-col :offset="15" :span="6">
                            <el-input
                                    clearable
                                    :placeholder="$t('corp.email_input_holder')"
                                    @input="searchEmail(activeSearchValue,activeOriginData)"
                                    v-model="activeSearchValue">
                                <i slot="prefix" class="el-input__icon el-icon-search"></i>
                            </el-input>
                        </el-col>
                        <el-col :span="3">
                            <el-button @click="searchEmail(activeSearchValue,activeOriginData)" class="searchButton">
                                {{$t('corp.search')}}
                            </el-button>
                        </el-col>
                    </el-row>
                    <el-table
                            :empty-text="$t('corp.no_data')"
                            class="tableClass"
                            :data="activePageData"
                            align="center"
                            style="width: 100%;">
                        <el-table-column
                                prop="name"
                                :label="$t('corp.name')">
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                :label="$t('corp.email')">
                        </el-table-column>
                        <el-table-column
                                :label="$t('corp.operation')"
                                align="center">
                            <template slot-scope="scope">
                                <el-row class="mySwitch">
                                    <el-switch
                                            @change="changeActive(scope.row.cla_org_id,scope.row.email,scope.row.enabled)"
                                            v-model="scope.row.enabled"
                                            class="mySwitch"
                                            width="3rem"
                                            active-color="#409EFF"
                                            :active-text="$t('corp.active')"
                                            :inactive-text="$t('corp.inactive')"
                                            inactive-color="#EBEEF5">
                                    </el-switch>
                                </el-row>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            class="pagination-class"
                            layout="prev, pager, next"
                            :page-size="pageSize"
                            :current-page="activeCurrentPage"
                            :pager-count="pagerPage"
                            :total="activeTotal"
                            :hide-on-single-page="true"
                            @current-change="changeActivePage">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        <corpReLoginDialog :message="corpReLoginMsg" :dialogVisible="corpReLoginDialogVisible"></corpReLoginDialog>
        <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
        <DeleteDialog :deleteMessage="deleteMessage" :deleteVisible="deleteUserVisible" @delete="submitDeleteEmployee"
                      @cancel="cancelDeleteEmployee"></DeleteDialog>
    </div>
</template>
<script>
    import * as url from '../util/api';
    import http from '../util/http';
    import * as util from '../util/util';
    import corpReLoginDialog from '../components/CorpReLoginDialog';
    import reTryDialog from '../components/ReTryDialog';
    import DeleteDialog from '../components/DeleteDialog';


    export default {
        name: 'EmployeeList',
        components: {
            corpReLoginDialog,
            reTryDialog,
            DeleteDialog
        },
        data() {
            return {
                inactiveSearchValue: '',
                activeSearchValue: '',
                inactivePageData: [],
                activePageData: [],
                pageSize: 5,
                pagerPage: 5,
                inactiveCurrentPage: 1,
                activeCurrentPage: 1,
                deleteUserVisible: false,
                active: 'first',
                inactiveData: [],
                inactiveOriginData: [],
                activeOriginData: [],
                activeData: [],
                deleteData: ''
            };
        },
        computed: {
            deleteMessage() {
                return this.$t('corp.deleteTips');
            },
            orgValue() {
                return this.$store.state.loginInfo.orgValue;
            },
            userInfo() {
                return this.$store.state.loginInfo.userInfo;
            },
            corpReLoginDialogVisible() {
                return this.$store.state.dialogVisible;
            },
            corpReLoginMsg() {
                return this.$store.state.dialogMessage;
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible;
            },
            activeTotal() {
                return this.activeData.length;
            },
            inactiveTotal() {
                return this.inactiveData.length;
            }
        },
        methods: {
            searchEmail(searchValue, pageData) {
                if (searchValue.trim() === '') {
                    this.getEmployee();
                } else {
                    let searchData = [];
                    for (let i = 0; i < pageData.length; i++) {
                        if (pageData[i].email.indexOf(searchValue.trim()) !== -1) {
                            searchData.push(pageData[i]);
                        }
                    }
                    if (this.active === 'first') {
                        this.inactiveData = searchData;
                        this.inactivePageData = this.getInactivePageData();
                    } else if (this.active === 'second') {
                        this.activeData = searchData;
                        this.activePageData = this.getActivePageData();
                    }
                }
            },
            getInactivePageData() {
                let data = [];
                data = this.inactiveData.slice((this.inactiveCurrentPage - 1) * this.pageSize, this.inactiveCurrentPage * this.pageSize);
                if (data.length === 0 && this.inactiveCurrentPage > 1) {
                    this.inactiveCurrentPage--;
                    this.getInactivePageData();
                } else {
                    return data;
                }
            },
            getActivePageData() {
                let data = [];
                data = this.activeData.slice((this.activeCurrentPage - 1) * this.pageSize, this.activeCurrentPage * this.pageSize);
                if (data.length === 0 && this.activeCurrentPage > 1) {
                    this.activeCurrentPage--;
                    return this.getActivePageData();
                } else {
                    return data;
                }
            },
            changeActivePage(page) {
                this.activeCurrentPage = page;
                this.activePageData = this.getActivePageData();
            },
            changeInActivePage(page) {
                this.inactiveCurrentPage = page;
                this.inactivePageData = this.getInactivePageData();
            },
            cancelDeleteEmployee() {
                this.deleteUserVisible = false;
            },
            submitDeleteEmployee() {
                this.deleteUserVisible = false;
                let obj = {enabled: this.deleteData.enabled};
                http({
                    url: `${url.enableEmployee}/${this.deleteData.email}`,
                    method: 'delete',
                    data: obj
                }).then(res => {
                    this.getEmployee();
                    util.successMessage(this);
                }).catch(err => {
                    util.catchErr(err, 'errorSet', this);
                });
            },
            deleteEmployee(cla_org_id, email, enabled) {
                this.deleteData = {
                    cla_org_id: cla_org_id,
                    email: email,
                    enabled: enabled
                };
                this.deleteUserVisible = true;
            },
            changeActive(cla_org_id, email, enabled) {
                let data = {
                    enabled: enabled
                };
                http({
                    url: `${url.enableEmployee}/${email}`,
                    method: 'put',
                    data: data
                }).then(res => {
                    this.getEmployee();
                }).catch(err => {
                    util.catchErr(err, 'errorSet', this);
                });
            },
            getEmployee() {
                http({
                    url: url.queryEmployee
                }).then(res => {
                    let inactiveArr = [], activeArr = [];
                    let data = res.data.data;
                    data.forEach((item, index) => {
                        item.enabled === false ? inactiveArr.push(item) : activeArr.push(item);
                    });
                    this.inactiveData = inactiveArr;
                    this.inactiveOriginData = inactiveArr;
                    this.activeData = activeArr;
                    this.activeOriginData = activeArr;
                    this.inactivePageData = this.getInactivePageData();
                    this.activePageData = this.getActivePageData();
                }).catch(err => {
                    util.catchErr(err, 'errorSet', this);
                });
            }
        },
        created() {
            this.getEmployee();
        }
    };
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Regular.css";

    #employeeList {
        padding: 2rem 0;

        & .el-dialog {
            border-radius: 1rem;
        }

        & #tabName {
            user-select: none;
            font-family: Roboto-Regular, sans-serif;
            font-size: 2rem;
            text-align: left;
        }

        .el-tabs__active-bar {
            background-color: #319E55;
        }

        .el-tabs__item.is-active {
            color: #319E55;
        }

        .el-tabs__item:hover {
            color: #319E55;
        }

        .el-tabs__item {
            font-size: 1.5rem;
        }

        & .tableStyle {
            margin-bottom: 2rem;
            padding: 3rem;
            background-color: white;
            border-radius: 1.5rem;
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
            margin-left: 1rem;
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

        .tableClass {
            border: 1px solid black;
            border-radius: 1.5rem;
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

        & .mySwitch .el-switch__label {
            position: absolute;
            display: none;
            color: #fff;
        }

        & .mySwitch .el-switch__label--right {
            z-index: 1;
            right: 2.5rem;
        }

        & .mySwitch .el-switch__label--left {
            z-index: 1;
            left: -.4rem;
        }

        & .mySwitch .el-switch__label.is-active {
            display: block;
        }

        &
        .mySwitch .el-switch__label.el-switch__label--left.is-active span {
            color: #7B7B7B;
        }

        .el-switch.is-checked .el-switch__core {
            border-color: #319E55 !important;
            background-color: #319E55 !important;
        }

        & .mySwitch .el-switch.is-disabled .el-switch__core, .mySwitch .el-switch.is-disabled .el-switch__label {
            cursor: pointer;
        }

        .el-switch .el-switch__label, .mySwitch.el-switch .el-switch__core {
            width: 6rem !important;
            height: 2rem;
            border-radius: 1rem;
            line-height: 2rem;
            font-size: 1rem;
            text-align: right;
        }

        .el-switch__label * {
            font-size: 1rem;
        }

        .el-switch__core:after {
            height: 2rem;
            width: 2rem;
            top: -1px;
        }

        .el-switch {
            font-size: 1rem;
            line-height: 2rem;
            height: 2rem;
        }

        .el-switch.is-checked .el-switch__core:after {
            left: 100%;
            margin-left: -2rem;
        }

        .pagination-class {
            margin-top: 2rem;
        }

        .el-pager li.active {
            color: #319E55;
        }

        .el-pager li:hover {
            color: #319E55;
        }

        .el-pagination .btn-next:hover, .el-pagination .btn-prev:hover {
            color: #319E55;
        }

        .el-pagination button:disabled:hover {
            color: #c0c4cc;
        }

        .el-pagination button:disabled {
            cursor: auto;
        }

        .searchButton {
            width: 100%;
            border-radius: 1.25rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin-bottom: 1rem;
            user-select: none;
        }
    }

</style>
