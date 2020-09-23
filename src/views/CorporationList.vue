<template>
    <div>
        <div class="tableStyle">
            <el-table
                    :data="tableData"
                    align="center"
                    style="width: 100%;">
                <el-table-column
                        prop="corporation_name"
                        label="CorporationName">

                </el-table-column>
                <el-table-column
                        prop="admin_name"
                        label="AdminName">
                </el-table-column>

                <el-table-column
                        prop="admin_email"
                        label="Email">
                </el-table-column>

                <el-table-column
                        label="PDF"
                        align="center">

                    <template slot-scope="scope">
                        <el-popover
                                width="80"
                                trigger="hover"
                                placement="right">

                            <div class="menuBT">
                                <el-button @click="uploadClaFile(scope.row)" style="margin-left: 10px" type=""
                                           size="mini">upload
                                </el-button>
                                <el-button @click="downloadClaFile(scope.row)" type="" size="mini">download</el-button>
                                <el-button @click="previewClaFile(scope.row)" type="" size="mini">preview</el-button>
                            </div>

                            <svg-icon slot="reference" class="pointer" icon-class="pdf" @click=""/>

                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center">

                    <template slot-scope="scope">
                        <div class="mySwitch" style="display: inline-block">
                            <el-switch
                                    @change="changeActive(scope.row.cla_org_id,scope.row.corporation_name,scope.row.admin_email,true)"
                                    v-model="scope.row.enabled"
                                    class="mySwitch"
                                    :disabled="scope.row.enabled"
                                    width="100"
                                    active-color="#409EFF"
                                    active-text="active"
                                    inactive-text="inactive"
                                    inactive-color="#EBEEF5">
                            </el-switch>
                        </div>
                        <el-button :disabled="scope.row.administrator_enabled" style="margin-left: 1rem" type="primary"
                                   size="mini"
                                   @click="createRoot(scope.row.cla_org_id,scope.row.admin_email)">Create Root
                        </el-button>

                    </template>
                </el-table-column>

            </el-table>
        </div>
        <!--<div class="paginationClass">-->
        <!--<el-pagination-->
        <!--background-->
        <!--:page-size="5"-->
        <!--:pager-count="5"-->
        <!--:hide-on-single-page="true"-->
        <!--:current-page="currentPage"-->
        <!--@current-change="changePage"-->
        <!--layout="prev, pager, next"-->
        <!--:total="tableTotal">-->
        <!--</el-pagination>-->
        <!--</div>-->
        <el-dialog
                title="upload cla file"
                top="5vh"
                :visible.sync="uploadDialogVisible"
                width="35%">
            <div>

                <div class="left">
                    <el-form v-model="form">
                        <el-form-item label="" label-width="0">
                            <el-upload
                                    name="signature_page"
                                    ref="uploadPdf"
                                    class="upload-demo"
                                    :action="uploadUrl"
                                    :headers="uploadHeaders"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    :before-remove="beforeRemove"
                                    :auto-upload="false"

                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                                    上传到服务器
                                </el-button>
                                <!--<div slot="tip" class="el-upload__tip">文件不超过500kb</div>-->
                            </el-upload>
                        </el-form-item>
                    </el-form>


                </div>
            </div>

        </el-dialog>
        <el-dialog
                style="background-color: #3C3C3C"
                title="pdf-reader"
                top="5vh"
                :close-on-click-modal="false"
                :visible.sync="previewDialogVisible"
                width="50%">
            <div>
                <pdfReader
                        v-if="docInfo.type === 'pdf'"
                        :doctype="docInfo.type"
                        :dochref="docInfo.href">

                </pdfReader>

            </div>

        </el-dialog>
    </div>


