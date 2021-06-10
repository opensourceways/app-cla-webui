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
                width="35%">
            <div>
                <p :class="{keep_all:this.lang==='1'}" class="dialogDesc">
                    {{$t('org.config_cla_email_platform_select')}}</p>
                <div>
                    <el-row>
                        <el-col :offset="2" :span="20">
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
                        </el-col>
                    </el-row>
                </div>
                <el-row class="authorize_desc">
                    <el-col :offset="2" :span="20">
                        <p class="align_center">{{$t('org.config_cla_email_authorize_desc')}}</p>
                        <ul class="align_left" :class="{keep_all:this.lang==='1'}">
                            <li>{{$t('org.config_cla_email_authorize_desc1')}}</li>
                            <li>{{$t('org.config_cla_email_authorize_desc2')}}</li>
                            <li>{{$t('org.config_cla_email_authorize_desc3')}}</li>
                        </ul>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <button class="button_submit" @click="authorizeEmail()">{{$t('org.confirm_remove')}}</button>
                    <button class="cancelBt" @click="emailDialogVisible = false">{{$t('org.cancel_remove')}}</button>
                </div>
            </div>
        </el-dialog>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
        <ReTryDialog :dialogVisible="reTryVisible" :message="reLoginMsg"></ReTryDialog>
    </el-row>
</template>

<script>
    import * as url from '../util/api'
    import * as util from '../util/util'
    import http from '../util/http'
    import _cookie from 'js-cookie'
    import ReLoginDialog from '../components/ReLoginDialog'
    import ReTryDialog from '../components/ReTryDialog'

    export default {
        name: "ConfigThree",
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
            isEmail() {
                return `${this.$store.state.isEmail}` === 'true';
            },
            email() {
                return this.$store.state.email;
            },
        },
        data() {
            return {
                lang: '',
                emailDialogVisible: false,
                emailTypeArr: [{value: 'G-Mail', label: 'G-Mail'}],
                emailType: '',
            }
        },
        inject: ['setClientHeight'],
        methods: {
            toPreviousPage() {
                this.$router.replace('/config-org').then(route => {
                }).catch(err => {
                })
            },
            toNextPage() {
                if (this.email) {
                    this.$router.replace('/config-cla-link').then(route => {
                    }).catch(err => {
                    })
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.authorized_email'));
                }
            },
            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split(';');
                    let email, error_code = '';
                    cookieArr.forEach((item) => {
                        let arr = item.split('=');
                        let name = arr[0].trim();
                        let value = arr[1].trim();
                        if (name === 'email') {
                            email = value
                        } else if (name === SYSTEM_ERROR) {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.email_system_error'),
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
                if (!this.emailType) {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.chooseEmailType'))
                    return
                }
                let myUrl = '';
                switch (this.emailType) {
                    case 'G-Mail':
                        myUrl = url.getAuthEmail;
                        break;
                }
                http({
                    url: myUrl,
                    method: 'patch'
                }).then(res => {
                    window.location.href = res.data.data.url;
                }).catch(err => {
                    util.catchErr(err, 'setOrgReLogin', this)
                })
            },
            changeEmailType(value) {
            },
            init() {
                this.$store.commit('setEmail', '');
                this.$store.commit('setIsEmail', false);
                sessionStorage.removeItem('email');
            },
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
            })
        },
    }
</script>

<style lang="less">
    #configThree {
        .my-select {
            width: 100%;
        }

        .dialog-footer {
            text-align: center;
        }

        .dialogDesc {
            font-size: 1.1rem;
            margin: 2rem 0;
            text-align: center;
        }

        .authorize_desc {
            padding: 2rem 0;
            font-size: 1rem
        }

        .email_button {
            font-family: Roboto-Regular, sans-serif;
            width: 5rem;
            height: 2rem;
            border-radius: 1rem;
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
