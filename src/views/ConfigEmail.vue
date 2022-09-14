<template>
    <el-row id="configThree">
        <div class="itemBox">
            <div class="stepTitle">
                ② {{$t('org.config_cla_email_title')}}
            </div>
            <div class="margin-top-1rem">
                {{$t('org.config_cla_email_authorize')}}
            </div>
            <div class="margin-top-1rem">
                <el-input
                        readonly=""
                        size="medium"
                        class="emailInput"
                        :placeholder="$t('org.config_cla_email_placeholder')"
                        @click.native="toAuthorizedEmail()"
                        v-model="email">
                </el-input>
            </div>
        </div>
        <div class="stepBtBox">
            <button class="step_button" @click="toPreviousPage">{{$t('org.previous_step')}}</button>
            <button class="step_button" @click="toNextPage">{{$t('org.next_step')}}</button>
        </div>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="emailDialogVisible"
                @closed="clear"
                width="35%">
            <div>
                <p :class="{word_break:this.lang==='1'}" class="dialogDesc">
                    {{$t('org.config_cla_email_platform_select')}}</p>
                <div>
                    <el-row>
                        <el-col :offset="2" :span="20">
                            <el-form label-position="left" label-width="100px" :model="emailForm">
                                <el-form-item>
                                    <template slot="label">
                                        <div class="mailboxType">
                                            {{$t('org.config_cla_mailbox_type')}}
                                        </div>
                                    </template>
                                    <el-select
                                        class="my-select"
                                        :placeholder="$t('org.config_cla_email_platform_select_placeholder')"
                                        filterable
                                        v-model="emailType"
                                        @change="changeEmailType">
                                        <el-option
                                            v-for="item in emailTypeArr"
                                            :key="item.value"
                                            :value="item.value"
                                            :label="item.label">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                </div>
                <el-row v-if="emailType === TENCENT_EMAIL" class="tencent-form">
                    <el-col :offset="2" :span="20">
                        <el-form label-position="left" label-width="100px" :model="emailForm" :rules="rules" ref="emailForm" :hide-required-asterisk="true">
                            <el-form-item prop="email">
                                <template slot="label">
                                    <div class="mailboxType">
                                        {{$t('org.config_cla_email_address')}}
                                    </div>
                                </template>
                                <el-input v-model="emailForm.email"></el-input>
                            </el-form-item>
                            <el-form-item prop="authorizeCode">
                                <template slot="label">
                                    <div class="mailboxType">
                                        {{$t('org.config_cla_authorize_code')}}
                                        <svg-icon icon-class="tips" class="tips-icon"></svg-icon>
                                    </div>
                                </template>
                                <el-input v-model="emailForm.authorizeCode">
                                    <el-button slot="append" @click="sendVerifyCode">
                                        {{$t('org.config_cla_validation_title')}}
                                    </el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="verifyCode">
                                <template slot="label">
                                    <div class="mailboxType">
                                        {{$t('signPage.verifyCode')}}
                                    </div>
                                </template>
                                <el-input v-model="emailForm.verifyCode"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <el-row class="authorize_desc">
                    <el-col :offset="2" :span="20">
                        <p class="align_center">{{$t('org.config_cla_email_authorize_desc')}}</p>
                        <ul class="align_left" :class="{word_break:this.lang==='1'}">
                            <li>{{$t('org.config_cla_email_authorize_desc1')}}</li>
                            <li>{{$t('org.config_cla_email_authorize_desc2')}}</li>
                            <li>{{$t('org.config_cla_email_authorize_desc3')}}</li>
                        </ul>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <button class="email_button" @click="authorizeEmail()">{{$t('org.confirm_remove')}}</button>
                    <button class="email_cancel" @click="emailDialogVisible = false">{{$t('org.cancel_remove')}}
                    </button>
                </div>
            </div>
        </el-dialog>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
        <ReTryDialog :dialogVisible="reTryVisible" :message="reLoginMsg"></ReTryDialog>
    </el-row>
</template>

