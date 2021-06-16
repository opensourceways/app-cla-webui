<template>
    <el-row id="subemail">
        <el-col>
            <p class="tabName">{{$t('header.SubEmail')}}</p>
            <el-row class="tableBox">
                <el-col>
                    <el-row>
                        <el-col align="left">
                            <button class="button" @click="addSubEmail">{{$t('corp.addSubEmail')}}</button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-table
                                :empty-text="$t('corp.no_data')"
                                class="tableClass"
                                :data="tableData">
                            <el-table-column
                                    prop="id"
                                    :label="$t('corp.number')">
                            </el-table-column>
                            <el-table-column
                                    prop="email"
                                    :label="$t('corp.emailSuffix')">
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
            </el-row>
            <corpReLoginDialog :message="corpReLoginMsg" :dialogVisible="corpReLoginDialogVisible"></corpReLoginDialog>
            <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
        </el-col>
    </el-row>
</template>

<script>
    import * as url from '../util/api'
    import http from '../util/http'
    import corpReLoginDialog from '../components/CorpReLoginDialog'
    import reTryDialog from '../components/ReTryDialog'
    import * as util from '../util/util'

    export default {
        name: "Subemail",
        components: {
            corpReLoginDialog,
            reTryDialog,
        },
        computed: {
            corpReLoginDialogVisible() {
                return this.$store.state.dialogVisible
            },
            corpReLoginMsg() {
                return this.$store.state.dialogMessage
            },
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            },
        },
        data() {
            return {
                tableData: [],
            }
        },
        methods: {
            addSubEmail() {
                this.$router.push('/add-subemail')
            },
            getEmails() {
                http({
                    url: url.addSubEmail,
                }).then(res => {
                    let data = res.data.data;
                    this.$store.commit('setEmailSuffix', data);
                    let newData = [];
                    data.forEach((item, index) => {
                        newData.push({id: index + 1, email: item})
                    });
                    this.tableData = newData;
                }).catch(err => {
                    util.catchErr(err,'errorSet',this)
                })
            },
        },
        created() {
            this.getEmails();
        }
    }
</script>

<style scoped lang="less">
    #subemail {

    }
</style>
