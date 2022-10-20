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
        <ConfigEmailSelect v-model="emailDialogVisible"></ConfigEmailSelect>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
        <ReTryDialog :dialogVisible="reTryVisible" :message="reLoginMsg"></ReTryDialog>
    </el-row>
</template>

<script>
    import _cookie from 'js-cookie';
    import ReLoginDialog from '../components/ReLoginDialog';
    import ReTryDialog from '../components/ReTryDialog';
    import ConfigEmailSelect from './ConfigEmailSelect';
    export default {
        name: 'ConfigThree',
        components: {
            ConfigEmailSelect,
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
                emailDialogVisible: false,
            };
        },
        inject: ['setClientHeight'],
        methods: {
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
                this.emailDialogVisible = true;
            },
            init() {
                this.$store.commit('setEmail', '');
                this.$store.commit('setIsEmail', false);
                sessionStorage.removeItem('email');
            }
        },
        created() {
            const modifyEmailLinkId = sessionStorage.getItem('modifyEmailLinkId')
            // 存在modifyEmailLinkId，说明是/linkedRepo界面修改邮箱，需跳转过去
            if (modifyEmailLinkId) {
                this.$router.replace('/linkedRepo');
                return;
            }
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
