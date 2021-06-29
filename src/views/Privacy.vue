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
    import Footer from '../components/NewFooter';
    import Header from '../components/NewHeader';
    import _axios from '../util/_axios';
    import * as util from '../util/util';
    import VueMarkdown from 'vue-markdown';
    import ReTryDialog from '../components/ReTryDialog';

    export default {
        name: 'Privacy',
        components: {
            Header,
            Footer,
            VueMarkdown,
            ReTryDialog
        },
        inject: ['setClientHeight'],
        computed: {
            privacyTextObj() {
                return this.$store.state.privacyTextObj;
            },
            reTryVisible() {
                return this.$store.state.reTryDialogVisible;
            },
            reLoginMsg() {
                return this.$store.state.dialogMessage;
            }
        },
        watch: {
            '$i18n.locale'() {
                this.getLanguage();
                this.getPrivacy(this.privacyData[this.value].platform, this.privacyData[this.value].owner, this.privacyData[this.value].repo, this.privacyData[this.value].path);
            }
        },
        data() {
            return {
                privacyData: PRIVACY_POLICY_DATA,
                value: 0,
                langOptions: [],
                privacyText: '',
                lang: 'English'
            };
        },
        methods: {
            getPrivacy(_platform, owner, repo, path) {
                if (this.checkPrivacyConf()) {
                    return;
                }
                if (localStorage.getItem('lang') !== undefined) {
                    this.lang = localStorage.getItem('lang');
                }
                let notExistPrivacy = true;
                for (let key in this.privacyTextObj) {
                    if (key === this.lang) {
                        this.privacyText = this.privacyTextObj[key];
                        notExistPrivacy = false;
                        break;
                    }
                }
                if (notExistPrivacy) {
                    let platform = _platform.toLowerCase();
                    let _url = '';
                    if (platform === 'gitee') {
                        _url = `https://gitee.com/api/v5/repos/${owner}/${repo}/contents/${path}`;
                    } else if (platform === 'github') {
                        _url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.not_support_platform')
                        });
                        return;
                    }
                    _axios({
                        url: _url
                    }).then(res => {
                        if (res.data.length === 0) {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.privacy_conf_err')
                            });
                            return;
                        }
                        let privacyObj = this.privacyTextObj;
                        let Base64 = require('js-base64').Base64;
                        this.privacyText = Base64.decode(res.data.content);
                        Object.assign(privacyObj, {[this.lang]: this.privacyText});
                        this.$store.commit('setPrivacyData', privacyObj);
                    }).catch(err => {
                        if (err.status === 403 || err.status === 404) {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.privacy_conf_err')
                            });
                            return;
                        }
                        util.catchErr(err, '', this);
                    });
                }
            },
            checkPrivacyConf() {
                let hasSameLang = false;
                for (let i = 0, len = this.privacyData.length; i < len; i++) {
                    for (let j = i + 1, len = this.privacyData.length; j < len; j++) {
                        if (this.privacyData[i].language === this.privacyData[j].language) {
                            hasSameLang = true;
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.has_same_lang_privacy')
                            });
                            break;
                        }
                    }
                    if (hasSameLang) break;
                }
                return hasSameLang;
            },
            getLangOptions() {
                if (this.checkPrivacyConf()) {
                    return;
                }
                let langOptions = [];
                let langLabel = '';
                this.privacyData.forEach((item, index) => {
                    langLabel = util.upperFirstCase(item.language);
                    langOptions.push({value: index, label: langLabel});
                });
                this.langOptions = langOptions;
                this.$emit('getLangOptions', this.langOptions);
                localStorage.setItem('lang', this.langOptions[this.value].label);
                this.$emit('initHeader', this.langOptions[this.value].label);
            },
            getLanguage() {
                if (localStorage.getItem('lang') !== undefined) {
                    this.lang = localStorage.getItem('lang');
                }
                let langLabel = '';
                this.privacyData.forEach((item, index) => {
                    langLabel = util.upperFirstCase(item.language);
                    if (langLabel === this.lang) {
                        this.value = index;
                        return false;
                    }
                });
            },
            init() {
                this.getLanguage();
                this.getLangOptions();
                this.getPrivacy(this.privacyData[this.value].platform, this.privacyData[this.value].owner, this.privacyData[this.value].repo, this.privacyData[this.value].path);
            }
        },
        activated() {
            if (this.langOptions.length) {
                this.$emit('getLangOptions', this.langOptions);
                localStorage.setItem('lang', this.langOptions[this.value].label);
                this.$emit('initHeader', this.langOptions[this.value].label);
            }
        },
        created() {
            this.init();
        },
        mounted() {
            this.setClientHeight();
        }

    };
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
