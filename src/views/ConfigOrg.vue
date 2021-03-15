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
    import ReTryDialog from '../components/ReTryDialog'
    import ReLoginDialog from '../components/ReLoginDialog'
    import CustomDialog from '../components/CustomDialog'
    import * as url from '../util/api'
    import _axios from '../util/_axios'
    import platform_http from '../util/platform_http'

    export default {
        name: "ConfigOne",
        components: {
            ReTryDialog,
            ReLoginDialog,
            CustomDialog,
        },
        computed: {
            reTryMsg() {
                return this.$store.state.dialogMessage
            },
            orgReLoginVisible() {
                return this.$store.state.orgReLoginDialogVisible
            },
            reTryVisible() {
                return this.$store.state.reTryDialogVisible
            },
            customVisible() {
                return this.$store.state.customVisible
            },
            orgOptions() {
                try {
                    return JSON.parse(this.$store.state.orgOptions)
                } catch (e) {
                    return this.$store.state.orgOptions
                }
            },
            orgChoose() {
                return `${this.$store.state.orgChoose}` === 'true';
            },
            repositoryChoose() {
                return `${this.$store.state.repositoryChoose}` === 'true'
            },
            repositoryOptions() {
                try {
                    return JSON.parse(this.$store.state.repositoryOptions)
                } catch (e) {
                    return this.$store.state.repositoryOptions
                }

            },
            orgValue() {
                if (this.$store.state.orgValue === undefined || this.$store.state.orgValue === '' || this.$store.state.orgValue === 'undefined') {
                    return undefined
                } else {
                    return Number(this.$store.state.orgValue)
                }
            },
            repositoryValue() {
                if (this.$store.state.repositoryValue === undefined || this.$store.state.repositoryValue === '' || this.$store.state.repositoryValue === 'undefined') {
                    return undefined
                } else {
                    return Number(this.$store.state.repositoryValue)
                }
            },
            org_alias: {
                get() {
                    return this.$store.state.orgAlias;
                },
                set(value) {
                    this.$store.commit('setOrgAlias', value)
                },
            },
            repo: {
                get() {
                    return this.$store.state.repo;
                },
                set(value) {
                    this.$store.commit('setRepo', value)
                },
            },
        },
        data() {
            return {
                org_id: '',
                org: this.$store.state.chooseOrg,
            }
        },
        inject: ['setClientHeight'],
        methods: {
            checkRepo(org, repo) {
                let _url = '';
                let obj = {};
                let _http = '';
                if (this.$store.state.platform === 'Gitee') {
                    _url = `https://gitee.com/api/v5/repos/${org}/${repo}`;
                    obj = {access_token: this.$store.state.platform_token};
                    _http = _axios;
                } else if (this.$store.state.platform === 'Github') {
                    _url = `https://api.github.com/repos/${org}/${repo}`
                    _http = platform_http;
                }
                obj = {access_token: this.$store.state.platform_token};
                _http({
                    url: _url,
                    params: obj,
                }).then(res => {
                    this.$router.replace('/config-email')
                }).catch(err => {
                    switch (err.status) {
                        case 401:
                            if (err.data.message === GITEE_CHECK_REPO_401_ERROR_PRIVATE) {
                                this.$store.commit('setCustomVisible', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.checkRepoMessage'),
                                });
                            } else if (err.data.message === GITEE_CHECK_REPO_401_ERROR_TOKEN_EXIST)
                                this.$store.commit('setOrgReLogin', {
                                    dialogVisible: true,
                                    dialogMessage: this.$t('tips.missing_token'),
                                });
                            break;
                        case 403:
                            this.$store.commit('setOrgReLogin', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.missing_token'),
                            });
                            break;
                        case 404:
                            this.$store.commit('setCustomVisible', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.checkRepoMessage'),
                            });
                            break;
                        default:
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.system_error'),
                            })
                    }
                })
            },
            toConfigClaLink() {
                if (this.org) {
                    if (this.repo) {
                        this.checkRepo(this.org, this.repo);
                    } else {
                        this.$router.replace('/config-email')
                    }
                } else {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('corp.fill_complete'),
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
                    this.org_id = '';
                    this.$store.commit('setOrgChoose', false);
                } else {
                    this.$store.commit('setChooseOrg', this.orgOptions[value].label);
                    this.org = this.orgOptions[value].label;
                    this.org_id = this.orgOptions[value].id;
                    this.$store.commit('setOrgChoose', true);
                }
            },
            getRepositoriesOfOrg(org, org_id) {
                let _url = '';
                if (this.$store.state.platform === 'Gitee') {
                    _url = `https://gitee.com/api/v5/orgs/${org}/repos`
                } else if (this.$store.state.platform === 'Github') {
                    _url = `https://api.github.com/orgs/${org}/repos`
                }
                let obj = {access_token: this.$store.state.platform_token, org: org, page: 1, per_page: 100};
                _axios({
                    url: _url,
                    params: obj,
                }).then(res => {
                    let repositoryOptions = [];
                    res.data.forEach((item, index) => {
                        repositoryOptions.push({
                            value: index,
                            org: org,
                            org_id: org_id,
                            repoName: item.name,
                            label: item.name,
                            id: item.id
                        });
                    });
                    this.$store.commit('setRepositoryOptions', repositoryOptions)
                }).catch(err => {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.system_error'),
                    })
                })
            },
            getOrgsInfo() {
                let _url = '';
                let _http = '';
                let obj = {};
                if (this.$store.state.platform === 'Gitee') {
                    _url = url.getGiteeOrgsInfo;
                    _http = _axios;
                    obj = {access_token: this.$store.state.platform_token, admin: true, page: 1, per_page: 100};
                } else if (this.$store.state.platform === 'Github') {
                    _url = url.getGithubOrgsInfo;
                    _http = platform_http;
                    obj = {accept: 'application/vnd.github.v3+json', page: 1, per_page: 100};
                }
                _http({
                    url: _url,
                    params: obj,
                }).then(res => {
                    if (res.status === 200) {
                        let orgOptions = [];
                        res.data.forEach((item, index) => {
                            orgOptions.push({value: index, label: item.login, id: item.id});
                        });
                        this.$store.commit('setOrgOption', orgOptions)
                    }
                }).catch(err => {
                    switch (err.status) {
                        case 401:
                            this.$store.commit('setOrgReLogin', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.not_authorize_group'),
                            });
                            break;
                        case 403:
                            this.$store.commit('setOrgReLogin', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.invalid_token'),
                            });
                            break;
                        default:
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.system_error'),
                            })
                    }
                })
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
            },
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path === '/') {
                    vm.init();
                }
            })
        },
        updated() {
            this.setClientHeight();
        },
    }
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
