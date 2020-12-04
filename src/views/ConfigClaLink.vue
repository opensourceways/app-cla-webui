<template>
    <el-row id="configTwo">
        <div class="itemBox">
            <div class="stepTitle">
                ② Paste a url of a CLA file
                <el-tooltip class="item" effect="light"
                            content="Paste a url to the original data of a CLA in the repository"
                            placement="right">
                    <svg-icon icon-class="bangzhu"></svg-icon>
                </el-tooltip>
            </div>
            <div>
                <div class="margin-top-1rem">
                    Individual CLA Url
                </div>
                <div class="margin-top-1rem">
                    You need to paste here a url to the original data from the gitee repository, which is the cla
                    protocol,
                    applied to individual signatures
                </div>
                <div class="margin-top-1rem">
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-input placeholder="Paste a link" size="medium" v-model="cla_link_individual">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row class="margin-top-1rem">
                        Individual CLA Language
                    </el-row>
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-select v-model="individualClaLanguageValue"
                                       placeholder="select language"
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
                    If you need your community support corporation to sign up for CLA, please complete the following
                    information. If not, please ignore it
                </div>
                <div class="margin-top-1rem">
                    Corporation CLA Url
                </div>
                <div class="margin-top-1rem">
                    You need to paste here a url to the original data from the gitee repository, which is the cla
                    protocol,
                    applied to corporation signatures
                </div>
                <div class="margin-top-1rem">
                    <el-row>
                        <el-col>
                            <el-input placeholder="Paste a link" size="medium" v-model="cla_link_corporation">
                            </el-input>
                        </el-col>
                    </el-row>
                    <div class="margin-top-1rem">
                        Corporation CLA Language
                    </div>
                    <el-row class="margin-top-1rem">
                        <el-col>
                            <el-select v-model="corpClaLanguageValue"
                                       placeholder="select language"
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
                    <div class="margin-top-1rem">
                        Upload Signature File
                    </div>
                    <div class="margin-top-1rem">
                        You need to upload a PDF file that the community administrator has signed. If you don't have the
                        original file, click
                        <span @click="downloadFile" class="downloadText">download</span>
                    </div>
                    <div class="margin-top-1rem">
                        <div>
                            <el-button class="showBox" size="mini">
                                <input class="inputFile" id="corp_pdf" @change="changeFile" type="file" name="file"
                                       title="">
                                choose file
                            </el-button>
                            <span class="signatureName">{{this.$store.state.corpFDName}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepBtBox">
            <el-button size="medium" type="primary" class="stepBt" @click="toConfigOrg">Previous Step</el-button>
            <el-button size="medium" type="primary" class="stepBt" @click="toConfigFields">Next Step</el-button>
        </div>
        <reTryDialog :message="corpReLoginMsg" :dialogVisible="corpReTryDialogVisible"></reTryDialog>
    </el-row>

</template>
<script>
    import reTryDialog from '../components/ReTryDialog'

    export default {
        name: "ConfigClaLink",
        components: {
            reTryDialog
        },
        computed: {
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
            individualClaLanguageValue: {
                get() {
                    return this.$store.state.individualLanguage;
                },
                set(value) {
                    this.$store.commit('setIndividualLanguage', value)
                }
            },
            corpClaLanguageValue: {
                get() {
                    return this.$store.state.corpLanguage;
                },
                set(value) {
                    this.$store.commit('setCorpLanguage', value)
                }
            }
            ,
            // corp_pdf_name() {
            //     console.log( 'corpFD',this.$store.state.corpFD);
            //     if (this.$store.state.corpFD) {
            //         console.log('files',this.$store.state.corpFD.get('files'));
            //         return this.$store.state.corpFD.get('files').name;
            //     }
            //     return this.$store.state.corpFD
            // },
            corpReLoginMsg() {
                return this.$store.state.dialogMessage
            }
            ,
            corpReTryDialogVisible() {
                return this.$store.state.reTryDialogVisible
            }
            ,
        },
        data() {
            return {
                corp_pdf_name: '',
                languageOptions: [{value: 'English', label: 'English'}, {value: '中文', label: '中文'}],
            }
        }
        ,
        methods: {
            downloadFile(){
                
            },
            changeIndividualLanguage(value) {
                this.$store.commit('setIndividualLanguage', value)
            },
            changeCorpLanguage(value) {
                this.$store.commit('setCorpLanguage', value)
            },
            changeFile() {
                let formData = new FormData();
                let fs = document.getElementById('corp_pdf').files;
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
                this.$store.commit('setCorpFDName', formData.get('files').name)
                let reader = new FileReader();
                reader.readAsDataURL(formData.get('files'));
                reader.onload = () => {
                    this.$store.commit('setCorpFD', reader.result)
                };
            },
            toConfigOrg() {
                this.$router.push('/config-org')
            },
            toConfigFields() {
                if (this.cla_link_individual && this.individualClaLanguageValue) {
                    if (this.cla_link_corporation && this.corpClaLanguageValue && this.$store.state.corpFD
                        || !(this.cla_link_corporation || this.corpClaLanguageValue || this.$store.state.corpFD)) {
                        this.$router.push('/config-fields')
                    } else if (this.cla_link_corporation) {
                        if (this.corpClaLanguageValue) {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.upload_signature_file'),
                            });
                        } else {
                            this.$store.commit('errorCodeSet', {
                                dialogVisible: true,
                                dialogMessage: this.$t('tips.select_corp_language'),
                            });
                        }

                    } else {
                        this.$store.commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: this.$t('tips.paste_corp_link'),
                        });
                    }
                } else if (this.cla_link_individual) {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.select_individual_language'),
                    });
                } else {
                    this.$store.commit('errorCodeSet', {
                        dialogVisible: true,
                        dialogMessage: this.$t('tips.paste_individual_link'),
                    });
                }
            },
        },
    }
</script>
<style lang="less">
    #configTwo {
        .signatureName {
            font-size: .8rem;
        }

        .downloadText {
            text-decoration: underline;
            cursor: pointer;
            color: #409EFF;
        }

        .inputFile {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            opacity: 0;
            width: 100%;
            height: 100%;
        }

        .showBox {
            position: relative;
            top: 0;
            left: 0;
            z-index: 1;
            margin-right: 1rem;
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