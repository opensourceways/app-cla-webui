<template>
    <el-row id="configFields">
        <div class="itemBox">
            <div style="padding: .5rem">
                <p style="font-size: 1.2rem">④ {{$t('org.config_cla_fields')}}
                    <el-tooltip class="item" effect="dark"
                                :content="$t('org.config_cla_fields_desc')"
                                placement="right">
                        <svg-icon icon-class="tips"></svg-icon>
                    </el-tooltip>
                </p>
            </div>
            <div class="margin-top-1rem">
                <div>
                    <div class="margin-top-1rem">
                        {{$t('org.config_cla_individual_metadata')}}
                    </div>
                    <div class="margin-top-1rem">
                        <div class="margin-top-1rem">
                            {{$t('org.config_cla_individual_metadata_desc')}}
                        </div>
                        <div>
                            <el-row class="margin-top-1rem" type="flex" align="middle" :gutter="20">
                                <el-col :span="5">
                                    {{$t('org.config_cla_check_fields_title_title')}}
                                </el-col>
                                <el-col :span="5">
                                    {{$t('org.config_cla_check_fields_type_title')}}
                                </el-col>
                                <el-col :span="5">
                                    {{$t('org.config_cla_check_fields_describe_title')}}
                                </el-col>
                                <el-col :span="5" style="height: 100%">
                                    {{$t('org.config_cla_check_fields_require_title')}}
                                </el-col>
                            </el-row>
                            <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                    v-for="(item,index) in individualMetadataArr">
                                <el-col :span="5">
                                    <el-input disabled="" v-model="item.title" size="medium" readonly=""></el-input>
                                </el-col>
                                <el-col :span="5">
                                    <el-input disabled="" v-model="item.type" size="medium" readonly></el-input>
                                </el-col>
                                <el-col :span="5">
                                    <el-input disabled="" v-model="item.description" size="medium" readonly></el-input>
                                </el-col>
                                <el-col :span="5" style="height: 100%">
                                    <el-checkbox v-model="item.required" disabled="">
                                        {{$t('org.config_cla_fields_required')}}
                                    </el-checkbox>
                                </el-col>
                            </el-row>
                        </div>
                        <div>
                            <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                    v-for="(item,index) in individualCustomMetadataArr" :key="index">
                                <el-col :span="5">
                                    <el-select style="width: 100%" v-model="item.title"
                                               :placeholder="$t('org.config_cla_fields_title_placeholder')"
                                               @change="changeIndividualTitle($event,item)"
                                               size="medium">
                                        <el-option
                                                v-for="i in individualTitleOptions"
                                                :key="i.value"
                                                :label="i.label"
                                                :value="i.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5">
                                    <el-input disabled="" v-model="item.type" size="medium"
                                              :placeholder="$t('org.config_cla_fields_type_placeholder')"></el-input>
                                </el-col>
                                <el-col :span="5" style="height: 100%">
                                    <el-input disabled="" v-model="item.description" size="medium"
                                              :placeholder="$t('org.config_cla_fields_desc_placeholder')"></el-input>
                                </el-col>
                                <el-col :span="5" style="height: 100%">
                                    <el-checkbox v-model="item.required">{{$t('org.config_cla_fields_required')}}
                                    </el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <button class="add_button" @click="addRow(index)">+</button>
                                    <button class="deleteBt" @click="myDeleteRow(index)">-</button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
                <div v-if="this.$store.state.claLinkCorp" class="margin-top-1rem">
                    <div class="margin-top-1rem">
                        {{$t('org.config_cla_corp_metadata')}}
                    </div>
                    <div class="margin-top-1rem">
                        {{$t('org.config_cla_corp_metadata_desc')}}
                    </div>
                    <div>
                        <el-row class="margin-top-1rem" type="flex" align="middle" :gutter="20">
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_title_title')}}
                            </el-col>
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_type_title')}}
                            </el-col>
                            <el-col :span="5">
                                {{$t('org.config_cla_check_fields_describe_title')}}
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                {{$t('org.config_cla_check_fields_require_title')}}
                            </el-col>
                        </el-row>
                        <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                v-for="(item,index) in corporationMetadataArr">
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
                                <el-checkbox v-model="item.required" disabled="">
                                    {{$t('org.config_cla_fields_required')}}
                                </el-checkbox>
                            </el-col>
                        </el-row>
                    </div>
                    <div>
                        <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                v-for="(item,index) in corporationCustomMetadataArr" :key="index">
                            <el-col :span="5">
                                <el-select style="width: 100%" v-model="item.title"
                                           :placeholder="$t('org.config_cla_fields_title_placeholder')"
                                           @change="changeCorpTitle($event,item)"
                                           size="medium">
                                    <el-option
                                            v-for="i in corpTitleOptions"
                                            :key="i.value"
                                            :label="i.label"
                                            :value="i.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="5">
                                <el-input disabled="" v-model="item.type" size="medium"
                                          :placeholder="$t('org.config_cla_fields_type_placeholder')"></el-input>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <el-input disabled="" v-model="item.description" size="medium"
                                          :placeholder="$t('org.config_cla_fields_desc_placeholder')"></el-input>
                            </el-col>
                            <el-col :span="5" style="height: 100%">
                                <el-checkbox v-model="item.required">{{$t('org.config_cla_fields_required')}}
                                </el-checkbox>
                            </el-col>
                            <el-col :span="4">
                                <button class="add_button" @click="addCorpRow(index)">+</button>
                                <button class="deleteBt" @click="myCorpDeleteRow(index)">-</button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepBtBox">
            <button class="step_button" @click="toConfigClaLink">{{$t('org.previous_step')}}</button>
            <button class="step_button" @click="toNextPage">{{$t('org.next_step')}}</button>
        </div>
    </el-row>
