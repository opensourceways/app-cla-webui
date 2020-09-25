<template>
    <div>
        <el-tabs v-model="active">
            <el-tab-pane label="inactive" name="first" style="margin-top: 1rem">
                <div style="margin-bottom: 1rem" class="tableStyle">
                    <el-table
                            :data="inactiveData"
                            align="center"
                            style="width: 100%;">
                        <!--<el-table-column-->
                                <!--prop="name"-->
                                <!--label="Name">-->
                        <!--</el-table-column>-->
                        <el-table-column
                                prop="email"
                                label="Email">
                        </el-table-column>

                        <el-table-column
                                label="status"
                                align="center">
                            <template slot-scope="scope">
                                <el-row class="mySwitch">

                                    <el-switch
                                            @change="changeActtive(scope.row.cla_org_id,scope.row.email,scope.row.enabled)"
                                            v-model="scope.row.enabled"
                                            class="mySwitch"
                                            :disabled="scope.row.enabled"
                                            width="3rem"
                                            active-color="#409EFF"
                                            active-text="active"
                                            inactive-text="inactive"
                                            inactive-color="#EBEEF5">
                                    </el-switch>


                                    <el-button style="margin-left: 1rem" type="danger" size="mini"
                                    @click="deleteEmployee(scope.row.cla_org_id,scope.row.email,scope.row.enabled)">Delete
                                    </el-button>

                                </el-row>

                            </template>
                        </el-table-column>
                    </el-table>

                </div>
            </el-tab-pane>
            <el-tab-pane label="active" name="second" style="margin-top: 1rem">
                <div style="margin-bottom: 1rem" class="tableStyle">
                    <el-table
                            :data="activeData"
                            align="center"
                            style="width: 100%;">
                        <el-table-column
                                prop="name"
                                label="Name"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="email"
                                label="Email"
                        >
                        </el-table-column>

                        <el-table-column
                                label="status"
                                align="center">
                            <template slot-scope="scope">
                                <el-row class="mySwitch">

                                    <el-switch
                                            @change="changeActtive(scope.row.cla_org_id,scope.row.email,scope.row.enabled)"
                                            v-model="scope.row.enabled"
                                            class="mySwitch"

                                            width="3rem"
                                            active-color="#409EFF"
                                            active-text="active"
                                            inactive-text="inactive"
                                            inactive-color="#EBEEF5">
                                    </el-switch>

                                    <el-button style="margin-left: 1rem" type="danger" size="mini"
                                    @click="deleteEmployee(scope.row.cla_org_id,scope.row.email,scope.row.enabled)">删除
                                    </el-button>

                                </el-row>

                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
                width="20%"
                title=""
                align="center"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                Are you sure to delete ?
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">

                <el-button type="primary" size="medium" @click="submit()">Yes</el-button>
                <el-button size="medium" @click="deleteUserVisible=false">No</el-button>
            </el-row>

        </el-dialog>
    </div>
</template>

<script>
    import * as url from '../until/api'

    export default {
        name: "EmployeeList",
        data() {
            return {
                deleteUserVisible:false,
                active: 'first',
                inactiveData: [],
                activeData: [],
                deleteData:'',
            }
        },
        computed: {
            orgValue() {
                return this.$store.state.loginInfo.orgValue
            },
            userInfo() {
                return this.$store.state.loginInfo.userInfo
            },
        },
        methods: {
            submit(){
                let obj={enabled:this.deleteData.enabled}
                this.$axios({
                    url: `/api${url.enableEmployee}/${this.deleteData.cla_org_id}/${this.deleteData.email}`,
                    method: 'delete',
                    data: obj,
                    headers: {
                        token: this.userInfo[this.orgValue].token,
                    }
                }).then(res => {
                    this.getEmployee()
                }).catch(err => {
                })
            },
            deleteEmployee(cla_org_id, email, enabled){
                this.deleteData={
                    cla_org_id: cla_org_id,
                    email: email,
                    enabled: enabled
                }
                this.deleteUserVisible=true
            },
            changeActtive(cla_org_id, email, enabled) {
                let data = {
                    enabled: enabled
                }
                this.$axios({
                    url: `/api${url.enableEmployee}/${cla_org_id}/${email}`,
                    method: 'put',
                    data: data,
                    headers: {
                        token: this.userInfo[this.orgValue].token,
                    }
                }).then(res => {
                    this.getEmployee()
                }).catch(err => {
                })
            },

            getEmployee() {
                let obj = {
                    platform: this.userInfo[this.orgValue].platform,
                    repo_id: this.userInfo[this.orgValue].repo_id,
                    org_id: this.userInfo[this.orgValue].org_id,
                    corporation_email: this.userInfo[this.orgValue].email
                }
                this.$axios({
                    url: '/api' + url.queryEmployee,
                    params: obj,
                    headers: {
                        token: this.userInfo[this.orgValue].token,
                    }
                }).then(res => {
                    console.log(res);
                    this.inactiveData = [];
                    this.activeData = [];
                    let data =res.data.data;
                    for (let key in data){
                        console.log(key);
                        console.log(data[key]);
                        data[key].forEach((item, index) => {
                            Object.assign(item,{cla_org_id:key})
                            item.enabled === false ? this.inactiveData.push(item) : this.activeData.push(item)
                        })
                    }
                }).catch(err => {
                })
            },
        },
        created() {
            this.getEmployee();
        }
    }
</script>

<style lang="less">
    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

    .mySwitch .el-switch__label {
        position: absolute;
        display: none;
        color: #fff;
    }

    /*打开时文字位置设置*/
    .mySwitch .el-switch__label--right {
        z-index: 1;
        right: 0.5rem;
    }

    /*关闭时文字位置设置*/
    .mySwitch .el-switch__label--left {
        z-index: 1;
        left: .5rem;
    }

    /*显示文字*/
    .mySwitch .el-switch__label.is-active {
        display: block;
    }

    .mySwitch.el-switch .el-switch__core,
    .el-switch .el-switch__label {
        width: 4rem !important;
    }

    .mySwitch .el-switch.is-disabled .el-switch__core, .mySwitch .el-switch.is-disabled .el-switch__label, .tableStyle {
        cursor: pointer;
    }
</style>