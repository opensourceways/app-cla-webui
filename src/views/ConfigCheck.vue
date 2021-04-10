<template>
    <div id="configCheck">
        <div class="itemBox">
            <div class="=info-title">
                ① {{$t('org.config_cla_check_org_repo_title')}}
            </div>
            <div class="margin-top-1rem">
                <el-row :gutter="20">
                    <el-col :span="8">
                        {{$t('org.config_cla_check_org_title')}}
                    </el-col>
                    <el-col :span="8">
                        {{$t('org.config_cla_check_org_alias_title')}}
                    </el-col>
                    <el-col :span="8">
                        {{$t('org.config_cla_check_repo_title')}}
                    </el-col>
                </el-row>
            </div>
            <div class="margin-top-half-rem">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input disabled="" size="medium" v-model="org"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input disabled="" size="medium" v-model="orgAlias"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input disabled="" size="medium" v-model="repo"></el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="itemBox">
            <div class="=info-title">
                ②{{$t('org.config_cla_check_email_title')}}
            </div>
            <div class="margin-top-1rem">
                <el-input
                        disabled=""
                        size="medium"
                        class="emailInput"
                        v-model="email">
                </el-input>
            </div>
        </div>
        <div class="itemBox">
            <div class="=info-title">
                ③ {{$t('org.config_cla_check_url_title')}}
            </div>
            <div v-if="this.$store.state.claLinkIndividual">
                <div class="margin-top-1rem">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            {{$t('org.config_cla_paste_individual_url')}}
                        </el-col>
                        <el-col :span="6">
                            {{$t('org.config_cla_individual_lang')}}
                        </el-col>
                    </el-row>
                </div>
                <div class="margin-top-half-rem">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-input disabled="" size="medium" v-model="cla_link_individual">
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input disabled="" size="medium" v-model="individualClaLanguageValue">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div v-if="this.$store.state.claLinkCorp">
                <div class="margin-top-1rem">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            {{$t('org.config_cla_paste_corp_url')}}
                        </el-col>
                        <el-col :span="6">
                            {{$t('org.config_cla_corp_lang')}}
                        </el-col>
                    </el-row>
                </div>
                <div class="margin-top-half-rem">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <el-input disabled="" size="medium" v-model="cla_link_corporation">
                            </el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-input disabled="" size="medium" v-model="corpClaLanguageValue">
                            </el-input>
                        </el-col>
                    </el-row>
                </div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_check_file')}}
                </div>
                <div class="margin-top-half-rem">
                    <el-input disabled="" v-model="corp_pdf_name"></el-input>
                </div>
            </div>

        </div>
        <div class="itemBox">
            <div style="padding: .5rem">
                <p style="font-size: 1.2rem">④ {{$t('org.config_cla_check_fields_title')}}
                </p>
            </div>
            <div style="padding: 0 2rem">
                <div v-if="this.$store.state.claLinkIndividual">
                    <el-row class="margin-top-1rem">
                        {{$t('org.config_cla_individual_metadata')}}
                    </el-row>
                    <div>
                        <el-row class="margin-top-1rem" type="flex" align="middle" :gutter="20">
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_title_title')}}
                            </el-col>
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_type_title')}}
                            </el-col>
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_describe_title')}}
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                {{$t('org.config_cla_check_fields_require_title')}}
                            </el-col>
                        </el-row>
                        <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                v-for="(item,index) in individualMetadata">
                            <el-col :span="5">
                                <el-input disabled="" v-model="item.title" size="medium" readonly="">
                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input disabled="" v-model="item.type" size="medium" readonly></el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input disabled="" v-model="item.description" size="medium" readonly></el-input>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <el-checkbox v-model="item.required" disabled="">
                                    {{$t('org.config_cla_fields_required')}}
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <div v-if="this.$store.state.claLinkCorp">
                    <el-row class="margin-top-1rem">
                        {{$t('org.config_cla_corp_metadata')}}
                    </el-row>
                    <div>
                        <el-row class="margin-top-1rem" type="flex" align="middle" :gutter="20">
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_title_title')}}
                            </el-col>
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_type_title')}}
                            </el-col>
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_describe_title')}}
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                {{$t('org.config_cla_check_fields_require_title')}}
                            </el-col>
                        </el-row>
                        <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                v-for="(item,index) in corporationMetadata">
                            <el-col :span="5">
                                <el-input disabled="" v-model="item.title" size="medium" readonly="">
                                </el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input disabled="" v-model="item.type" size="medium" readonly></el-input>
                            </el-col>
                            <el-col :span="5">
                                <el-input disabled="" v-model="item.description" size="medium" readonly></el-input>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <el-checkbox v-model="item.required" disabled="">
                                    {{$t('org.config_cla_fields_required')}}
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </div>
                </div>

            </div>

        </div>
        <div class="stepBtBox">
            <button @click="toConfigField" class="step_button">{{$t('org.previous_step')}}</button>
            <button @click="binding" class="step_button">{{$t('org.submit')}}</button>
        </div>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
        <ReTryDialog :dialogVisible="reTryVisible" :message="reLoginMsg"></ReTryDialog>
    </div>
