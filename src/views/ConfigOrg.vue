<template>
    <el-row id="configOne">
        <div class="itemBox">
            <div class="stepTitle">
                ① Choose a organization or repository
            </div>
            <div class="margin-top-1rem">
                Select an organization that needs to configure cla
            </div>
            <el-row class="margin-top-1rem">
                <el-col>
                    <el-select v-model="orgValue"
                               placeholder="select organization"
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
                You need an alias for the organization you choose
            </div>
            <div class="margin-top-1rem">
                <el-input v-model="org_alias" size="medium" placeholder="input organization alias"></el-input>
            </div>
            <div class="margin-top-1rem">
                If you want to configure CLA for a repository under the organization, please select the repository. If
                not, please ignore it
            </div>
            <el-row class="margin-top-1rem">
                <el-col>
                    <el-select v-model="repositoryValue"
                               placeholder="select repository"
                               style="width: 100%"
                               size="medium"
                               clearable=""
                               filterable
                               @visible-change="repoVisibleChange"
                               @change="changeRepository">
                        <el-option
                                v-for="item in repositoryOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
        </div>
        <div class="orgStepBtBox">
            <el-button size="medium" type="primary" class="stepBt" @click="toConfigClaLink">Next Step</el-button>
        </div>
        <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
    </el-row>
</template>

<script>
    import reTryDialog from '../components/ReTryDialog'
    import * as url from '../until/api'
    export default {
        name: "ConfigOne",
        components: {
            reTryDialog
        },
        computed: {
            corpReLoginMsg() {
                return this.$store.state.dialogMessage
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
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
                    return this.$store.state.orgValue
                } else {
                    return Number(this.$store.state.orgValue)
                }
            },
            repositoryValue() {
                if (this.$store.state.repositoryValue === undefined || this.$store.state.repositoryValue === '' || this.$store.state.repositoryValue === 'undefined') {
                    return this.$store.state.repositoryValue
                } else {
                    return Number(this.$store.state.repositoryValue)
                }
            },
            org_alias() {
                return this.$store.state.orgAlias
            },
        },
        data() {
            return {
                org_id: '',
                org: '',
            }
        },
        methods: {
            toConfigClaLink() {
                if (this.org && this.org_alias) {
                    this.$store.commit('setChooseOrg', this.orgOptions[this.orgValue]);
                    this.$store.commit('setChooseRepo', this.repositoryOptions[this.repositoryValue]);
                    this.$store.commit('setOrgAlias', this.org_alias);
                    this.$router.push('/config-cla-link')
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
            repoVisibleChange(visible) {
                if (visible && this.org) {
                    this.getRepositoriesOfOrg(this.org, this.org_id);
                }
            },
            changeOrg(value) {
                if (value === '') {
                    this.org = '';
                    this.org_id = '';
                } else {
                    this.org = this.orgOptions[value].label;
                    this.org_id = this.orgOptions[value].id;
                    this.getRepositoriesOfOrg(this.orgOptions[value].label, this.orgOptions[value].id)
                }

            },
            changeRepository(value) {

            },
            getRepositoriesOfOrg(org, org_id) {
                let obj = {access_token: this.$store.state.platform_token, org: org, page: 1, per_page: 100};
                this.$axios({
                    url: `https://gitee.com/api/v5/orgs/${org}/repos`,
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
                    this.repositoryOptions = repositoryOptions;
                }).catch(err => {
                })
            },
            getOrgsInfo() {
                let obj = {access_token: this.$store.state.platform_token, admin: true, page: 1, per_page: 100};
                this.$axios({
                    url: url.getOrgsInfo,
                    params: obj,
                }).then(res => {
                    if (res.status === 200) {
                        let orgOptions = [];
                        res.data.forEach((item, index) => {
                            orgOptions.push({value: index, label: item.login, id: item.id});
                        });
                        this.orgOptions = orgOptions;
                    }
                }).catch(err => {

                })
            },
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