</template>
<script>
    import * as url from '../until/api'
    import pdfReader from "@components/PdfReader";

    export default {
        name: "CorporationList",
        components: {
            pdfReader,
        },

        data() {
            return {
                uploadHeaders: {
                    'Token': this.$store.state.access_token,
                },
                uploadUrl: '',
                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                platform: this.$store.state.platform,
                user: {
                    userName: this.$store.state.user.userName,
                    userId: this.$store.state.user.userId,
                },
                msg: 'Welcome to Your Vue.js App',
                docInfo: {},
                previewDialogVisible: false,
                form: {file: ''},
                fileList: [],
                uploadDialogVisible: false,
                item: '',
                tableData: [{
                    corporation_name: 'ooo',
                    admin_name: 'ocl',
                    admin_email: '666@qq.com',
                    date: '2020-08-18'
                }, {corporation_name: 'oco', admin_name: 'oll', email: '555@qq.com', date: '2020-08-19'},],
                currentPage: 1,
                tableTotal: 0,
            }
        },
        beforeRouteEnter(to, from, next) {
            // 在渲染该组件的对应路由被 confirm 前调用
            // 不！能！获取组件实例 `this`
            // 因为当钩子执行前，组件实例还没被创建
            if (from.path !== '/') {
                sessionStorage.removeItem('item')
            }
            next();
        },
        created() {
            if (JSON.parse(sessionStorage.getItem('item'))) {
                this.item = JSON.parse(sessionStorage.getItem('item'))
            } else {
                this.tableData = this.$route.query.item.corporationInfo
                this.item = this.$route.query.item
                sessionStorage.setItem('item', JSON.stringify(this.$route.query.item))
            }
            this.uploadUrl = `/api${url.uploadSignature}/${this.item.id}`
            this.getCorporationInfo()
        },
        methods: {
            uploadOk() {
                let fd = new FormData();
                for (let i = 0; i < this.fileList.length; i++) {
                    fd.append('file', this.fileList[i], this.fileList[i].name);
                }
                this.$axios({
                    url: this.uploadUrl,
                    data: {fd},
                    headers: {'Token': this.$store.state.access_token}
                }).then(res => {
                })
            },
            previewClaFile(row) {
                this.docInfo = {
                    type: "pdf",
                    href:`/api${url.downloadSignature}/${this.item.id}`
                }
                this.previewDialogVisible = true
            },

            downloadClaFile(row) {
                console.log('downloadClaFile', row);
            },
            uploadClaFile(row) {
                console.log('uploadClaFile', row);
                this.uploadDialogVisible = true
            },
            submitUpload() {
                this.$refs.uploadPdf.submit();
            },
            handleSuccess(file, fileList) {
                console.log(file, fileList);

            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Are you sure you want to remove it ${file.name}？`);
            },
            getCorporationInfo() {
                this.$axios({
                    url: `/api${url.corporation_signing}`,
                    params: {
                        platform: this.item.platform,
                        org_id: this.item.org_id,
                        repo_id: this.item.repo_id,
                        cla_language: this.item.cla_language
                    },
                    headers: {
                        'Token': this.$store.state.access_token,
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }
                }).then(resp => {
                    this.tableData = resp.data;
                }).catch(err => {
                })
            },
            createRoot(cla_org_id, email) {
                let data = {cla_org_id: cla_org_id, email: email}
                this.$axios({
                    url: `/api${url.corporationManager}`,
                    method: 'post',
                    data: data,
                    headers: {
                        'Token': this.$store.state.access_token,
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }
                }).then(res => {
                    this.$message.closeAll()
                    this.$message.success('success')
                    this.getCorporationInfo()
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error('failed')
                })
            },
            changeActive(cla_org_id, corporation_name, admin_email, enabled) {
                let data = {
                    cla_org_id: cla_org_id,
                    corporation_name: corporation_name,
                    admin_email: admin_email,
                    enabled: enabled
                }
                this.$axios({
                    url: `/api${url.active_corporation}`,
                    method: 'put',
                    data: data,
                    headers: {
                        'Token': this.$store.state.access_token,
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }
                }).then(res => {
                    this.getCorporationInfo()
                }).catch(err => {
                })
            },
        },

    }
</script>

<style lang="less">
    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
        cursor: pointer;
    }

    .el-popover {
        min-width: 7rem;
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

    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

    .paginationClass {
        text-align: center;
        margin-bottom: 1rem;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .menuBT {
        display: flex;
        flex-direction: column;

        & > * {
            width: 6rem;
            margin: .2rem 1rem;
            text-align: center;
        }
    }

    .hoverUnderline:hover {
        text-decoration: underline;
    }

    .pointer {
        cursor: pointer;
    }

    .disableClass {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #ACD7E6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

</style>