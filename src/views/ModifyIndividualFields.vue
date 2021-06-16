<template>
    <el-row id="configFields">
        <div class="itemBox">
            <div style="padding: .5rem">
                <p style="font-size: 1.2rem">④ Edit CLA's Fields
                    <el-tooltip class="item" effect="dark"
                                content="The information you want contributors to fill in when they sign the cla.Title and type are required, otherwise the field will fail to be added"
                                placement="right">
                        <svg-icon icon-class="tips"></svg-icon>
                    </el-tooltip>
                </p>
            </div>
            <div class="margin-top-1rem">

                <div>
                    <div class="margin-top-1rem">
                        For Individual Metadata
                    </div>
                    <div class="margin-top-1rem">
                        <div class="margin-top-1rem">
                            Configure the required field information for individual and employee signers
                        </div>
                        <div>
                            <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                    v-for="(item,index) in individualMetadataArr">
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
                        <div>
                            <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                    v-for="(item,index) in individualCustomMetadataArr">
                                <el-col :span="5">
                                    <el-input v-model="item.title" size="medium"
                                              placeholder="please input title">

                                    </el-input>
                                </el-col>
                                <el-col :span="5">
                                    <el-select style="width: 100%" v-model="item.type"
                                               placeholder="select data type"
                                               size="medium">
                                        <el-option
                                                v-for="i in dataTypeOptions"
                                                :key="i.value"
                                                :label="i.label"
                                                :value="i.value">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col :span="5" style="height: 100%">
                                    <el-input v-model="item.description" size="medium"
                                              placeholder="description"></el-input>
                                </el-col>
                                <el-col :span="5" style="height: 100%">
                                    <el-checkbox v-model="item.required">required</el-checkbox>
                                </el-col>
                                <el-col :span="4">
                                    <el-button @click="addRow(index)" size="medium">+</el-button>
                                    <el-button @click="myDeleteRow(index)" size="medium">-</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stepBtBox">
            <el-button size="medium" type="primary" class="stepBt" @click="submitModify">Submit</el-button>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "ConfigFields",
        computed: {
            individualCustomMetadataArr() {
                if (this.$store.state.individualCustomMetadataArr) {
                    return this.$store.state.individualCustomMetadataArr
                } else {
                    return this.initIndividualCustomMetadata;
                }
            },
            corporationCustomMetadataArr() {
                if (this.$store.state.corporationCustomMetadataArr) {
                    return this.$store.state.corporationCustomMetadataArr
                } else {
                    return this.initCorpCustomMetadata;
                }
            },
        },
        data() {
            return {
                individualMetadata: [],
                corpMetadata: [],
                dataTypeOptions: [{label: 'name', value: 'name'}, {
                    label: 'corporationName',
                    value: 'corporationName'
                }, {label: 'date', value: 'date'}, {
                    label: 'telephone',
                    value: 'telephone'
                }, {label: 'address', value: 'address'}, {label: 'email', value: 'email'}, {
                    label: 'fax',
                    value: 'fax'
                },
                ],
                individualMetadataArr: [{
                    title: 'Name',
                    type: 'name',
                    description: 'your name',
                    required: true,
                }, {
                    title: 'E-Mail',
                    type: 'email',
                    description: 'your email',
                    required: true,
                },],
                corporationMetadataArr: [

                    {
                        title: 'Authorized Representative',
                        type: 'authorized',
                        description: 'name of Authorized Representative',
                        required: true,
                    },
                    {
                        title: 'Title',
                        type: 'title',
                        description: 'title of Authorized Representative',
                        required: true,
                    },
                    {
                        title: 'Corporation Name',
                        type: 'corporationName',
                        description: 'corporation name',
                        required: true,
                    },

                    {
                        title: 'E-Mail',
                        type: 'email',
                        description: 'corporation email',
                        required: true,
                    },],
                initIndividualCustomMetadata: [{
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                }],
                initCorpCustomMetadata: [{
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                }],
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path === '/') {
                    vm.init();
                }
            })
        },
        methods: {
            submitModify(){

            },
            init() {
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
                this.$router.replace('/config-cla-link')
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
                    this.$message.error(this.$t('tips.title_type_repeat'))
                }
            },
            checkMetadata() {
                let individualMetadata = [];
                let corpMetadata = [];
                this.individualCustomMetadataArr.forEach((item) => {
                    if (item.title !== '' && item.type !== '') {
                        individualMetadata.push(item)
                    }
                });
                this.corporationCustomMetadataArr.forEach((item) => {
                    if (item.title !== '' && item.type !== '') {
                        corpMetadata.push(item)
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
                    required: false,
                });
                corpMetadata.push({
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                });
                this.individualMetadata = individualMetadata;
                this.corpMetadata = corpMetadata;
                return {individualArr, corpArr};
            },
            editMetadata() {
                let metadataArr = this.checkMetadata();
                if (metadataArr) {
                    let individualArr = metadataArr.individualArr;
                    let corpArr = metadataArr.corpArr;
                    let individualFields = [];
                    let corpFields = [];
                    individualArr.forEach((item, index) => {
                        if (item.title !== '' && item.type !== '') {
                            individualFields.push({
                                id: index + '',
                                title: item.title,
                                type: item.type,
                                description: item.description,
                                required: item.required,
                            })
                        }
                    });
                    corpArr.forEach((item, index) => {
                        if (item.title !== '' && item.type !== '') {
                            corpFields.push({
                                id: index + '',
                                title: item.title,
                                type: item.type,
                                description: item.description,
                                required: item.required,
                            })
                        }
                    });
                    return {individualFields, corpFields}
                } else {
                    return false
                }
            },
            addRow(index) {
                let metadata = this.individualCustomMetadataArr;
                metadata.splice(index + 1, 0, {
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                });
                this.$store.commit('setIndividualCustomMetadataArr', metadata)
            },
            myDeleteRow(index) {
                let metadata = this.individualCustomMetadataArr;
                if (metadata.length === 1) {
                    metadata[0].type = '';
                    metadata[0].title = '';
                    metadata[0].description = ''
                } else {
                    metadata.splice(index, 1);
                }
                this.$store.commit('setIndividualCustomMetadataArr', metadata)
            },
            addCorpRow(index) {
                let metadata = this.corporationCustomMetadataArr;
                metadata.splice(index + 1, 0, {
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                });
                this.$store.commit('setCorporationCustomMetadataArr', metadata)
            },
            myCorpDeleteRow(index) {
                let metadata = this.corporationCustomMetadataArr;
                if (metadata.length === 1) {
                    metadata[0].type = '';
                    metadata[0].title = '';
                    metadata[0].description = ''
                } else {
                    metadata.splice(index, 1);
                }
                this.$store.commit('setCorporationCustomMetadataArr', metadata)
            },
        },
    }
</script>

<style lang="less">
    #configFields {
        .itemBox {
            border-radius: 1.25rem;
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem;
            margin-bottom: 2rem;
        }
    }
</style>
