<template>
    <div id="corporationList">
        <el-tabs v-model="activeName" type="border-card" @tab-click="tabsHandleClick">
            <el-tab-pane :label="$t('org.signed_corporation')" name="first" class="margin-top-1rem">
                <el-tabs v-model="corpActiveName" @tab-click="corpTabsHandleClick">
                    <el-tab-pane :label="$t('org.not_complete')" name="first" class="margin-top-1rem">
                        <div class="tableStyle">
                            <el-table
                                    :empty-text="$t('corp.no_data')"
                                    :data="signedNotCompleted"
                                    align="center"
                                    :row-class-name="createdAdmin"
                                    class="tableClass"
                                    style="width: 100%;">
                                <el-table-column
                                        min-width="20"
                                        prop="corporation_name"
                                        :label="$t('org.corporation_name')">
                                </el-table-column>
                                <el-table-column
                                        min-width="15"
                                        prop="admin_name"
                                        :label="$t('org.config_cla_field_corp_default_title1')">
                                </el-table-column>
                                <el-table-column
                                        min-width="25"
                                        prop="admin_email"
                                        :label="$t('org.to_email')">
                                </el-table-column>
                                <el-table-column
                                        min-width="10"
                                        prop="cla_language"
                                        :label="$t('org.cla_language')">
                                </el-table-column>
                                <el-table-column
                                        min-width="10"
                                        prop="date"
                                        :label="$t('org.date')">
                                </el-table-column>
                                <el-table-column
                                        min-width="10">
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
                                                <el-button @click="uploadClaFile(scope.row)" size="mini">
                                                    {{$t('org.upload')}}
                                                </el-button>
                                                <el-button v-if="scope.row.pdf_uploaded"
                                                           @click="downloadClaFile(scope.row)"
                                                           size="mini">{{$t('org.download')}}
                                                </el-button>
                                                <el-button v-if="scope.row.pdf_uploaded"
                                                           @click="previewClaFile(scope.row)"
                                                           type="" size="mini">{{$t('org.preview')}}
                                                </el-button>
                                            </div>
                                            <svg-icon slot="reference" class="pointer" icon-class="pdf" @click=""/>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        min-width="10"
                                        :label="$t('org.operation')">
                                    <template slot-scope="scope">
                                        <el-dropdown placement="bottom-start" trigger="hover" @command="menuCommand">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item :disabled="scope.row.admin_added"
                                                                  :command="{command:'a',row:scope.row}">
                                                    {{$t('org.create_administrator')}}
                                                </el-dropdown-item>
                                                <el-dropdown-item :disabled="scope.row.pdf_uploaded"
                                                                  :command="{command:'b',row:scope.row}">
                                                    {{$t('org.resend_email')}}
                                                </el-dropdown-item>
                                                <el-dropdown-item :disabled="scope.row.admin_added"
                                                                  :command="{command:'c',row:scope.row}">
                                                    {{$t('corp.delete')}}
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('org.complete')" name="second" class="margin-top-1rem">
                        <div class="tableStyle">
                            <el-table
                                    :empty-text="$t('corp.no_data')"
                                    :data="signedCompleted"
                                    class="tableClass"
                                    :row-class-name="createdAdmin"
                                    align="center"
                                    style="width: 100%;">
                                <el-table-column
                                        min-width="20"
                                        prop="corporation_name"
                                        :label="$t('org.corporation_name')">
                                </el-table-column>
                                <el-table-column
                                        min-width="15"
                                        prop="admin_name"
                                        :label="$t('org.config_cla_field_corp_default_title1')">
                                </el-table-column>
                                <el-table-column
                                        min-width="25"
                                        prop="admin_email"
                                        :label="$t('org.to_email')">
                                </el-table-column>
                                <el-table-column
                                        min-width="10"
                                        prop="cla_language"
                                        :label="$t('org.cla_language')">
                                </el-table-column>
                                <el-table-column
                                        min-width="10"
                                        prop="date"
                                        :label="$t('org.date')">
                                </el-table-column>
                                <el-table-column
                                        min-width="10">
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
                                                <el-button @click="uploadClaFile(scope.row)" size="mini">
                                                    {{$t('org.upload')}}
                                                </el-button>
                                                <el-button v-if="scope.row.pdf_uploaded"
                                                           @click="downloadClaFile(scope.row)"
                                                           size="mini">{{$t('org.download')}}
                                                </el-button>
                                                <el-button v-if="scope.row.pdf_uploaded"
                                                           @click="previewClaFile(scope.row)"
                                                           type="" size="mini">{{$t('org.preview')}}
                                                </el-button>
                                            </div>
                                            <svg-icon slot="reference" class="pointer" icon-class="pdf" @click=""/>
                                        </el-popover>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        min-width="10"
                                        :label="$t('org.operation')">
                                    <template slot-scope="scope">
                                        <el-dropdown placement="bottom-start" trigger="hover" @command="menuCommand">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item :disabled="scope.row.admin_added"
                                                                  :command="{command:'a',row:scope.row}">
                                                    {{$t('org.create_administrator')}}
                                                </el-dropdown-item>
                                                <el-dropdown-item :disabled="scope.row.pdf_uploaded"
                                                                  :command="{command:'b',row:scope.row}">
                                                    {{$t('org.resend_email')}}
                                                </el-dropdown-item>
                                                <el-dropdown-item :disabled="scope.row.admin_added"
                                                                  :command="{command:'c',row:scope.row}">
                                                    {{$t('corp.delete')}}
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('org.invalidSignature')" name="third" class="margin-top-1rem">
                        <div class="tableStyle">
                            <el-table
                                    :empty-text="$t('corp.no_data')"
                                    :data="deletedCorpInfo"
                                    align="center"
                                    class="tableClass"
                                    style="width: 100%;">
                                <el-table-column
                                        min-width="25"
                                        prop="corporation_name"
                                        :label="$t('org.corporation_name')">
                                </el-table-column>
                                <el-table-column
                                        min-width="15"
                                        prop="admin_name"
                                        :label="$t('org.config_cla_field_corp_default_title1')">
                                </el-table-column>
                                <el-table-column
                                        min-width="25"
                                        prop="admin_email"
                                        :label="$t('org.to_email')">
                                </el-table-column>
                                <el-table-column
                                        min-width="15"
                                        prop="cla_language"
                                        :label="$t('org.cla_language')">
                                </el-table-column>
                                <el-table-column
                                        min-width="10"
                                        prop="date"
                                        :label="$t('org.date')">
                                </el-table-column>
                                <el-table-column
                                        min-width="10"
                                        :label="$t('org.operation')">
                                    <template slot-scope="scope">
                                        <el-dropdown placement="bottom-start" trigger="hover" @command="menuCommand">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                            <el-dropdown-menu slot="dropdown">
                                                <el-dropdown-item disabled="" :command="{command:'d',row:scope.row}">
                                                    {{$t('org.reduction')}}
                                                </el-dropdown-item>
                                                <el-dropdown-item disabled="" :command="{command:'e',row:scope.row}">
                                                    {{$t('org.deleteCompletely')}}
                                                </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
            <el-tab-pane :label="$t('org.individual_cla')" name="second" class="margin-top-1rem">
                <div class="tableStyle">
                    <el-table
                            v-if="individualClaData.length"
                            :empty-text="$t('corp.no_data')"
                            :data="individualClaData"
                            class="tableClass"
                            align="center"
                            style="width: 100%;">
                        <el-table-column
                                min-width="60"
                                prop="url"
                                label="Url">
                            <template slot-scope="scope">
                                <span class="hoverUnderline" @click="checkUrl(scope.row.url)">{{scope.row.url}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                min-width="20"
                                prop="language"
                                :label="$t('org.toLanguage')">
                        </el-table-column>
                        <el-table-column
                                min-width="20"
                                prop=""
                                :label="$t('org.operation')">
                            <template slot-scope="scope">
                                <el-dropdown placement="bottom-start" trigger="hover">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <!--<el-dropdown-item>{{$t('org.modify_field')}}</el-dropdown-item>-->
                                        <el-dropdown-item @click.native="clickDeleteCla(scope.row,'individual')">
                                            {{$t('org.delete_cla')}}
                                        </el-dropdown-item>
                                        <el-dropdown-item @click.native="addIndividualCla(scope.row)">
                                            {{$t('org.add_cla_for_other_language')}}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button v-else @click="createIndividualCla">{{$t('org.addIndividualCla')}}</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('org.corporation_cla')" name="third" class="margin-top-1rem">
                <div class="tableStyle">
                    <el-table
                            v-if="corpClaData.length"
                            :empty-text="$t('corp.no_data')"
                            :data="corpClaData"
                            align="center"
                            class="tableClass"
                            style="width: 100%;">
                        <el-table-column
                                min-width="60"
                                prop="url"
                                label="Url">
                            <template slot-scope="scope">
                                <span class="hoverUnderline" @click="checkUrl(scope.row.url)">{{scope.row.url}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                min-width="20"
                                prop="language"
                                :label="$t('org.toLanguage')">
                        </el-table-column>
                        <el-table-column
                                min-width="20"
                                :label="$t('org.operation')">
                            <template slot-scope="scope">
                                <el-dropdown placement="bottom-start" trigger="hover">
                                    <span class="el-dropdown-link">
                                        <svg-icon icon-class="operation"></svg-icon>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="clickDeleteCla(scope.row,'corporation')">
                                            {{$t('org.delete_cla')}}
                                        </el-dropdown-item>
                                        <el-dropdown-item @click.native="addCorpCla(scope.row)">
                                            {{$t('org.add_cla_for_other_language')}}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button v-else @click="createCorpCla">{{$t('org.addCorpCla')}}</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-dialog
                :title="$t('org.upload_file')"
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
                                    :multiple="false"
                                    :headers="uploadHeaders"
                                    :http-request="upload"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :auto-upload="false"
                                    :on-change="handleChange"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                <el-button slot="trigger" size="small" type="primary">{{$t('org.select')}}</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
                                    {{$t('org.upload')}}
                                </el-button>
                                <div slot="tip" class="el-upload__tip">
                                    {{$t('org.signature_file_size',{max_size_m:this.file_size})}}
                                </div>
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
                {{$t('org.resend_email_message')}}
                <div class="dialogBtBox">
                    <button class="button_submit" @click="resendPDF">{{$t('corp.yes')}}
                    </button>
                    <button class="cancelBt" @click="resendEmailDialogVisible=false">{{$t('corp.no')}}</button>
                </div>
            </div>
        </el-dialog>
        <DeleteDialog :deleteMessage="deleteMessage" :deleteVisible="deleteCorpVisible" @delete="submitDeleteCorp"
                      @cancel="cancelDeleteCorp"></DeleteDialog>
        <DeleteDialog :deleteMessage="deleteMessage" :deleteVisible="deleteVisible" @delete="submitDeleteCla"
                      @cancel="cancelDeleteCla"></DeleteDialog>
        <DeleteDialog :deleteMessage="completeDeleteMessage" :deleteVisible="deleteCompleteVisible"
                      @delete="submitDeleteCorpComplete"
                      @cancel="cancelDeleteCorpComplete"></DeleteDialog>
        <ReTryDialog :dialogVisible="reTryDialogVisible" :message="reLoginMsg"></ReTryDialog>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
    </div>


</template>
<script>
    import * as url from '../util/api'
    import * as util from '../util/util'
    import http from '../util/http'
    import ReLoginDialog from '../components/ReLoginDialog'
    import ReTryDialog from '../components/ReTryDialog'
    import DeleteDialog from '../components/DeleteDialog'
    import download from 'downloadjs'

    export default {
        name: "CorporationList",
        components: {
            ReTryDialog,
            ReLoginDialog,
            DeleteDialog,
        },
        computed: {
            completeDeleteMessage() {
                return this.$t('corp.completeDeleteTips')
            },
            deleteMessage() {
                return this.$t('corp.deleteTips')
            },
            platform() {
                return this.$store.state.platform.toLowerCase()
            },
            reLoginDialogVisible() {
                return this.$store.state.dialogVisible
            },
            reTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
        },
        data() {
            return {
                signedCompleted: [],
                signedNotCompleted: [],
                deletedCorpInfo: [],
                corpActiveName: 'first',
                deleteCompleteVisible: false,
                invalidSignatureData: [],
                deleteCorpVisible: false,
                deleteCorpEmail: '',
                delete_apply: '',
                deleteRow: '',
                deleteVisible: false,
                file_size: SIGNATURE_FILE_MAX_SIZE,
                uploadLoading: false,
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
                currentPage: 1,
                tableTotal: 0,
            }
        },
        inject: ['setClientHeight'],
        methods: {
            sortDate(dataArr) {
                if (!(dataArr && dataArr.length)) {
                    return
                }
                dataArr.forEach(item => {
                    let dateNum = parseInt(item.date.replace(/-/g, ''));
                    Object.assign(item, {dateNum: dateNum})
                })
                for (let i = 0; i < dataArr.length; i++) {
                    for (let j = i + 1; j < dataArr.length; j++) {
                        if (dataArr[i].dateNum < dataArr[j].dateNum) {
                            let data = dataArr[i]
                            dataArr[i] = dataArr[j]
                            dataArr[j] = data
                        }
                    }
                }
            },
            submitDeleteCorpComplete() {
                this.deleteCompleteVisible = false;
            },
            cancelDeleteCorpComplete() {
                this.deleteCompleteVisible = false;
            },
            submitDeleteCorp() {
                this.deleteCorpVisible = false;
                this.deleteCorp(this.deleteCorpEmail)
            },
            cancelDeleteCorp() {
                this.deleteCorpVisible = false;
            },
            submitDeleteCla() {
                this.deleteVisible = false;
                this.deleteCla(this.deleteRow)
            },
            cancelDeleteCla() {
                this.deleteVisible = false;
            },
            clickDeleteCla(row, apply_to) {
                this.delete_apply = apply_to;
                this.deleteRow = row;
                this.deleteVisible = true;
            },
            deleteCla(row) {
                http({
                    url: `${url.delCla}/${this.$store.state.corpItem.link_id}/${this.delete_apply}/${row.language}`,
                    method: 'delete'
                }).then(res => {
                    util.successMessage(this);
                    if (this.delete_apply === 'individual') {
                        this.getIndividualClaInfo()
                    } else if (this.delete_apply === 'corporation') {
                        this.getCorpClaInfo()
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
                            case 'cla.expired_token':
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
                            case 'cla.cla_is_used':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.cla_is_used'),
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
            createdAdmin(param) {
                if (param.row.admin_added) {
                    return 'mark-row-green'
                } else if (param.row.pdf_uploaded) {
                    return 'mark-row-orange'
                }
            },
            createCorpCla() {
                this.$store.commit('setAddBindFirst', true);
                this.setCheckInfo();
                this.$router.push('/addCorpCla');
            },
            createIndividualCla() {
                this.$store.commit('setAddBindFirst', true);
                this.setCheckInfo();
                this.$router.push('/addIndividualCla');
            },
            addIndividualCla(row) {
                this.$router.push('/addIndividualCla');
                this.setIndividualPD(row)
            },
            setIndividualPD(row) {
                this.setCheckInfo();
                if (row.fields.length > 3) {
                    let data = [];
                    row.fields.forEach((item, index) => {
                        if (index > 2) {
                            let field = {};
                            for (let key in item) {
                                if (key !== 'id') {
                                    Object.assign(field, {[key]: item[key]});
                                }
                            }
                            data.push(field);
                        }
                    });
                    this.$store.commit('setIndividualCustomMetadataArr', data);
                }
            },
            addCorpCla(row) {
                this.setCorpPD(row)
                this.$router.push('/addCorpCla');
            },
            setCheckInfo() {
                this.$store.commit('setBindType', 'add-bind');
                this.$store.commit('setChooseOrg', this.$store.state.corpItem.org_id);
                this.$store.commit('setChooseRepo', this.$store.state.corpItem.repo_id);
                this.$store.commit('setOrgAlias', this.$store.state.corpItem.org_alias);
                this.$store.commit('setEmail', this.$store.state.corpItem.org_email);
            },
            setCorpPD(row) {
                this.setCheckInfo();
                if (row.fields.length > 4) {
                    let data = [];
                    row.fields.forEach((item, index) => {
                        if (index > 3) {
                            let field = {};
                            for (let key in item) {
                                if (key !== 'id') {
                                    Object.assign(field, {[key]: item[key]});
                                }
                            }
                            data.push(field);
                        }
                    });
                    this.$store.commit('setCorporationCustomMetadataArr', data);
                }
            },
            checkUrl(url) {
                window.open(url)
            },
            corpTabsHandleClick(tab, event) {
                if (tab.index === '0') {
                } else if (tab.index === '1') {
                } else if (tab.index === '2') {
                    this.getDeletedCorpInfo();
                }
            },
            tabsHandleClick(tab, event) {
                if (tab.index === '0') {
                    this.getCorporationInfo()
                } else if (tab.index === '1') {
                    this.getIndividualClaInfo()
                } else if (tab.index === '2') {
                    this.getCorpClaInfo();
                } else if (tab.index === '3') {
                    this.getDeletedCorpInfo();
                }
            },
            getCorpClaInfo() {
                let link_id = this.$store.state.corpItem.link_id;
                http({
                    url: `${url.getCla}/${link_id}`
                }).then(res => {
                    if (res.data && res.data.data.corp_clas) {
                        this.corpClaData = res.data.data.corp_clas;
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
                            case 'cla.expired_token':
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
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.expired_token':
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
                });
            },
            getCorporationInfo() {
                http({
                    url: `${url.getCorporationSigning}/${this.$store.state.corpItem.link_id}`,
                }).then(resp => {
                    if (resp.data.data && resp.data.data.length) {
                        let tableData = resp.data.data;
                        this.signedCompleted = [];
                        this.signedNotCompleted = [];
                        tableData.forEach(item => {
                            if (item.admin_added) {
                                this.signedCompleted.push(item)
                            } else {
                                this.signedNotCompleted.push(item)
                            }
                        });
                        this.sortDate(this.signedCompleted);
                        this.sortDate(this.signedNotCompleted)
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
                            case 'cla.expired_token':
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
                            case 'cla.no_link':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_link'),
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
            getDeletedCorpInfo() {
                http({
                    url: `${url.getDeletedCorpInfo}/${this.$store.state.corpItem.link_id}`,
                }).then(resp => {
                    this.deletedCorpInfo = resp.data.data;
                    this.sortDate(this.deletedCorpInfo)
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.expired_token':
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
                            case 'cla.expired_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
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
            downloadClaFile(row) {
                http({
                    url: `${url.corporationPdf}/${this.$store.state.corpItem.link_id}/${row.admin_email}`,
                    responseType: 'blob',
                }).then(res => {
                    if (res.data) {
                        let time = util.getNowDateToTime();
                        download((new Blob([res.data])), `${row.corporation_name}_signature${time}.pdf`, 'application/pdf');
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.not_upload_file'),
                        })
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
                            case 'cla.expired_token':
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
            uploadClaFile(row) {
                this.uploadUrl = `${url.corporationPdf}/${this.$store.state.corpItem.link_id}/${row.admin_email}`;
                this.uploadDialogVisible = true
            },
            upload(fileObj) {
                const formData = new FormData();
                let file = fileObj.file;
                formData.append('pdf', file);
                formData.append('type', file.type);
                http({
                    url: this.uploadUrl,
                    method: 'patch',
                    data: formData,
                }).then(res => {
                    this.$refs.uploadPdf.clearFiles();
                    this.clearFileList();
                    this.uploadLoading.close();
                    this.uploadDialogVisible = false;
                    util.successMessage(this);
                    this.getCorporationInfo()
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.expired_token':
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
            submitUpload() {
                if (this.fileList.length) {
                    this.uploadLoading = this.$loading({
                        lock: true,
                        text: this.$t('org.upload_loading_text'),
                        spinner: 'el-icon-loading',
                        customClass: "loading_class",
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    this.$refs.uploadPdf.submit();
                } else {
                    this.$message.closeAll();
                    this.$message.error('Please select file first')
                }
            },
            handleChange(file, fileList) {
                let max_size = this.file_size * 1024 * 1024;
                if (/.(PDF|pdf)$/.test(file.name)) {
                    if (file.size < max_size) {
                        this.fileList.push(file);
                    } else {
                        for (let i = 0; i < fileList.length; i++) {
                            fileList.splice(i, 1);
                            i--;
                        }
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.file_too_large'),
                        })
                    }
                } else {
                    for (let i = 0; i < fileList.length; i++) {
                        fileList.splice(i, 1);
                        i--;
                    }
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.not_pdf'),
                    })
                }
            },
            handleRemove(file, fileList) {
                this.fileList.splice(0, 1);
            },
            clearFileList() {
                for (let i = 0; i < this.fileList.length; i++) {
                    this.fileList.splice(0, 1);
                    i--;
                }
            },
            handleExceed(files, fileList) {
                this.$message.warning(this.$t('org.file_limit_tips'));
            },
            beforeRemove(file, fileList) {
                return this.$confirm(this.$t('org.remove_file_tips', {fileName: file.name}), {
                    cancelButtonText: this.$t('org.cancel_remove'),
                    confirmButtonText: this.$t('org.confirm_remove')
                });
            },
            openResendPdf(email) {
                this.resendEmail = email;
                this.resendEmailDialogVisible = true;
            },
            openDeleteCorp(email) {
                this.deleteCorpEmail = email;
                this.deleteCorpVisible = true;
            },
            resendPDF() {
                let email = this.resendEmail;
                let resend_url = '';
                resend_url = `${url.resend_pdf}/${this.$store.state.corpItem.link_id}/${email}`;
                http({
                    url: resend_url,
                    method: 'post',
                }).then(res => {
                    this.resendEmailDialogVisible = false;
                    util.successMessage(this)
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.expired_token':
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
            menuCommand(command) {
                switch (command.command) {
                    case 'a':
                        this.createRoot(command.row.admin_email);
                        break;
                    case 'b':
                        this.openResendPdf(command.row.admin_email);
                        break;
                    case 'c':
                        console.log(command.row);
                        this.openDeleteCorp(command.row.admin_email);
                        break;
                    case 'd':
                        console.log(command.row);
                        this.reductionCorp(command.row.admin_email);
                        break;
                    case 'e':
                        console.log(command.row);
                        this.deleteCompletely(command.row.admin_email);
                        break;
                }
            },
            deleteCompletely(email) {
                console.log('deleteCompletely');
                this.deleteCompleteVisible = true;
            },
            reductionCorp(email) {
                console.log(email);
                http({
                    url: `${url.corporationManager}/${this.$store.state.corpItem.link_id}/${email}`,
                    method: 'patch',
                }).then(res => {
                    util.successMessage(this);
                    this.getCorporationInfo()
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
                            case 'cla.expired_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token'),
                                });
                                break;
                            case 'cla.no_pdf_of_corp':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_pdf_of_corp'),
                                });
                                break;
                            case 'cla.unuploaded':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_pdf_of_corp'),
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
            deleteCorp(email) {
                this.deleteCorpVisible = false;
                http({
                    url: `${url.corporation_signing}/${this.$store.state.corpItem.link_id}/${email}`,
                    method: 'delete',
                }).then(res => {
                    util.successMessage(this);
                    this.getCorporationInfo()
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.expired_token':
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
                            case 'cla.no_pdf_of_corp':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_pdf_of_corp'),
                                });
                                break;
                            case 'cla.unuploaded':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_pdf_of_corp'),
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
            createRoot(email) {
                http({
                    url: `${url.corporationManager}/${this.$store.state.corpItem.link_id}/${email}`,
                    method: 'put',
                }).then(res => {
                    util.successMessage(this);
                    this.getCorporationInfo()
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('errorSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.expired_token':
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
                            case 'cla.no_pdf_of_corp':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_pdf_of_corp'),
                                });
                                break;
                            case 'cla.unuploaded':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_pdf_of_corp'),
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
        },
        created() {
            util.clearSession(this);
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

        .margin-top-1rem {
            margin-top: 1rem;
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
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }


        .hoverUnderline:hover {
            text-decoration: underline;
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
