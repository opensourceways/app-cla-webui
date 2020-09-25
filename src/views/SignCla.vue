<template>
    <el-row id="checkCLA" :style="checkCLAClass">
        <Header></Header>

        <el-row id="section">
            <el-row v-if="!isSendCode" class="content">
                <el-col :offset="4" :span="16">
                    <p class="contentTitle">"<span>{{org}}</span><span
                            v-if="repo">/{{repo}}</span><span>" {{apply_to}} </span>Contributor License Agreement</p>


                    <el-row class="marginTop3rem" id="claBox">
                    </el-row>


                    <el-row class="marginTop3rem form">
                        <el-col>
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left"
                                     label-width="25%"
                                     class="demo-ruleForm">
                                <el-form-item v-for="(item,index) in fields"
                                              :label="item.title"
                                              :required="item.required"
                                              :prop="item.id">

                                    <el-input v-if="item.type==='email'" :readonly="loginType!=='corporation'"
                                              v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>

                                    <el-input v-else-if="item.type==='date'" readonly="" v-model="ruleForm[item.id]"
                                              size="small" @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                    <el-input v-else v-model="ruleForm[item.id]" size="small"
                                              @blur="setMyForm(item.type,ruleForm[item.id])"></el-input>
                                </el-form-item>
                                <el-form-item
                                        v-if="loginType==='corporation'&&rules.code"
                                        label="Verify Code"
                                        :required="rules.code[0].required"
                                        prop="code">

                                    <el-input v-model="ruleForm.code" size="small">
                                        <el-button slot="append" :disabled="sendBtText!=='send code'"
                                                   @click="sendCode()">{{sendBtText}}
                                        </el-button>
                                    </el-input>
                                </el-form-item>
                                <div class="borderClass fontSize12"><span style="color: #F56C6C;">*</span>{{desc.metadataDesc}}
                                </div>
                                <div class="marginTop1rem fontSize12">
                                    <el-checkbox v-model="isRead"><span>I have read the <span
                                            class="privacy" @click="viewPrivacy">Privacy Policy</span> and hereby consent to
                                        the processing of my data by "{{repo}}"</span>
                                    </el-checkbox>
                                </div>
                                <el-form-item label-width="0" class="marginTop1rem signBtBox">
                                    <button class="button" type="button" @click="submitForm('ruleForm')">
                                        {{desc.sign}}
                                    </button>
                                    <!--<el-button @click="resetForm('ruleForm')">{{desc.reset}}</el-button>-->
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>

        </el-row>

        <Footer></Footer>
        <el-dialog
                :title="tipsTitle"
                top="5vh"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                :visible.sync="tipsDialogVisible"
                width="30%">
            <el-row>
                <el-col align="center">
                    <p>{{tipsMessage}}</p>
                    <button class="dialogBt" @click="clickOk()">OK</button>
                </el-col>
            </el-row>
        </el-dialog>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"
                       :title="reLoginDialogTitle"></ReLoginDialog>
    </el-row>
</template>

