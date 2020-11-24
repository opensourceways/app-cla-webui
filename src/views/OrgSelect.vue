<template>
    <el-row style="height: 100%">
        <el-col align="right" class="formBox">
            <div class="formBack_Box">
                <div class="formBack">
                    <el-row class="marginTop">
                        <el-col>
                            <span>Please select the organization you want to manage</span>
                        </el-col>
                    </el-row>
                    <el-row class="marginTop">
                        <el-col>
                            <el-select value="" v-model="orgValue"
                                       clearable=""
                                       filterable=""
                                       style="width: 15rem"
                                       placeholder="select"
                                       @change="changeOrg">
                                <el-option
                                        v-for="item in orgData"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label">

                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="marginTop">
                        <el-col>
                            <el-button style="width: 15rem" type="primary" size="medium" @click="submit">SUBMIT
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "OrgSelect",
        computed: {
            orgData() {
                let data = []
                if (this.$store.state.loginInfo.userInfo.length) {
                    this.$store.state.loginInfo.userInfo.forEach((item, index) => {
                        if (item.repo_id) {
                            data.push({value: index, label: `${item.org_id}/${item.repo_id}`})
                        } else {
                            data.push({value: index, label: item.org_id})
                        }
                    })
                    this.orgValue = 0;
                }

                return data
            },
        },
        data() {
            return {
                orgValue: '',
            }
        },
        methods: {
            ...mapActions(['setLoginInfoAct','setCorpTokenAct']),
            changeOrg(value) {
            },
            submit() {
                let data = JSON.parse(JSON.stringify(this.$store.state.loginInfo))
                Object.assign(data, {orgValue: this.orgValue})
                this.setCorpTokenAct(data.userInfo[this.orgValue].token)
                this.setLoginInfoAct(data)
                if (data.userInfo[this.orgValue].role === 'admin') {
                    this.$router.push('/rootManager')
                } else {
                    this.$router.push('/signedRepo')
                }
            },
        },
    }
</script>

<style scoped lang="less">
    .formBack_Box {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    .formBack {
        width: 18rem;
        box-shadow: 0 0 20px 10px #F3F3F3;
        padding: 3rem;
        background-color: white;
        border-radius: 2rem;

    }

    .formBox {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .marginTop {
        margin-top: 2rem;
    }
</style>