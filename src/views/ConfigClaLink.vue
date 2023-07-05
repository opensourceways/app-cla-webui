<template>
    <el-row id="configTwo">
        <div class="itemBox">
            <div class="stepTitle">
                ③ {{$t('org.config_cla_paste_url_title')}}
                <el-tooltip class="item" effect="light"
                            :content="$t('org.config_cla_paste_url_title_tooltips')"
                            placement="right">
                    <svg-icon icon-class="tips"></svg-icon>
                </el-tooltip>
            </div>
            <div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_paste_individual_url')}}
                </div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_individual_url_desc',{platform:this.$store.state.platform})}}
                </div>
                <div class="margin-top-1rem">
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-input clearable="" :placeholder="$t('org.config_cla_url_placeholder')" size="medium"
                                      v-model="cla_link_individual">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row class="margin-top-1rem">
                        {{$t('org.config_cla_individual_lang')}}
                    </el-row>
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-select v-model="individualClaLanguageValue"
                                       :placeholder="$t('org.config_cla_select_lang')"
                                       style="width: 100%"
                                       size="medium"
                                       clearable
                                       filterable
                                       @change="changeIndividualLanguage">
                                <el-option
                                        v-for="item in languageOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="margin-top-2rem">
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_corp_url')}}
                </div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_paste_corp_url')}}
                </div>
                <div class="margin-top-1rem">
                    {{$t('org.config_cla_corp_url_desc',{platform:this.$store.state.platform})}}
                </div>
                <div class="margin-top-1rem">
                    <el-row>
                        <el-col>
                            <el-input clearable="" :placeholder="$t('org.config_cla_url_placeholder')" size="medium"
                                      v-model="cla_link_corporation">
                            </el-input>
                        </el-col>
                    </el-row>
                    <div class="margin-top-1rem">
                        {{$t('org.config_cla_corp_lang')}}
                    </div>
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-select v-model="corpClaLanguageValue"
                                       :placeholder="$t('org.config_cla_select_lang')"
                                       style="width: 100%"
                                       size="medium"
                                       clearable
                                       filterable
                                       @change="changeCorpLanguage">
                                <el-option
                                        v-for="item in languageOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <div class="stepBtBox">
            <button class="step_button" @click="toPreviousPage">{{$t('org.previous_step')}}</button>
            <button class="step_button" @click="toNextPage">{{$t('org.next_step')}}</button>
        </div>
        <ReTryDialog :message="reLoginMsg" :dialogVisible="reTryVisible"></ReTryDialog>
        <ReLoginDialog :dialogVisible="reLoginDialogVisible" :message="reLoginMsg"></ReLoginDialog>
    </el-row>

</template>
<script>
    import * as url from '../util/api';
    import * as util from '../util/util';
    import http from '../util/http';
    import download from 'downloadjs';
    import ReTryDialog from '../components/ReTryDialog';
    import ReLoginDialog from '../components/ReLoginDialog';

    export default {
        name: 'ConfigClaLink',
        components: {
            ReTryDialog,
            ReLoginDialog
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
            cla_link_individual: {
                get() {
                    return this.$store.state.claLinkIndividual;
                },
                set(value) {
                    this.$store.commit('setClaLinkIndividual', value);
                }
            },
            cla_link_corporation: {
                get() {
                    return this.$store.state.claLinkCorp;
                },
                set(value) {
                    this.$store.commit('setClaLinkCorp', value);
                }
            },
            individualClaLanguageValue: {
                get() {
                    return this.$store.state.individualLanguage;
                },
                set(value) {
                    this.$store.commit('setIndividualLanguage', value);
                }
            },
            corpClaLanguageValue: {
                get() {
                    return this.$store.state.corpLanguage;
                },
                set(value) {
                    this.$store.commit('setCorpLanguage', value);
                }
            }
        },
        data() {
            return {
                languageOptions: [{value: 'english', label: 'English'}, {value: 'chinese', label: '中文'}]
            };
        },
        inject: ['setClientHeight'],
        methods: {
            init() {
                this.$store.commit('setIndividualLanguage', '');
                this.$store.commit('setCorpLanguage', '');
                this.$store.commit('setClaLinkIndividual', '');
                this.$store.commit('setClaLinkCorp', '');
                sessionStorage.removeItem('individualLanguage');
                sessionStorage.removeItem('corpLanguage');
                sessionStorage.removeItem('claLinkIndividual');
                sessionStorage.removeItem('claLinkCorp');

            },
            changeIndividualLanguage(value) {
                this.$store.commit('setIndividualLanguage', value);
            },
            changeCorpLanguage(value) {
                this.$store.commit('setCorpLanguage', value);
            },
            toPreviousPage() {
                this.$router.replace('/config-email');
            },
            toNextPage() {
                if (this.cla_link_individual && this.individualClaLanguageValue) {
                    if (this.cla_link_corporation && this.corpClaLanguageValue || !(this.cla_link_corporation || this.corpClaLanguageValue)) {
                        let arr = this.cla_link_individual.trim().split('.');
                        let isRightFormat = true;
                        if (this.cla_link_corporation) {
                            let arr = this.cla_link_corporation.split('.');
                            if (arr[arr.length - 1] !== 'pdf') {
                                isRightFormat = false;
                            }
                        }
                        if (arr[arr.length - 1] === 'pdf' && isRightFormat) {
                            this.$router.replace('/config-fields');
                        } else {
                            this.$message.closeAll();
                            this.$message.error(this.$t('org.cla_format_err'));
                        }
                    } else if (this.cla_link_corporation) {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.select_corp_language')
                        });
                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.paste_corp_link')
                        });
                    }
                } else if (this.cla_link_individual) {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.select_individual_language')
                    });
                } else {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.paste_individual_link')
                    });
                }
            }
        },
        updated() {
            this.setClientHeight();
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path === '/') {
                    vm.init();
                }
            });
        }
    };
</script>
<style lang="less">
    #configTwo {
        .file_button {
            font-family: Roboto-Regular, sans-serif;
            width: 5rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 0.8rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin: 1.2rem 0;
        }

        .file_button:focus {
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
