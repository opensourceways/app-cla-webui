<template>
    <el-row id="platformSelect" style="height: 100%">
        <el-col align="right" class="formBox">
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="icon_back">
                        <div class="icon_box">
                            <div class="loginSvg">
                                <svg-icon icon-class="gitee_new" class="loginIcon"></svg-icon>
                            </div>
                        </div>
                        <div class="icon_box">
                            <div class="loginBt">
                                <button class="button" @click="getLoginUrl('gitee')">
                                    {{$t('corp.login_in')}}
                                </button>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="icon_back">
                        <div class="icon_box">
                            <div class="loginSvg">
                                <svg-icon icon-class="github_new" class="loginIcon"></svg-icon>
                            </div>
                        </div>
                        <div class="icon_box">
                            <div class="loginBt">
                                <button class="button" @click="getLoginUrl('github')">
                                    {{$t('corp.login_in')}}
                                </button>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
        </el-col>
    </el-row>
</template>

<script>
    import {mapActions} from 'vuex';
    import * as url from '../util/api';
    import reTryDialog from '../components/ReTryDialog';
    import http from '../util/http';
    import * as util from '../util/util';

    export default {
        name: 'PlatformSelect',
        components: {
            reTryDialog
        },
        computed: {
            corpReLoginMsg() {
                return this.$store.state.dialogMessage;
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible;
            }
        },
        data() {
            return {
                platform: ''
            };
        },
        inject: ['setClientHeight'],
        methods: {
            ...mapActions(['setPlatformAct']),
            submit() {
            },
            getLoginUrl(platform) {
                this.setPlatformAct(platform);
                let interval = setInterval(() => {
                    if (this.$store.state.platform) {
                        http({
                            url: `${url.getAuthCodeUrl}/${platform}/login`
                        }).then(res => {
                            window.location.href = res.data.data.url;
                        }).catch(err => {
                            util.catchErr(err, 'errorSet', this);
                        });
                        clearInterval(interval);
                    }
                }, 100);
            }
        },
        created() {
            this.setClientHeight();
        }
    };
</script>

<style lang="less">
    #platformSelect {
        .bt_desc {
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .icon_box {
            display: flex;
            justify-content: center;
            position: relative;
        }

        .loginSvg {
            position: absolute;
            top: 2rem;
        }

        .loginBt {
            position: absolute;
            bottom: -2rem;
        }

        .icon_back {
            background-color: white;
            border-radius: 1rem;
            height: 12rem;
            width: 12rem;
            box-shadow: 0 0 20px 10px #F3F3F3;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;

        }

        .button {
            width: 9rem;
            height: 4rem;
            border-radius: 2rem;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
        }

        .button:focus {
            outline: none;
        }

        .formBox {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;

            & .el-dialog {
                border-radius: 1rem;
                text-align: center;
            }
        }

        .loginIcon {
            cursor: pointer;
            width: 6rem;
            height: 6rem;
            margin: 0 1rem;
        }
    }

</style>
