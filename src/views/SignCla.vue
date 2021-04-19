<template>
    <el-row id="signCla">
        <Header></Header>
        <div id="singCla_section">
            <el-row class="content">
                <el-col>
                    <p class="contentTitle"><span>{{apply_to}}</span>{{ $t('signPage.claTitle') }}</p>
                    <el-row class="marginTop3rem" id="claBox">{{cla_text}}
                    </el-row>
                    <el-row v-if="cla_lang" class="marginTop3rem form">
                        <el-col>
                            <el-form v-if="this.IS_MOBILE" :model="ruleForm" :rules="rules" ref="ruleForm"
                                     label-position="left"
                                     label-width="25%"
                                     class="demo-ruleForm">
                                <el-form-item v-for="(item,index) in fields"
                                              label-width="0"
                                              :required="item.required"
                                              :prop="item.id">
                                    <div><span v-if="item.required" class="requiredIcon">*</span>{{item.title}}</div>
                                    <el-input v-if="item.type==='email'"
                                              :placeholder="$t('signPage.holder',{title:item.title})"
                                              v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                    <el-input v-else-if="item.type==='date'" readonly="" v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                    <el-input v-else v-model="ruleForm[item.id]"
                                              :placeholder="$t('signPage.holder',{title:item.title})" size="small"
                                              @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                </el-form-item>
                                <el-form-item
                                        :required="rules.code[0].required"
                                        label-width="0"
                                        prop="code">
                                    <div><span v-if="rules.code[0].required" class="requiredIcon">*</span>{{$t('signPage.verifyCode')}}
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
                                <div class="borderClass fontSize12"><span style="color: #F56C6C;">*</span>{{$t('signPage.requireText')}}
                                </div>
                                <div class="margin-top-1rem fontSize12">
                                    <el-checkbox v-model="isRead"><span>{{$t('signPage.checkBoxText1')}}<span
                                            class="privacy" @click="">{{$t('signPage.privacy')}}</span>{{$t('signPage.checkBoxText2')}}
                                        <span>{{$t('signPage.claSignPlatform')}}</span>{{$t('signPage.checkBoxText3')}}</span>
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
                                              :prop="item.id">
                                    <el-input v-if="item.type==='email'"
                                              :placeholder="$t('signPage.holder',{title:item.title})"
                                              v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                    <el-input v-else-if="item.type==='date'" readonly="" v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                    <el-input v-else v-model="ruleForm[item.id]"
                                              :placeholder="$t('signPage.holder',{title:item.title})" size="small"
                                              @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                </el-form-item>
                                <el-form-item
                                        :label="$t('signPage.verifyCode')"
                                        :required="rules.code[0].required"
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
                                            class="privacy" @click="">{{$t('signPage.privacy')}}</span>{{$t('signPage.checkBoxText2')}}
                                        <span>{{$t('signPage.claSignPlatform')}}</span>{{$t('signPage.checkBoxText3')}}</span>
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
        <Footer></Footer>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
        <ReTryDialog :dialogVisible="reTryDialogVisible" :message="reLoginMsg"></ReTryDialog>
        <SignSuccessDialog :dialogVisible="signSuccessDialogVisible" :message="reLoginMsg"></SignSuccessDialog>
        <SignReLoginDialog :dialogVisible="signReLoginDialogVisible" :message="reLoginMsg"></SignReLoginDialog>
        <TokenErrorDialog @checkAction="checkTokenType" :dialogVisible="tokenErrorDialogVisible"
                          :message="reLoginMsg"></TokenErrorDialog>
    </el-row>
</template>

