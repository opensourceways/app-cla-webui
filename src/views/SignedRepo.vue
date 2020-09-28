<template>
    <div id="section" :style="section">
        <CorporationHeader @clickItem="clickItem" :user="user"></CorporationHeader>
        <el-row style="margin-top: 2rem">
            <el-col :offset="4" :span="16">
                <router-view></router-view>
            </el-col>
        </el-row>

        <div class="paginationClass">
            <el-pagination
                    background
                    :page-size="5"
                    :pager-count="5"
                    :hide-on-single-page="true"
                    :current-page="currentPage"
                    @current-change="changePage"
                    layout="prev, pager, next"
                    :total="tableTotal">
            </el-pagination>
        </div>
        <el-dialog
                width="20%"
                title=""
                align="center"
                :visible.sync="deleteUserVisible">
            <el-row align="center">
                确定删除？
            </el-row>
            <el-row align="center" class="marginTop1rem contentTitle">

                <el-button type="primary" size="medium" @click="deleteContributor()">确定</el-button>
                <el-button size="medium" @click="deleteUserVisible=false">取消</el-button>
            </el-row>

        </el-dialog>
        <Footer></Footer>
    </div>

</template>

<script>
    import * as url from '../until/api'
    import * as until from '../until/until'
    import CorporationHeader from '@components/CorporationHeader'
    import Footer from '@components/Footer'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('section').offsetHeight) {
            document.getElementById("section").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "SignedRepo",
        components: {
            CorporationHeader,
            Footer,
        },
        data() {
            return {
                user: this.$store.state.loginInfo,

                active: 'first',
                section: {
                    height: '',
                },
                deleteId: '',
                deleteUserVisible: false,
                listDialogVisible: false,
                tableDataOther: [{repository: 'ooo', cla: 'test', sharedGist: 'Yes', contributors: '0',},],
                tableTotal: 0,
                currentPage: 1,
                inactiveData: [{id: 0, name: 'jack', email: '10577507@qq.com', tel: '15632486433', isUsed: false}, {
                    id: 1,
                    name: 'Rose',
                    email: '105507@163.com',
                    tel: '18832486437',
                    isUsed: false
                }],
                activeData: [{id: 0, name: 'tom', email: '10577507@qq.com', tel: '15632486433', isUsed: true}, {
                    id: 1,
                    name: 'helen',
                    email: '105507@163.com',
                    tel: '18832486437',
                    isUsed: true
                }]
            }
        },
        methods: {

            checkPdf() {
            },
            changeActive(id, active) {
                let data = {id: id, active: active}
                this.$axios({
                    url: `/api${url.changeActive}`,
                    method: 'post',
                    data: data,
                }).then(res => {
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            clickDelete(id) {
                this.deleteUserVisible = true;
                this.deleteId = id
            },

            deleteContributor() {
                this.$axios({
                    url: `/api${url.deleteCon}/${this.deleteId}`,
                    method: 'delete',
                }).then(res => {
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            changePage(page) {
            },
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('section').offsetHeight ?
                        this.section.height = until.getClientHeight() + 'px' :
                        this.section.height = document.getElementById('section').offsetHeight

                })
            },
            clickItem(command) {
                switch (command) {
                    case 'b':
                        if (this.$route.path !== '/employeeList') {
                            this.$router.push('/employeeList');
                        }
                        break;
                    case 'c':
                        if (this.$route.path !== '/createUser') {
                            this.$router.push('/createUser');
                        }
                        break;
                    case 'd':
                        if (this.$route.path !== '/signedRepo/resetPassword') {
                            this.$router.push('/signedRepo/resetPassword');
                        }
                        break;

                    case 'f':
                        this.loginOut()
                        break;
                }
            },
            loginOut() {
                sessionStorage.clear()
                this.$router.push('/')

            },
        },
        created() {
        },
        mounted() {
            this.setClientHeight();
        }
    }
</script>

<style lang="less">
    #section {
        padding-top: 4rem;
        background-color: #F5F5F5;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        & > div:nth-of-type(2) {
            flex-grow: 1;
        }
    }

    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

    .paginationClass {
        text-align: center;
        margin-bottom: 1rem;
    }


    .pointer {
        cursor: pointer;
    }


    .marginTop1rem {
        margin-top: 1rem;
    }

    .contentTitle {
        font-size: 1.2rem;
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
</style>