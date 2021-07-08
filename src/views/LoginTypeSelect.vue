<template>
    <el-row class="loginTypeSelect" style="height: 100%">
        <el-col id="loginType" style="height: 100%">
            <el-row style="height: 50%">
            </el-row>
            <el-row style="height: 50%">
                <el-col align="right" class="buttonBox">
                    <div id="btBox">
                        <div>
                            <el-tooltip :content="$t('index.org_bt_tip')" placement="top" effect="light"
                                        popper-class="my_tooltip">
                                <button class="button" @click="submit('orgManager')">
                                    {{$t('index.org_login')}}
                                </button>
                            </el-tooltip>

                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
    import {mapActions} from 'vuex'
    import * as util from '../util/util'

    export default {
        name: "RepoSelect",
        data() {
            return {};
        },
        methods: {
            ...mapActions(['setLoginTypeAct']),
            setDomain() {
                this.$store.commit('setDomain', window.location.href.split('/index')[0])
            },
            submit(loginType) {
                this.setLoginTypeAct(loginType);
                if (loginType === 'orgManager') {
                    this.$router.push('/platformSelect')
                }
            },
            clearSessionStorage() {
                let showHeaderMenu = sessionStorage.getItem('showHeaderMenu');
                sessionStorage.clear();
                sessionStorage.setItem('showHeaderMenu',showHeaderMenu);
                this.setDomain();
            },
        },
        created() {
            this.clearSessionStorage();
        },
        mounted() {
            util.setMinHeight('loginType', 'btBox')
        }
    }
</script>
<style scoped lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    .loginTypeSelect {
        font-family: Roboto-Bold, sans-serif;

        & > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
    }

    .buttonBox {
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .codeBox .el-input__inner {
        border-radius: 4px 0 0 4px;
    }

    .button {
        width: 22rem;
        height: 4rem;
        border-radius: 2rem;
        border: none;
        color: white;
        font-size: 1.3rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
        margin: 1.2rem 0;
    }

    .button:focus {
        outline: none;
    }
</style>