</template>

<script>
    import * as url from '../util/api'
    import http from '../util/http'
    import * as util from '../util/util'
    import ReLoginDialog from '../components/ReLoginDialog'
    import ReTryDialog from '../components/ReTryDialog'

    export default {
        name: "ConfigCheck",
        components: {
            ReLoginDialog,
            ReTryDialog
        },
        computed: {
            reTryVisible() {
                return this.$store.state.reTryDialogVisible
            },
            reLoginDialogVisible() {
                return this.$store.state.orgReLoginDialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
            orgChoose() {
                return `${this.$store.state.orgChoose}` === 'true';
            },
            isEmail() {
                return `${this.$store.state.isEmail}` === 'true';
            },
            repositoryChoose() {
                return `${this.$store.state.repositoryChoose}` === 'true'
            },
            email() {
                return this.$store.state.email;
            },
            org() {
                return this.$store.state.chooseOrg
            },
            orgAlias() {
                if (this.$store.state.orgAlias) {
                    return this.$store.state.orgAlias
                } else {
                    return this.$store.state.chooseOrg
                }
            },
            repo() {
                return this.$store.state.repo
            },
            cla_link_individual: {
                get() {
                    return this.$store.state.claLinkIndividual;
                },
                set(value) {
                    this.$store.commit('setClaLinkIndividual', value)
                },
            },
            cla_link_corporation: {
                get() {
                    return this.$store.state.claLinkCorp;
                },
                set(value) {
                    this.$store.commit('setClaLinkCorp', value)
                },
            },
            individualMetadata() {
                return this.$store.state.individualMetadata;
            },
            corporationMetadata() {
                return this.$store.state.corporationMetadata;
            },
            individualClaLanguageValue() {
                return this.$store.state.individualLanguage;
            },
            corpClaLanguageValue() {
                return this.$store.state.corpLanguage;
            },
            corp_pdf_name() {
                return this.$store.state.corpFDName
            },
            platform() {
                return this.$store.state.platform.toLowerCase()
            },
        },
        data() {
            return {
                corpFileName: SIGNATURE_PAGE_NAME,
                isVerify: false,
                previewShow: false,
                loginType: this.$store.state.loginType,
                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                platform_token: this.$store.state.platform_token,
                user: {
                    userName: this.$store.state.user.userName,
                    userId: this.$store.state.user.userId,
                    isAuthorize: false,
                },
            }
        },
        inject: ['setClientHeight'],
        methods: {
            toConfigField() {
                if (this.$store.state.bindType === 'add-bind') {
                    if (this.$store.state.claLinkIndividual) {
                        this.$router.push('/addIndividualUrl');
                    } else {
                        this.$router.push('/addCorpUrl');
                    }
                } else {
                    this.$router.push('/config-fields');
                }
            },
            editMetadata(metadata) {
                if (metadata) {
                    let metadataArr = metadata;
                    let fields = [];
                    metadataArr.forEach((item, index) => {
                        if (item.title !== '' && item.type !== '') {
                            fields.push({
                                id: index + '',
                                title: item.title,
                                type: item.type,
                                description: item.description,
                                required: item.required,
                            })
                        }
                    });
                    return fields;
                } else {
                    return false
                }
            },
            dataURLtoFile(dataurl, filename) {
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type: mime});
            },
            binding() {
                if (this.$store.state.bindType === 'add-bind') {
                    this.addBinding();
                } else {
                    this.newBinding()
                }
            },
            addBinding() {
                let formData = new FormData();
                let obj = {};
                let _url = '';
                if (this.$store.state.claLinkCorp) {
                    obj = {
                        url: this.cla_link_corporation.trim(),
                        language: this.corpClaLanguageValue,
                        fields: this.editMetadata(this.corporationMetadata)
                    };
                    let corp_pdf = this.dataURLtoFile(this.$store.state.corpFD, this.corpFileName);
                    formData.append(ORG_SIGNATURE_FILE, corp_pdf);
                    _url = `${url.addCla}/${this.$store.state.corpItem.link_id}/corporation`;
                } else {
                    obj = {
                        url: this.cla_link_individual.trim(),
                        language: this.individualClaLanguageValue,
                        fields: this.editMetadata(this.individualMetadata)
                    };
                    _url = `${url.addCla}/${this.$store.state.corpItem.link_id}/individual`;
                }
                formData.append('data', JSON.stringify(obj));
                http({
                    url: _url,
                    method: 'post',
                    data: formData,
                }).then(res => {
                    util.successMessage(this)
                    util.clearSession(this);
                    this.$router.push('/corporationList')
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.expired_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.unauthorized_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unauthorized_token'),
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token'),
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token'),
                                });
                                break;
                            case 'cla.cla_exists':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.cla_exists', {lang: this.$store.state.addLang}),
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
            newBinding() {
                let corp_pdf = {};
                let formData = new FormData();
                if (this.$store.state.corpFD) {
                    corp_pdf = this.dataURLtoFile(this.$store.state.corpFD, this.corpFileName);
                    formData.append(ORG_SIGNATURE_FILE, corp_pdf);
                }
                let obj = {};
                let corpCla = {};
                let individualCla = {
                    url: this.cla_link_individual.trim(),
                    language: this.individualClaLanguageValue,
                    fields: this.editMetadata(this.individualMetadata)
                };
                if (this.cla_link_corporation) {
                    corpCla = {
                        url: this.cla_link_corporation.trim(),
                        language: this.corpClaLanguageValue,
                        fields: this.editMetadata(this.corporationMetadata)
                    };
                    if (this.repo) {
                        obj = {
                            repo_id: this.repo,
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            org_alias: this.orgAlias,
                            individual_cla: individualCla,
                            corp_cla: corpCla,
                        };
                    } else {
                        obj = {
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            org_alias: this.orgAlias,
                            individual_cla: individualCla,
                            corp_cla: corpCla,
                        };
                    }
                } else {
                    if (this.repo) {
                        obj = {
                            repo_id: this.repo,
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            org_alias: this.orgAlias,
                            individual_cla: individualCla,
                        };
                    } else {
                        obj = {
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            org_alias: this.orgAlias,
                            individual_cla: individualCla,
                        };
                    }
                }
                formData.append('data', JSON.stringify(obj));
                http({
                    url: url.linkRepository,
                    method: 'post',
                    data: formData,
                }).then(res => {
                    util.successMessage(this);
                    this.$router.push('/home')
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.invalid_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token'),
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token'),
                                });
                                break;
                            case 'cla.expired_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.unauthorized_token':
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unauthorized_token'),
                                });
                                break;
                            case 'cla.system_error':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.system_error'),
                                });
                                break;
                            case 'cla.link_exists':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.link_exists'),
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
        updated() {
            this.setClientHeight();
        },
    }
</script>

<style lang="less">
    #configCla {
        .nextStepBtBox {
            text-align: right;
            margin-bottom: 2rem;
        }

        .margin-top-half-rem {
            margin-top: .5rem;
        }

        .el-dialog__body {
            text-align: center;
            word-break: keep-all;
        }

        .info-title {
            font-size: 1.2rem;
            padding: .5rem;
        }

        .size-b {
            font-weight: bold;
        }

        .itemBox {
            border-radius: 1.25rem;
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem;
            margin-bottom: 2rem;

            .emailInput {
                cursor: pointer;
            }
        }

        .typeCol {
            padding: .5rem 10px;
        }

        #section {
            flex-grow: 1;
            text-align: left;

            .pageTitle {
                padding: 2rem 0;
                font-size: 1.3rem;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -webkit-touch-callout: none;
                user-select: none;
            }
        }
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .dialogDesc {
        font-size: 1.2rem;
        margin: 2rem 0;
    }

    li {
        margin: 1rem 0;
    }
</style>
