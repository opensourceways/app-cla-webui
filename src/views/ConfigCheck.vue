<template>
    <div id="configCheck">
        <div class="itemBox">
            <div class="=info-title">
                ① Organization and repository
            </div>
            <div class="margin-top-1rem">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input disabled="" size="medium" v-model="org"></el-input>
                    </el-col>
                    <el-col :span="8">
                        <el-input disabled="" size="medium" v-model="orgAlias"></el-input>
                    </el-col>
                    <el-col :span="8">
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
            <div class="margin-top-1rem">
                Individual CLA Link
            </div>
            <div class="margin-top-1rem">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-input disabled="" size="medium" v-model="cla_link_individual">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="individualClaLanguageValue"
                                   placeholder="select language"
                                   style="width: 100%"
                                   disabled=""
                                   size="medium">
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
            <div class="margin-top-1rem">
                Corporation CLA Link
            </div>
            <div class="margin-top-1rem">
                <el-row :gutter="20">
                    <el-col :span="18">
                        <el-input disabled="" size="medium" v-model="cla_link_corporation">
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="corpClaLanguageValue"
                                   placeholder="select language"
                                   style="width: 100%"
                                   size="medium"
                                   disabled="">
                            <el-option
                                    v-for="item in languageOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <div class="margin-top-1rem">
                    Signature File
                </div>
                <div class="margin-top-1rem">
                    <el-input disabled="" v-model="corp_pdf_name"></el-input>
                </div>
            </div>
        </div>
        <div class="itemBox">
            <div class="=info-title">
                ③ Email
            </div>
            <div class="margin-top-1rem">
                <el-input
                        disabled=""
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
                <el-row class="margin-top-1rem">
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
                <el-row class="margin-top-1rem">
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
    import * as url from '../until/api'
    import http from '../until/http'

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
            orgAlias() {
                return this.$store.state.orgAlias
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
            },
            individualClaLanguageValue() {
                return this.$store.state.individualLanguage;
            },
            corpClaLanguageValue() {
                return this.$store.state.corpLanguage;
            },
            corp_pdf_name() {
                return this.$store.state.corpFDName
            },
        },
        data() {
            return {
                languageOptions: [{value: 'English', label: 'English'}, {value: '中文', label: '中文'}],
                platform: this.$store.state.platform,
                isVerify: false,
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
            toConfigEmail() {
                this.$router.push('/config-email');
            },
            editMetadata(metadata) {
                if (metadata) {
                    let metadataArr = metadata;
                    let fields = [];
                    metadataArr.forEach((item, index) => {
                        if (item.title !== '' && item.type !== '') {
                            fields.push({
                                id: index + '',
                                title: item.title,
                                type: item.type,
                                description: item.description,
                                required: item.required,
                            })
                        }
                    });
                    return fields;
                } else {
                    return false
                }
            },
            dataURLtoFile(dataurl, filename) {
                let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new File([u8arr], filename, {type: mime});
            },
            fileToFormData(fs){
                let formData = new FormData();
                let max_size = 1024 * 1024;
                for (let i = 0; i < fs.length; i++) {
                    let d = fs[i];
                    if (d.size <= max_size) {
                        if (/.(PDF|pdf)$/.test(d.name)) {
                            formData.append("files", fs[i]);
                        } else {
                            alert('上传文件必须是PDF！');
                            return false
                        }
                    } else {
                        alert('上传文件过大！');
                        return false
                    }
                }
                return formData;
            },
            binding() {
                let corp_pdf={};
                let formData={};
                if (this.$store.state.corpFD) {
                     corp_pdf = this.dataURLtoFile(this.$store.state.corpFD, this.$store.state.corpFDName);
                    console.log('pdf==', corp_pdf);
                    formData = this.fileToFormData(corp_pdf)
                }
                let obj = {};
                let corpCla = {};
                let individualCla = {
                    url: this.cla_link_individual.trim(),
                    language: this.individualClaLanguageValue,
                    fields: this.editMetadata(this.individualMetadata)
                };
                if (this.cla_link_corporation) {
                    corpCla = {
                        org_signature: formData,
                        url: this.cla_link_corporation.trim(),
                        language: this.corpClaLanguageValue,
                        fields: this.editMetadata(this.corporationMetadata)
                    };
                    if (this.repo) {
                        obj = {
                            repo_id: this.repo,
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            org_alias: this.orgAlias,
                            individual_cla: individualCla,
                            corp_cla: corpCla,
                        };
                    } else {
                        obj = {
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            org_alias: this.orgAlias,
                            individual_cla: individualCla,
                            corp_cla: corpCla,
                        };
                    }
                } else {
                    if (this.repo) {
                        obj = {
                            repo_id: this.repo,
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            org_alias: this.orgAlias,
                            individual_cla: individualCla,
                        };
                    } else {
                        obj = {
                            org_email: this.email,
                            platform: this.platform,
                            org_id: this.org,
                            org_alias: this.orgAlias,
                            individual_cla: individualCla,
                        };
                    }
                }
                http({
                    url: url.linkRepository,
                    method: 'post',
                    data: obj,
                }).then(res => {
                    this.$message.closeAll();
                    this.$message.success('success');
                    this.$router.push('/home')
                }).catch(err => {
                    this.$message.closeAll();
                    this.$message.error(err.data.error_message)
                })

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