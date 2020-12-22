<template xmlns:el-button="http://www.w3.org/1999/html">
    <div id="corporationList">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
            <el-tab-pane label="Signed Corporation" name="first"
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
                                        <el-button @click="previewClaFile(scope.row)" type="" size="mini">preview
                                        </el-button>
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
                            :data="individualClaData"
                            align="center"
                            style="width: 100%;">
                        <el-table-column
                                prop="url"
                                label="Url">
                            <template slot-scope="scope">
                                <span class="hoverUnderline" @click="checkUrl(scope.row.url)">{{scope.row.url}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="language"
                                label="Language">
                        </el-table-column>
                        <el-table-column
                                prop=""
                                label="Operation">
                            <template slot-scope="scope">
                                <el-dropdown placement="bottom-start" trigger="hover">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>Modify field</el-dropdown-item>
                                        <el-dropdown-item>Add cla for other language</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="Corporation CLA" name="third" style="margin-top: 1rem">
                <div class="tableStyle">
                    <el-table
                            :empty-text="$t('corp.no_data')"
                            :data="corpClaData"
                            align="center"
                            style="width: 100%;">
                        <el-table-column
                                prop="url"
                                label="Url">
                            <template slot-scope="scope">
                                <span class="hoverUnderline" @click="checkUrl(scope.row.url)">{{scope.row.url}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="language"
                                label="Language">
                        </el-table-column>
                        <el-table-column
                                label="Signature">
                            <template slot-scope="scope">
                                <el-popover
                                        width="80"
                                        trigger="hover"
                                        placement="right">

                                    <div class="menuBT">
                                        <el-button @click="uploadOrgSignature(scope.row)"
                                                   type=""
                                                   size="mini">upload
                                        </el-button>
                                        <!--<el-button @click="downloadOrgSignature(scope.row)" type="" size="mini">download</el-button>-->
                                        <!--<el-button @click="previewOrgSignature(scope.row)" type="" size="mini">preview</el-button>-->
                                    </div>

                                    <svg-icon slot="reference" class="pointer" icon-class="pdf" @click=""/>

                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="Operation">
                            <template slot-scope="scope">
                                <el-dropdown placement="bottom-start" trigger="hover">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>Modify field</el-dropdown-item>
                                        <el-dropdown-item>Add cla for other language</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
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
    </div>


</template>
<script>
    import PDFJS from '../until/pdf/pdf'
    import * as url from '../until/api'
    import * as until from '../until/until'
    import pdfReader from "@components/PdfReader";
    import http from '../until/http'
    import pdf from 'vue-pdf'
    import ReLoginDialog from '../components/ReLoginDialog'
    import download from 'downloadjs'
    export default {
        name: "CorporationList",
        components: {
            pdfReader,
        },
        data() {
            return {
                individualClaData: [],
                corpClaData: [],
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
            }
        },
        inject: ['setClientHeight'],
        methods: {
            checkUrl(url) {
                window.open(url)
            },
            previewEmptySignature(row) {

            },
            downloadEmptySignature(row) {
                this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: this.$t('tips.no_file_can_download'),
                })
            },

            /*======================OrgSignature======================================*/
            uploadOrgSignature(row) {
                this.uploadUrl = `/api${url.uploadSignature}/${this.$store.state.corpItem.link_id}`;
                this.uploadOrgDialogVisible = true
            },
            previewOrgSignature(row) {
            },
            downloadOrgSignature(row) {
                http({
                    url: `${url.downloadSignature}/${row.id}`,
                }).then(res => {
                    if (res.data.data.pdf) {
                        let URL = this.dataURLtoBlob(res.data.data.pdf);
                        var reader = new FileReader();
                        reader.readAsDataURL(URL);
                        reader.onload = function (e) {
                            if (window.navigator.msSaveOrOpenBlob) {
                                var bstr = atob(e.target.result.split(",")[1]);
                                var n = bstr.length;
                                var u8arr = new Uint8Array(n);
                                while (n--) {
                                    u8arr[n] = bstr.charCodeAt(n);
                                }
                                var blob = new Blob([u8arr]);
                                window.navigator.msSaveOrOpenBlob(blob, `${row.language}_signature.pdf`);
                            } else {
                                const a = document.createElement('a');
                                a.download = `${row.language}_signature.pdf`;
                                a.href = e.target.result;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a)
                            }
                        }
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.not_upload_file'),
                        })
                    }
                }).catch(err => {
                })
            },
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
                        };
                        page.render(renderContext)
                    })
                })
            },
            tabsHandleClick(tab, event) {
                if (tab.index === '0') {
                    this.getCorporationInfo()
                } else if (tab.index === '1') {
                    this.getIndividualClaInfo()
                } else if (tab.index === '2') {
                    this.getCorpClaInfo();
                }
            },
            getCorpClaInfo() {
                let link_id = this.$store.state.corpItem.link_id;
                http({
                    url: `${url.getCla}/${link_id}`
                }).then(res => {
                    if (res && res.data.data.corp_clas) {
                        this.corpClaData = res.data.data.corp_clas;
                    } else {

                    }
                }).catch(err => {

                });
            },
            getIndividualClaInfo() {
                let link_id = this.$store.state.corpItem.link_id;
                http({
                    url: `${url.getCla}/${link_id}`
                }).then(res => {
                    if (res && res.data.data) {
                        this.individualClaData = res.data.data.individual_clas;
                    } else {

                    }
                }).catch(err => {
                });
            },
            getCorporationInfo() {
                http({
                    url: `${url.corporation_signing}/${this.$store.state.corpItem.link_id}`,
                }).then(resp => {
                    this.tableData = resp.data.data;
                }).catch(err => {
                })
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
                http({
                    url: `${url.corporationPdf}/${this.$store.state.corpItem.link_id}/${row.admin_email}`,
                    responseType: 'blob',
                }).then(res => {
                    let blob = new Blob([(res.data)], { type: 'application/pdf' });
                    let url = window.URL.createObjectURL(blob);
                    window.open(`../../static/pdf_source/web/viewer.html?file=${encodeURIComponent(url)}`)
                }).catch(err => {
                })
            },
            dataURLtoBlob(dataurl) {
                let bstr = atob(dataurl)
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: 'pdf'});
            },
            dataURLtoBlob(dataurl) {
                let bstr = atob(dataurl)
                let n = bstr.length;
                let u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: 'pdf'});
            },
            downloadClaFile(row) {
                http({
                    url: `${url.corporationPdf}/${this.$store.state.corpItem.link_id}/${row.admin_email}`,
                    responseType: 'blob',
                }).then(res => {
                    if (res.data) {
                        let time = until.getNowDateToTime();
                        download((new Blob([res.data])), `${row.corporation_name}_signature${time}.pdf`, 'application/pdf');
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.not_upload_file'),
                        })
                    }
                }).catch(err => {
                })
            },
            uploadClaFile(row) {
                this.uploadUrl = `/api${url.corporationPdf}/${this.$store.state.corpItem.link_id}/${row.admin_email}`;
                this.uploadDialogVisible = true
            },
            submitUpload() {
                this.$refs.uploadPdf.submit();
            },
            handleSuccess(file, fileList) {
                this.fileList = [];
                this.$message.closeAll();
                this.$message.success('success');
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
            openResendPdf(email) {
                this.resendEmail = email;
                this.resendEmailDialogVisible = true;
            },
            resendPDF() {
                let email = this.resendEmail;
                let resend_url = '';
                resend_url = `${url.resend_pdf}/${this.$store.state.corpItem.link_id}/${email}`
                http({
                    url: resend_url,
                    method: 'post',
                }).then(res => {
                    this.resendEmailDialogVisible = false;
                    this.$message.closeAll();
                    this.$message.success('success');
                }).catch(err => {
                    this.$message.closeAll();
                    this.$message.error('failed');
                })
            },
            createRoot(email) {
                this.$axios({
                    url: `/api${url.corporationManager}/${this.$store.state.corpItem.link_id}/${email}`,
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
        created() {
            this.getCorporationInfo();
        },
        mounted() {
            this.setClientHeight();
        },
        updated() {
            this.setClientHeight()
        },
    };
</script>

<style lang="less">
    #corporationList {
        padding-top: 3rem;

        #pop {
            position: relative;
            text-align: center;
            z-index: 9;

            canvas {
                margin: 20px auto;
                display: block;
            }
        }

        #pop {
            position: relative;
            text-align: center;
            z-index: 9;

            canvas {
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