</template>

<script>
    import * as util from '../util/util';

    export default {
        name: 'ConfigFields',
        computed: {
            individualCustomMetadataArr() {
                if (this.$store.state.individualCustomMetadataArr) {
                    return this.$store.state.individualCustomMetadataArr;
                } else {
                    return this.initIndividualCustomMetadata;
                }
            },
            corporationCustomMetadataArr() {
                if (this.$store.state.corporationCustomMetadataArr) {
                    return this.$store.state.corporationCustomMetadataArr;
                } else {
                    return this.initCorpCustomMetadata;
                }
            }
        },
        data() {
            return {
                individualMetadata: [],
                corpMetadata: [],
                individualMetadataArr: INDIVIDUALMETADATAARR_EN,
                corporationMetadataArr: CORPORATIONMETADATAARR_EN,
                initIndividualCustomMetadata: JSON.parse(JSON.stringify(INITCUSTOMMETADATA)),
                initCorpCustomMetadata: JSON.parse(JSON.stringify(INITCUSTOMMETADATA)),
                individualTitleOptions: TITLE_OPTIONS_EN,
                corpTitleOptions: TITLE_OPTIONS_EN
            };
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path === '/') {
                    vm.flashInit();
                }
            });
        },
        inject: ['setClientHeight'],
        methods: {
            changeCorpTitle(e, item) {
                switch (e) {
                    case 'Date':
                        item.type = 'date';
                        item.description = 'Date of signing';
                        break;
                    case 'Address':
                        item.type = 'address';
                        item.description = 'Address of the corporation';
                        break;
                    case 'Telephone':
                        item.type = 'telephone';
                        item.description = 'Telephone of the corporation';
                        break;
                    case 'Fax':
                        item.type = 'fax';
                        item.description = 'Fax of the corporation';
                        break;
                    case '日期':
                        item.type = 'date';
                        item.description = '签署日期';
                        break;
                    case '地址':
                        item.type = 'address';
                        item.description = '公司的地址';
                        break;
                    case '电话':
                        item.type = 'telephone';
                        item.description = '公司的电话';
                        break;
                    case '传真':
                        item.type = 'fax';
                        item.description = '公司的传真';
                        break;
                }
            },
            changeIndividualTitle(e, item) {
                switch (e) {
                    case 'Date':
                        item.type = 'date';
                        item.description = 'Date of signing';
                        break;
                    case 'Address':
                        item.type = 'address';
                        item.description = 'Personal home address';
                        break;
                    case 'Telephone':
                        item.type = 'telephone';
                        item.description = 'Personal phone';
                        break;
                    case 'Fax':
                        item.type = 'fax';
                        item.description = 'Personal fax';
                        break;
                    case '日期':
                        item.type = 'date';
                        item.description = '签署日期';
                        break;
                    case '地址':
                        item.type = 'address';
                        item.description = '个人家庭地址';
                        break;
                    case '电话':
                        item.type = 'telephone';
                        item.description = '个人电话';
                        break;
                    case '传真':
                        item.type = 'fax';
                        item.description = '个人传真';
                        break;
                }
            },
            init() {
                if (this.$store.state.individualLanguage === 'chinese') {
                    this.individualMetadataArr = INDIVIDUALMETADATAARR_ZH;
                    this.individualTitleOptions = TITLE_OPTIONS_ZH;
                    util.individualFiledExchangeToZh(this.individualCustomMetadataArr);
                } else if (this.$store.state.individualLanguage === 'english') {
                    util.individualFiledExchangeToEn(this.individualCustomMetadataArr);
                }
                if (this.$store.state.corpLanguage === 'chinese') {
                    this.corporationMetadataArr = CORPORATIONMETADATAARR_ZH;
                    this.corpTitleOptions = TITLE_OPTIONS_ZH;
                    util.corpFiledExchangeToZh(this.corporationCustomMetadataArr);
                } else if (this.$store.state.corpLanguage === 'english') {
                    util.corpFiledExchangeToEn(this.corporationCustomMetadataArr);
                }
            },
            flashInit() {
                this.init();
                this.$store.commit('setIndividualMetadata', this.individualMetadataArr);
                this.$store.commit('setCorpMetadata', this.corporationMetadataArr);
                this.$store.commit('setIndividualCustomMetadataArr', this.initIndividualCustomMetadata);
                this.$store.commit('setCorporationCustomMetadataArr', this.initCorpCustomMetadata);
                sessionStorage.removeItem('individualMetadata');
                sessionStorage.removeItem('corporationMetadata');
                sessionStorage.removeItem('individualCustomMetadataArr');
                sessionStorage.removeItem('corporationCustomMetadataArr');
            },
            toConfigClaLink() {
                this.$store.commit('setIndividualCustomMetadataArr', this.individualCustomMetadataArr);
                this.$store.commit('setCorporationCustomMetadataArr', this.corporationCustomMetadataArr);
                this.$router.replace('/config-cla-link');
            },
            toNextPage() {
                let metadataObj = this.checkMetadata();
                if (metadataObj) {
                    this.$store.commit('setIndividualMetadata', metadataObj.individualArr);
                    this.$store.commit('setCorpMetadata', metadataObj.corpArr);
                    this.$store.commit('setIndividualCustomMetadataArr', this.individualMetadata);
                    this.$store.commit('setCorporationCustomMetadataArr', this.corpMetadata);
                    this.$router.replace('/config-check');
                } else {
                    this.$message.closeAll();
                    this.$message.error(this.$t('tips.title_type_repeat'));
                }
            },
            checkMetadata() {
                let individualMetadata = [];
                let corpMetadata = [];
                this.individualCustomMetadataArr.forEach((item) => {
                    if (item.title !== '' && item.type !== '') {
                        individualMetadata.push(item);
                    }
                });
                this.corporationCustomMetadataArr.forEach((item) => {
                    if (item.title !== '' && item.type !== '') {
                        corpMetadata.push(item);
                    }
                });
                let individualArr = this.individualMetadataArr.concat(individualMetadata);
                let corpArr = this.corporationMetadataArr.concat(corpMetadata);
                for (let i = 0; i < individualArr.length; i++) {
                    for (let j = i + 1; j < individualArr.length; j++) {
                        if (individualArr[i].title === individualArr[j].title || individualArr[i].type === individualArr[j].type) {
                            return false;
                        }
                    }
                }
                for (let i = 0; i < corpArr.length; i++) {
                    for (let j = i + 1; j < corpArr.length; j++) {
                        if (corpArr[i].title === corpArr[j].title || corpArr[i].type === corpArr[j].type) {
                            return false;
                        }
                    }
                }
                individualMetadata.push({
                    title: '',
                    type: '',
                    description: '',
                    required: false
                });
                corpMetadata.push({
                    title: '',
                    type: '',
                    description: '',
                    required: false
                });
                this.individualMetadata = individualMetadata;
                this.corpMetadata = corpMetadata;
                return {individualArr, corpArr};
            },
            addRow(index) {
                let metadata = JSON.parse(JSON.stringify(this.individualCustomMetadataArr));
                metadata.splice(index + 1, 0, {
                    title: '',
                    type: '',
                    description: '',
                    required: false
                });
                this.$store.commit('setIndividualCustomMetadataArr', metadata);
            },
            myDeleteRow(index) {
                let metadata = JSON.parse(JSON.stringify(this.individualCustomMetadataArr));
                if (metadata.length === 1) {
                    metadata[0].type = '';
                    metadata[0].title = '';
                    metadata[0].description = '';
                } else {
                    metadata.splice(index, 1);
                }
                this.$store.commit('setIndividualCustomMetadataArr', metadata);
            },
            addCorpRow(index) {
                let metadata = JSON.parse(JSON.stringify(this.corporationCustomMetadataArr));
                metadata.splice(index + 1, 0, {
                    title: '',
                    type: '',
                    description: '',
                    required: false
                });
                this.$store.commit('setCorporationCustomMetadataArr', metadata);
            },
            myCorpDeleteRow(index) {
                let metadata = JSON.parse(JSON.stringify(this.corporationCustomMetadataArr));
                if (metadata.length === 1) {
                    metadata[0].type = '';
                    metadata[0].title = '';
                    metadata[0].description = '';
                } else {
                    metadata.splice(index, 1);
                }
                this.$store.commit('setCorporationCustomMetadataArr', metadata);
            }
        },
        created() {
            this.init();
        },
        updated() {
            this.setClientHeight();
        }
    };
</script>

<style lang="less">
    #configFields {
        .deleteBt {
            width: 3rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #FF9D58, #E22424);
            margin-right: 1rem;
        }

        .deleteBt:focus {
            outline: none;
        }

        .add_button {
            width: 3rem;
            height: 3rem;
            border-radius: 1.5rem;
            border: none;
            color: white;
            font-size: 1rem;
            cursor: pointer;
            background: linear-gradient(to right, #97DB30, #319E55);
            margin-right: 1rem;
        }

        .add_button:focus {
            outline: none;
        }

        .itemBox {
            border-radius: 1.25rem;
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem;
            margin-bottom: 2rem;


        }
    }
</style>
