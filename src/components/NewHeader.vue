<template>
    <el-row class="headerBox">
        <el-col class="header" :offset="5" :span="14">
            <div class="box">
                <svg-icon icon-class="logo" class="icon"></svg-icon>
            </div>

            <div>
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
                                {{$t('header.createManager')}}
                            </div>
                            <div v-if="loginRole==='corp'" @click="handleCommand('e')">
                                {{$t('header.resetPwd')}}
                            </div>
                            <!--<div v-if="loginRole==='corp'&&role===admin" @click="handleCommand('f')">-->
                            <!-- {{$t('header.corpCla')}}-->
                            <!--</div>-->
                            <div @click="handleCommand('g')">
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
</template>

<script>
    export default {
        name: "NewHeader",
        data() {
            return {
                role: '',
                loginRole: '',
                showHeaderMenu: true,
                menuVisible: false,
                isActive: true,
                language: 'English',
                value: 0,
                options: [{value: 0, label: 'English'}, {value: 1, label: '中文'}],
                visible: {
                    visibility: 'hidden',
                },
            }
        },

        methods: {
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
                        this.toCreateManager()
                        break;
                    case 'e':
                        this.toResetPwd()
                        break;
                    case 'f':
                        this.toCLA()
                        break;
                    case 'g':
                        this.loginOut()
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
                // if (this.$route.path !== '/resetPassword') {
                //     this.$router.push('/resetPassword')
                // }
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
                    localStorage.setItem('lang', value)
                    this.language = this.options[value].label;
                    switch (value) {
                        case 0:
                            this.$i18n.locale = 'en-us';
                            break;
                        case 1:
                            this.$i18n.locale = 'zh-cn';
                            break;
                    }
                }
                this.isActive = true;

            },
            clickSelect() {
                this.isActive = !this.isActive;
            },
            init() {
                if (parseInt(localStorage.getItem('lang'))) {
                    this.value = parseInt(localStorage.getItem('lang'))
                }
                switch (this.value) {
                    case 0:
                        this.language = 'English';
                        this.$i18n.locale = 'en-us';
                        break;
                    case 1:
                        this.language = '中文';
                        this.$i18n.locale = 'zh-cn';
                        break;
                }
                if (this.$store.state.loginInfo) {
                    this.role = this.$store.state.loginInfo.userInfo[0].role;
                }
                if (sessionStorage.getItem('showHeaderMenu') === 'false') {
                    this.showHeaderMenu = false
                } else if (sessionStorage.getItem('showHeaderMenu') === 'corp') {
                    this.showHeaderMenu = true;
                    this.loginRole = 'corp';
                } else {
                    this.showHeaderMenu = true;
                    this.loginRole = 'org';
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
    .visible {
        visibility: hidden;
    }

    .pointer {
        cursor: pointer;
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

    .headerBox {
        border-bottom: 2px solid #F2F2F2;
        height: 5.5rem;
        width: 100%;

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


</style>