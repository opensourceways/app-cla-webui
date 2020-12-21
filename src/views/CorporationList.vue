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
                                        <el-button v-if="scope.row.pdf_uploaded" @click="downloadClaFile(scope.row)"
                                                   size="mini">download
                                        </el-button>
                                        <el-button v-if="scope.row.pdf_uploaded" @click="previewClaFile(scope.row)"
                                                   type="" size="mini">preview
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
                                    <el-button :disabled="scope.row.pdf_uploaded" type="primary"
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
                                        <!--<el-button @click="uploadOrgSignature(scope.row)" size="mini">upload</el-button>-->
                                        <el-button @click="downloadOrgSignature(scope.row)" type="" size="mini">
                                            download
                                        </el-button>
                                        <el-button @click="previewOrgSignature(scope.row)" type="" size="mini">preview
                                        </el-button>
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
            uploadOrgSignature(row) {
                this.uploadUrl = `/api${url.uploadSignature}/${this.$store.state.corpItem.link_id}`;
                this.uploadOrgDialogVisible = true
            },
            testPreviewPdf() {
                // let pdfData = `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`;
                // console.log(pdfData.length);
                // sessionStorage.setItem('pdf_base64', pdfData);
                // this.url = `../../static/pdf_source/web/viewer.html?file=${encodeURIComponent('JVBERi0xLjMKMSAwIG9iago8PAovVHlwZSAvUGFnZXMKL0NvdW50IDMKL0tpZHMgWyAzIDAgUiA0IDAgUiA1IDAgUiBdCj4+CmVuZG9iagoyIDAgb2JqCjw8Ci9Qcm9kdWNlciAoUHlQREYyKQo+PgplbmRvYmoKMyAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDEgMCBSCi9SZXNvdXJjZXMgNyAwIFIKL0NvbnRlbnRzIDE4IDAgUgovTWVkaWFCb3ggWyAwIDAgNTk1LjI4IDg0MS44OSBdCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyA3IDAgUgovQ29udGVudHMgMTkgMCBSCi9NZWRpYUJveCBbIDAgMCA1OTUuMjggODQxLjg5IF0KPj4KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL01lZGlhQm94IFsgMCAwIDU5NS42OCA4NDIuNCBdCi9Db250ZW50cyAyMCAwIFIKL1BhcmVudCAxIDAgUgovUm90YXRlIDAKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRmQwODM3NWY2NGViOTg2MWM2ZWFlNGRmY2ZkYmQzNTAwZmJkYmUzM2UgOCAwIFIKL0Y5N2YwNWJmYjZiYTcyN2Q4NGQ1ODAzOTg3NDgwMTkwY2I4M2M2MDlkIDkgMCBSCi9GODZiMzQ1NTBlZjkzODFhZTFhY2I0OGJiNTkxYWNhODk3N2RlN2VlMSAxMCAwIFIKL0YwYTc2NzA1ZDE4ZTA0OTRkZDI0Y2I1NzNlNTNhYTBhOGM3MTBlYzk5IDE3IDAgUgo+PgovWE9iamVjdCA8PAovSW0yNSAyMSAwIFIKPj4KL1Byb2NTZXQgWyAvSW1hZ2VDIC9JbWFnZUIgL1BERiAvVGV4dCAvSW1hZ2VJIF0KPj4KL0Fubm90cyBbIF0KPj4KZW5kb2JqCjYgMCBvYmoKPDwKL1R5cGUgL0NhdGFsb2cKL1BhZ2VzIDEgMCBSCj4+CmVuZG9iago3IDAgb2JqCjw8Ci9Qcm9jU2V0IFsgL1BERiAvVGV4dCAvSW1hZ2VCIC9JbWFnZUMgL0ltYWdlSSBdCi9Gb250IDw8Ci9GZDA4Mzc1ZjY0ZWI5ODYxYzZlYWU0ZGZjZmRiZDM1MDBmYmRiZTMzZSA4IDAgUgovRjk3ZjA1YmZiNmJhNzI3ZDg0ZDU4MDM5ODc0ODAxOTBjYjgzYzYwOWQgOSAwIFIKL0Y4NmIzNDU1MGVmOTM4MWFlMWFjYjQ4YmI1OTFhY2E4OTc3ZGU3ZWUxIDEwIDAgUgovRjBhNzY3MDVkMThlMDQ5NGRkMjRjYjU3M2U1M2FhMGE4YzcxMGVjOTkgMTcgMCBSCj4+Ci9YT2JqZWN0IDw8Cj4+Ci9Db2xvclNwYWNlIDw8Cj4+Cj4+CmVuZG9iago4IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvVGltZXMtUm9tYW4KL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9CYXNlRm9udCAvSGVsdmV0aWNhLU9ibGlxdWUKL1N1YnR5cGUgL1R5cGUxCi9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nCj4+CmVuZG9iagoxMCAwIG9iago8PAovVHlwZSAvRm9udAovU3VidHlwZSAvVHlwZTAKL0Jhc2VGb250IC91dGY4bm90b3NhbnNzYy1yZWd1bGFyCi9FbmNvZGluZyAvSWRlbnRpdHktSAovRGVzY2VuZGFudEZvbnRzIFsgMTEgMCBSIF0KL1RvVW5pY29kZSAxNiAwIFIKPj4KZW5kb2JqCjExIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9DSURGb250VHlwZTIKL0Jhc2VGb250IC91dGY4bm90b3NhbnNzYy1yZWd1bGFyCi9DSURTeXN0ZW1JbmZvIDEyIDAgUgovRm9udERlc2NyaXB0b3IgMTMgMCBSCi9EVyAxMDAwCi9XIFsgXQovQ0lEVG9HSURNYXAgMTUgMCBSCj4+CmVuZG9iagoxMiAwIG9iago8PAovUmVnaXN0cnkgKEFkb2JlKQovT3JkZXJpbmcgKFVDUykKL1N1cHBsZW1lbnQgMAo+PgplbmRvYmoKMTMgMCBvYmoKPDwKL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvdXRmOG5vdG9zYW5zc2MtcmVndWxhcgovQXNjZW50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btIjHcSY7bcIboPVVTrVU077daiG19a4ToJBB0EDDoYINhglhHzggbhrJWkJoKHe7ttXu9NVerbwd7d76d2m//DugnaDsNpINtC16pJ1qrp3Vaug30q1raX09U6Sq6WGDumkE3yId3aT91aSu96t6u9/baWk3TW27V9sghGm3e/1VrdXVuqe9FQmt1SpaaSdu1sdVS6phtdJe/tunq6vV2qvCd+7dtLtqtPS09vVhlDh2lv9J0kr+rraXv9/VKre1d+7IhEcS1ruhDKH/avb17pe6bpN1poEUOrX9u/p9U6o1hinv7EMNfdbhW+m3WrSule7d9darW0laauwtqldODurSvutJtVe6bVt+o9J29PyX323T6oIh3071at7puthpMNUqa6+ktbZY6b9hq1boNaS3/kxyp77umnXaV7IrlDqGR0C9p93YTtXqlhpLrdXT22qXV0PSVVaZGTvptLYimIhXv1TFU63GwwV21W/6SdvTpBdt3dUnrtJvYQYXqndyDju022DaYhbEw96bStbVLrTqlerb99NpYMER0GmE00wqoMJ9pL3Tadb/6b77aT3VaSde9N4iIiIiIZY4QiIOHwwmEGWOEk9NpN7aq2ta3v3d6vTSxEQwiOmEDKHKHKHKHCERbEWGEsJJN1pXd0tpVT07aabxFMRERVhhWDCWgwSYYWrCTu2t2wwl2k62tiFHbFMQrYMFQawy6CVUwwqTaaT1O+atBhcw+qYk4bBtsRV3IcdNxTa/oNMJhJmBgwrrpJheGKUMiO1elalmgaJhC0zjhAziwIQ2Gg1Caaaaa1lmJ0FbCQjYiIgwhDK2OUOccw4IRTBoNUKYpREREWhHTTSdpgrK4l1EMococJYfERa1psNK9kdAugxEFHgy2VTH//////////////////8yUlMisOdVCBhOrZ2r8nhQ7SThBCG2ER0lwbEfXlqASI6I67eWorByHa8JqdpFXM0QzKREfJdEdEdZLUg8J3DQTQMuz5hCDBCIMIoeXR6IaI6NEEGTiSc+lsXTbdMJhCLVCwqaaQNj4aYRFHGqabvsWEGk/YbUEHYmtol7VXRFdSN/fkKMoJpBB4TgyhzUqwhCBBtBN8MNUm2E4XdJ+EG26JNECXDIIH6rYXtrS6VnokCm4+iOgRFqKHIqJOiNxQiOcMGu2m4vq60G2xbTthhMIQwgaZD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HRHyOiOiOiOiOiOiPkfI6I+R0R2RwNAUiOZHRHytonURERERERERERERERERERERERERERERERE75GiPIujCLoui6LouiOi6I6I6I6I6I6I6I+R8jojmR8jxHyORHZHyPkciOIRzI4ZIMwQkDxRyxzjnHKHKHOOccoc45Q5xyhyhynKHKHKcococococpynKcpynKwqyqFalBlNQyERERERERERERERERERERESSI4jiMI2i6LoujCI6I6I6I6LojojojojojojojojojkRwyKIiIiIiIiIiIiIiIiIiIiIkGYckOWOUOUOUOUOUOccococococococpyhynKcpyhyhynKcpyoKcqyvKmVxTSJiIiIiIiIiIiIiIiJ2DR5G0cRdGEXRdGEYRdEdSMcRERERERERERERERERERESB4aY5Y5xzDlDmHKHKHKHKcocococococpyhynKcpynKcrCrKwpWUzpxERERERERJajaNo2jCMI4jCMIwi6LowiOi6I6Loui6I6I6I6I6I6I6I6I6I6I6I+R0R0R8jxHIjgagpkcQjmR8joj5HRHRHRHRHRHRHRHRHRHRdEdF0XRdGEbRtGEaIoUREREREREREREREREREREREROw0eRtF0bRxGEXRdGEXRHRHRdEdEdEdF0R0R0R0R0R0R8jojoj5HRHRHRHRHyPkdEfI6I4hHByOBqGgjsjojoj5HRHRHRHRHRHRdEdEdEdF0XRtF0YR5GFERERERERERERERERERERERERETsmjaLowjCLoui6LojouiOiOiOiOiOiOiOiOiOiOiPkdEeI6I6I+RwhHA1CkdEfI8R0R8joj5HyOiOiOiOiOiOiOiOiOiOi6Loui6iIiIiIiIiIiIiIiIiIidmqM0bRtGEcRxHkYRtHEXRhF0bRdF0XRHRhEdF0R0R0R0R0R0R0R0R0R4jojojsjmRyI4LYFkREREREREREREREREREREREREpaPIzRhGEXRdF0YRdF0XRHRHRHRHRHRHRHRHRHRHRHRHRHMjsjhgjhkA0RERERERERERERERERESVInRtGEcRhHkYRhG0YRhGEYRdF0XRHRdEdF0XRHRdEdF0R0R0R0R0R8joj0RERERERERERERERERERERH////////mQkGWbZEXs04f1qyhyhyhyhyhyblDlDlD37iIiIcRERWq9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IiIiIiIiI//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yAsqKP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+ACACAKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMjIKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAwODAgMDAwMDAgbiAKMDAwMDAwMDEyMCAwMDAwMCBuIAowMDAwMDAwMjMzIDAwMDAwIG4gCjAwMDAwMDAzNDYgMDAwMDAgbiAKMDAwMDAwMDc2NiAwMDAwMCBuIAowMDAwMDAwODE1IDAwMDAwIG4gCjAwMDAwMDExMjcgMDAwMDAgbiAKMDAwMDAwMTIyNiAwMDAwMCBuIAowMDAwMDAxMzMxIDAwMDAwIG4gCjAwMDAwMDE0ODMgMDAwMDAgbiAKMDAwMDAwMTY1NSAwMDAwMCBuIAowMDAwMDAxNzI1IDAwMDAwIG4gCjAwMDAwMDE5NTAgMDAwMDAgbiAKMDAwMDAwMzM3OCAwMDAwMCBuIAowMDAwMDAzNjI2IDAwMDAwIG4gCjAwMDAwMDQwMjMgMDAwMDAgbiAKMDAwMDAwNDEyMSAwMDAwMCBuIAowMDAwMDA2NzUyIDAwMDAwIG4gCjAwMDAwMDc3OTQgMDAwMDAgbiAKMDAwMDAwODM1OCAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDIyCi9Sb290IDYgMCBSCi9JbmZvIDIgMCBSCj4+CnN0YXJ0eHJlZgoyMDE1MAolJUVPRgo=')}`;
                // let reader = new FileReader();
                // let blob = this.dataURLtoBlob('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');
                // reader.readAsDataURL(blob);
                let url = `../../static/pdf_source/web/viewer.html?file=${encodeURIComponent('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')}`;
                // window.open(`../../static/pdf_source/web/viewer.html`);
                window.open(url)

            },
            previewOrgSignature(row) {
                http({
                    url: `${url.downloadSignature}/${this.$store.state.corpItem.link_id}/${row.language}`,
                    responseType: 'blob',
                }).then(res => {
                    if (res && res.data) {
                        let blob = new Blob([(res.data)], {type: 'application/pdf'});
                        let url = window.URL.createObjectURL(blob);
                        window.open(`../../static/pdf_source/web/viewer.html?file=${encodeURIComponent(url)}`)
                    }
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
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
                            default :
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_error'),
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
            downloadOrgSignature(row) {
                http({
                    url: `${url.downloadSignature}/${this.$store.state.corpItem.link_id}/${row.language}`,
                    responseType: 'blob',
                }).then(res => {
                    if (res && res.data) {
                        let time = until.getNowDateToTime();
                        download((new Blob([res.data])), `${this.$store.state.corpItem.org_id}_${row.language}_signature${time}.pdf`, 'application/pdf');
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.system_error'),
                        })
                    }
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
                    if (res && res.data) {
                        let blob = new Blob([(res.data)], {type: 'application/pdf'});
                        let url = window.URL.createObjectURL(blob);
                        window.open(`../../static/pdf_source/web/viewer.html?file=${encodeURIComponent(url)}`)
                    }
                }).catch(err => {
                })
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
            // this.showPdfFile(this.pdfBase64);
            this.testPreviewPdf();
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