<script>
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'
    import * as until from '../until/until'
    import * as url from '../until/api'
    import {mapActions} from 'vuex'
    import http from '../until/http'
    import ReLoginDialog from '../components/ReLoginDialog'

    export default {

        name: "CheckCLA",
        computed: {
            loginType() {
                return this.$store.state.loginType
            },
            platform_token() {
                return this.$store.state.platform_token
            },
            access_token() {
                return this.$store.state.access_token
            },
            refresh_token() {
                return this.$store.state.refresh_token
            },
            apply_to() {
                if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    return 'individual'
                } else if (this.$store.state.loginType === 'corporation') {
                    return 'corporation'
                }
            },
            org() {
                let org = this.$store.state.repoInfo.org_id
                if (org.length > 1) {
                    return org.charAt(0).toUpperCase() + org.substring(1)
                } else {
                    return org.charAt(0).toUpperCase()
                }

            },
            reLoginDialogVisible() {
                return this.$store.state.dialogVisible
            }
            ,
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
            reLoginDialogTitle(){
                return this.$store.state.repoInfo.repo_id ? `"${this.$store.state.repoInfo.org_id}/${this.$store.state.repoInfo.repo_id}" prompt you` :
                    `"${this.$store.state.repoInfo.org_id}" prompt you`
            },
        },
        components: {
            Header,
            Footer,
            ReLoginDialog,
        }
        ,
        data() {
            return {
                domain: this.$store.state.domain,
                tipsTitle: '',
                // tipsMessage: 'Signed successfully.We have sent a notification email to your email address. Please check it',
                tipsMessage: 'Signed successfully',
                tipsDialogVisible: false,
                signPageData: '',
                cla_org_id: '',
                sendBtText: 'send code',
                claOrgIdArr: [],
                fields: [],
                claIdArr: [],
                desc: '',
                enDesc: {
                    personalContributor: 'Individual Contributor',
                    comContributor: 'Legal Entity Contributor',
                    metadataDesc: ' require field. ',
                    sign: 'SIGN',
                    reset: 'RESET',
                },
                cnDesc: {
                    personalContributor: '个人贡献者',
                    comContributor: '企业贡献者',
                    metadataDesc: '为必填项',
                    sign: '签署',
                    reset: '重置',
                },
                isVerify: false,
                isSendCode: false,
                verifyCode: '',
                platform: this.$store.state.platform,
                dialogVisible: false,
                repositoryOptions: [],
                role: '0',
                repo: this.$store.state.repoInfo.repo_id,
                ruleForm: {},
                myForm: {},
                rules: {},
                isRead: false,
                value: 0,
                languageOptions: [{
                    value: 0,
                    label: 'english'
                }, {
                    value: 1,
                    label: 'chinese'
                },],
                metadataArr: [],
                checkCLAClass: {
                    height: '',
                },

            }
        }
        ,
        methods: {
            ...
                mapActions(['setTokenAct', 'setRepoInfoAct', 'viewPrivacy', 'errorAct']),
            clickOk() {
                let url = `/sign/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}/${this.$store.state.repoInfo.repo_id}`
                this.$router.push(url)
                this.tipsDialogVisible = false;
            }
            ,
            async verifyTel(rule, value, callback) {
                if (value) {
                    let reg = /^1[3456789]\d{9}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('telephone format error'))
                    }
                } else {
                    callback(new Error('please input telephone'))
                }
            }
            ,
            async verifyAddr(rule, value, callback) {
                if (!value) {
                    callback(new Error('please input address'))
                } else {
                    callback();
                }
            }
            ,
            async verifyFormEmail(rule, value, callback) {
                let email = value;
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (reg.test(email)) {
                    callback();
                } else {
                    callback(new Error('Email format error'))
                }
            }
            ,
            setMyForm(type, value) {
                this.myForm[type] = value
            }
            ,
            sendCode() {
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                let email = this.myForm.adminEmail
                for (let item in this.myForm) {
                    if (item === 'email') {
                        email = this.myForm.email
                        break
                    }

                }
                if (!(email.trim()) || !reg.test(email) || email.split('@')[1] !== 'gmail.com') {
                    this.$message.closeAll()
                    this.$message.error('Please fill in Google email in the e-mail column')
                } else {
                    this.$axios({
                        url: '/api' + url.sendVerifyCode,
                        method: 'post',
                        data: {cla_org_id: this.cla_org_id, email: this.myForm.adminEmail},
                    }).then(res => {
                        this.$message.closeAll()
                        this.$message.success('Please fill in the verification code in the email to continue signing')
                        let second = 60
                        let codeInterval = setInterval(() => {
                            if (second !== 0) {
                                second--
                                this.sendBtText = second + 's'
                            } else {
                                this.sendBtText = 'send code'
                                clearInterval(codeInterval)
                            }
                        }, 1000)
                    }).catch(err => {
                        this.$message.closeAll()
                        this.$message.error(err.response.data)
                    })
                }

            }
            ,
            getNowDate() {
                let date = new Date();
                let year, month, day
                year = date.getFullYear()
                date.getMonth() < 9 ? month = `0${date.getMonth() + 1}` : month = date.getMonth() + 1;
                date.getDate() < 10 ? day = `0${date.getDate()}` : day = date.getDate()
                for (let item of this.fields) {
                    if (item.type === 'date') {
                        this.myForm.date = year + '-' + month + '-' + day
                        Object.assign(this.ruleForm, {[item.id]: year + '-' + month + '-' + day})
                        break;
                    }
                }
                if (this.loginType !== 'corporation') {
                    this.getEmail(this.platform_token, this.refresh_token)
                    this.getUserInfo(this.platform_token)
                }
            }
            ,
            getEmail(access_token, refresh_token) {
                this.$axios({
                    url: url.getEmail,
                    params: {access_token: access_token}
                }).then(res => {
                    for (let item of res.data) {
                        if (item.scope) {
                            if (item.scope[0] === 'primary') {
                                this.myForm.email = item.email;
                                break
                            }
                        }
                    }
                    for (let item of this.fields) {
                        if (item.type === 'email') {
                            Object.assign(this.ruleForm, {[item.id]: this.myForm.email})
                            break;
                        }
                    }
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            }
            ,

            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split('; ')
                    let access_token, refresh_token, platform_token, _mark = '';
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        arr[0] === 'access_token' ? access_token = arr[1] : arr[0] === 'refresh_token' ? refresh_token = arr[1] : arr[0] === 'platform_token' ? platform_token = arr[1] : platform_token = '';
                        if (arr[0] === '_mark') {
                            _mark = arr[1]
                        }
                    })
                    if (!_mark) {
                        let data = {access_token, refresh_token, platform_token};
                        let date = new Date();
                        date.setTime(date.getTime() - 10000);
                        document.cookie = `_mark=1; expire=${date.toUTCString()}; Domain=${this.domain}; path=/`;
                        this.setTokenAct(data);
                    }


                }

            },
            getSignPage(argRes) {
                this.changeDesc('english');
                let applyTo = '';
                if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                    applyTo = 'individual';
                } else {
                    applyTo = 'corporation';
                }
                http({
                    url: `${url.getSignPage}/${this.$store.state.repoInfo.platform}/${this.$store.state.repoInfo.org_id}/${applyTo}`,
                    params: {
                        repo_id: this.$store.state.repoInfo.repo_id,
                    },
                }).then(res => {
                    let data = res.data.data;
                    this.signPageData = data
                    if (Object.keys(data).length) {
                        this.languageOptions = []
                        for (let key in data) {
                            if (data[key].language === 'english') {
                                this.value = key;
                                this.cla_org_id = key
                                this.setClaText(key)
                                argRes('complete')
                            }
                            this.languageOptions.push({value: key, label: data[key].language})
                        }
                    }
                }).catch(err => {
                    this.errorAct({statusCode: err.status, errorCode: err.data.data.error_code})

                })
            },
            changeLanguage(value) {
                this.changeDesc(this.languageOptions[value].label);
                this.setClaText(value)
                this.cla_org_id = value
            },
            changeDesc(language) {
                if (language === 'english') {
                    this.desc = this.enDesc;
                } else if (language === 'chinese') {
                    this.desc = this.cnDesc;
                }
            },
            getUserInfo(platform_token) {
                let obj = {access_token: platform_token};
                this.$axios({
                    url: url.getUserInfo,
                    params: obj,
                }).then(res => {
                    this.myForm.name = res.data.login
                    for (let item of this.fields) {
                        if (item.type === 'name') {
                            Object.assign(this.ruleForm, {[item.id]: this.myForm.name})
                            break;
                        }
                    }
                }).catch(err => {
                })
            }
            ,
            setClaText(key) {
                let form = {}
                let rules = {}
                document.getElementById('claBox').innerHTML = this.signPageData[key].text;
                for (let i = 0; i < this.signPageData[key].fields.length; i++) {
                    for (let j = i + 1; j < this.signPageData[key].fields.length; j++) {
                        if (Number(this.signPageData[key].fields[i].id) > Number(this.signPageData[key].fields[j].id)) {
                            let field = this.signPageData[key].fields[i]
                            this.signPageData[key].fields[i] = this.signPageData[key].fields[j]
                            this.signPageData[key].fields[j] = field
                        }
                    }
                }
                this.fields = this.signPageData[key].fields
                this.fields.forEach(item => {
                    Object.assign(form, {[item.id]: ''})
                    if (item.type === 'name') {
                        Object.assign(this.myForm, {name: ''})
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {required: item.required, message: 'please input name', trigger: ['blur', 'change']},
                            ],
                        })
                    } else if (item.type === 'corporationName') {
                        Object.assign(this.myForm, {corporationName: ''})
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    message: 'please input corporationName',
                                    trigger: ['blur', 'change']
                                },
                            ],
                        })
                    } else if (item.type === 'adminEmail') {
                        Object.assign(this.myForm, {adminEmail: ''})
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {
                                    required: item.required,
                                    message: 'please input adminEmail',
                                    trigger: ['blur', 'change']
                                },
                            ],
                        })
                    } else if (item.type === 'date') {
                        Object.assign(this.myForm, {date: ''})
                        item.required && Object.assign(rules, {
                            [item.id]: [
                                {required: item.required, message: 'please input date', trigger: ['blur', 'change']}],
                        })
                    } else if (item.type === 'email') {
                        Object.assign(this.myForm, {email: ''})
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyFormEmail,
                                trigger: 'blur'
                            }],
                        })
                    } else if (item.type === 'telephone') {
                        Object.assign(this.myForm, {telephone: ''})
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyTel,
                                trigger: 'blur'
                            }],
                        })
                    } else if (item.type === 'address') {
                        Object.assign(this.myForm, {address: ''})
                        item.required && Object.assign(rules, {
                            [item.id]: [{
                                required: item.required,
                                validator: this.verifyAddr,
                                trigger: 'blur'
                            }],
                        })
                    }
                })
                Object.assign(form, {code: ''})
                Object.assign(this.myForm, {code: ''})
                Object.assign(rules, {
                    code: [{
                        required: true,
                        message: 'Please enter the verification code',
                        trigger: ['blur', 'change']
                    },]
                })
                this.ruleForm = form
                this.rules = rules
            }
            ,
            toHome() {
                this.$router.push('/home')
            }
            ,
            signCla() {
                let info = {}
                let myUrl = '';
                let obj = {};
                for (let key in this.ruleForm) {
                    if (this.ruleForm[key] !== '') {
                        Object.assign(info, {[key]: this.ruleForm[key] + ''})
                    }
                }
                if (this.$store.state.loginType === 'individual') {
                    myUrl = `${url.individual_signing}/${this.cla_org_id}`;
                    obj = {
                        name: this.myForm.name,
                        email: this.myForm.email,
                        info: info,
                    }
                } else if (this.$store.state.loginType === 'corporation') {
                    myUrl = url.corporation_signing;
                    obj = {
                        cla_org_id: this.cla_org_id,
                        corporation_name: this.myForm.corporationName,
                        admin_name: this.myForm.name,
                        admin_email: this.myForm.adminEmail,
                        enabled: true,
                        info: info,
                        verifi_code: this.ruleForm.code,
                    }
                    console.log(obj);
                } else if (this.$store.state.loginType === 'employee') {
                    myUrl = `${url.employee_signing}/${this.cla_org_id}`;
                    obj = {
                        name: this.myForm.name,
                        email: this.myForm.email,
                        info: info,
                    }
                }

                this.sign(myUrl, obj)
            }
            ,
            sign(myUrl, obj) {
                http({
                    url: myUrl,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    this.tipsTitle = this.$store.state.repoInfo.repo_id ? `"${this.$store.state.repoInfo.org_id}/${this.$store.state.repoInfo.repo_id}" prompt you` :
                        `"${this.$store.state.repoInfo.org_id}" prompt you`
                    if (this.$store.state.loginType === 'corporation') {
                        this.tipsMessage = 'We have sent a notification email to your email address. Please check it.And please complete the signature according to the prompt in the email'
                    } else if (this.$store.state.loginType === 'employee') {
                        this.tipsMessage = 'We have sent a notification email to your email address. Please check it,And email the administrator of your company to audit'
                    }
                    this.tipsDialogVisible = true;
                }).catch(err => {
                    this.errorAct({statusCode: err.status, errorCode: err.data.data.error_code})
                })
            }
            ,
            clearForm() {
                if (this.$store.state.loginType === 'employee' || this.$store.state.loginType === 'individual') {
                    for (let key in this.ruleForm) {
                        if (key !== '1' && key !== '2') {
                            this.ruleForm[key] = ''
                        }
                    }
                } else {
                    for (let key in this.ruleForm) {
                        if (key !== '3') {
                            this.ruleForm[key] = ''
                        }
                    }
                }
            }
            ,
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.isRead) {
                            this.signCla();
                        } else {
                            this.$message.closeAll()
                            this.$message.error('Please read the privacy statement')
                        }
                    } else {
                        return false;
                    }
                });
            }
            ,
            getRepositoriesOfOrg(org, org_id) {
                let obj = {access_token: this.$store.state.access_token, org: org, page: 1, per_page: 10};
                this.$axios({
                    url: `https://gitee.com/api/v5/orgs/${org}/repos`,
                    params: obj,
                }).then(res => {
                    this.repositoryOptions = [];
                    res.data.forEach((item, index) => {
                        this.repositoryOptions.push({
                            value: index,
                            org: org,
                            org_id: org_id,
                            repoName: item.name,
                            label: `${org}/${item.name}`,
                            id: item.id
                        });
                    })
                }).catch(err => {
                    this.$message.closeAll()
                    this.$message.error(err.response.data)
                })
            }
            ,
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
            ,
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('checkCLA').offsetHeight ?
                        this.checkCLAClass.height = until.getClientHeight() + 'px' :
                        this.checkCLAClass.height = document.getElementById('checkCLA').offsetHeight
                })
            }
            ,
        }
        ,
        created() {
            this.getCookieData()
            new Promise(resolve => {
                this.getSignPage(resolve);
            }, reject => {
            }).then(res => {
                this.getNowDate()
            }, err => {
            })
        }
        ,
        mounted() {
            this.setClientHeight();
        }
    }
    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('checkCLA').offsetHeight) {
            document.getElementById("checkCLA").style.height = until.getClientHeight() + 'px'
        }
    }
</script>

<style lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    @import "../assets/font/css/Roboto-Black.css";
    @import "../assets/font/css/Roboto-Light.css";

    .signBtBox {
        display: flex;
        justify-content: center;
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

    .button {
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

    .button:focus {
        outline: none;
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
            width: 10rem;
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
            width: 10rem;
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

    .marginTop1rem {
        margin-top: 1rem;
    }

    #claBox {
        /*border-bottom: 1px dashed lightgrey;*/
        /*padding-bottom: 2rem;*/
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

    #checkCLA {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;

        & .el-dialog {
            border-radius: 1rem;
        }

        & > #section {
            flex-grow: 1;
            font-family: Roboto-Light, sans-serif;

            & > .content {
                padding: 1rem;
                text-align: left;


            }
        }

    }

</style>