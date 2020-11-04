<template>
    <div id="home" :style="home">
        <Header @clickItem="clickItem"></Header>
        <el-col :offset="5" :span="14" id="section">
            <router-view></router-view>
        </el-col>
        <Footer></Footer>
    </div>
</template>
<script>
    import * as url from '../until/api'
    import * as until from '../until/until'
    import Header from '@components/OrganizationHeader'
    import Footer from '@components/NewFooter'
    import {mapActions} from 'vuex'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('home').offsetHeight) {
            document.getElementById("home").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "Home",
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                listCurrentPage: 1,
                email: '',

                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                platform_token: this.$store.state.platform_token,

                home: {
                    height: '',
                },
            }
        },
        methods: {
            ...mapActions(['setLoginUserAct', 'setTokenAct', 'getLinkedRepoListAct']),
            clickItem(command) {
                switch (command) {
                    case 'a':
                        if (this.$route.path !== '/home') {
                            this.$router.push('/home');
                        }
                        break;

                    case 'b':
                        this.loginOut()
                        break;
                }
            },
            loginOut() {
                sessionStorage.clear();
                this.$router.push('/')
            },


            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('home').offsetHeight ?
                        this.home.height = until.getClientHeight() + 'px' :
                        this.home.height = document.getElementById('home').offsetHeight
                })
            },

            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    background: 'rgba(255, 255, 255, 1)'
                });
               let interval =  setInterval(() => {
                   console.log(typeof this.$store.state.loading);
                   if (this.$store.state.loading=='true') {
                        loading.close();
                        clearInterval(interval)
                    }
                }, 200)
            },
            clearPageSession() {
                this.$store.commit('setOrgOption', undefined)
                this.$store.commit('setRepositoryOptions', undefined)
                this.$store.commit('setClaOptions', undefined)
                this.$store.commit('setOrgValue', undefined)
                this.$store.commit('setClaValue', undefined)
                this.$store.commit('setRepositoryValue', undefined)
                this.$store.commit('setTableData', undefined)
            },
            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split('; ')
                    let access_token, refresh_token, platform_token = '';
                    let email = ''
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        arr[0] === 'access_token' ? access_token = arr[1] : arr[0] === 'refresh_token' ? refresh_token = arr[1] :
                            arr[0] === 'email' ? email = arr[1] : arr[0] === 'platform_token' ? platform_token = arr[1] : platform_token = '';
                    })
                    this.email = email;
                    if (email !== '') {
                        this.$store.commit('setIsEmail', true)
                    }
                    let data = {access_token, refresh_token, platform_token};
                    this.setTokenAct(data);
                }
            },
            setDomain() {
                this.$store.commit('setDomain', window.location.href.split('/home')[0])
            },

        },
        created() {
            this.setDomain();
            this.clearPageSession();
            this.openFullScreen();
            this.getCookieData()
        },
        mounted() {
            this.setClientHeight();
        },

    };

</script>

<style lang="less">


    #home {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #f9f9f9;

        & > div:nth-of-type(2) {
            flex-grow: 1;
            text-align: left;


            & > div:nth-of-type(3) {
                padding: 4rem 0 2rem 0;
                font-size: 1.3rem;
                color: #2C3E50;
            }
        }

        .tableStyle {
            margin-bottom: 2rem;
            padding: 3rem;
            background-color: white;
        }

        .paginationClass {
            text-align: center;
            margin-bottom: 1rem;
        }

        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

        .hoverUnderline:hover {
            text-decoration: underline;
        }

        .qusLink {
            text-decoration: underline;
            font-size: .8rem;
            cursor: pointer;
        }

        .dialogDec {
            font-size: 1rem;
            padding: .5rem 0;
        }

        .left {
            text-align: left;
        }

        .right {
            text-align: right;
        }

        .size_b {
            font-size: 1.3rem;
        }

        .size_m {
            font-size: 1rem;
            text-align: left;
        }

        .menuBT {
            display: flex;
            flex-direction: column;

            & > * {

                margin: .2rem 0;
                text-align: center;
            }
        }

        .pointer {
            cursor: pointer;
        }

        .dialogDesc {

            font-size: 1.2rem;
            margin: 2rem 0;
        }

        li {
            margin: 1rem 0;
        }

        .disableClass {
            margin-top: 2rem;
            text-align: center;
            height: 3rem;
            background-color: #ACD7E6;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .linkBt {
            margin-top: 2rem;
            text-align: center;
            height: 3rem;
            background-color: #0594C6;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;


            &:hover {
                background-color: #046F94;
            }
        }
    }
</style>