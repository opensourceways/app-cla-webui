<template xmlns:el-button="http://www.w3.org/1999/html">
    <div id="corporationList">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
            <el-tab-pane v-if="item.apply_to==='corporation'" label="Signed Corporation" name="first"
                         style="margin-top: 1rem">
                <div class="tableStyle">
                    <el-table
                            :empty-text="$t('corp.no_data')"
                            :data="tableData"
                            align="center"
                            style="width: 100%;">
                        <el-table-column
                                prop="corporation_name"
                                label="Corporation Name">
                        </el-table-column>
                        <el-table-column
                                prop="admin_name"
                                label="Administrator Name">
                        </el-table-column>

                        <el-table-column
                                prop="admin_email"
                                label="Email">
                        </el-table-column>

                        <el-table-column>
                            <template slot="header" slot-scope="scope">
                                <el-tooltip effect="dark" :content="$t('org.corp_signed_pdf')" placement="top">
                                    <span>PDF</span>
                                </el-tooltip>
                            </template>
                            <template slot-scope="scope">
                                <el-popover
                                        width="80"
                                        trigger="hover"
                                        placement="right">

                                    <div class="menuBT">
                                        <el-button @click="uploadClaFile(scope.row)" size="mini">upload
                                        </el-button>
                                        <el-button @click="downloadClaFile(scope.row)" size="mini">download
                                        </el-button>
                                        <!--<el-button @click="previewClaFile(scope.row)" type="" size="mini">preview</el-button>-->
                                    </div>

                                    <svg-icon slot="reference" class="pointer" icon-class="pdf" @click=""/>

                                </el-popover>
                            </template>
                        </el-table-column>

                        <el-table-column
                                width="300"
                                label="Operation">
                            <template slot-scope="scope">
                                <el-button :disabled="scope.row.admin_added" type="primary"
                                           size="mini"
                                           @click="createRoot(scope.row.admin_email)">Create Administrator
                                </el-button>
                                <el-tooltip effect="dark" :content="$t('org.resend_tip')" placement="top">
                                    <el-button type="primary"
                                               size="mini"
                                               @click="openResendPdf(scope.row.admin_email)">Resend Email
                                    </el-button>
                                </el-tooltip>


                            </template>
                        </el-table-column>

                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Individual CLA" name="second" style="margin-top: 1rem">
                <div class="tableStyle">
                    <el-table
                            :empty-text="$t('corp.no_data')"
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
                                align="center">

                            <template slot-scope="scope">
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
            <el-tab-pane label="Corporation CLA" name="third" style="margin-top: 1rem">
                <div class="tableStyle">
                    <el-table
                            :empty-text="$t('corp.no_data')"
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
                                align="center">

                            <template slot-scope="scope">
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
        <el-dialog
                top="5vh"
                :visible.sync="resendEmailDialogVisible"
                width="20%">
            <div class="dialogContent">
                Are you sure to resend email?
                <div class="dialogBtBox">
                    <el-button class="dialogBt" size="medium" type="primary" @click="resendPDF">Yes</el-button>
                    <el-button size="medium" @click="resendEmailDialogVisible=false">No</el-button>
                </div>
            </div>

        </el-dialog>
        <el-dialog
                style="background-color: #3C3C3C"
                title="pdf-reader"
                top="5vh"
                :close-on-click-modal="false"
                :visible.sync="previewOriginalDialogVisible"
                width="50%">
            <div id="box">
                <!--<pdf-->
                <!--:src="pdfSrc">-->
                <!--</pdf>-->

                <!--<pdf-->
                <!--v-for="i in numPages"-->
                <!--:key="i"-->
                <!--:src="pdfSrc"-->
                <!--:page="i">-->
                <!--</pdf>-->

                <!--<pdfReader-->
                <!--v-if="docInfo.type === 'pdf'"-->
                <!--:doctype="docInfo.type"-->
                <!--:dochref="docInfo.href">-->
                <!--</pdfReader>-->

                <!--<iframe :src="url"  width="100%" height="100%"></iframe>-->
            </div>
        </el-dialog>
        <div id="pop">

        </div>
    </div>


