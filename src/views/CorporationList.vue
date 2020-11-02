<template>
    <div id="corporationList">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
            <el-tab-pane v-if="item.apply_to==='corporation'" label="Signed Corporation" name="first"
                         style="margin-top: 1rem">
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
                                label="PDF">

                            <template slot-scope="scope">
                                <el-popover
                                        width="80"
                                        trigger="hover"
                                        placement="right">

                                    <div class="menuBT">
                                        <el-button @click="uploadClaFile(scope.row)" style="margin-left: 10px" type=""
                                                   size="mini">upload
                                        </el-button>
                                        <el-button @click="downloadClaFile(scope.row)" type="" size="mini">download
                                        </el-button>
                                        <!--<el-button @click="previewClaFile(scope.row)" type="" size="mini">preview</el-button>-->
                                    </div>

                                    <svg-icon slot="reference" class="pointer" icon-class="pdf" @click=""/>

                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="Operation">

                            <template slot-scope="scope">
                                <el-button :disabled="scope.row.admin_added" type="primary"
                                           size="mini"
                                           @click="createRoot(scope.row.admin_email)">Create Administrator
                                </el-button>

                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="CLA" name="second" style="margin-top: 1rem">
                <div class="tableStyle">
                    <el-table
                            :data="claData"
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
                                        <el-button @click="downloadClaFile(scope.row)" type="" size="mini">download
                                        </el-button>
                                        <!--<el-button @click="previewClaFile(scope.row)" type="" size="mini">preview</el-button>-->
                                    </div>

                                    <svg-icon slot="reference" class="pointer" icon-class="pdf" @click=""/>

                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                                align="center">

                            <template slot-scope="scope">
                                <!--<div class="mySwitch" style="display: inline-block">-->
                                <!--<el-switch-->
                                <!--@change="changeActive(scope.row.cla_org_id,scope.row.corporation_name,scope.row.admin_email,true)"-->
                                <!--v-model="scope.row.enabled"-->
                                <!--class="mySwitch"-->
                                <!--:disabled="scope.row.enabled"-->
                                <!--width="100"-->
                                <!--active-color="#409EFF"-->
                                <!--active-text="active"-->
                                <!--inactive-text="inactive"-->
                                <!--inactive-color="#EBEEF5">-->
                                <!--</el-switch>-->
                                <!--</div>-->
                                <el-button :disabled="scope.row.administrator_enabled" style="margin-left: 1rem"
                                           type="primary"
                                           size="mini"
                                           @click="createRoot(scope.row.admin_email)">Create Administrator
                                </el-button>

                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </el-tab-pane>
        </el-tabs>

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
                title="upload file"
                top="5vh"
                :visible.sync="uploadDialogVisible"
                width="35%">
            <div>

                <div class="left">
                    <el-form v-model="form">
                        <el-form-item label="" label-width="0">
                            <el-upload
                                    name="pdf"
                                    ref="uploadPdf"
                                    class="upload-demo"
                                    action=""
                                    :headers="uploadHeaders"
                                    :http-request="upload"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    :before-remove="beforeRemove"
                                    :auto-upload="false"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                <el-button slot="trigger" size="small" type="primary">select</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                                    upload
                                </el-button>
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
    import http from '../until/http'

    export default {
        name: "CorporationList",
        components: {
            pdfReader,
        },

        data() {
            return {
                claData: '',
                activeName: 'first',
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
                docInfo: {},
                previewDialogVisible: false,
                form: {file: ''},
                fileList: [],
                uploadDialogVisible: false,
                item: '',
                tableData: [],
                currentPage: 1,
                tableTotal: 0,
            }
        },

        created() {
            this.item = this.$route.query.item;
            console.log(this.$route.query.item);
            if (this.item.apply_to === 'corporation') {
                this.activeName = 'first';
                this.getCorporationInfo()
            } else if (this.item.apply_to === 'individual') {
                this.activeName = 'second';
                this.getClaInfo()
            }

        },
        methods: {
            tabsHandleClick(tab, event) {
                if (tab.index === '0') {
                    this.getCorporationInfo()
                } else if (tab.index === '1') {
                    this.getClaInfo()
                }
            },
            upload(fileObj) {
                const formData = new FormData()
                formData.append('pdf', fileObj.file)
                formData.append('type', fileObj.file.type)
                return this.$axios({
                    url: this.uploadUrl,
                    method: 'patch',
                    data: formData,
                    headers: {'Token': this.$store.state.access_token}
                }).then()
            },
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
                    href: `/api${url.downloadSignature}/${this.item.id}`
                }
                this.previewDialogVisible = true
            },

            downloadClaFile(row) {
            },
            uploadClaFile(row) {
                this.uploadUrl = `/api${url.uploadCorporationPdf}/${this.item.id}/${row.admin_email}`
                this.uploadDialogVisible = true
            },
            submitUpload() {
                this.$refs.uploadPdf.submit();
            },
            handleSuccess(file, fileList) {
                this.fileList = []
                this.$message.closeAll()
                this.$message.success('success')
                this.uploadDialogVisible = false

            },
            handleRemove(file, fileList) {
            },
            handlePreview(file) {
            },
            handleExceed(files, fileList) {
                this.$message.warning(`Only one files can be uploaded.`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Are you sure you want to remove it ${file.name}？`);
            },
            getClaInfo() {
                http({
                    url: `${url.getClaInfo}/${this.item.id}/cla`,
                }).then(resp => {
                    this.claData = resp.data.data;
                }).catch(err => {
                })
            },
            getCorporationInfo() {
                http({
                    url: `${url.corporation_signing}/${this.item.org_id}`,
                    params: {
                        repo_id: this.item.repo_id,
                        cla_language: this.item.cla_language
                    },
                }).then(resp => {
                    this.tableData = resp.data.data[this.item.id];
                }).catch(err => {
                })
            },
            createRoot(email) {
                this.$axios({
                    url: `/api${url.corporationManager}/${this.item.id}/${email}`,
                    method: 'put',
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
                    this.$message.error('Please upload PDF first.')
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
    #corporationList {
        padding-top: 3rem;

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

        .mySwitch .el-switch__label--right {
            z-index: 1;
            right: 0.5rem;
        }

        .mySwitch .el-switch__label--left {
            z-index: 1;
            left: .5rem;
        }

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
    }


</style>