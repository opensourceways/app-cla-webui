<template>
    <div class="parentBox">
        <el-row class="headerBox">
            <el-col class="header">
                <div class="box" @click="toIndex">
                    <svg-icon icon-class="logo" class="icon"></svg-icon>
                </div>
                <div>
                    <div v-if="showHeaderMenu==='corp'">
                        <div class="grayColor">
                            <span>{{communityInfo}}</span>
                            <span class="margin-left-1rem">{{this.$store.state.loginInfo.userName}}</span>
                        </div>
                    </div>
                    <div>
                        <div v-if="showHeaderMenu" class="menuBox">
                            <div class="userImgBox" id="imgBox">
                                <div id="svgCover" class="svgCover" @click="openOrCloseMenu()">

                                </div>
                                <svg-icon id="defaultImg" class="userImg"
                                          icon-class="default-user"></svg-icon>
                            </div>
                            <div v-if="menuVisible" id="menuOption">
                                <div v-if="loginRole==='org'" @click="handleCommand('a')">
                                    {{$t('header.home')}}
                                </div>
                                <div v-if="loginRole==='corp'&&role==='admin'" @click="handleCommand('b')">
                                    {{$t('header.manager')}}
                                </div>
                                <div v-if="loginRole==='corp'&&role==='manager'" @click="handleCommand('c')">
                                    {{$t('header.emp')}}
                                </div>
                                <div v-if="loginRole==='corp'&&role==='admin'" @click="handleCommand('d')">
                                    {{$t('header.SubEmail')}}
                                </div>
                                <div v-if="loginRole==='corp'&&role==='admin'" @click="handleCommand('e')">
                                    {{$t('header.createManager')}}
                                </div>
                                <div v-if="loginRole==='corp'" @click="handleCommand('f')">
                                    {{$t('header.resetPwd')}}
                                </div>
                                <div v-if="loginRole==='corp'&&role==='admin'" @click="handleCommand('g')">
                                    {{$t('header.corpCla')}}
                                </div>
                                <div @click="handleCommand('h')">
                                    {{$t('header.loginOut')}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="my_select_box">
                            <el-row id="my_select" class="my_select" @click.native="clickSelect()">
                                <el-col id="select_content" :span="20" class="select_content">
                                    {{language}}
                                </el-col>
                                <el-col id="select_icon_box" :span="4" class="select_content">
                                    <svg-icon id="select_icon" icon-class="arrow"></svg-icon>
                                </el-col>
                            </el-row>
                            <div id="my_option" :class="{'visible':isActive}">
                                <div
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    <div style="width: 100%" @click="chooseLng(item.value)">
                                        <div>
                                            <div :class="{'isShow':value!==item.value,'mark':item.label}">
                                            </div>
                                        </div>

                                        <div>
                                            {{item.label}}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import http from '../util/http'
    import * as url from '../util/api'
    import * as util from '../util/util'

    export default {
        name: "NewHeader",
        computed: {
            communityInfo() {
                if (this.$store.state.loginInfo.userInfo[0].repo_id) {
                    return `${this.$store.state.loginInfo.userInfo[0].org_id}/${this.$store.state.loginInfo.userInfo[0].repo_id}`
                }
                return this.$store.state.loginInfo.userInfo[0].org_id
            },
        },
        data() {
            return {
                role: '',
                loginRole: '',
                showHeaderMenu: true,
                menuVisible: false,
                isActive: true,
                language: 'English',
                value: 0,
                visible: {
                    visibility: 'hidden',
                },
                options: [{value: 0, label: 'English'}, {value: 1, label: 'Chinese'}]
            }
        },
        methods: {
            updateLangOptions(data) {
                this.options = data
            },
            toIndex() {
                if (this.$route.path === '/corporationManagerLogin' || this.$route.path === '/platformSelect') {
                    this.$router.push('/')
                } else if (this.$route.path === '/corporationList' || this.$route.path === '/addCorpUrl' || this.$route.path === '/config-check'
                    || this.$route.path === '/addIndividualUrl' || this.$route.path === '/config-org' || this.$route.path === '/config-email'
                    || this.$route.path === '/config-cla-link' || this.$route.path === '/config-fields') {
                    this.$router.push('/linkedRepo')
                } else if (this.$route.path === '/createManager') {
                    this.$router.push('/managerList')
                } else if (this.$route.path === '/resetPassword') {
                    if (this.$store.state.loginInfo.userInfo[0].role === 'manager') {
                        this.$router.push('/employeeList')
                    } else {
                        this.$router.push('/managerList')
                    }
                } else if (this.$route.path === '/add-subemail') {
                    this.$router.push('/subemail')
                } else if (this.$route.path === '/privacy') {
                    this.$router.push('/sign-cla')
                }
            },
            openOrCloseMenu() {
                this.menuVisible = !this.menuVisible
            },
            handleCommand(command) {
                switch (command) {
                    case 'a':
                        this.toHome();
                        break;
                    case 'b':
                        this.toManager();
                        break;
                    case 'c':
                        this.toEmployee();
                        break;
                    case 'd':
                        this.toAddSubEmail();
                        break;
                    case 'e':
                        this.toCreateManager();
                        break;
                    case 'f':
                        this.toResetPwd();
                        break;
                    case 'g':
                        this.toCLA();
                        break;
                    case 'h':
                        this.loginOut();
                        break;
                }
            },
            toHome() {
                if (this.$route.path !== '/linkedRepo') {
                    this.$router.push('/home')
                }
            },
            toManager() {
                if (this.$route.path !== '/managerList') {
                    this.$router.push('/managerList')
                }
            },
            toEmployee() {
                if (this.$route.path !== '/employeeList') {
                    this.$router.push('/employeeList')
                }
            },
            toAddSubEmail() {
                if (this.$route.path !== '/subemail') {
                    this.$router.push('/subemail')
                }
            },
            toCreateManager() {
                if (this.$route.path !== '/createManager') {
                    this.$router.push('/createManager')
                }
            },
            toResetPwd() {
                if (this.$route.path !== '/resetPassword') {
                    this.$router.push('/resetPassword')
                }
            },
            toCLA() {
                http({
                    url: url.corporationPdf,
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
            loginOut() {
                sessionStorage.clear();
                if (this.loginRole === 'corp') {
                    this.$router.push('/corporationManagerLogin')
                } else {
                    this.$router.push('/')
                }
            },
            chooseLng(value) {
                if (this.value !== value) {
                    this.value = value
                    this.language = this.options[value].label;
                    localStorage.setItem('lang', this.language);
                    this.changeI18N(this.language)
                }
                this.isActive = true;
            },
            clickSelect() {
                this.isActive = !this.isActive;
            },
            changeI18N(language) {
                switch (language) {
                    case 'English':
                        this.$i18n.locale = 'en-us';
                        break;
                    case 'Chinese':
                        this.$i18n.locale = 'zh-cn';
                        break;
                    default:
                        this.$i18n.locale = 'en-us';
                        break;
                }
            },
            setLangValue(language) {
                for (let i = 0; i < this.options.length; i++) {
                    if (this.options[i].label === language) {
                        this.value = i
                    }
                }
            },
            init(value) {
                if (value !== '' && value !== undefined) {
                    this.language = value
                } else if (localStorage.getItem('lang')) {
                    this.language = localStorage.getItem('lang')
                }
                this.changeI18N(this.language);
                this.setLangValue(this.language);
                if (this.$store.state.loginInfo) {
                    this.role = this.$store.state.loginInfo.userInfo[0].role;
                }
                this.showHeaderMenu = util.getMenuState(this);
                if (this.showHeaderMenu === 'corp' || this.showHeaderMenu === 'org') {
                    this.loginRole = this.showHeaderMenu
                }
            },
        },
        created() {
            this.init();
        },
        mounted() {
            document.addEventListener('click', e => {
                if (e.target.id !== 'my_select' && e.target.id !== 'select_content' && e.target.id !== 'select_icon_box' && e.target.id !== 'select_icon') {
                    this.isActive = true;
                }
                if (e.target.id !== 'svgCover') {
                    this.menuVisible = false
                }
            })
        }
    }
</script>

<style scoped lang="less">
    @media screen and (max-width: 1200px) {
        .headerBox {
            width: 100%;
        }
    }

    @media screen and (min-width: 1200px) {
        .headerBox {
            width: 1200px;
            margin: auto;
        }
    }

    .parentBox {
        box-sizing: border-box;
        width: 100%;
        border-bottom: 2px solid #F2F2F2;

        .headerBox {
            padding: 0 1rem;
            height: 5.5rem;

            .margin-left-1rem {
                margin-left: 1rem;
            }

            .box {
                cursor: pointer;
            }

            .visible {
                visibility: hidden;
            }

            .pointer {
                cursor: pointer;
            }

            .infoBox {

            }

            .menuBox {
                position: relative;
                height: 2.6rem;
                width: 8rem;
            }

            .userImgBox {
                cursor: pointer;
                height: 2.6rem;
                width: 2.6rem;
                overflow: hidden;
                border-radius: 1.3rem;
                position: absolute;
                right: 0;
                top: 0;
                z-index: 5;

                .svgCover {
                    background-color: transparent;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 3;
                    height: 2.6rem;
                    width: 2.6rem;
                    border-radius: 1.3rem;
                }

                & .userImg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    height: 2.6rem;
                    width: 2.6rem;
                }
            }

            #menuOption {
                border: 1px solid black;
                border-radius: 1.3rem;
                position: absolute;
                right: 0;
                top: 0;
                z-index: 4;
                background-color: white;
                white-space: pre;
                width: 10rem;

                & > div {
                    height: 2.6rem;
                    line-height: 2.6rem;
                    margin: 0 1rem;
                    cursor: pointer;
                    user-select: none;
                }

                & > div:not(:last-of-type) {
                    border-bottom: 1px solid black;
                }
            }

            .mark {
                height: 6px;
                width: 6px;
                border-radius: 50%;
                background-color: #2E9C55;
            }

            .isShow {
                visibility: hidden;
            }

            & .my_box {
                height: 2.6rem;
                position: relative;

            }

            & .my_box > div {
                position: absolute;
                top: 0;
                left: 0;
                border: 1px solid black;
                border-radius: 1.3rem;
                width: 8rem;

            }

            & .my_select_box {
                height: 2.6rem;
                width: 8rem;
                position: relative;

            }

            & .my_select {
                position: absolute;
                top: 0;
                left: 0;
                box-sizing: border-box;
                width: 8rem;
                height: 2.6rem;
                border: 1px solid black;
                border-radius: 1.3rem;
                padding: 0 1rem;
                z-index: 2;
                cursor: pointer;
            }

            & .select_content {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -webkit-touch-callout: none;
                user-select: none;
            }

            & #my_option {
                z-index: 1;
                position: absolute;
                background-color: white;
                top: 0;
                left: 0;
                padding-top: 2.6rem;
                box-sizing: border-box;
                width: 8rem;
                border: 1px solid black;
                border-radius: 1.3rem;
                cursor: pointer;

            }

            & #my_option > div {
                cursor: pointer;
                background-color: white;
                border-radius: 1.3rem;
                height: 2.6rem;
                padding: 0 1rem;
                display: flex;
                justify-content: center;
            }

            & #my_option > div > div {
                cursor: pointer;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            & #my_option > div > div > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                cursor: pointer;
            }

            & #my_option > div > div > div:last-child {
                flex-grow: 1;
            }

            & #my_option > div:not(:last-child) > div {
                border-bottom: 1px solid black;
            }


            & .ul_box > div {
                box-sizing: border-box;
                width: 8rem;
                height: 2.6rem;
                border: 1px solid black;
                border-radius: 1.3rem;
            }

            & .icon {
                width: 3.5rem;
                height: 3.5rem;
            }

            & .header {
                height: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            & .header > div:nth-of-type(1) {
                display: flex;
                flex-direction: column;
                justify-content: center;
            }

            & .header > div:nth-of-type(2) {
                display: flex;
                justify-content: space-between;

                & > div {
                    margin-left: 1rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            }


        }
    }


</style>