</template>
<script>
    import * as url from '../until/api'
    import pdfReader from "@components/PdfReader";
    import http from '../until/http'
    import pdf from 'vue-pdf'
    import ReLoginDialog from '../components/ReLoginDialog'
    import download from 'downloadjs'
    import PDFJS from '../until/pdf/pdf'

    export default {
        name: "CorporationList",
        components: {
            pdfReader,
        },

        data() {
            return {
                previewOriginalDialogVisible: false,
                resendEmailDialogVisible: false,
                resendEmail: '',
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
                pdfBase64: `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`,
            }
        },


        inject: ['setClientHeight'],
        methods: {
            converData(data) {
                // data = data.replace(/[\n\r]/g, '');
                var raw = window.atob(data);
                var rawLength = raw.length;
                var array = new Uint8Array(new ArrayBuffer(rawLength));
                for (var i = 0; i < rawLength; i++) {
                    array[i] = raw.charCodeAt(i)
                }
                return array
            },


            showPdfFile(data) {
                PDFJS.GlobalWorkerOptions.workerSrc = '../until/pdf/pdf.worker.js';
                var fileContent = this.converData(data);
                this.previewOriginalDialogVisible = true;
                // $('#container').show();
                // $('#pop').empty();
                let pop = document.getElementById('pop');
                pop.innerHTML = '';
                PDFJS.getDocument(fileContent).promise.then(function getPdfHelloWorld(pdf) {
                    let pages = pdf.numPages;
                    for (var i = 1; i < pages; i++) {
                        var id = 'page-id' + i;
                        pop.append('<canvas :id=`${id}`></canvas>');
                        this.showAll(url, i, id)
                    }
                })
            },
            showAll(url, i, id) {
                PDFJS.getDocument().then(function getPdfHelloWorld(pdf) {
                    pdf.getPage(page).then(function getPageHelloWorld(page) {
                        let scale = 1.0,
                            viewport = page.getViewport(scale),
                            canvas = document.getElementById(id),
                            context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        let renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        }
                        page.render(renderContext)
                    })
                })
            },
            tabsHandleClick(tab, event) {
                if (tab.index === '0') {
                    this.getCorporationInfo()
                } else if (tab.index === '1') {
                    //   this.getClaInfo()
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
                };
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
                console.log('getClaInfo');
                http({
                    url: `${url.getClaInfo}/${this.item.id}/cla`,
                }).then(resp => {
                    console.log(resp);
                    console.log(resp.data.data);
                    this.claData = resp.data.data;
                    this.$nextTick(() => {
                        // this.setClientHeight();
                    })

                }).catch(err => {
                    console.log(err);
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
                    this.$nextTick(() => {
                        //this.setClientHeight();
                    })

                }).catch(err => {
                    // console.log(err);
                })
            },
            openResendPdf(email) {
                this.resendEmail = email;
                this.resendEmailDialogVisible = true;
            },

            resendPDF() {
                let email = this.resendEmail;
                let resend_url = '';
                if (this.item.repo_id) {
                    resend_url = `${url.resend_pdf}/${this.item.org_id}:${this.item.repo_id}/${email}`
                } else {
                    resend_url = `${url.resend_pdf}/${this.item.org_id}/${email}`
                }
                http({
                    url: resend_url,
                    method: 'post',
                }).then(res => {
                    this.resendEmailDialogVisible = false;
                    this.$message.closeAll()
                    this.$message.success('success');
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error('failed');
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
            init() {
                let interval = setInterval(() => {
                    if (this.$store.state.corpItem && this.$store.state.corpItem.apply_to) {
                        this.item = this.$store.state.corpItem;
                        if (this.item.apply_to === 'corporation') {
                            this.activeName = 'first';
                            this.getCorporationInfo()
                        } else if (this.item.apply_to === 'individual') {
                            this.activeName = 'second';
                            //   this.getClaInfo()
                        }
                        clearInterval(interval)
                    }

                }, 100);
                if (interval) {
                    setTimeout(() => {
                        clearInterval(interval)
                    }, 2000)
                }
            },
        },
        created() {
            this.init();
            this.showPdfFile(this.pdfBase64)
        },
        mounted() {
            this.setClientHeight();
        },
        updated() {
            this.setClientHeight()
        },
    }
</script>

<style lang="less">
    #corporationList {
        padding-top: 3rem;
        #pop {
            position: relative;
            text-align: center;
            z-index: 9;
            canvas{
                margin: 20px auto;
                display: block;
            }
        }

        .dialogContent {
            text-align: center;
        }

        .dialogBtBox {
            margin-top: 2rem;

            button {
                width: 4rem;
            }

            button:nth-of-type(2) {
                margin-left: 3rem;
            }
        }

        .dialogBt {

        }

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

    .el-popover {
        min-width: 6rem;

        .menuBT {
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            * {
                width: 6rem;
                margin: .2rem 0;
                text-align: center;
            }
        }

    }

</style>