<template>
    <el-row id="signCla">
        <div id="singCla_section">
            <el-row class="content">
                <el-col>
                    <p class="contentTitle">{{ $t('signPage.claTitle') }}</p>
                    <el-row class="marginTop3rem" id="claBox">
                        <iframe id="pdf_iframe" ref="pdf_iframe" class="iframeClass" :src="claTextUrl"
                                frameborder="0"></iframe>
                    </el-row>
                    <el-row class="marginTop3rem form">
                        <el-col>
                            <el-form v-if="this.IS_MOBILE" :model="ruleForm" :rules="rules" ref="ruleForm"
                                     label-position="left"
                                     label-width="25%"
                                     class="demo-ruleForm">
                                <el-form-item v-for="(item,index) in fields"
                                              label-width="0"
                                              :key="index"
                                              :required="item.required"
                                              :prop="item.id">
                                    <div><span v-if="item.required" class="requiredIcon">*</span>{{item.title}}</div>
                                    <el-input v-if="item.type==='date'" readonly="" v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                    <el-input v-else v-model="ruleForm[item.id]"
                                              :placeholder="$t('signPage.holder',{title:item.title})" size="small"
                                              @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                </el-form-item>
                                <el-form-item
                                        v-if="rules.code"
                                        label-width="0"
                                        prop="code">
                                    <div><span class="requiredIcon">*</span>{{$t('signPage.verifyCode')}}
                                    </div>
                                    <el-input v-model="ruleForm.code" :placeholder="$t('signPage.verifyCodeHolder')"
                                              size="small">
                                    </el-input>
                                </el-form-item>
                                <button class="margin-top-1rem mobileBt"
                                        type="button"
                                        :disabled="sendBtTextFromLang!==$t('signPage.sendCode')"
                                        @click="sendCode()">{{sendBtTextFromLang}}
                                </button>
                                <div class="borderClass fontSize12"><span class="requiredIcon">*</span>{{$t('signPage.requireText')}}
                                </div>
                                <div class="margin-top-1rem fontSize12">
                                    <el-checkbox v-model="isRead"><span>{{$t('signPage.checkBoxText1')}}<span
                                            class="privacy" @click="previewPrivacy()">{{$t('signPage.privacy')}}</span>{{$t('signPage.checkBoxText2')}}<span
                                            class="privacy" @click="toIndex()">{{$t('signPage.claSignPlatform')}}</span>{{$t('signPage.checkBoxText3')}}</span>
                                    </el-checkbox>
                                </div>
                                <el-form-item label-width="0" class="margin-top-1rem signBtBox">
                                    <button class="mobileBt" type="button"
                                            @click="submitForm('ruleForm')">
                                        {{$t('signPage.sign')}}
                                    </button>
                                </el-form-item>
                            </el-form>
                            <el-form v-else :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left"
                                     label-width="25%"
                                     class="demo-ruleForm">
                                <el-form-item v-for="(item,index) in fields"
                                              :label="item.title"
                                              :required="item.required"
                                              :prop="item.id"
                                              :key="index">
                                    <el-input v-if="item.type==='date'" readonly="" v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                    <el-input v-else v-model="ruleForm[item.id]"
                                              :placeholder="$t('signPage.holder',{title:item.title})" size="small"
                                              @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                </el-form-item>
                                <el-form-item
                                        v-if="rules.code"
                                        :label="$t('signPage.verifyCode')"
                                        prop="code">
                                    <el-input v-model="ruleForm.code" :placeholder="$t('signPage.verifyCodeHolder')"
                                              size="small">
                                        <el-tooltip slot="append" :content="$t('signPage.sendCodeTip')" placement="top"
                                                    effect="light"
                                                    popper-class="my_tooltip">
                                            <el-button
                                                    :disabled="sendBtTextFromLang!==$t('signPage.sendCode')"
                                                    @click="sendCode()">{{sendBtTextFromLang}}
                                            </el-button>
                                        </el-tooltip>
                                    </el-input>
                                </el-form-item>
                                <div class="borderClass fontSize12"><span class="requiredIcon">*</span>{{$t('signPage.requireText')}}
                                </div>
                                <div class="margin-top-1rem fontSize12">
                                    <el-checkbox v-model="isRead"><span>{{$t('signPage.checkBoxText1')}}<span
                                            class="privacy" @click="previewPrivacy()">{{$t('signPage.privacy')}}</span>{{$t('signPage.checkBoxText2')}}<span
                                            class="privacy" @click="toIndex()">{{$t('signPage.claSignPlatform')}}</span>{{$t('signPage.checkBoxText3')}}</span>
                                    </el-checkbox>
                                </div>
                                <el-form-item label-width="0" class="margin-top-1rem signBtBox">
                                    <button class="button" type="button" @click="submitForm('ruleForm')">
                                        {{$t('signPage.sign')}}
                                    </button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
        <ReTryDialog :dialogVisible="reTryDialogVisible" :message="reLoginMsg"></ReTryDialog>
        <SignSuccessDialog :dialogVisible="signSuccessDialogVisible" :message="reLoginMsg"></SignSuccessDialog>
        <SignReLoginDialog :dialogVisible="signReLoginDialogVisible" :message="reLoginMsg"></SignReLoginDialog>
    </el-row>
