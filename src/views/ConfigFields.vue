<template>
    <el-row id="configFields">
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
            <div class="margin-top-1rem">

                <div>
                    <div class="margin-top-1rem">
                       for individual metadata
                    </div>
                    <div class="margin-top-1rem">
                        Configure the required field information for individual and employee signers
                    </div>
                    <div class="margin-top-1rem">
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

                    <div class="margin-top-1rem">
                       for corporation metadata
                    </div>
                    <div class="margin-top-1rem">
                        Configure the required field information for corporation signers
                    </div>
                    <div class="margin-top-1rem">
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
                <div class="margin-top-1rem">
                    <div>
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
                                <el-checkbox v-model="item.required" disabled="">required</el-checkbox>
                            </el-col>
                        </el-row>

                    </div>
                    <div>
                        <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                v-for="(item,index) in corporationCustomMetadataArr">
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
        <div class="stepBtBox">
            <el-button size="medium" type="primary" class="stepBt" @click="toConfigClaLink">Previous Step</el-button>
            <el-button size="medium" type="primary" class="stepBt" @click="toConfigEmail">Next Step</el-button>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "ConfigFields",
        computed: {
            metadataType: {
                get() {
                    return this.$store.state.metadataType;
                },
                set(value) {
                    this.$store.commit('setMetadataType', value)
                },
            },
            customMetadataArr: {
                get() {
                    return this.$store.state.customMetadataArr;
                },
                set(value) {
                    this.$store.commit('setCusMetadataArr', value)
                },
            },
        },
        data() {
            return {
                metadataArr: [{
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

                customMetadataArr: [],
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
                individualCustomMetadataArr: [{
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                }],
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
                corporationCustomMetadataArr: [{
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                }],
            }
        },
        methods: {
            toConfigClaLink(){
                this.$router.push('/config-cla-link')
            },
            toConfigEmail(){
                this.$router.push('/config-email')
            },
            checkMetadata() {
                let newArr = [];
                if (this.metadataType === 'individual') {
                    newArr = this.individualMetadataArr.concat(this.individualCustomMetadataArr);
                } else {
                    newArr = this.corporationMetadataArr.concat(this.corporationCustomMetadataArr);
                }
                for (let i = 0; i < newArr.length; i++) {
                    for (let j = i + 1; j < newArr.length; j++) {
                        if (newArr[i].title === newArr[j].title || newArr[i].type === newArr[j].type) {
                            return false;
                        }
                    }
                }
                return newArr;
            },
            editMetadata() {
                let fields = [];
                let metadataArr = this.checkMetadata();
                if (metadataArr) {
                    metadataArr.forEach((item, index) => {
                        if (metadataArr[index].title !== '' && metadataArr[index].type !== '') {
                            fields.push({
                                id: index + '',
                                title: item.title,
                                type: item.type,
                                description: item.description,
                                required: item.required,
                            })
                        }
                    });
                    return fields
                } else {
                    return false
                }
            },
            addRow(index) {
                if (this.metadataType === 'individual') {
                    this.individualCustomMetadataArr.splice(index + 1, 0, {
                        title: '',
                        type: '',
                        description: '',
                        required: false,
                    });
                } else {
                    this.corporationCustomMetadataArr.splice(index + 1, 0, {
                        title: '',
                        type: '',
                        description: '',
                        required: false,
                    });
                }

            },
            myDeleteRow(index) {
                if (this.metadataType === 'individual') {
                    if (this.individualCustomMetadataArr.length === 1) {
                        this.individualCustomMetadataArr[0].type = ''
                        this.individualCustomMetadataArr[0].title = ''
                        this.individualCustomMetadataArr[0].description = ''
                    } else {
                        this.individualCustomMetadataArr.splice(index, 1);
                    }
                } else {
                    if (this.corporationCustomMetadataArr.length === 1) {
                        this.corporationCustomMetadataArr[0].type = ''
                        this.corporationCustomMetadataArr[0].title = ''
                        this.corporationCustomMetadataArr[0].description = ''
                    } else {
                        this.corporationCustomMetadataArr.splice(index, 1);
                    }
                }

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