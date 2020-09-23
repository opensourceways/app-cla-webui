<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="3" class="tableStyle">
                <el-table
                        :data="orgTableData"
                        align="center"
                        @cell-click="clickOrg"
                        :row-class-name="tableRowClassName"
                        style="width: 100%;">
                    <el-table-column

                            prop="Organization"
                            label="Organization">

                    </el-table-column>

                </el-table>
            </el-col>
            <el-col :span="21" class="tableStyle">
                <el-table
                        :data="tableData"
                        align="center"
                        style="width: 100%;">
                    <el-table-column
                            prop="repo_id"
                            label="Repository">
                        <template slot-scope="scope">
                            <svg-icon icon-class="repository"/>
                            <span class="pointer hoverUnderline"
                                  @click="checkCorporationList(scope.row)"
                                  style="margin-left: 10px;">{{scope.row.repo_id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="claName"
                            label="CLA">
                    </el-table-column>
                    <el-table-column
                            prop="apply_to"
                            label="Apply">
                    </el-table-column>
                    <el-table-column
                            prop="cla_language"
                            label="Language">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="Original Signature">
                        <template slot-scope="scope">
                            <el-popover
                                    width="80"
                                    trigger="hover"
                                    placement="right">
                                <div class="menuBT">
                                    <el-button style="margin-left: 10px" @click="previewOriginalSignature(scope.row)"
                                               type="" size="mini">preview
                                    </el-button>
                                    <el-button @click="downloadOriginalSignature(scope.row)" type="" size="mini">
                                        download
                                    </el-button>
                                </div>
                                <svg-icon slot="reference" class="pointer" icon-class="pdf"/>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            label="Org Signature">
                        <template slot-scope="scope">
                            <el-popover
                                    width="80"
                                    trigger="hover"
                                    placement="right">

                                <div class="menuBT">
                                    <el-button @click="uploadOrgSignature(scope.row)" style="margin-left: 10px" type=""
                                               size="mini">upload
                                    </el-button>
                                    <el-button @click="downloadOrgSignature(scope.row)" type="" size="mini">download
                                    </el-button>
                                    <el-button @click="previewOrgSignature(scope.row)" type="" size="mini">preview
                                    </el-button>
                                </div>

                                <svg-icon slot="reference" class="pointer" icon-class="pdf"/>

                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="Unlink"
                            width="100"
                            align="center">
                        <template slot-scope="scope">
                            <el-tooltip slot="reference" effect="dark" content="unlink"
                                        placement="bottom">
                                <svg-icon class="pointer" icon-class="delete" @click="unlinkHandleClick(scope)"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="100"
                            label="Sign">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="toSignPage(scope.row)">Sign</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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
                title=""
                top="5vh"
                :visible.sync="unLinkDialogVisible"
                width="35%">
            <div>
                <p class="dialogDesc">Are you sure you want to unlink?</p>
                <div style="text-align: center">
                    <svg-icon style="width: 30rem;height: 20rem;margin:0 auto" icon-class="error"></svg-icon>
                </div>

                <div style="padding: 0 6rem;text-align: left;font-size: 1.3rem">
                    <p style="text-align: center">Unlinking will...</p>
                    <ul>
                        <li>Remove the CLA assistant webhook in your repository/organization
                        </li>
                        <li>Remove the link to your list of contributors</li>

                    </ul>
                </div>

                <div class="right">
                    <el-button @click="unLinkDialogVisible = false">Keep it</el-button>
                    <el-button type="danger" @click="unLinkRepositoryFun()">Unlink anyway</el-button>
                </div>

            </div>

        </el-dialog>
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="editDialogVisible"
                width="35%">
            <div>
                <p class="size_b">Edit ooo/Test</p>
                <div class="left">
                    <div>
                        <span class="size_m">Choose a CLA</span>
                    </div>
                    <div>
                        <span>(please note that changing the CLA results in a new request to sign the CLA from the contributors!)</span>
                    </div>
                    <p class="size_m" style="margin-bottom: .2rem">Select from Gist</p>
                    <el-select v-model="claValue"
                               clearable
                               placeholder="select"
                               style="width: 100%"
                               size="medium"
                               @change="changeCla"
                               :value="claValue">
                        <el-option
                                v-for="item in claOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="dialogDec">
                        Email
                    </div>
                    <el-input
                            size="medium"
                            placeholder="Input your email"
                            v-model="email">

                    </el-input>
                    <div class="dialogDec">
                        - or -
                    </div>
                    <div class="dialogDec">
                        Paste a URL from a Gist
                    </div>
                    <div>
                        <el-input
                                size="medium"
                                placeholder="https://gist.github.com/<your cla gist id>"
                                v-model="gistUrl">

                        </el-input>
                    </div>
                    <!--是否分享-->
                    <div class="dialogDec">
                        <el-checkbox v-model="shareGistChecked"/>
                        Share the Gist
                        <span class="qusLink"
                              @click="shareDialogVisible=true">(want to share?)</span>
                    </div>

                    <!--文件修改数-->
                    <div class="dialogDec">
                        Minimum File Number Changes
                    </div>
                    <div>
                        <el-input
                                type="number"
                                size="medium"
                                placeholder="number"
                                v-model="fileNumber">

                        </el-input>
                    </div>
                    <!--行修改数-->
                    <div class="dialogDec">
                        - or -
                    </div>
                    <div class="dialogDec">
                        Minimum Line Number Changes
                    </div>
                    <div>
                        <el-input
                                type="number"
                                size="medium"
                                placeholder="number"
                                v-model="lineNumber">

                        </el-input>
                    </div>

                    <div class="dialogDec">Specify usernames to be whitelisted <span class="qusLink">(how does this work?)</span>
                    </div>
                    <span>(you can also use wildcard *)</span>
                    <div class="dialogDec">
                        <el-input
                                size="medium"
                                placeholder="user1,user2,*[bot]"
                                v-model="gistUrl">

                        </el-input>
                    </div>
                    <div class="dialogDec">
                    <span>Request the user's consent to the use of personal data in accordance with your privacy policy.
                        Please, provide a link to your Privacy Policy here</span>
                    </div>
                    <div class="dialogDec">
                        <el-input
                                size="medium"
                                placeholder="https://..."
                                v-model="gistUrl">

                        </el-input>
                    </div>

                </div>


                <div class="right" style="margin: 1rem 0">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="editDialogVisible = false">Save</el-button>
                </span>
                </div>
            </div>

        </el-dialog>
        <el-dialog
                title="upload"
                top="5vh"
                :visible.sync="uploadOrgDialogVisible"
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
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                <el-button slot="trigger" size="small" type="primary">select file</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                                    upload
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
        <!--<div id="pop">-->
        <!--</div>-->
        <ReLoginDialog ></ReLoginDialog>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import * as url from '../until/api'
    import pdfReader from "@components/PdfReader";
    import pdf from 'vue-pdf'
    import http from '../until/http'
    import ReLoginDialog from '../components/ReLoginDialog'
    import download from 'downloadjs'
    // import PDFJS from '../until/pdf/pdf'
    export default {
        name: "linkedRepo",
        components: {
            pdfReader,
            pdf,
            ReLoginDialog,
        },
        data() {
            return {
                clickRow:0,
                tableData:'',
                orgTableData: '',
                address:this.$store.state.domain,
                url: '',
                signRouter: '/sign',
                pdfSrc: '',
                numPages: undefined,
                docInfo: {},
                uploadHeaders: {
                    'Token': this.$store.state.access_token,
                },
                uploadUrl: '',
                form: {file: ''},
                fileList: [],
                previewOriginalDialogVisible: false,
                uploadOrgDialogVisible: false,

                unlinkId: '',
                platform: this.$store.state.platform,
                editDialogVisible: false,
                unLinkDialogVisible: false,
                tableTotal: 0,
                currentPage: 1,
            }
        },
        created() {
            // this.getCookieData()
            this.getOrgTableData();
            // this.getTableData()
        },
        methods: {
            ...mapActions(['setLoginUserAct', 'setTokenAct', 'getLinkedRepoListAct', 'setTableDataAct']),
            tableRowClassName({row, rowIndex}) {
                if (rowIndex === this.clickRow) {
                    return 'warning-row';
                }
                return '';
            },
            clickOrg(row, column, cell, event){
                this.clickRow=row.value
                this.getLinkedRepoList(row.Organization)
            },
            getLinkedRepoList(org_id){
                this.$axios({
                    url:`/api${url.getLinkedRepoList}/${this.platform}/${org_id}`,
                    params:{repo_id:'',apply_to:''},
                    headers:this.uploadHeaders
                }).then(res=>{
                    let data = res.data.data
                    data.forEach((item,index)=>{
                        new Promise((resolve,reject)=>{
                            let claName = this.getClaName(item.cla_id)
                            resolve(claName)
                        }).then(res=>{
                            Object.assign(data[index],{claName:res})
                            this.tableData=data
                        },err=>{
                        })
                    })
                }).catch(err=>{
                })
            },
            async  getClaName(cla_id){
                let name=''
               await this.$axios({
                    url: `/api${url.getClaInfo}/${cla_id}`,
                    headers: this.uploadHeaders
                }).then(resp => {
                    name= resp.data.data.name

                }).catch(err => {
                })
                return name

            },
            getOrgTableData() {
                let obj = {access_token: this.$store.state.platform_token, admin: true, page: 1, per_page: 10};
                this.$axios({
                    url: url.getOrgsInfo,
                    params: obj,
                }).then(res => {
                    let orgOptions = [];
                    res.data.forEach((item, index) => {
                        orgOptions.push({value: index, Organization: item.login, id: item.id});
                    })
                    this.orgTableData = orgOptions
                    this.getLinkedRepoList(res.data[0].login)
                }).catch(err => {
                })
            },
            toSignPage(row) {
                let url = ''
                if (row.repo_id) {
                    url = `${this.address}${this.signRouter}/${row.platform}/${row.org_id}/${row.repo_id}`
                } else {
                    url = `${this.address}${this.signRouter}/${row.platform}/${row.org_id}`
                }
                window.open(url)
            },
            submitUpload() {
                this.$refs.uploadPdf.submit();
            },
            handleSuccess(file, fileList) {
                console.log(file, fileList);
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.$message.closeAll()
                this.$message.success(file)
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`Currently, 1 file is limited to be selected. ${files.length} files are selected this time, and a total of ${files.length + fileList.length} files are selected`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Are you sure you want to remove ${file.name}？`);
            },
            previewOriginalSignature(row) {

                // this.docInfo = {
                //     type: "pdf",
                //     // href:`/static/pdf/merge.pdf`
                //     href:`/api${url.downloadSignature}/${this.item.id}`
                // }
                // this.previewOriginalDialogVisible = true
                console.log('previewOriginalSignature', row);
            },
            downloadOriginalSignature(row) {
                console.log('downloadOriginalSignature', row);

            },

            /*======================OrgSignature======================================*/
            uploadOrgSignature(row) {
                this.uploadUrl = `/api${url.uploadSignature}/${row.id}`
                console.log('uploadClaFile', row);
                this.uploadOrgDialogVisible = true
            },
            previewOrgSignature(row) {
                console.log('previewOrgSignature', row);
                // this.pdfSrc = `../../static/pdf/merge.pdf`
                // this.pdfSrc = `/api${url.downloadSignature}/${row.id}`
                // this.pdfSrc = pdf.createLoadingTask(`/api${url.downloadSignature}/${row.id}`)
                // console.log(this.pdfSrc);
                // this.pdfSrc = pdf.createLoadingTask({
                //     url: `/api${url.downloadSignature}/${row.id}`,
                //     httpHeaders: {
                //         'Token': this.$store.state.access_token,
                //         // 'x-ipp-device-uuid': 'SOME_UUID',
                //         // 'x-ipp-client': 'SOME_ID',
                //         // 'x-ipp-client-version': 'SOME_VERSION'
                //     }
                // })

                // this.pdfSrc.promise.then(pdf => {
                //     this.numPages = pdf.numPages
                // }).catch(() => {})
                // this.docInfo = {
                //     type: "pdf",
                //     // href:`/static/pdf/merge.pdf`,
                //     href: `/api${url.downloadSignature}/${row.id}`
                // }


                // this.url = `../../static/pdf_source/web/viewer.html?file=${encodeURIComponent(`/api${url.downloadSignature}/${row.id}?token=${this.$store.state.access_token}`)}`
                // this.url = `../../static/pdf_source/web/viewer.html?file=${encodeURIComponent(`/api${url.downloadSignature}/${row.id}`)}`
                // this.url = `../../static/pdf_source/web/viewer.html?file=/api${url.downloadSignature}/${row.id}`
                // this.url = `../../static/pdf_source/web/viewer.html?file=${url.downloadSignature}/${row.id}`
                // this.url = `../../static/pdf_source/web/viewer.html?file=../../static/pdf/merge.pdf`
                // this.previewOriginalDialogVisible = true
                // window.open(`../../static/pdf_source/web/viewer.html?file=../../static/pdf_source/web/compressed.tracemonkey-pldi-09.pdf`)

                this.$axios({
                    url: `/api${url.downloadSignature}/${row.id}`,

                }).then(res => {
                    console.log(res);
                    // this.showPdfFile(res.data.pdf)
                    sessionStorage.setItem('pdf_base64', res.data.data.pdf)
                    window.location.href = `../../static/pdf_source/web/viewer.html`
                    // window.location.href = `../../static/pdf_source/web/viewer.html?file=${this.converData(res.data.pdf)}`
                    // window.location.href = `../../static/pdf_source/web/viewer.html?file=${encodeURIComponent(res.data.pdf)}`
                    // window.location.href = `../../static/pdf_source/web/viewer.html?file=${encodeURIComponent('../../static/pdf/merge.pdf')}`
                    // window.location.href = `../../static/pdf_source/web/viewer.html?file=../../static/pdf/merge.pdf`

                }).catch(err => {
                    console.log(err);
                })
            },
            converData(data) {
                data = data.replace(/[\n\r]/g, '');
                var raw = window.atob(data);
                var rawLength = raw.length;
                var array = new Uint8Array(new ArrayBuffer(rawLength));
                for (var i = 0; i < rawLength; i++) {
                    array[i] = raw.charCodeAt(i)
                }
                return array
            },

            /*将解码后的值传给PDFJS.getDocument(),交给pdf.js处理*/
            showPdfFile(data) {
                PDFJS.GlobalWorkerOptions.workerSrc = '../until/pdf/pdf.worker.js';
                var fileContent = this.converData(data);
                this.previewOriginalDialogVisible = true
                // $('#container').show();
                // $('#pop').empty();
                let pop = document.getElementById('pop');
                pop.innerHTML = '';
                PDFJS.getDocument(fileContent).promise.then(function getPdfHelloWorld(pdf) {
                    pages = pdf.numPages;
                    for (var i = 1; i < pdf.numPages; i++) {
                        var id = 'page-id' + i;
                        pop.append('<canvas id="' + id + '"></canvas>');
                        this.showAll(url, i, id)
                    }
                })
            },

            showAll(url, i, id) {
                PDFJS.getDocument().then(function getPdfHelloWorld(pdf) {
                    pdf.getPage(page).then(function getPageHelloWorld(page) {
                        var scale = 1.0,
                            viewport = page.getViewport(scale),
                            canvas = document.getElementById(id),
                            context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        var renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        }
                        page.render(renderContext)

                    })

                })
            },
            downloadOrgSignature(row) {
                this.$axios({
                    url: `/api${url.downloadSignature}/${row.id}`,
                    method: 'get',
                }).then(res => {
                    let URL = this.dataURLtoBlob(res.data.data.pdf);
                    var reader = new FileReader();
                    reader.readAsDataURL(URL);
                    reader.onload = function (e) {
                        // 兼容IE
                        if (window.navigator.msSaveOrOpenBlob) {
                            var bstr = atob(e.target.result.split(",")[1]);
                            var n = bstr.length;
                            var u8arr = new Uint8Array(n);
                            while (n--) {
                                u8arr[n] = bstr.charCodeAt(n);
                            }
                            var blob = new Blob([u8arr]);
                            window.navigator.msSaveOrOpenBlob(blob, 'Signature.pdf');
                        } else {
                            // 转换完成，创建一个a标签用于下载
                            const a = document.createElement('a');
                            a.download = 'Signature.pdf'; // 这里写你的文件名
                            a.href = e.target.result;
                            document.body.appendChild(a)
                            a.click();
                            document.body.removeChild(a)
                        }
                    }
                }).catch(err => {
                })
            },
            //base64 转换 blob
            dataURLtoBlob(dataurl) {
                var bstr = atob(dataurl)
                var n = bstr.length;
                var u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: 'pdf'});
            },


            getTableData() {
                let interval = setInterval(() => {
                    if (this.$store.state.tableData) {
                        let tableData = this.$store.state.tableData
                        for (let i = 0; i < tableData.length; i++) {
                            for (let j = i + 1; j < tableData.length; j++) {
                                if (tableData[i].repository === tableData[j].repository) {
                                    if (!tableData[i].children) {
                                        Object.assign(tableData[i], {children: []})
                                    }
                                    tableData[i].children.push(tableData[j])
                                    tableData.splice(j, 1)
                                    j--;
                                }
                            }
                        }
                        tableData.forEach(item => {
                            if (item.children) {
                                item.children.forEach((it, index) => {
                                    for (let i = index + 1; i < item.children.length; i++)
                                        if (it.apply_to === item.children[i].apply_to) {
                                            if (!it.children) {
                                                Object.assign(it, {children: []})
                                            }
                                            it.children.push(item.children[i])
                                            item.children.splice(i, 1)
                                            i--
                                        }
                                })
                            }
                        })
                        this.setTableDataAct(tableData)
                        clearInterval(interval)
                    }
                }, 100)

            },
            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split('; ')
                    let access_token, refresh_token = '';
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        arr[0] === 'access_token' ? access_token = arr[1] : arr[0] === 'refresh_token' ? refresh_token = arr[1] : refresh_token = '';
                        ;
                    })
                    let data = {access_token, refresh_token};
                    this.setTokenAct(data);
                    this.getUserInfo(access_token, refresh_token)

                }

            },
            /*获取用户名并显示*/
            getUserInfo(access_token, refresh_token) {
                let obj = {access_token: access_token};
                this.$axios({
                    url: url.getUserInfo,
                    params: obj,
                }).then(res => {
                    let data = {
                        userId: res.data.id,
                        userName: res.data.login,
                        userImg: res.data.avatar_url,
                        userEmail: res.data.email
                    }
                    this.setLoginUserAct(data);
                    let obj = {
                        access_token: access_token,
                        refresh_token: refresh_token,
                        userName: res.data.login,
                        platform: this.$store.state.platform
                    }
                    this.getLinkedRepoListAct(obj);

                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            editHandleClick(index) {
                this.editDialogVisible = true
            },

            unlinkHandleClick(scope) {
                this.unlinkId = scope.row.id;
                this.unLinkDialogVisible = true
            },
            checkCorporationList(item) {
                this.$router.push({path: '/corporationList', query: {item: item}})
            },
            /*查看CLA签署状态*/
            checkCla() {
                this.$router.push('/signCla')
            },
            newWindow(repo) {
                window.open(`https://gitee.com/${repo}`)
            },
            unLinkRepositoryFun() {
                this.$axios({
                    url: `/api${url.unLinkRepository}/${this.unlinkId}`,
                    method: 'delete',
                    headers: {
                        'Token': this.$store.state.access_token,
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }

                }).then(res => {
                    this.$message.success('success')
                    this.unLinkDialogVisible = false
                    let data = {
                        access_token: this.$store.state.access_token,
                        refresh_token: this.$store.state.refresh_token,
                        userName: this.$store.state.user.userName,
                        platform: this.$store.state.platform
                    }
                    this.getLinkedRepoListAct(data)
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            },
            changePage(page) {
            },
        },

    }
</script>

<style lang="less">
    .el-table .warning-row {
        background: #8CC5FF;
    }
    .el-popover {
        min-width: 7rem;
    }

    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem 0;
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

    .qusLink {
        text-decoration: underline;
        font-size: .8rem;
        cursor: pointer;
    }

    .dialogDec {
        font-size: 1rem;
        padding: .5rem 0;
    }

    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }

    .size_b {
        font-size: 1.3rem;
    }

    .size_m {
        font-size: 1rem;
        text-align: left;
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

    .pointer {
        cursor: pointer;
    }

    .dialogDesc {

        font-size: 1.2rem;
        margin: 2rem 0;
        text-align: center;
    }

    li {
        margin: 1rem 0;
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

    .linkBt {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #0594C6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;


        &:hover {
            background-color: #046F94;
        }
    }

    #configBtDiv {
        text-align: left;
        padding-top: 3rem;

        & > .configBt {
            font-size: 1.2rem;
        }
    }

    #home {
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #F5F5F5;

        & > .header {
            position: fixed;
            top: 0;
            left: 0;
            background-color: white;
            height: 4rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            z-index: 1;
            width: 100%;

            & > div:nth-of-type(1) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: left;
                padding-left: 3rem;
            }

            & > div:nth-of-type(2) {
                display: flex;
                justify-content: center;

                & > div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    #svg_logo {
                        height: 4rem;
                        width: 4rem;
                    }
                }

            }

            & > div:nth-of-type(3) {
                display: flex;
                flex-direction: column;
                justify-content: center;
                text-align: right;
                padding-right: 3rem;
            }
        }

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F5F5F5;
            text-align: left;


            & > div:nth-of-type(3) {
                padding: 4rem 0 2rem 0;
                font-size: 1.3rem;
                color: #2C3E50;
            }

        }

        & > .footer {
            height: 4rem;
            display: flex;
            justify-content: space-between;
            background-color: white;

            & > .left {
                text-align: left;
                padding-left: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & > .center {
                text-align: center;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & > .right {
                text-align: right;
                padding-right: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;

                span:nth-of-type(1) {
                    margin-right: 1rem;
                }

                #github_logo {
                    width: 1.1rem;
                    height: 1.1rem;
                }
            }
        }
    }
</style>