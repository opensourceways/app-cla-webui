<template>
    <div id="configCheck">
        <div class="itemBox">
            <div class="=info-title">
                ① Organization and repository
            </div>
            <div class="padding-left-right-2rem">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-input disabled="" size="medium" v-model="org"></el-input>
                    </el-col>
                    <el-col :span="12">
                        <el-input disabled="" size="medium" v-model="repo"></el-input>
                    </el-col>
                </el-row>

            </div>
        </div>
        <div class="itemBox">
            <div class="=info-title">
                ② Paste a link of a CLA file
                <el-tooltip class="item" effect="dark"
                            content="Paste a link to the original data of a CLA in the repository"
                            placement="right">
                    <svg-icon icon-class="bangzhu"></svg-icon>
                </el-tooltip>
            </div>
            <div>
                Individual CLA Link
            </div>
            <div class="padding-left-right-2rem">
                <el-row :gutter="20">
                    <el-col>
                        <el-input disabled="" size="medium" v-model="cla_link_individual">
                        </el-input>
                    </el-col>
                    <!--<el-col :span="4">-->
                    <!--<el-select v-model="claLanguageValue"-->
                    <!--placeholder="select language"-->
                    <!--style="width: 100%"-->
                    <!--size="medium"-->
                    <!--clearable-->
                    <!--filterable-->
                    <!--@change="changeLanguage">-->
                    <!--<el-option-->
                    <!--v-for="item in languageOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-col>-->
                </el-row>
            </div>
            <div>
                Corporation CLA Link
            </div>
            <div class="padding-left-right-2rem">
                <el-row :gutter="20">
                    <el-col>
                        <el-input disabled="" size="medium" v-model="cla_link_corporation">
                        </el-input>
                    </el-col>
                    <!--<el-col :span="4">-->
                    <!--<el-select v-model="claLanguageValue"-->
                    <!--placeholder="select language"-->
                    <!--style="width: 100%"-->
                    <!--size="medium"-->
                    <!--clearable-->
                    <!--filterable-->
                    <!--@change="changeLanguage">-->
                    <!--<el-option-->
                    <!--v-for="item in languageOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-col>-->
                </el-row>
            </div>
        </div>
        <div class="itemBox">
            <div class="=info-title">
                ③ Email
            </div>
            <div class="padding-left-right-2rem">
                <el-input
                        readonly=""
                        size="medium"
                        class="emailInput"
                        placeholder="authorized email"
                        v-model="email">
                </el-input>
            </div>
        </div>
        <div class="itemBox">
            <div style="padding: .5rem">
                <p style="font-size: 1.2rem">④ Edit CLA's Fields
                    <el-tooltip class="item" effect="dark"
                                content="The information you want contributors to fill in when they sign the cla.Title and type are required, otherwise the field will fail to be added"
                                placement="right">
                        <svg-icon icon-class="bangzhu"></svg-icon>
                    </el-tooltip>
                </p>
            </div>
            <div style="padding: 0 2rem">
                <el-row class="size-b">
                    For Individual
                </el-row>
                <div>
                    <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                            v-for="(item,index) in individualMetadata">
                        <el-col :span="5">
                            <el-input disabled="" v-model="item.title" size="medium" readonly="">

                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input disabled="" v-model="item.type" size="medium" readonly></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input disabled="" v-model="item.description" size="medium" readonly></el-input>
                        </el-col>
                        <el-col :span="5" style="height: 100%">
                            <el-checkbox v-model="item.required" disabled="">required</el-checkbox>
                        </el-col>
                    </el-row>

                </div>
                <el-row class="size-b">
                    For Corporation
                </el-row>
                <div>
                    <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                            v-for="(item,index) in corporationMetadata">
                        <el-col :span="5">
                            <el-input disabled="" v-model="item.title" size="medium" readonly="">

                            </el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input disabled="" v-model="item.type" size="medium" readonly></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-input disabled="" v-model="item.description" size="medium" readonly></el-input>
                        </el-col>
                        <el-col :span="5" style="height: 100%">
                            <el-checkbox v-model="item.required" disabled="">required</el-checkbox>
                        </el-col>
                    </el-row>

                </div>
            </div>

        </div>
        <div class="stepBtBox">
            <el-button @click="toConfigEmail" size="medium" type="primary" class="stepBt">Previous Step</el-button>
            <el-button @click="binding" size="medium" type="primary" class="stepBt">Submit</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConfigCheck",
        computed: {
            orgChoose() {
                return `${this.$store.state.orgChoose}` === 'true';
            },
            isEmail() {
                return `${this.$store.state.isEmail}` === 'true';
            },
            repositoryChoose() {
                return `${this.$store.state.repositoryChoose}` === 'true'
            },
            email() {
                return this.$store.state.email;
            },
            org() {
                return this.$store.state.org
            },
            org_alias() {
                return this.$store.state.org_alias
            },
            repo() {
                return this.$store.state.repo
            },
            cla_link_individual: {
                get() {
                    return this.$store.state.claLinkIndividual;
                },
                set(value) {
                    this.$store.commit('setClaLinkIndividual', value)
                },
            },
            cla_link_corporation: {
                get() {
                    return this.$store.state.claLinkCorp;
                },
                set(value) {
                    this.$store.commit('setClaLinkCorp', value)
                },
            },
            individualMetadata() {
                return this.$store.state.individualMetadata;
            },
            corporationMetadata() {
                return this.$store.state.corporationMetadata;
            }
        },
        data() {
            return {
                claLanguageValue: 'English',
                claTypeValue: '',
                languageOptions: [{label: 'English', value: 'English'}, {label: 'Chinese', value: 'Chinese'}, {
                    label: 'Japanese',
                    value: 'Japanese'
                }],
                platform: this.$store.state.platform,
                isVerify: false,
                activeName: 'first',
                previewShow: false,
                loginType: this.$store.state.loginType,
                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                platform_token: this.$store.state.platform_token,
                user: {
                    userName: this.$store.state.user.userName,
                    userId: this.$store.state.user.userId,
                    isAuthorize: false,
                },
            }
        },
        methods: {
            binding() {
                let obj = {};
                let metadata = true;
                if (metadata) {
                    let cla = {url: this.cla_link.trim(), language: this.claLanguageValue, fields: metadata};
                    if (this.repositoryChoose) {
                        obj = {
                            repo_id: this.repo,
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            apply_to: this.metadataType,
                            cla: cla,
                        };
                    } else {
                        obj = {
                            repo_id: '',
                            org_email: this.email,
                            platform: this.platform,
                            org_id: `${this.orgOptions[this.orgValue].label}`,
                            apply_to: this.metadataType,
                            cla: cla,
                        };
                    }
                    http({
                        url: url.linkRepository,
                        method: 'post',
                        data: obj,
                    }).then(res => {
                        this.$message.closeAll();
                        this.$message.success('success')
                        this.$router.push('/home')
                    }).catch(err => {
                        this.$message.closeAll();
                        this.$message.error(err.data.error_message)
                    })
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.title_type_repeat'))
                }

            },
        },
    }
</script>

<style lang="less">
    #configCla {
        .el-dialog__body {
            text-align: center;
            word-break: keep-all;
        }

        .info-title {
            font-size: 1.2rem;
            padding: .5rem;
        }

        .size-b {
            font-weight: bold;
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

        .typeCol {
            padding: .5rem 10px;
        }

        #section {
            flex-grow: 1;
            text-align: left;

            .pageTitle {
                padding: 2rem 0;
                font-size: 1.3rem;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -webkit-touch-callout: none;
                user-select: none;
            }
        }
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .dialogDesc {
        font-size: 1.2rem;
        margin: 2rem 0;
    }

    li {
        margin: 1rem 0;
    }
</style>