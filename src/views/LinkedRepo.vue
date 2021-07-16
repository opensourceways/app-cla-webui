<template>
    <div id="linkedRepo">
        <div id="configBtDiv">
            <button class="button"
                    @click="configCla()">
                {{this.$t('org.configure_bt')}}
            </button>
        </div>
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
            <el-tab-pane :label="$t('org.linked_tab')" name="first" class="margin-top-1rem">
            </el-tab-pane>
        </el-tabs>
        <el-row :gutter="20" class="table-back">
            <el-col :span="3" class="orgTableStyle tableStyle">
                <el-table
                        empty-text="No data"
                        :data="orgTableData"
                        align="center"
                        class="tableClass"
                        @cell-click="clickOrg"
                        :row-class-name="tableRowClassName"
                        style="width: 100%;">
                    <el-table-column
                            prop="Organization"
                            :label="$t('org.organization')">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="21" class="tableStyle">
                <el-table
                        empty-text="No data"
                        :data="boundTableData"
                        class="tableClass"
                        style="width: 100%;">
                    <el-table-column
                            min-width="40"
                            prop="repo_id"
                            :label="$t('org.repository')">
                        <template slot-scope="scope">
                            <svg-icon icon-class="repository"/>
                            <span class="pointer hoverUnderline"
                                  @click="checkCorporationList(scope.row)"
                                  style="margin-left: 10px;">{{scope.row.org_id}}<span v-if="scope.row.repo_id">/{{scope.row.repo_id}}</span></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            min-width="30"
                            prop="org_email"
                            :label="$t('corp.email')">
                    </el-table-column>
                    <el-table-column
                            min-width="10"
                            :label="$t('org.unlink')"
                            width="100">
                        <template slot-scope="scope">
                            <el-tooltip slot="reference" effect="dark" :content="$t('org.unlink')"
                                        placement="bottom">
                                <svg-icon class="pointer" icon-class="delete" @click="unlinkHandleClick(scope)"/>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                            min-width="20"
                            :label="$t('org.operation')">
                        <template slot-scope="scope">
                            <el-dropdown placement="bottom-start" trigger="hover" @command="menuCommand">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item :command="{command:'a',row:scope.row}">
                                        {{$t('org.toSign')}}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="{command:'b',row:scope.row}">
                                        {{$t('org.copy_address')}}
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="{command:'c',row:scope.row}">
                                        {{$t('org.toDetail')}}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
                <p class="dialogDesc">{{this.$t('org.unlink_p')}}</p>
                <div style="padding: 0 6rem;text-align: left;font-size: 1.3rem">
                    <p style="text-align: center">{{this.$t('org.unlink_will')}}</p>
                    <ul>
                        <li>{{this.$t('org.unlink_desc1')}}</li>
                        <li>{{this.$t('org.unlink_desc2')}}</li>
                    </ul>
                </div>
                <div class="right">
                    <el-button @click="unLinkDialogVisible = false">{{this.$t('corp.cancel')}}</el-button>
                    <el-button type="danger" @click="unLinkRepositoryFun()">{{this.$t('org.unlink')}}</el-button>
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
                                    :on-remove="handleRemove"
                                    :on-success="handleSuccess"
                                    :before-remove="beforeRemove"
                                    :auto-upload="false"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                <el-button slot="trigger" size="small" type="primary">{{this.$t('org.select_file')}}
                                </el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                                    {{this.$t('org.upload')}}
                                </el-button>

                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

        </el-dialog>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
        <ReTryDialog :dialogVisible="reTryVisible" :message="reLoginMsg"></ReTryDialog>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import * as url from '../util/api';
    import * as util from '../util/util';
    import http from '../util/http';
    import ReLoginDialog from '../components/ReLoginDialog';
    import ReTryDialog from '../components/ReTryDialog';

    export default {
        name: 'linkedRepo',
        components: {
            ReLoginDialog,
            ReTryDialog
        },
        inject: ['setClientHeight'],
        computed: {
            platform() {
                return this.$store.state.platform.toLowerCase();
            },
            reLoginDialogVisible() {
                return this.$store.state.orgReLoginDialogVisible;
            },
            reTryVisible() {
                return this.$store.state.reTryDialogVisible;
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage;
            },
            address() {
                return this.$store.state.domain;
            }
        },
        data() {
            return {
                copyAddressValue: '',
                organization: '',
                signAddress: '',
                activeName: 'first',
                clickRow: 0,
                tableData: [],
                orgTableData: [],
                boundTableData: [],
                url: '',
                signRouter: this.$store.state.signRouter,
                pdfSrc: '',
                numPages: undefined,
                docInfo: {},
                uploadHeaders: {
                    'Token': this.$store.state.access_token
                },
                uploadUrl: '',
                form: {file: ''},
                fileList: [],
                previewOriginalDialogVisible: false,
                uploadOrgDialogVisible: false,
                unlinkId: '',
                unLinkDialogVisible: false,
                tableTotal: 0,
                currentPage: 1
            };
        },
        created() {
            this.setDomain();
            this.clearConfigSession();
            this.getLinkedRepoList();
        },
        updated() {
            this.setClientHeight();
        },
        methods: {
            ...mapActions(['setTokenAct']),
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
                util.clearSession(this);
                this.$store.commit('setCorpItem', '');
                sessionStorage.removeItem('corpItem');
            },
            configCla() {
                this.$router.push('/bind-cla');
            },
            tabsHandleClick(tab, event) {
                tab.index === '0' ? this.$router.push('/linkedRepo') : this.$router.push('/signedRepoLogin');
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
            },
            clickOrg(row, column, cell, event) {
                this.organization = row.Organization;
                this.getBoundTableData();
            },
            getLinkedRepoList() {
                http({
                    url: url.getLinkedRepoList
                }).then(res => {
                    if (res.data.data && res.data.data.length) {
                        let data = res.data.data;
                        let count = res.data.data.length;
                        data.forEach((item, index) => {
                            new Promise((resolve, reject) => {
                                let claName = this.getClaName(item.id);
                                resolve(claName);
                            }).then(res => {
                                Object.assign(data[index], {claName: res});
                                count--;
                            }, err => {
                            });
                        });
                        let setDataInterval = setInterval(() => {
                            if (count === 0) {
                                this.tableData = data;
                                this.getOrgTableData(data);
                                clearInterval(setDataInterval);
                            }
                        }, 20);
                    } else {
                        this.tableData = [];
                        this.boundTableData = [];
                        this.orgTableData = [];
                    }
                }).catch(err => {
                    util.catchErr(err, 'setOrgReLogin', this);
                });
            },
            async getClaName(org_cla_id) {
                if (org_cla_id) {
                    let name = '';
                    await http({
                        url: `${url.getClaInfo}/${org_cla_id}/cla`
                    }).then(res => {
                        if (res.data && res.data.data && res.data.data.name) {
                            name = res.data.data.name;
                        }
                    }).catch(err => {
                        util.catchErr(err, 'setOrgReLogin', this);
                    });
                    return name;
                }
            },
            getOrgTableData(data) {
                let orgData = [];
                data.forEach((item, index) => {
                    orgData.push({Organization: item.org_id});
                });

                for (let i = 0; i < orgData.length; i++) {
                    for (let j = i + 1; j < orgData.length; j++) {
                        if (orgData[i].Organization === orgData[j].Organization) {
                            orgData.splice(j, 1);
                            j--;
                        }
                    }
                }
                this.orgTableData = orgData;
                this.orgTableData.length > 0 ? this.organization = this.orgTableData[0].Organization : this.organization = [];
                this.getBoundTableData();
            },
            copyAddress(row) {
                let params = '';
                if (row.repo_id) {
                    params = `${row.platform.toLowerCase()}/${row.org_id}/${row.repo_id}`;
                } else {
                    params = `${row.platform.toLowerCase()}/${row.org_id}`;
                }
                let base64Params = util.strToBase64(params);
                let address = window.location.href.split('/linkedRepo')[0];
                let url = `${address}${this.signRouter}/${base64Params}`;
                let copyInput = document.createElement('input');
                copyInput.value = url;
                document.body.appendChild(copyInput);
                copyInput.select();
                document.execCommand('Copy');
                copyInput.className = 'copyInput';
                copyInput.style.display = 'none';
                document.body.removeChild(document.getElementsByClassName('copyInput')[0]);
            },
            toSignPage(row) {
                let params = '';
                if (row.repo_id) {
                    params = `${row.platform.toLowerCase()}/${row.org_id}/${row.repo_id}`;
                } else {
                    params = `${row.platform.toLowerCase()}/${row.org_id}`;
                }
                let base64Params = util.strToBase64(params);
                let url = `${this.address}${this.signRouter}/${base64Params}`;
                window.open(url);
            },
            submitUpload() {
                this.$refs.uploadPdf.submit();
            },
            handleSuccess(file, fileList) {
                this.fileList = [];
                util.successMessage(this);
                this.uploadOrgDialogVisible = false;
            },
            handleRemove(file, fileList) {
                this.$message.closeAll();
                this.$message.success(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`Currently, 1 file is limited to be selected. ${files.length} files are selected this time, and a total of ${files.length + fileList.length} files are selected`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`Are you sure you want to remove ${file.name}？`);
            },
            unlinkHandleClick(scope) {
                this.unlinkId = scope.row.link_id;
                this.unLinkDialogVisible = true;
            },
            checkCorporationList(item) {
                this.$store.commit('setCorpItem', {});
                sessionStorage.removeItem('corpItem');
                this.$store.commit('setCorpItem', item);
                this.$router.push('/corporationList');
            },
            unLinkRepositoryFun() {
                http({
                    url: `${url.unLinkRepository}/${this.unlinkId}`,
                    method: 'delete'
                }).then(res => {
                    util.successMessage(this);
                    this.unLinkDialogVisible = false;
                    this.getLinkedRepoList();
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token')
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token')
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token')
                                });
                                break;
                            case 'cla.system_error':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.system_error')
                                });
                                break;
                            default :
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_error')
                                });
                                break;
                        }
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.system_error')
                        });
                    }
                });
            },
            changePage(page) {
            },
            setDomain() {
                let domain = window.location.href.split('/linkedRepo')[0];
                if (domain === window.location.href) {
                    domain = window.location.href.split('/home')[0];
                }
                this.$store.commit('setDomain', domain);
            }
        }
    };
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    @import "../assets/font/css/Roboto-Black.css";
    @import "../assets/font/css/Roboto-Light.css";
    @import "../assets/font/css/Roboto-Regular.css";

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

    .tableClass {
        border: 1px solid black;
        border-radius: 1.5rem;
    }

    .el-table__body, .el-table__footer, .el-table__header {
        padding: 0;
        width: auto;
    }

    .el-table__body-wrapper {
        margin: 0 1rem;
    }

    .el-table__body tr:not(:last-of-type) td {
        border-bottom: 1px dashed lightgrey;
    }

    .el-table::before {
        height: 0;
    }


    .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
        padding: 0;
        width: auto;
    }

    .el-table__footer-wrapper, .el-table__header-wrapper {
        border-bottom: 1px solid black;
        border-radius: 1.5rem;
        padding: 0 1rem;
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
        font-size: 1rem;
    }

    #linkedRepo {
        .margin-top-1rem {
            margin-top: 1rem;
        }

        .button {
            font-family: Roboto-Regular, sans-serif;
            width: 15rem;
            height: 4rem;
            border-radius: 2rem;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin: 1.2rem 0;
        }

        .button:focus {
            outline: none;
        }

        .el-table .warning-row {
            color: #319E55;
            font-weight: bold;
        }

        .table-back {
            background-color: white;
            margin-bottom: 2rem;
        }

        .tableStyle {
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

        .orgTableStyle {
            cursor: pointer;
        }

        .paginationClass {
            text-align: center;
            margin-bottom: 1rem;
        }

        .el-dropdown-link {
            cursor: pointer;
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

        }
    }

</style>
