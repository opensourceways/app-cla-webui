<template>
    <el-row id="configOne">
        <div class="itemBox">
            <div class="stepTitle">
                ① {{$t('org.config_cla_select_org_tile')}}
            </div>
            <div class="margin-top-1rem">
                {{$t('org.config_cla_select_org')}}
            </div>
            <el-row class="margin-top-1rem">
                <el-col>
                    <el-select v-model="orgValue"
                               :placeholder="$t('org.config_cla_select_org_placeholder')"
                               style="width: 100%"
                               size="medium"
                               clearable
                               filterable
                               @visible-change="orgVisibleChange"
                               @change="changeOrg">
                        <el-option
                                v-for="item in orgOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <div class="margin-top-1rem">
                {{$t('org.config_cla_select_org_alias')}}
            </div>
            <div class="margin-top-1rem">
                <el-input v-model="org_alias" size="medium"
                          :placeholder="$t('org.config_cla_select_org_alias_placeholder')"></el-input>
            </div>
            <div class="margin-top-1rem">
                {{$t('org.config_cla_select_repo')}}
            </div>
            <el-row class="margin-top-1rem">
                <el-col>
                    <el-input v-model="repo" size="medium"
                              :placeholder="$t('org.config_cla_select_repo_placeholder')"></el-input>
                </el-col>
            </el-row>
        </div>
        <div class="orgStepBtBox">
            <button class="step_button" @click="toConfigClaLink">{{$t('org.next_step')}}</button>
        </div>
        <ReTryDialog :message="reTryMsg" :dialogVisible="reTryVisible"></ReTryDialog>
        <ReLoginDialog :message="reTryMsg" :dialogVisible="orgReLoginVisible"></ReLoginDialog>
        <CustomDialog :message="reTryMsg" :dialogVisible="customVisible"></CustomDialog>
    </el-row>
</template>

<script>
    import ReTryDialog from '../components/ReTryDialog';
    import ReLoginDialog from '../components/ReLoginDialog';
    import CustomDialog from '../components/CustomDialog';
    import * as url from '../util/api';
    import * as util from '../util/util';
    import _axios from '../util/_axios';
    import platform_http from '../util/platform_http';

    export default {
        name: 'ConfigOne',
        components: {
            ReTryDialog,
            ReLoginDialog,
            CustomDialog
        },
        computed: {
            reTryMsg() {
                return this.$store.state.dialogMessage;
            },
            orgReLoginVisible() {
                return this.$store.state.orgReLoginDialogVisible;
            },
            reTryVisible() {
                return this.$store.state.reTryDialogVisible;
            },
            customVisible() {
                return this.$store.state.customVisible;
            },
            orgOptions() {
                try {
                    return JSON.parse(this.$store.state.orgOptions);
                } catch (e) {
                    return this.$store.state.orgOptions;
                }
            },
            orgChoose() {
                return `${this.$store.state.orgChoose}` === 'true';
            },
            repositoryChoose() {
                return `${this.$store.state.repositoryChoose}` === 'true';
            },
            repositoryOptions() {
                try {
                    return JSON.parse(this.$store.state.repositoryOptions);
                } catch (e) {
                    return this.$store.state.repositoryOptions;
                }

            },
            orgValue() {
                if (this.$store.state.orgValue === undefined || this.$store.state.orgValue === '' || this.$store.state.orgValue === 'undefined') {
                    return undefined;
                } else {
                    return Number(this.$store.state.orgValue);
                }
            },
            repositoryValue() {
                if (this.$store.state.repositoryValue === undefined || this.$store.state.repositoryValue === '' || this.$store.state.repositoryValue === 'undefined') {
                    return undefined;
                } else {
                    return Number(this.$store.state.repositoryValue);
                }
            },
            org_alias: {
                get() {
                    return this.$store.state.orgAlias;
                },
                set(value) {
                    this.$store.commit('setOrgAlias', value);
                }
            },
            repo: {
                get() {
                    return this.$store.state.repo;
                },
                set(value) {
                    this.$store.commit('setRepo', value);
                }
            }
        },
        data() {
            return {
                org: this.$store.state.chooseOrg
            };
        },
        inject: ['setClientHeight'],
        methods: {
            checkRepo(org, repo) {
                let _url = `${url.checkRepo}/${org}/${repo}`;
                _axios({
                    url: _url
                }).then(res => {
                    if (res && res.data.data) {
                        this.$router.replace('/config-email');
                    } else {
                        this.$store.commit('setCustomVisible', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.checkRepoMessage')
                        });
                    }
                }).catch(err => {
                    util.catchErr(err, 'setOrgReLogin', this);
                });
            },
            toConfigClaLink() {
                if (this.org) {
                    if (this.repo) {
                        this.checkRepo(this.org, this.repo);
                    } else {
                        this.$router.replace('/config-email');
                    }
                } else {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('corp.fill_complete')
                    });
                }
            },
            orgVisibleChange(visible) {
                if (visible) {
                    this.getOrgsInfo();
                }
            },
            changeOrg(value) {
                this.$store.commit('setOrgValue', value);
                this.$store.commit('setRepositoryValue', undefined);
                this.$store.commit('setRepositoryChoose', false);
                this.$store.commit('setRepositoryOptions', undefined);
                if (value === '') {
                    this.$store.commit('setChooseOrg', '');
                    this.org = '';
                    this.$store.commit('setOrgChoose', false);
                } else {
                    this.$store.commit('setChooseOrg', this.orgOptions[value].label);
                    this.org = this.orgOptions[value].label;
                    this.$store.commit('setOrgChoose', true);
                }
            },
            getOrgsInfo() {
                _axios({
                    url: url.getOrg
                }).then(res => {
                    if (res && res.data.data) {
                        let orgOptions = [];
                        res.data.data.forEach((item, index) => {
                            orgOptions.push({value: index, label: item});
                        });
                        this.$store.commit('setOrgOption', orgOptions);
                    }
                }).catch(err => {
                    util.catchErr(err, 'setOrgReLogin', this);
                });
            },
            init() {
                this.$store.commit('setOrgOption', []);
                this.$store.commit('setOrgValue', '');
                this.$store.commit('setOrgChoose', '');
                this.$store.commit('setRepositoryOptions', []);
                this.$store.commit('setRepositoryChoose', '');
                this.$store.commit('setRepositoryValue', '');
                this.$store.commit('setOrgAlias', '');
                this.$store.commit('setRepo', '');
                this.$store.commit('setChooseOrg', '');
                this.$store.commit('setChooseRepo', '');
                sessionStorage.removeItem('orgOptions');
                sessionStorage.removeItem('orgValue');
                sessionStorage.removeItem('orgChoose');
                sessionStorage.removeItem('orgAlias');
                sessionStorage.removeItem('repo');
                sessionStorage.removeItem('repositoryOptions');
                sessionStorage.removeItem('repositoryChoose');
                sessionStorage.removeItem('repositoryValue');
                sessionStorage.removeItem('chooseOrg');
                sessionStorage.removeItem('chooseRepo');
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path === '/') {
                    vm.init();
                }
            });
        },
        updated() {
            this.setClientHeight();
        }
    };
</script>

<style lang="less">
    #configOne {
        .orgStepBtBox {
            text-align: right;
            margin-bottom: 2rem;
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
