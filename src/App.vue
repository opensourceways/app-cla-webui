<template>
    <div id="app">
        <router-view/>
        <TokenErrorDialog @checkAction="checkTokenType" :dialogVisible="tokenErrorDialogVisible"
                          :message="reLoginMsg"></TokenErrorDialog>
    </div>
</template>
<script>
    import TokenErrorDialog from './components/TokenErrorDialog'
    export default {
        computed:{
            tokenErrorDialogVisible() {
                return this.$store.state.tokenErrorDialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
        },
        components:{
            TokenErrorDialog
        },
        data() {
            return {
                action: '',
            }
        },
        methods: {
            checkTokenType() {
                this.getActionFromCookie()
                console.log('sign-cla-1095', document.cookie);
                console.log(this.action);
                if (this.action === 'login') {
                    this.$store.commit('setTokenErrorReLogin', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.quitLoginTip', {platform: this.$store.state.platform}),
                    });
                }
            },
            getActionFromCookie() {
                if (document.cookie) {
                    this.action = '';
                    let cookieArr = document.cookie.split(';');
                    cookieArr.forEach((item) => {
                        let arr = item.split('=');
                        let name = arr[0].trim();
                        let value = arr[1].trim();
                        if (name === 'action') {
                            this.action = value;
                        }
                    });
                }
            },
        },
    }

</script>
<style lang="less">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    body {
        padding: 0;
        margin: 0;

    }

    @media screen and (min-width: 1920px) {
        html {
            font-size: 18px;
        }
    }

    @media screen and (min-width: 1024px) and (max-width: 1920px) {
        html {
            font-size: 16px;
        }
    }

    @media screen and (min-width: 800px) and (max-width: 1024px) {
        html {
            font-size: 14px;
        }
    }

    @media screen and  (max-width: 800px) {
        html {
            font-size: 12px;
        }
    }

    @media screen and (min-width: 100px) and (max-width: 768px) {
        html {
            font-size: 10px;
        }
    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }
</style>