<script>
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'
    import * as util from '../util/util'
    import * as url from '../util/api'
    import {mapActions} from 'vuex'
    import http from '../util/sign_http'
    import axios from '../util/_axios'
    import cookie from 'js-cookie'
    import ReLoginDialog from '../components/ReLoginDialog'
    import ReTryDialog from '../components/ReTryDialog'
    import SignSuccessDialog from '../components/SignSuccessDialog'
    import SignReLoginDialog from '../components/SignReLoginDialog'
    import TokenErrorDialog from '../components/TokenErrorDialog'

    export default {

        name: "SignCla",
        computed: {
            loginType() {
                return this.$store.state.loginType
            },
            apply_to() {
                if (this.$store.state.loginType === 'individual') {
                    return this.$t('signPage.individual')
                } else if (this.$store.state.loginType === 'corporation') {
                    return this.$t('signPage.corp')
                } else if (this.$store.state.loginType === 'employee') {
                    return this.$t('signPage.emp')
                }
            },
            org() {
                let org = this.$store.state.repoInfo.org_id;
                if (org.length > 1) {
                    return org.charAt(0).toUpperCase() + org.substring(1)
                } else {
                    return org.charAt(0).toUpperCase()
                }
            },
            reLoginDialogVisible() {
                return this.$store.state.dialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
            reTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
            signSuccessDialogVisible() {
                return this.$store.state.signSuccessDialogVisible
            },
            signReLoginDialogVisible() {
                return this.$store.state.signReLoginDialogVisible
            },
            tokenErrorDialogVisible() {
                return this.$store.state.tokenErrorDialogVisible
            },
            sendBtTextFromLang: {
                get: function () {
                    return this.sendBtText;
                },
                set: function (value) {
                    this.sendBtText = value
                }
            },
        },
        watch: {
            '$i18n.locale'() {
                this.cla_lang = '';
                if (localStorage.getItem('lang') === '0') {
                    this.lang = 'english'
                } else if (localStorage.getItem('lang') === '1') {
                    this.lang = 'chinese'
                }
                this.signPageData.forEach((item, index) => {
                    if (item.language === this.lang) {
                        this.cla_lang = item.language;
                        this.value = index;
                        this.cla_hash = item.cla_hash;
                        this.cla_text = item.text;
                        this.fields = item.fields;
                        if (Object.keys(this.rules).length === 0) {
                            this.setFieldsData();
                        }
                    }
                });
                if (!this.cla_lang) {
                    this.cla_text = '';
                    this.fields = [];
                    this.$message.closeAll();
                    this.$message.error({
                        message: this.$t('tips.no_lang', {language: this.lang}),
                        duration: 8000
                    })
                }
                if (this.sendBtTextFromLang === 'send code' || this.sendBtTextFromLang === '发送验证码') {
                    this.sendBtTextFromLang = this.$t('signPage.sendCode')
                } else {
                    this.sendBtTextFromLang = this.$t('signPage.reSendCode', {second: this.second})
                }
                this.$refs['ruleForm'] && this.$refs['ruleForm'].fields.forEach(item => {
                    if (item.validateState === 'error') {
                        this.$refs['ruleForm'].validateField(item.labelFor)
                    }
                });

            },
        },
        components: {
            Header,
            Footer,
            ReLoginDialog,
            ReTryDialog,
            SignSuccessDialog,
            SignReLoginDialog,
            TokenErrorDialog,
        },
        data() {
            return {
                action: '',
                lang: '',
                cla_hash: '',
                second: '',
                sendBtText: this.$t('signPage.sendCode'),
                signRouter: this.$store.state.signRouter,
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
                platform: this.$store.state.repoInfo.platform,
                dialogVisible: false,
                repositoryOptions: [],
                role: '0',
                repo: this.$store.state.repoInfo.repo_id,
                ruleForm: {},
                myForm: {},
                rules: {},
                isRead: false,
                value: '',
                languageOptions: [{
                    value: 0,
                    label: 'English'
                }, {
                    value: 1,
                    label: 'Chinese'
                },],
                metadataArr: [],
                cla_lang: '',
                cla_text: '',
            }
        },
        methods: {
            ...mapActions(['setTokenAct', 'setRepoInfoAct', 'viewPrivacy']),
            async requireVerifyTel(rule, value, callback) {
                if (value) {
                    let reg = /^1[3456789]\d{9}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error(this.$t('tips.invalid_telephone_num')))
                    }
                } else {
                    callback(new Error(this.$t('tips.not_fill_telephone_num')))
                }
            },
            async verifyTel(rule, value, callback) {
                if (value) {
                    let reg = /^1[3456789]\d{9}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error(this.$t('tips.invalid_telephone_num')))
                    }
                }
            },
            async verifyAddr(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.not_fill_address')))
                } else {
                    callback();
                }
            },
            async verifyFax(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.not_fill_fax')))
                } else {
                    callback();
                }
            },
            async verifyFormEmail(rule, value, callback) {
                let email = value.trim();
                let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,6}$/;
                if (reg.test(email)) {
                    callback();
                } else {
                    callback(new Error(this.$t('tips.invalid_email')))
                }
            },
            async verifyName(rule, value, callback) {
                if (value) {
                    callback();
                } else {
                    callback(new Error(this.$t('tips.fill_name')))
                }
            },
            async verifyCorpName(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_corp_name')))
                } else {
                    callback();
                }
            },
            async verifyTitle(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_representative_title')))
                } else {
                    callback();
                }
            },
            async verifyAuthorized(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_representative_name')))
                } else {
                    callback();
                }
            },
            async verifyDate(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_date')))
                } else {
                    callback();
                }
            },
            async verifyCodeCheck(rule, value, callback) {
                if (!value) {
                    callback(new Error(this.$t('tips.fill_verification_code')))
                } else {
                    callback();
                }
            },
            setMyForm(type, value) {
                this.myForm[type] = value
            },
            sendCode() {
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                let email = this.myForm.email;
                let myHttp = '';
                if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    myHttp = http
                } else {
                    myHttp = axios
                }
                if (email && reg.test(email)) {
                    myHttp({
                        url: `${url.sendVerifyCode}/${this.link_id}/${this.myForm.email}`,
                        method: 'post',
                    }).then(res => {
                        this.$message.closeAll();
                        this.$message.success({message: this.$t('tips.sending_email'), duration: 8000});
                        this.second = 60;
                        let codeInterval = setInterval(() => {
                            if (this.second !== 0) {
                                this.second--;
                                this.sendBtTextFromLang = this.$t('signPage.reSendCode', {second: this.second})
                            } else {
                                this.sendBtTextFromLang = this.$t('signPage.sendCode');
                                clearInterval(codeInterval)
                            }
                        }, 1000)
                    }).catch(err => {
                        if (err.data && err.data.hasOwnProperty('data')) {
                            switch (err.data.data.error_code) {

                                case 'cla.invalid_parameter':
                                    this.$store.commit('setSignReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.invalid_parameter'),
                                    });
                                    break;
                                case 'cla.invalid_token':
                                    this.$store.commit('setSignReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.invalid_token'),
                                    });
                                    break;
                                case 'cla.missing_token':
                                    this.$store.commit('setSignReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.missing_token'),
                                    });
                                    break;
                                case 'cla.unknown_token':
                                    this.$store.commit('setSignReLogin', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.unknown_token'),
                                    });
                                    break;

                                case 'cla.failed_to_send_email':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.failed_to_send_email'),
                                    });
                                    break;

                                case 'cla.not_same_corp':
                                    this.$store.commit('errorCodeSet', {
                                        dialogVisible: true,
                                        dialogMessage: this.$t('tips.not_same_corp'),
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
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.not_fill_email'))
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
            getActionFromCookie() {
            },
            setData(res, resolve) {
                if (res && res.data.data) {
                    if (res.data.data.clas && res.data.data.clas.length) {
                        this.signPageData = res.data.data.clas;
                        this.languageOptions = [];
                        this.link_id = res.data.data.link_id;
                        if (localStorage.getItem('lang') === '0') {
                            this.lang = 'english'
                        } else if (localStorage.getItem('lang') === '1') {
                            this.lang = 'chinese'
                        }
                        this.signPageData.forEach((item, index) => {
                            if (item.language === this.lang) {
                                this.cla_lang = item.language;
                                this.value = index;
                                this.cla_hash = item.cla_hash;
                                this.cla_text = item.text;
                                this.setFields(this.value);
                                this.setFieldsData();
                                resolve('complete')
                            }
                            this.languageOptions.push({value: index, label: item.language})
                        });
                        if (!this.cla_lang) {
                            this.$message.closeAll();
                            this.$message.error({
                                message: this.$t('tips.no_lang', {language: this.lang}),
                                duration: 8000
                            })
                        }
                    } else {
                        let message = '';
                        if (this.$store.state.loginType === 'corporation') {
                            message = this.$t('tips.no_cla_binding_corp')
                        } else if (this.$store.state.loginType === 'employee') {
                            message = this.$t('tips.no_cla_binding_emp')
                        }
                        if (this.$store.state.loginType === 'individual') {
                            message = this.$t('tips.no_cla_binding_individual')
                        }
                        this.$store.commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: message,
                        });
                    }
                }
            },
            getSignPage(resolve) {
                let applyTo = '';
                let _url = '';
                let _http = '';
                if
                (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    applyTo = 'individual';
                    _http = http;
                } else if (this.$store.state.loginType === 'corporation') {
                    applyTo = 'corporation';
                    _http = axios;
                }
                if (this.$store.state.repoInfo.repo_id) {
                    _url = `${url.getSignPage}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}:${this.$store.state.repoInfo.repo_id}/${applyTo}`
                } else {
                    _url = `${url.getSignPage}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}/${applyTo}`
                }
                _http({
                    url: _url,
                }).then(res => {
                    this.setData(res, resolve)
                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.no_cla_binding':
                                let message = '';
                                if (this.$store.state.loginType === 'corporation') {
                                    message = this.$t('tips.no_cla_binding_corp')
                                } else if (this.$store.state.loginType === 'employee') {
                                    message = this.$t('tips.no_cla_binding_emp')
                                }
                                if (this.$store.state.loginType === 'individual') {
                                    message = this.$t('tips.no_cla_binding_individual')
                                }
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: message,
                                });
                                break;
                            case 'cla.invalid_parameter':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_parameter'),
                                });
                                break;
                            case 'cla.no_corp_manager':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_corp_manager'),
                                });
                                break;
                            case 'cla.has_not_signed':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.has_not_signed'),
                                });
                                break;
                            case 'cla.invalid_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.expired_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token'),
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token'),
                                });
                                break;
                            case 'cla.uncompleted_signing':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.uncompleted_signing'),
                                });
                                break;
                            case 'cla.unknown_email_platform':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_email_platform'),
                                });
                                break;
                            case 'cla.pdf_has_not_uploaded':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.pdf_has_not_uploaded'),
                                });
                                break;
                            case 'cla.not_same_corp':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.not_same_corp'),
                                });
                                break;
                            case 'cla.not_ready_to_sign':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.not_ready_to_sign'),
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
            setFields(key) {
                for (let i = 0; i < this.signPageData[key].fields.length; i++) {
                    for (let j = i + 1; j < this.signPageData[key].fields.length; j++) {
                        if (Number(this.signPageData[key].fields[i].id) > Number(this.signPageData[key].fields[j].id)) {
                            let field = this.signPageData[key].fields[i];
                            this.signPageData[key].fields[i] = this.signPageData[key].fields[j];
                            this.signPageData[key].fields[j] = field
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
                                },
                            ],
                        })
                    } else if (item.type === 'corporationName') {
                        Object.assign(this.myForm, {corporationName: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyCorpName,
                                    trigger: ['blur', 'change']
                                },
                            ],
                        })
                    } else if (item.type === 'title') {
                        Object.assign(this.myForm, {title: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyTitle,
                                    trigger: ['blur', 'change']
                                },
                            ],
                        })
                    } else if (item.type === 'authorized') {
                        Object.assign(this.myForm, {authorized: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyAuthorized,
                                    trigger: ['blur', 'change']
                                },
                            ],
                        })
                    } else if (item.type === 'date') {
                        Object.assign(this.myForm, {date: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    validator: this.verifyDate,
                                    trigger: ['blur', 'change']
                                }],
                        })
                    } else if (item.type === 'email') {
                        Object.assign(this.myForm, {email: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyFormEmail,
                                trigger: ['blur', 'change']
                            }],
                        })
                    } else if (item.type === 'telephone') {
                        Object.assign(this.myForm, {telephone: ''});
                        if (item.required) {
                            Object.assign(rules, {
                                [item.id]: [{
                                    required: item.required,
                                    validator: this.requireVerifyTel,
                                    trigger: ['blur', 'change']
                                }],
                            })
                        } else {
                            Object.assign(rules, {
                                [item.id]: [{
                                    validator: this.verifyTel,
                                    trigger: ['blur', 'change']
                                }],
                            })
                        }
                    } else if (item.type === 'address') {
                        Object.assign(this.myForm, {address: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyAddr,
                                trigger: ['blur', 'change']
                            }],
                        })
                    } else if (item.type === 'fax') {
                        Object.assign(this.myForm, {fax: ''});
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyFax,
                                trigger: ['blur', 'change']
                            }],
                        })
                    }
                });
                Object.assign(form, {code: ''});
                Object.assign(this.myForm, {code: ''});
                Object.assign(rules, {
                    code: [{
                        required: true,
                        validator: this.verifyCodeCheck,
                        trigger: ['blur', 'change']
                    },]
                });
                this.ruleForm = form;
                this.rules = rules
            },
            signCla() {
                let info = {};
                let myUrl = '';
                let obj = {};
                for (let key in this.ruleForm) {
                    if (this.ruleForm[key] !== '') {
                        Object.assign(info, {[key]: this.ruleForm[key] + ''})
                    }
                }
                if (this.$store.state.loginType === 'corporation') {
                    myUrl = `${url.corporation_signing}/${this.link_id}/${this.cla_lang}/${this.cla_hash}`;
                    obj = {
                        corporation_name: this.myForm.corporationName,
                        admin_name: this.myForm.authorized,
                        admin_email: this.myForm.email,
                        enabled: true,
                        info: info,
                        verification_code: this.ruleForm.code
                    }
                } else {
                    obj = {
                        name: this.myForm.name,
                        email: this.myForm.email,
                        verification_code: this.ruleForm.code,
                        info: info,
                    }
                    if (this.$store.state.loginType === 'individual') {
                        myUrl = `${url.individual_signing}/${this.link_id}/${this.cla_lang}/${this.cla_hash}`;
                    } else if (this.$store.state.loginType === 'employee') {
                        myUrl = `${url.employee_signing}/${this.link_id}/${this.cla_lang}/${this.cla_hash}`;
                    }
                }
                this.sign(myUrl, obj)
            },
            sign(myUrl, obj) {
                if (!myUrl) {
                    return
                }
                http({
                    url: myUrl,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    if (this.$store.state.loginType === 'corporation') {
                        this.tipsMessage = this.$t('tips.corp_sign')
                    } else if (this.$store.state.loginType === 'employee') {
                        this.tipsMessage = this.$t('tips.emp_sign')
                    }
                    this.$store.commit('setSignSuccess', {
                        dialogVisible: true,
                        dialogMessage: this.tipsMessage,
                    });

                }).catch(err => {
                    if (err.data && err.data.hasOwnProperty('data')) {
                        switch (err.data.data.error_code) {
                            case 'cla.resigned':
                                let message = '';
                                if (this.$store.state.loginType === 'corporation') {
                                    message = this.$t('tips.corp_has_signed');
                                } else {
                                    message = this.$t('tips.has_signed')
                                }
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: message,
                                });
                                break;
                            case 'cla.invalid_parameter':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_parameter'),
                                });
                                break;
                            case 'cla.expired_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.invalid_token'),
                                });
                                break;
                            case 'cla.missing_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token'),
                                });
                                break;
                            case 'cla.unknown_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unknown_token'),
                                });
                                break;
                            case 'cla.unauthorized_token':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unauthorized_token'),
                                });
                                break;
                            case 'cla.go_to_sign_employee_cla':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.go_to_sign_employee_cla'),
                                });
                                break;
                            case 'cla.no_employee_manager':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_corp_manager'),
                                });
                                break;
                            case 'cla.failed_to_send_email':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.failed_to_send_email'),
                                });
                                break;
                            case 'cla.wrong_verification_code':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.wrong_verification_code'),
                                });
                                break;
                            case 'cla.expired_verification_code':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.expired_verification_code'),
                                });
                                break;
                            case 'cla.not_same_corp':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.not_same_corp'),
                                });
                                break;
                            case 'cla.error_parsing_api_body':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.error_parsing_api_body'),
                                });
                                break;
                            case 'cla.unmatched_email':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unmatched_email'),
                                });
                                break;
                            case 'cla.unmatched_user_id':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unmatched_user_id'),
                                });
                                break;
                            case 'cla.no_link':
                                this.$store.commit('setSignReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.no_link'),
                                });
                                break;
                            case 'cla.unmatched_cla':
                                this.$store.commit('errorCodeSet', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.unmatched_cla'),
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.isRead) {
                            this.signCla();
                        } else {
                            this.$message.closeAll();
                            this.$message.error(this.$t('tips.review_privacy'))
                        }
                    } else {
                        return false;
                    }
                });
            },
            setClientHeight() {
                this.$nextTick(() => {
                    document.getElementById("signCla").style.minHeight = '0px';
                    if (util.getClientHeight() > document.getElementById('signCla').offsetHeight) {
                        document.getElementById("signCla").style.minHeight = util.getClientHeight() + 'px'
                    } else {
                        document.getElementById("signCla").style.minHeight = document.getElementById('signCla').offsetHeight + 'px'
                    }
                })
            },
            checkTokenType() {
                this.getActionFromCookie()
                if (this.action === 'login') {
                    this.$store.commit('setTokenErrorReLogin', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.quitLoginTip', {platform: this.$store.state.platform}),
                    });
                }
            },
        },
        created() {
            new Promise((resolve, reject) => {
                this.getSignPage(resolve);
            }).then(res => {
                this.getNowDate()
            })
        },
        mounted() {
            this.setClientHeight();
            window.onresize = () => {
                if (util.getClientHeight() > document.getElementById('signCla').offsetHeight) {
                    document.getElementById("signCla").style.minHeight = util.getClientHeight() + 'px'
                }
            }
        },
        destroyed() {
            window.onresize = null;
        }
    }
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

    #claBox {
        margin-bottom: 2rem;
        border-radius: 1.25rem;
        white-space: pre-wrap;
        font-size: 1.2rem;
        box-shadow: 0 0 20px 10px #F3F3F3;
        padding: 2rem;
    }

    .contentTitle {
        font-size: 2rem;
        font-weight: bold;
        margin: 2rem 0;
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