</template>

<script>
    import * as util from '../util/util';
    import * as url from '../util/api';
    import {mapActions} from 'vuex';
    import axios from '../util/_axios';
    import ReLoginDialog from '../components/ReLoginDialog';
    import ReTryDialog from '../components/ReTryDialog';
    import SignSuccessDialog from '../components/SignSuccessDialog';
    import SignReLoginDialog from '../components/SignReLoginDialog';

    export default {
        name: 'SignCla',
        computed: {
            pdfData() {
                if (this.$store.state.pdfData) {
                    return this.$store.state.pdfData;
                }
                return [];
            },
            loginType() {
                return this.$store.state.loginType;
            },
            org() {
                let org = this.$store.state.repoInfo.org_id;
                if (org.length > 1) {
                    return org.charAt(0).toUpperCase() + org.substring(1);
                } else {
                    return org.charAt(0).toUpperCase();
                }
            },
            reLoginDialogVisible() {
                return this.$store.state.dialogVisible;
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage;
            },
            reTryDialogVisible() {
                return this.$store.state.reTryDialogVisible;
            },
            signSuccessDialogVisible() {
                return this.$store.state.signSuccessDialogVisible;
            },
            signReLoginDialogVisible() {
                return this.$store.state.signReLoginDialogVisible;
            },
            sendBtTextFromLang: {
                get: function () {
                    return this.sendBtText;
                },
                set: function (value) {
                    this.sendBtText = value;
                }
            },
            claTextUrl() {
                return `${this.$store.state.domain}/cla-pdf`;
            }
        },
        watch: {
            '$i18n.locale'() {
                if (this.$route.path !== '/sign-cla') {
                    return;
                }
                this.cla_lang = '';
                this.lang = localStorage.getItem('lang').toLowerCase();
                this.signPageData.forEach((item, index) => {
                    if (item.language === this.lang) {
                        this.cla_lang = item.language;
                        this.value = index;
                        this.cla_hash = item.cla_hash;
                        this.$refs.pdf_iframe.contentWindow.postMessage({
                            link_id: this.link_id,
                            lang: this.lang,
                            hash: this.cla_hash,
                            pdfData: this.pdfData
                        }, this.claTextUrl);
                        this.fields = this.signPageData[this.value].fields;
                        if (Object.keys(this.rules).length === 0) {
                            this.setFieldsData();
                        }
                    }
                });
                if (this.sendBtTextFromLang === 'send code' || this.sendBtTextFromLang === '发送验证码') {
                    this.sendBtTextFromLang = this.$t('signPage.sendCode');
                } else {
                    this.sendBtTextFromLang = this.$t('signPage.reSendCode', {second: this.second});
                }
                this.$refs['ruleForm'] && this.$refs['ruleForm'].fields.forEach(item => {
                    if (item.validateState === 'error') {
                        this.$refs['ruleForm'].validateField(item.labelFor);
                    }
                });

            }
        },
        inject: ['setClientHeight'],
        components: {
            ReLoginDialog,
            ReTryDialog,
            SignSuccessDialog,
            SignReLoginDialog
        },
        data() {
            return {
                corporation: 'corporation',
                individual: 'individual',
                employee: 'employee',
                claText: '',
                numPages: null,
                lang: '',
                cla_hash: '',
                second: '',
                sendBtText: this.$t('signPage.sendCode'),
                signRouter: this.$store.state.signRouter,
                domain: this.$store.state.domain,
                tipsTitle: '',
                tipsMessage: this.$t('tips.individual_sign'),
                tipsDialogVisible: false,
                signPageData: '',
                link_id: '',
                claOrgIdArr: [],
                fields: [],
                claIdArr: [],
                isVerify: false,
                verifyCode: '',
                dialogVisible: false,
                repositoryOptions: [],
                role: '0',
                ruleForm: {},
                myForm: {},
                rules: {},
                isRead: false,
                value: '',
                cla_lang: ''
            };
        },
        methods: {
            ...mapActions(['setTokenAct', 'setRepoInfoAct']),
            setIframeEventListener() {
                window.addEventListener('message', (event) => {
                    if (event.data instanceof Array && event.origin === this.$store.state.domain) {
                        this.$store.commit('setPdfData', event.data);
                    }
                }, false);
            },
            previewPrivacy() {
                util.toPrivacy(this);
            },
            toIndex() {
                let date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = `_mark=; expire=${date.toUTCString()}; Domain=${this.domain}; path=/`;
                let repoInfo = this.$store.state.repoInfo;
                let params = repoInfo.repo_id ? `${repoInfo.platform}/${repoInfo.org_id}/${repoInfo.repo_id}` : `${repoInfo.platform}/${repoInfo.org_id}`;
                let path = '';
                if (sessionStorage.getItem('orgAddress')) {
                    path = `${this.signRouter}/${util.strToBase64(params)}/${sessionStorage.getItem('orgAddress')}`;
                } else {
                    path = `${this.signRouter}/${util.strToBase64(params)}`;
                }
                window.open(`${this.domain}${path}`);
            },
            async requireVerifyTel(rule, value, callback) {
                if (value) {
                    let reg = /^1[3456789]\d{9}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error(this.$t('tips.invalid_telephone_num')));
                    }
                } else {
                    callback(new Error(this.$t('tips.not_fill_telephone_num')));
                }
            },
            async verifyTel(rule, value, callback) {
                if (value) {
                    let reg = /^1[3456789]\d{9}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error(this.$t('tips.invalid_telephone_num')));
                    }
                }
            },
            async verifyAddr(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.not_fill_address')));
                } else {
                    callback();
                }
            },
            async verifyFax(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.not_fill_fax')));
                } else {
                    callback();
                }
            },
            async verifyFormEmail(rule, value, callback) {
                let email = '';
                if (value) {
                    email = value.trim();
                }
                let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,6}$/;
                if (reg.test(email)) {
                    callback();
                } else {
                    callback(new Error(this.$t('tips.invalid_email')));
                }
            },
            async verifyName(rule, value, callback) {
                if (value) {
                    callback();
                } else {
                    callback(new Error(this.$t('tips.fill_name')));
                }
            },
            async verifyCorpName(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_corp_name')));
                } else {
                    callback();
                }
            },
            async verifyTitle(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_representative_title')));
                } else {
                    callback();
                }
            },
            async verifyAuthorized(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_representative_name')));
                } else {
                    callback();
                }
            },
            async verifyDate(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_date')));
                } else {
                    callback();
                }
            },
            async verifyCodeCheck(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_verification_code')));
                } else {
                    callback();
                }
            },
            setMyForm(type, value) {
                this.myForm[type] = value;
            },
            sendCode() {
                let reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
                let email = this.myForm.email;
                if (email && reg.test(email)) {
                    axios({
                        url: `${url.sendVerifyCode}/${this.link_id}/${this.myForm.email}`,
                        method: 'post'
                    }).then(res => {
                        this.$message.closeAll();
                        this.$message.success({message: this.$t('tips.sending_email'), duration: 8000});
                        this.second = 60;
                        let codeInterval = setInterval(() => {
                            if (this.second !== 0) {
                                this.second--;
                                this.sendBtTextFromLang = this.$t('signPage.reSendCode', {second: this.second});
                            } else {
                                this.sendBtTextFromLang = this.$t('signPage.sendCode');
                                clearInterval(codeInterval);
                            }
                        }, 1000);
                    }).catch(err => {
                        if (err.data && err.data.hasOwnProperty('data')) {
                            switch (err.data.data.error_code) {
                                case 'cla.invalid_parameter':
                                    this.$store.commit('setSignReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.invalid_parameter')
                                    });
                                    break;
                                case 'cla.invalid_token':
                                    this.$store.commit('setSignReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.invalid_token')
                                    });
                                    break;
                                case 'cla.missing_token':
                                    this.$store.commit('setSignReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.missing_token')
                                    });
                                    break;
                                case 'cla.unknown_token':
                                    this.$store.commit('setSignReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.unknown_token')
                                    });
                                    break;
                                case 'cla.failed_to_send_email':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.failed_to_send_email')
                                    });
                                    break;
                                case 'cla.not_same_corp':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.not_same_corp')
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
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.not_fill_email'));
                }
            },
            getNowDate() {
                let date = new Date();
                let year, month, day;
                year = date.getFullYear();
                date.getMonth() < 9 ? month = `0${date.getMonth() + 1}` : month = date.getMonth() + 1;
                date.getDate() < 10 ? day = `0${date.getDate()}` : day = date.getDate();
                for (let item of this.fields) {
                    if (item.type === 'date') {
                        this.myForm.date = year + '-' + month + '-' + day;
                        Object.assign(this.ruleForm, {[item.id]: year + '-' + month + '-' + day});
                        break;
                    }
                }
            },
            upperFirstCase(word) {
                let initials = word.substring(0, 1);
                let upper = initials.toUpperCase();
                let end = word.substring(1);
                return upper + end;
            },
            setData(res, resolve) {
                if (res && res.data.data) {
                    if (res.data.data.clas && res.data.data.clas.length) {
                        this.signPageData = res.data.data.clas;
                        this.link_id = res.data.data.link_id;
                        if (localStorage.getItem('lang') !== undefined) {
                            this.lang = localStorage.getItem('lang').toLowerCase();
                        }
                        let langOptions = [];
                        let langLabel = '';
                        this.signPageData.forEach((item, index) => {
                            langLabel = this.upperFirstCase(item.language);
                            langOptions.push({value: index, label: langLabel});
                            if (item.language === this.lang) {
                                this.cla_lang = item.language;
                                this.value = index;
                                this.cla_hash = item.cla_hash;
                            }
                        });
                        this.$emit('getLangOptions', langOptions);
                        if (!this.cla_lang) {
                            this.lang = this.signPageData[0].language;
                            this.cla_lang = this.signPageData[0].language;
                            this.value = 0;
                            this.cla_hash = this.signPageData[0].cla_hash;
                            localStorage.setItem('lang', this.upperFirstCase(this.lang));
                        }
                        this.setClaText({
                            link_id: this.link_id,
                            lang: this.lang,
                            hash: this.cla_hash,
                            pdfData: this.pdfData
                        });
                        this.setFields(this.value);
                        this.setFieldsData();
                        resolve('complete');
                        this.$emit('initHeader', this.upperFirstCase(this.lang));
                    } else {
                        let message = '';
                        if (this.$store.state.loginType === this.corporation) {
                            message = this.$t('tips.no_cla_binding_corp');
                        } else if (this.$store.state.loginType === this.employee) {
                            message = this.$t('tips.no_cla_binding_emp');
                        }
                        if (this.$store.state.loginType === this.individual) {
                            message = this.$t('tips.no_cla_binding_individual');
                        }
                        this.$store.commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: message
                        });
                    }

                }
            },
            getSignPage(resolve) {
                let applyTo = '';
                let _url = '';
                this.loginType === this.corporation ? applyTo = this.loginType : applyTo = this.individual;
                try {
                    if (this.$store.state.repoInfo.repo_id) {
                        _url = `${url.getSignPage}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}:${this.$store.state.repoInfo.repo_id}/${applyTo}`;
                    } else {
                        _url = `${url.getSignPage}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}/${applyTo}`;
                    }
                } catch (e) {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.page_error')
                    });
                    return;
                }
                axios({
                    url: _url
                }).then(res => {
                    this.setData(res, resolve);
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.no_cla_binding':
                                let message = '';
                                if (this.$store.state.loginType === this.corporation) {
                                    message = this.$t('tips.no_cla_binding_corp');
                                } else if (this.$store.state.loginType === this.employee) {
                                    message = this.$t('tips.no_cla_binding_emp');
                                }
                                if (this.$store.state.loginType === this.individual) {
                                    message = this.$t('tips.no_cla_binding_individual');
                                }
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: message
                                });
                                break;
                            case 'cla.invalid_parameter':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_parameter')
                                });
                                break;
                            case 'cla.no_corp_manager':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_corp_manager')
                                });
                                break;
                            case 'cla.has_not_signed':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.has_not_signed')
                                });
                                break;
                            case 'cla.invalid_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token')
                                });
                                break;
                            case 'cla.expired_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token')
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token')
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token')
                                });
                                break;
                            case 'cla.uncompleted_signing':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.uncompleted_signing')
                                });
                                break;
                            case 'cla.not_ready_to_sign':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.not_ready_to_sign')
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
            setClaText(obj) {
                this.$nextTick(() => {
                    this.$refs.pdf_iframe.contentWindow.onload = () => {
                        this.$refs.pdf_iframe.contentWindow.postMessage(obj, this.claTextUrl);
                    };
                });
            },
            setFields(key) {
                for (let i = 0; i < this.signPageData[key].fields.length; i++) {
                    for (let j = i + 1; j < this.signPageData[key].fields.length; j++) {
                        if (Number(this.signPageData[key].fields[i].id) > Number(this.signPageData[key].fields[j].id)) {
                            let field = this.signPageData[key].fields[i];
                            this.signPageData[key].fields[i] = this.signPageData[key].fields[j];
                            this.signPageData[key].fields[j] = field;
                        }
                    }
                }
                this.fields = this.signPageData[key].fields;
            },
            setFieldsData() {
                let form = {};
                let rules = {};
                this.fields.forEach(item => {
                    Object.assign(form, {[item.id]: ''});
                    if (item.type === 'name') {
                        Object.assign(this.myForm, {name: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyName,
                                    trigger: ['blur', 'change']
                                }
                            ]
                        });
                    } else if (item.type === 'corporationName') {
                        Object.assign(this.myForm, {corporationName: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyCorpName,
                                    trigger: ['blur', 'change']
                                }
                            ]
                        });
                    } else if (item.type === 'title') {
                        Object.assign(this.myForm, {title: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyTitle,
                                    trigger: ['blur', 'change']
                                }
                            ]
                        });
                    } else if (item.type === 'authorized') {
                        Object.assign(this.myForm, {authorized: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyAuthorized,
                                    trigger: ['blur', 'change']
                                }
                            ]
                        });
                    } else if (item.type === 'date') {
                        Object.assign(this.myForm, {date: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyDate,
                                    trigger: ['blur', 'change']
                                }]
                        });
                    } else if (item.type === 'email') {
                        Object.assign(this.myForm, {email: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyFormEmail,
                                trigger: ['blur', 'change']
                            }]
                        });
                    } else if (item.type === 'telephone') {
                        Object.assign(this.myForm, {telephone: ''});
                        if (item.required) {
                            Object.assign(rules, {
                                [item.id]: [{
                                    required: item.required,
                                    validator: this.requireVerifyTel,
                                    trigger: ['blur', 'change']
                                }]
                            });
                        } else {
                            Object.assign(rules, {
                                [item.id]: [{
                                    validator: this.verifyTel,
                                    trigger: ['blur', 'change']
                                }]
                            });
                        }
                    } else if (item.type === 'address') {
                        Object.assign(this.myForm, {address: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyAddr,
                                trigger: ['blur', 'change']
                            }]
                        });
                    } else if (item.type === 'fax') {
                        Object.assign(this.myForm, {fax: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyFax,
                                trigger: ['blur', 'change']
                            }]
                        });
                    }
                });
                Object.assign(form, {code: ''});
                Object.assign(this.myForm, {code: ''});
                Object.assign(rules, {
                    code: [{
                        required: true,
                        validator: this.verifyCodeCheck,
                        trigger: ['blur', 'change']
                    }]
                });
                this.ruleForm = form;
                this.rules = rules;
            },
            signCla() {
                let info = {};
                let myUrl = '';
                let obj = {};
                for (let key in this.ruleForm) {
                    if (this.ruleForm[key] !== '') {
                        Object.assign(info, {[key]: this.ruleForm[key] + ''});
                    }
                }
                if (this.$store.state.loginType === this.corporation) {
                    myUrl = `${url.corporation_signing}/${this.link_id}/${this.cla_lang}/${this.cla_hash}`;
                    obj = {
                        corporation_name: this.myForm.corporationName,
                        admin_name: this.myForm.authorized,
                        admin_email: this.myForm.email,
                        enabled: true,
                        info: info,
                        verification_code: this.ruleForm.code
                    };
                } else {
                    obj = {
                        name: this.myForm.name,
                        email: this.myForm.email,
                        verification_code: this.ruleForm.code,
                        info: info
                    };
                    if (this.$store.state.loginType === this.individual) {
                        myUrl = `${url.individual_signing}/${this.link_id}/${this.cla_lang}/${this.cla_hash}`;
                    } else if (this.$store.state.loginType === this.employee) {
                        myUrl = `${url.employee_signing}/${this.link_id}/${this.cla_lang}/${this.cla_hash}`;
                    }
                }

                this.sign(myUrl, obj);
            },
            sign(myUrl, obj) {
                if (!myUrl) {
                    return;
                }
                axios({
                    url: myUrl,
                    method: 'post',
                    data: obj
                }).then(res => {
                    if (this.$store.state.loginType === this.corporation) {
                        this.tipsMessage = this.$t('tips.corp_sign');
                    } else if (this.$store.state.loginType === this.employee) {
                        this.tipsMessage = this.$t('tips.emp_sign');
                    } else if (this.$store.state.loginType === this.individual) {
                        this.tipsMessage = this.$t('tips.individual_sign');
                    }
                    this.$store.commit('setSignSuccess', {
                        dialogVisible: true,
                        dialogMessage: this.tipsMessage
                    });

                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.resigned':
                                let message = '';
                                if (this.$store.state.loginType === this.corporation) {
                                    message = this.$t('tips.corp_has_signed');
                                } else {
                                    message = this.$t('tips.has_signed');
                                }
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: message
                                });
                                break;
                            case 'cla.invalid_parameter':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_parameter')
                                });
                                break;
                            case 'cla.expired_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token')
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token')
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token')
                                });
                                break;
                            case 'cla.unauthorized_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unauthorized_token')
                                });
                                break;
                            case 'cla.go_to_sign_employee_cla':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.go_to_sign_employee_cla')
                                });
                                break;
                            case 'cla.no_employee_manager':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_corp_manager')
                                });
                                break;
                            case 'cla.failed_to_send_email':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.failed_to_send_email')
                                });
                                break;
                            case 'cla.wrong_verification_code':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.wrong_verification_code')
                                });
                                break;
                            case 'cla.restricted_email_suffix':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.restricted_email_suffix')
                                });
                                break;
                            case 'cla.expired_verification_code':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.expired_verification_code')
                                });
                                break;
                            case 'cla.error_parsing_api_body':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.error_parsing_api_body')
                                });
                                break;
                            case 'cla.no_link':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_link')
                                });
                                break;
                            case 'cla.unmatched_cla':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unmatched_cla')
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.isRead) {
                            this.signCla();
                        } else {
                            this.$message.closeAll();
                            this.$message.error(this.$t('tips.review_privacy'));
                        }
                    } else {
                        return false;
                    }
                });
            },
            setClientHeight() {
                this.$nextTick(() => {
                    document.getElementById('signCla').style.minHeight = '0px';
                    if (util.getClientHeight() > document.getElementById('signCla').offsetHeight) {
                        document.getElementById('signCla').style.minHeight = util.getClientHeight() + 'px';
                    } else {
                        document.getElementById('signCla').style.minHeight = document.getElementById('signCla').offsetHeight + 'px';
                    }
                });
            }
        },
        activated() {
            if (this.signPageData) {
                if (localStorage.getItem('lang') !== undefined) {
                    this.lang = localStorage.getItem('lang').toLowerCase();
                }
                let langOptions = [];
                let langLabel = '';
                this.cla_lang = '';
                this.signPageData.forEach((item, index) => {
                    langLabel = this.upperFirstCase(item.language);
                    langOptions.push({value: index, label: langLabel});
                    if (item.language === this.lang) {
                        this.cla_lang = item.language;
                        this.value = index;
                        this.cla_hash = item.cla_hash;
                        this.setClaText({
                            link_id: this.link_id,
                            lang: this.lang,
                            hash: this.cla_hash,
                            pdfData: this.pdfData
                        });
                        this.setFields(this.value);
                    }
                });
                this.$emit('getLangOptions', langOptions);
                if (!this.cla_lang) {
                    this.lang = this.signPageData[0].language;
                    this.value = 0;
                    this.cla_hash = this.signPageData[0].cla_hash;
                    this.setClaText({
                        link_id: this.link_id,
                        lang: this.lang,
                        hash: this.cla_hash,
                        pdfData: this.pdfData
                    });
                    this.setFields(this.value);
                    localStorage.setItem('lang', this.upperFirstCase(this.lang));
                }
                this.$emit('initHeader', this.upperFirstCase(this.lang));
                this.$refs.pdf_iframe.contentWindow.onload = () => {
                    this.$refs.pdf_iframe.contentWindow.postMessage({
                        link_id: this.link_id,
                        lang: this.lang,
                        hash: this.cla_hash,
                        pdfData: this.pdfData
                    }, this.claTextUrl);
                };
            }
        },
        created() {
            this.setIframeEventListener();
            new Promise((resolve, reject) => {
                this.getSignPage(resolve);
            }).then(res => {
                this.getNowDate();
            });
        },
        mounted() {
            this.setClientHeight();
        }
    };
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    @import "../assets/font/css/Roboto-Black.css";
    @import "../assets/font/css/Roboto-Light.css";

    @media screen and (min-width: 1200px) {
        #singCla_section {
            width: 1200px;
            margin: auto;
        }
    }

    .signBtBox {
        display: flex;
        justify-content: center;
        width: 100%;

        .el-form-item__content {
            width: 100%;
            text-align: center;
        }
    }

    .dialogBt {
        margin-top: 3rem;
        width: 8rem;
        height: 3rem;
        background: linear-gradient(to right, #97DB30, #319E55);
        border-radius: 1.5rem;
        border: none;
        color: white;
        cursor: pointer;
        outline: none;

    }

    .privacy {
        cursor: pointer;
        color: #319E55;
    }

    .codeBox .el-button--medium, .codeBox .el-button {
        border-radius: 0 4px 4px 0;
    }

    .codeBox .el-input__inner {
        border-radius: 4px 0 0 4px;
    }

    .el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover {
        cursor: pointer;
        border: none;
        background: linear-gradient(to right, #97DB30, #319E55);

    }

    .pointer {
        cursor: pointer;
    }

    .verifyClass {
        padding: 10rem 0;

    }

    .borderClass {
        font-size: 1.2rem;
        margin-top: 1rem;
        padding: 1rem 0;
        border-top: 1px dashed #F3F3F3;
    }

    .form {
        border-radius: 1.25rem;
        box-shadow: 0 0 20px 10px #F3F3F3;
        padding: 2rem;
        margin-bottom: 2rem;
        font-size: 1.2rem;

        & .el-input.el-input--small.el-input-group.el-input-group--append {
            position: relative;
        }

        & .el-button.el-button--default {
            position: absolute;
            top: 0;
            left: 0;
            width: 11rem;
            height: 2.5rem;
            border-radius: 1.25rem;
            font-size: 1.2rem;
            color: white;
            margin: 0;
            font-family: Roboto-Light, sans-serif;
        }

        & .el-input-group__append {
            position: absolute;
            right: 0;
            top: 0;
            background: linear-gradient(to right, #97DB30, #319E55);
            width: 11rem;
            height: 2.5rem;
            border-radius: 1.25rem;
            padding: 0;
        }

        & .fontSize12 {
            font-size: 1.2rem;
        }

        & .el-input--small .el-input__inner {
            height: 2.5rem;
        }

        & .el-form-item__label {
            font-size: 1.2rem;
        }

        & .el-input__inner {
            background-color: #F3F3F3;
            border-radius: 1.25rem;
            border: 1px solid #F3F3F3;
            font-size: 1.2rem;
        }

        .el-input__inner:focus {
            border-color: #319E55
        }

        & .el-form-item {
            margin-bottom: 28px
        }

        & .el-checkbox__label {
            display: inline-grid;
            white-space: pre-line;
            font-size: 1.2rem;
        }

        & .el-checkbox__input.is-checked + .el-checkbox__label {
            display: inline-grid;
            white-space: pre-line;
            color: #606266;
            font-size: 1.2rem;
        }

        & .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #3EA650;
            border-color: #3EA650;
        }

        & .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #3EA650;
        }

        & .el-checkbox__inner {
            border: 1px solid #3EA650;
            width: 20px;
            height: 20px;
        }

        & .el-checkbox__inner:hover {
            border: 1px solid #3EA650;
        }

        & .el-checkbox__inner:focus {
            border: 1px solid #3EA650;
        }

        & .el-checkbox__inner:after {
            height: 10px;
            left: 7px;
            top: 2px
        }
    }

    .marginTop3rem {
        margin-top: 3rem;
    }

    .iframeClass {
        width: 100%;
        height: 900px;
        box-shadow: 0 0 20px 10px #F3F3F3;
        border-radius: 1rem;
    }

    #claBox {
        margin-bottom: 2rem;
        border-radius: 1.25rem;
        white-space: pre-wrap;
        font-size: 1.2rem;
        /*box-shadow: 0 0 20px 10px #F3F3F3;*/
        /*padding: 2rem;*/
    }

    .contentTitle {
        font-size: 2rem;
        font-weight: bold;
        margin: 2rem 0;
        text-align: center;
    }

    .size_s {
        font-size: .9rem;
    }

    #signCla {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        .requiredIcon {
            color: #F56C6C;
        }

        & .el-dialog {
            border-radius: 1rem;
        }

        .mobileBt {
            font-family: Roboto-Light, sans-serif;
            width: 100%;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin: 1rem 0;
        }

        .mobileBt:focus {
            outline: none;
        }

        #singCla_section {
            flex-grow: 1;
            font-family: Roboto-Light, sans-serif;
            padding: 0 1rem;

            & .button {
                font-family: Roboto-Light, sans-serif;
                width: 15rem;
                height: 3rem;
                border-radius: 1.5rem;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                background: linear-gradient(to right, #97DB30, #319E55);
                margin: 1rem 0;
            }

            & .button:focus {
                outline: none;
            }

            & > .content {
                padding: 1rem 0;
                text-align: left;


            }
        }

    }

</style>
