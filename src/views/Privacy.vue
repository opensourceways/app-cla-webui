<template>
    <el-row id="privacyBox">
        <el-col>
            <div class="margin-top-3rem" id="contentBox">
                <VueMarkdown :source="privacyText">
                </VueMarkdown>
            </div>
        </el-col>
        <ReTryDialog :dialogVisible="reTryVisible" :message="reLoginMsg"></ReTryDialog>
    </el-row>
</template>

<script>
    import Footer from '../components/NewFooter'
    import Header from '../components/NewHeader'
    import _axios from '../util/_axios'
    import * as util from '../util/util'
    import VueMarkdown from 'vue-markdown'
    import ReTryDialog from '../components/ReTryDialog'

    export default {
        name: "Privacy",
        components: {
            Header,
            Footer,
            VueMarkdown,
            ReTryDialog,
        },
        computed: {
            reTryVisible() {
                return this.$store.state.reTryDialogVisible
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage
            },
        },
        inject: ['setClientHeight'],
        watch: {
            '$i18n.locale'() {
                this.getLanguage();
                this.getPrivacy(this.privacyData[this.value].platform, this.privacyData[this.value].owner, this.privacyData[this.value].repo, this.privacyData[this.value].path);
            },
        },
        data() {
            return {
                privacyText: '',
                privacyData: PRIVACY_POLICY_DATA,
            }
        },
        methods: {
            getLanguage() {
                if (localStorage.getItem('lang') !== undefined) {
                    this.lang = parseInt(localStorage.getItem('lang'))
                }
                let currentLang = '';
                switch (this.lang) {
                    case 0:
                        currentLang = 'English';
                        break;
                    case 1:
                        currentLang = 'Chinese';
                        break;
                    default:
                        currentLang = 'English';
                        break;
                }
                let langLabel = '';
                this.privacyData.forEach((item, index) => {
                    langLabel = util.upperFirstCase(item.language);
                    if (langLabel === currentLang) {
                        this.value = index;
                        return false
                    }
                });
            },
            getPrivacy(_platform, owner, repo, path) {
                let platform = _platform.toLowerCase();
                let _url = '';
                if (platform === 'gitee') {
                    _url = `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`
                } else if (platform === 'github') {
                    _url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
                } else {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.not_support_platform'),
                    });
                    return
                }
                _axios({
                    url: _url
                }).then(res => {
                    if (res.data.length === 0) {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.privacy_conf_err'),
                        });
                        return
                    }
                    let Base64 = require('js-base64').Base64;
                    this.privacyText = Base64.decode(res.data.content)
                }).catch(err => {
                    if (err.status === 403 || err.status === 404) {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.privacy_conf_err'),
                        });
                        return
                    }
                    util.catchErr(err, '', this)
                })
            },
            init() {
                this.getLanguage();
                this.getPrivacy(this.privacyData[this.value].platform, this.privacyData[this.value].owner, this.privacyData[this.value].repo, this.privacyData[this.value].path);
            },
        },

        created() {
            this.init()
        },
        mounted() {
            this.setClientHeight()
        }

    }
</script>

<style scoped lang="less">
    @media screen and (min-width: 1200px) {
        #privacyBox {
            width: 1200px;
            margin: auto;
        }
    }

    #privacyBox {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    #contentBox {
        text-align: left;
        padding: 2rem;
        margin-bottom: 2rem;
        white-space: pre-wrap;
        word-wrap: break-word;
        box-shadow: 0 0 20px 10px #F3F3F3;
        border-radius: 1.25rem;
    }
</style>
