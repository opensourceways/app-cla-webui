<template>
    <div id="linkedRepo">
        <div id="configBtDiv">
            <el-button class="configBt" type="primary"
                       @click="configCla()">
                Configure CLA
            </el-button>
        </div>
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
            <el-tab-pane label="Linked Repositories" name="first" style="margin-top: 1rem">

            </el-tab-pane>
        </el-tabs>
        <el-row :gutter="20" v-loading.lock="loading" class="table-back"
                element-loading-text="Loading"
                element-loading-background="rgba(255, 255, 255, 1)">
            <el-col :span="3" class="orgTableStyle tableStyle">
                <el-table
                        empty-text="No data"
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
                        empty-text="No data"
                        :data="boundTableData"
                        style="width: 100%;">
                    <el-table-column
                            prop="repo_id"
                            label="Repository">
                        <template slot-scope="scope">
                            <svg-icon icon-class="repository"/>
                            <span class="pointer hoverUnderline"
                                  @click="checkCorporationList(scope.row)"
                                  style="margin-left: 10px;">{{scope.row.org_id}}<span v-if="scope.row.repo_id">/{{scope.row.repo_id}}</span></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="org_email"
                            label="Email">
                    </el-table-column>
                    <el-table-column
                            label="Unlink"
                            width="100">
                        <template slot-scope="scope">
                            <el-tooltip slot="reference" effect="dark" content="unlink"
                                        placement="bottom">
                                <svg-icon class="pointer" icon-class="delete" @click="unlinkHandleClick(scope)"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                            width="200"
                            label="Operation">
                        <template slot-scope="scope">
                            <el-dropdown placement="bottom-start" trigger="hover" @command="menuCommand">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{command:'a',row:scope.row}">Sign</el-dropdown-item>
                                    <el-dropdown-item :command="{command:'b',row:scope.row}">Copy address
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="{command:'c',row:scope.row}">Detail</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                        <!--<template slot-scope="scope">-->
                        <!--<el-button size="mini" @click="toSignPage(scope.row)">Sign</el-button>-->
                        <!--<el-button size="mini" @click="copyAddress(scope.row)">copy address</el-button>-->

                        <!--</template>-->
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

        <ReLoginDialog></ReLoginDialog>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import * as url from '../until/api'
    import * as until from '../until/until'
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
        inject: ['setClientHeight'],
        computed: {
            address() {
                return this.$store.state.domain
            },

        },
        data() {
            return {
                copyAddressValue: '',
                loading: true,
                organization: '',
                boundTableData: '',
                signAddress: '',
                activeName: 'first',
                clickRow: 0,
                tableData: [],
                orgTableData: [],

                url: '',
                signRouter: this.$store.state.signRouter,
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
                unLinkDialogVisible: false,
                tableTotal: 0,
                currentPage: 1,
            }
        },
        created() {
            this.setDomain();
            this.clearConfigSession();
            new Promise((resolve, reject) => {
                this.getCookieData(resolve)
            }).then(res => {
                this.getLinkedRepoList();
            })

        },
        updated() {
            this.setClientHeight();
        },
        methods: {
            ...mapActions(['setLoginUserAct', 'setTokenAct', 'setTableDataAct']),
            menuCommand(command) {
                switch (command.command) {
                    case 'a':
                        this.toSignPage(command.row);
                        break;
                    case 'b':
                        this.copyAddress(command.row);
                        break;
                    case 'c':
                        this.checkCorporationList(command.row);
                        break;
                }
            },
            clearConfigSession() {
                this.$store.commit('setOrgOption', []);
                this.$store.commit('setOrgValue', '');
                this.$store.commit('setOrgChoose', '');
                this.$store.commit('setRepositoryOptions', []);
                this.$store.commit('setRepositoryChoose', '');
                this.$store.commit('setRepositoryValue', '');
                this.$store.commit('setOrgAlias', '');
                this.$store.commit('setIndividualLanguage', '');
                this.$store.commit('setCorpLanguage', '');
                this.$store.commit('setClaLinkIndividual', '');
                this.$store.commit('setClaLinkCorp', '');
                this.$store.commit('setCorpFDName', '');
                this.$store.commit('setCorpFD', '');
                this.$store.commit('setIndividualMetadata', this.individualMetadataArr);
                this.$store.commit('setCorpMetadata', this.corporationMetadataArr);
                this.$store.commit('setIndividualCustomMetadataArr', this.initIndividualCustomMetadata);
                this.$store.commit('setCorporationCustomMetadataArr', this.initCorpCustomMetadata);
                this.$store.commit('setEmail', '');
                this.$store.commit('setIsEmail', false);
                this.$store.commit('setChooseRepo', '');
                this.$store.commit('setChooseOrg', '');
                sessionStorage.removeItem('orgOptions');
                sessionStorage.removeItem('orgValue');
                sessionStorage.removeItem('orgChoose');
                sessionStorage.removeItem('orgAlias');
                sessionStorage.removeItem('repositoryOptions');
                sessionStorage.removeItem('repositoryChoose');
                sessionStorage.removeItem('repositoryValue');
                sessionStorage.removeItem('individualLanguage');
                sessionStorage.removeItem('corpLanguage');
                sessionStorage.removeItem('claLinkIndividual');
                sessionStorage.removeItem('claLinkCorp');
                sessionStorage.removeItem('corpFDName');
                sessionStorage.removeItem('corpFD');
                sessionStorage.removeItem('individualMetadata');
                sessionStorage.removeItem('corporationMetadata');
                sessionStorage.removeItem('individualCustomMetadataArr');
                sessionStorage.removeItem('corporationCustomMetadataArr');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('chooseOrg');
                sessionStorage.removeItem('chooseRepo');
            },
            configCla() {
                this.$router.push('/bind-cla')
            },
            tabsHandleClick(tab, event) {
                tab.index === '0' ? this.$router.push('/linkedRepo') : this.$router.push('/signedRepoLogin')
            },
            tableRowClassName({row, rowIndex}) {
                if (row.Organization === this.organization) {
                    return 'warning-row';
                }
                return '';
            },
            getBoundTableData() {
                let newData = [];
                this.tableData.forEach((item, index) => {
                    if (item.org_id === this.organization) {
                        newData.push(item);
                    }
                });
                this.boundTableData = newData;
                this.loading = false
            },
            clickOrg(row, column, cell, event) {
                this.organization = row.Organization
                this.getBoundTableData()
            },
            getLinkedRepoList() {
                http({
                    url: url.getLinkedRepoList,
                }).then(res => {
                    if (res.data.data && res.data.data.length) {
                        let data = res.data.data;
                        let count = res.data.data.length;
                        data.forEach((item, index) => {
                            new Promise((resolve, reject) => {
                                let claName = this.getClaName(item.id);
                                resolve(claName)
                            }).then(res => {
                                Object.assign(data[index], {claName: res});
                                count--
                            }, err => {
                            })
                        });
                        let setDataInterval = setInterval(() => {
                            if (count === 0) {
                                this.tableData = data;
                                this.getOrgTableData(data);
                                clearInterval(setDataInterval)
                            }
                        }, 20)
                    } else {
                        this.tableData = res.data.data;
                        this.loading = false;
                    }
                }).catch(err => {
                })
            },
            async getClaName(org_cla_id) {
                if (org_cla_id) {
                    let name = '';
                    await http({
                        url: `${url.getClaInfo}/${org_cla_id}/cla`,
                    }).then(resp => {
                        name = resp.data.data.name
                    }).catch(err => {
                    });
                    return name
                } else {
                    this.loading = false;
                }


            },
            getOrgTableData(data) {
                let orgData = [];
                data.forEach((item, index) => {
                    orgData.push({Organization: item.org_id})
                });

                for (let i = 0; i < orgData.length; i++) {
                    for (let j = i + 1; j < orgData.length; j++) {
                        if (orgData[i].Organization === orgData[j].Organization) {
                            orgData.splice(j, 1);
                            j--
                        }
                    }
                }
                this.orgTableData = orgData;
                this.orgTableData.length > 0 ? this.organization = this.orgTableData[0].Organization : this.organization = [];
                this.getBoundTableData()
            },
            copyAddress(row) {
                let params = ''
                if (row.repo_id) {
                    params = `${row.platform}/${row.org_id}/${row.repo_id}`
                } else {
                    params = `${row.platform}/${row.org_id}`
                }
                let base64Params = until.strToBase64(params)
                let url = `${this.address}${this.signRouter}/${base64Params}`
                let copyInput = document.createElement("input");
                copyInput.value = url;
                document.body.appendChild(copyInput);
                copyInput.select();
                document.execCommand("Copy");
                copyInput.className = "copyInput";
                copyInput.style.display = "none";
                document.body.removeChild(document.getElementsByClassName('copyInput')[0])
            },
            toSignPage(row) {
                let params = ''
                if (row.repo_id) {
                    params = `${row.platform}/${row.org_id}/${row.repo_id}`
                } else {
                    params = `${row.platform}/${row.org_id}`
                }
                let base64Params = until.strToBase64(params)
                let url = `${this.address}${this.signRouter}/${base64Params}`
                window.open(url)
            },
            submitUpload() {
                this.$refs.uploadPdf.submit();
            },
            handleSuccess(file, fileList) {
                this.fileList = []
                this.$message.closeAll()
                this.$message.success('success')
                this.uploadOrgDialogVisible = false
            },
            handleRemove(file, fileList) {
                this.$message.closeAll()
                this.$message.success(file)
            },
            handlePreview(file) {
            },
            handleExceed(files, fileList) {
                this.$message.warning(`Currently, 1 file is limited to be selected. ${files.length} files are selected this time, and a total of ${files.length + fileList.length} files are selected`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Are you sure you want to remove ${file.name}？`);
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
            showPdfFile(data) {
                PDFJS.GlobalWorkerOptions.workerSrc = '../until/pdf/pdf.worker.js';
                var fileContent = this.converData(data);
                this.previewOriginalDialogVisible = true;
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
            dataURLtoBlob(dataurl) {
                var bstr = atob(dataurl)
                var n = bstr.length;
                var u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {type: 'pdf'});
            },
            getCookieData(resolve) {
                if (document.cookie) {
                    let cookieArr = document.cookie.split(';')
                    let access_token, refresh_token, platform_token = '';
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        let name = arr[0].trim();
                        let value = arr[1].trim();
                        if (name === 'refresh_token') {
                            refresh_token = value;
                        } else if (name === 'platform_token') {
                            platform_token = value;
                        } else if (name === 'access_token') {
                            access_token = value;
                        }
                        this.$cookie.remove(name, {path: '/'});
                    });
                    let data = {access_token, refresh_token, platform_token, resolve};
                    this.setTokenAct(data);

                } else {
                    resolve('complete');
                }
            },
            unlinkHandleClick(scope) {
                this.unlinkId = scope.row.link_id;
                this.unLinkDialogVisible = true
            },
            checkCorporationList(item) {
                this.$store.commit('setCorpItem', {});
                sessionStorage.removeItem('corpItem');
                this.$store.commit('setCorpItem', item);
                this.$router.push('/corporationList')
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
                    this.$message.success('success');
                    this.unLinkDialogVisible = false;
                    this.getLinkedRepoList()
                }).catch(err => {
                    this.$message.closeAll();
                    this.$message.error(err.response.data)
                })
            },
            changePage(page) {
            },
            setDomain() {
                let domain = window.location.href.split('/linkedRepo')[0]
                if (domain === window.location.href) {
                    domain = window.location.href.split('/home')[0]
                }
                this.$store.commit('setDomain', domain)
            },
        },

    }
</script>

<style lang="less">
    .el-popover {
        min-width: 6rem;

        .pdfBT {
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

    #linkedRepo {
        .el-table .warning-row {
            background: #8CC5FF;
        }

        .table-back {
            background-color: white;
            margin-bottom: 2rem;
        }

        .tableStyle {
            padding: 3rem 0;
            background-color: white;
        }

        .orgTableStyle {
            cursor: pointer;
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

        #configBtDiv {
            text-align: left;
            padding-top: 3rem;
            margin-bottom: 2rem;

            & > .configBt {
                font-size: 1.2rem;
            }
        }
    }


</style>
