<template>
    <el-row id="configOne">
        <div class="itemBox">
            <div class="stepTitle">
                ① Choose a organization or repository
            </div>

            <div style="padding: 0 2rem">
                <el-row :gutter="20">
                    <el-col :span="12">
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
                    <el-col :span="12">
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
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "ConfigOne",
        computed: {
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
            isEmail() {
                return `${this.$store.state.isEmail}` === 'true';
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
          
        },
        data(){
            return {

            }
        },
        methods:{
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
                this.$store.commit('setOrgValue', value)
                if (value === '') {
                    this.org = '';
                    this.org_id = '';
                    this.$store.commit('setOrgChoose', false);
                    this.$store.commit('setRepositoryValue', undefined);
                    this.$store.commit('setRepositoryChoose', false);
                    this.$store.commit('setRepositoryOptions', undefined)
                } else {
                    this.org = this.orgOptions[value].label;
                    this.org_id = this.orgOptions[value].id;
                    this.$store.commit('setOrgChoose', true);
                    this.getRepositoriesOfOrg(this.orgOptions[value].label, this.orgOptions[value].id)
                }

            },
            changeRepository(value) {
                this.$store.commit('setRepositoryValue', value)
                if (value !== '') {
                    this.$store.commit('setRepositoryChoose', true)
                } else {
                    this.$store.commit('setRepositoryChoose', false)
                }
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
                    })
                    this.$store.commit('setRepositoryOptions', repositoryOptions)

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
                        })
                        this.$store.commit('setOrgOption', orgOptions)
                    }
                }).catch(err => {

                })
            },
        },
    }
</script>

<style lang="less">
    #configOne {
        .stepTitle {
            font-size: 1.2rem;
            padding: .5rem;
        }
    }

</style>