<script>
    import * as url from '../util/api';
    import http from '../util/http';
    import _cookie from 'js-cookie';
    import ReLoginDialog from '../components/ReLoginDialog';
    import ReTryDialog from '../components/ReTryDialog';
    import * as util from '../util/util';
    const TENCENT_EMAIL = 'txmail'
    export default {
        name: 'ConfigThree',
        components: {
            ReLoginDialog,
            ReTryDialog
        },
        computed: {
            reTryVisible() {
                return this.$store.state.reTryDialogVisible;
            },
            reLoginDialogVisible() {
                return this.$store.state.orgReLoginDialogVisible;
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage;
            },
            isEmail() {
                return `${this.$store.state.isEmail}` === 'true';
            },
            email() {
                return this.$store.state.email;
            }
        },
        data() {
            return {
                loading: false,
                lang: '',
                emailDialogVisible: false,
                TENCENT_EMAIL: TENCENT_EMAIL,
                emailTypeArr: [
                    {value: 'G-Mail', label: 'G-Mail'},
                    {value: TENCENT_EMAIL, label: this.$t('org.config_cla_tencent_email')},
                ],
                emailType: '',
                emailForm: {
                    type: TENCENT_EMAIL,
                    email: '',
                    authorizeCode: '',
                    verifyCode: '',
                },
                rules: {
                    email: [
                        { required: true, message: this.$t('tips.not_fill_address'), trigger: 'blur' },
                        { pattern: EMAIL_REG, message: this.$t('tips.not_fill_email'), trigger: 'blur' },
                    ],
                    authorizeCode: [
                        { required: true, message: this.$t('tips.fill_authorize_code'), trigger: 'blur' },
                    ],
                    verifyCode: [
                        { required: true, message: this.$t('tips.fill_verification_code'), trigger: 'blur' },
                    ],
                }
            };
        },
        inject: ['setClientHeight'],
        methods: {
            clear() {
                this.emailType = '';
                this.emailForm = {
                    type: TENCENT_EMAIL,
                    email: '',
                    authorizeCode: '',
                    verifyCode: '',
                };
            },
            sendVerifyCode() {
                const validArr = ['email', 'authorizeCode'];
                let count = 0;
                validArr.forEach(item => {
                    this.$refs['emailForm'].validateField(item, (valid) => {
                        if (!valid) {
                            count++;
                        }
                    })
                })
                // 校验都通过则发送验证码
                if (count === validArr.length) {
                    let formData = new FormData();
                    const obj = {
                        email: this.emailForm.email,
                        authorize: this.emailForm.authorizeCode,
                    }
                    formData.append('data', JSON.stringify(obj));
                    http({
                        url: `${url.postEmailCode}/${TENCENT_EMAIL}`,
                        method: 'post',
                        data: formData
                    }).then(res => {
                        util.successMessage(this);
                    }).catch(err => {
                        util.catchErr(err, 'setOrgReLogin', this);
                    });
                }
            },
            toPreviousPage() {
                this.$router.replace('/config-org').then(route => {
                }).catch(err => {
                });
            },
            toNextPage() {
                if (this.email) {
                    this.$router.replace('/config-cla-link').then(route => {
                    }).catch(err => {
                    });
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.authorized_email'));
                }
            },
            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split(';');
                    let email = '';
                    cookieArr.forEach((item) => {
                        let arr = item.split('=');
                        let name = arr[0].trim();
                        let value = arr[1].trim();
                        if (name === 'email') {
                            email = value;
                        } else if (name === EMAIL_ERROR) {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.email_system_error')
                            });
                        }
                    });
                    email ? this.$store.commit('setIsEmail', true) : this.$store.commit('setIsEmail', false);
                    this.$store.commit('setEmail', email);
                }
            },
            toAuthorizedEmail() {
                this.lang = localStorage.getItem('lang');
                this.emailDialogVisible = true;
            },
            authorizeEmail() {
                if (this.emailType === 'G-Mail') {
                    this.loading = util.getLoading(this, 'tips.loading');
                    http({
                        url: url.getAuthEmail
                    }).then(res => {
                        window.location.href = res.data.data.url;
                    }).catch(err => {
                        this.loading.close();
                        util.catchErr(err, 'setOrgReLogin', this);
                    });
                } else if (this.emailType === TENCENT_EMAIL) {
                    this.$refs['emailForm'].validate((valid) => {
                        if (!valid) {
                            this.loading.close();
                        } else {
                            this.loading = util.getLoading(this, 'tips.loading');
                            let formData = new FormData();
                            const obj = {
                                email: this.emailForm.email,
                                authorize: this.emailForm.authorizeCode,
                                code: this.emailForm.verifyCode,
                            }
                            formData.append('data', JSON.stringify(obj));
                            http({
                                url: `${url.authorizeEmail}/${TENCENT_EMAIL}`,
                                method: 'post',
                                data: formData
                            }).then(res => {
                                window.location.reload();
                            }).catch(err => {
                                this.loading.close();
                                util.catchErr(err, 'setOrgReLogin', this);
                            });
                        }
                    });
                }
            },
            changeEmailType(value) {
            },
            init() {
                this.$store.commit('setEmail', '');
                this.$store.commit('setIsEmail', false);
                sessionStorage.removeItem('email');
            }
        },
        created() {
            this.getCookieData();
        },
        mounted() {
            this.setClientHeight();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path === '/') {
                    let cookie = document.cookie;
                    if (cookie) {
                        let cookieArr = cookie.split(';');
                        cookieArr.forEach((item) => {
                            let arr = item.split('=');
                            let name = arr[0].trim();
                            _cookie.remove(name, {path: '/'});
                        });
                    } else {
                        vm.init();
                    }
                }
            });
        }
    };
</script>

<style lang="less">
    #configThree {
        .my-select {
            width: 100%;
        }

        .dialog-footer {
            text-align: center;
        }

        .word_break {
            word-break: break-all;
        }

        .align_center {
            text-align: center;
        }

        .dialogDesc {
            font-size: 1.2rem;
            margin: 2rem 0;
            text-align: center;
        }

        .mailboxType {
            font-size: 1rem;
            font-weight: 600;
            height: 40px;
            line-height: 40px;
            color: #000;
        }

        .tencent-form {
            .tips-icon {
                cursor: pointer;
                width: 1.2rem;
                height: 1.2rem;
                vertical-align: text-bottom;
            }
            .el-input__inner {
                background-color: #fff;
                border: 1px solid #333;
                color: #606266;
            }
            .el-input-group__append {
                border-color: #333;
                border-top-right-radius: 1.25rem;
                border-bottom-right-radius: 1.25rem;
            }
        }

        .authorize_desc {
            padding: 2rem 0;
            font-size: 1.3rem
        }

        .email_button {
            font-family: Roboto-Regular, sans-serif;
            width: 6rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin: 1.2rem 0;
        }

        .email_button:focus {
            outline: none;
        }

        .email_cancel {
            width: 6rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: 1px solid black;
            color: black;
            font-size: 1rem;
            cursor: pointer;
            background-color: white;
            margin-left: 3rem;
        }

        .email_cancel:focus {
            outline: none;
        }

        .stepTitle {
            font-size: 1.2rem;
            padding: .5rem;
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
    }
</style>
