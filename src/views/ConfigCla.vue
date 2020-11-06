<template>
    <div id="configCla" :style="configClaStyle">
        <div id="section">
            <div style="padding: 2rem 0;font-size: 1.3rem">Configure CLA</div>
            <div class="itemBox">
                <div style="font-size: 1.2rem;padding: .5rem">
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
            <div class="itemBox">
                <div style="font-size: 1.2rem;padding: .5rem">
                    ② Paste a link of a CLA file
                    <el-tooltip class="item" effect="dark"
                                content="Paste a link to the original data of a CLA in the repository"
                                placement="right">
                        <svg-icon icon-class="bangzhu"></svg-icon>
                    </el-tooltip>
                </div>
                <div style="padding: 0 2rem">
                    <el-row :gutter="20">
                        <el-col>
                            <el-input placeholder="Paste a link" size="medium" v-model="cla_Link">
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
                <div style="font-size: 1.2rem;padding: .5rem">
                    ③ Email
                </div>
                <div style="padding: 0 2rem">
                    <el-input
                            readonly=""
                            size="medium"
                            class="emailInput"
                            placeholder="click to grant authorized email"
                            @click.native="toAuthorizedEmail()"
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
                    <el-row>
                        <el-col :span="5" class="typeCol">
                            <el-radio v-model="metadataType" @change="changeRadio" label="individual">For Individual
                            </el-radio>
                        </el-col>
                        <el-col :span="5" class="typeCol">
                            <el-radio v-model="metadataType" @change="changeRadio" label="corporation">For Corporation
                            </el-radio>
                        </el-col>
                    </el-row>
                    <div>
                        <div>
                            <el-row style="padding: 0.5rem 0;" type="flex" align="middle" :gutter="20"
                                    v-for="(item,index) in metadataArr">
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
                                    v-for="(item,index) in customMetadataArr">
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
            <div class="btDiv">
                <el-button @click="binding" style="width: 8rem;text-align: center" size="medium" type="primary">
                    LINK
                </el-button>
            </div>


        </div>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="emailDialogVisible"
                width="35%">
            <div>
                <p class="dialogDesc">You need to select an email address for your organization to contact</p>
                <div>

                    <el-row>
                        <el-col :offset="6" :span="12">
                            <el-select
                                    placeholder="Select email type"
                                    size="medium"
                                    filterable
                                    v-model="emailType"
                                    @change="changeEmailType">
                                <el-option
                                        v-for="item in emailTypeArr"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <div style="padding: 0 3rem;color: #409EFF">
                </div>
                <div style="padding: 2rem 6rem;text-align: left;font-size: 1.3rem">
                    <p style="text-align: center">CLA system will...</p>
                    <ul>
                        <li>Send the white list management account number to the enterprise through the mailbox</li>
                        <li>Send PDF signature documents to the signer through this email address</li>
                    </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="emailDialogVisible = false">Cancel</el-button>
                    <el-button v-loading.fullscreen.lock="linkLoading" type="primary" @click="authorizeEmail()">Yes,Let's do this!</el-button>
                </span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import * as url from '../until/api'
    import * as until from '../until/until'
    import {mapActions} from 'vuex'
    import http from '../until/http'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('configCla').offsetHeight) {
            document.getElementById("configCla").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "ConfigCla",
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
            claChoose() {
                return `${this.$store.state.claChoose}` === 'true';
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
            claOptions() {
                try {
                    return JSON.parse(this.$store.state.claOptions)
                } catch (e) {
                    return this.$store.state.claOptions
                }

            },
            orgValue() {
                if (this.$store.state.orgValue === undefined || this.$store.state.orgValue === '') {
                    return this.$store.state.orgValue
                } else {
                    return Number(this.$store.state.orgValue)
                }
            },
            claValue() {
                if (this.$store.state.claValue === undefined || this.$store.state.claValue === '') {
                    return this.$store.state.claValue
                } else {
                    return Number(this.$store.state.claValue)
                }
            },
            repositoryValue() {
                if (this.$store.state.repositoryValue === undefined || this.$store.state.repositoryValue === '') {
                    return this.$store.state.repositoryValue
                } else {
                    return Number(this.$store.state.repositoryValue)
                }
            },
        },
        watch: {
            $route(to, from) {
                let path = to.path;
                if (path === '/linkedRepo' || path === '/home') {
                    this.activeName = 'first';
                } else if (path === '/signedRepo' || path === '/signedRepoLogin') {
                    this.activeName = 'second';
                }
            },
        },
        data() {
            return {
                cla_Link: '',
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
                metadataType: 'individual',
                customMetadataArr: [{
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                }],
                individualCustomMetadataArr: [{
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                }],
                corporationCustomMetadataArr: [{
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                }],
                org_id: '',
                org: '',
                emailTypeArr: [{value: 'G-Mail', label: 'G-Mail'}],
                emailType: '',
                emailDialogVisible: false,
                claLanguageValue: 'English',
                claTypeValue: '',
                languageOptions: [{label: 'English', value: 'English'}, {label: 'Chinese', value: 'Chinese'}, {
                    label: 'Japanese',
                    value: 'Japanese'
                }],
                linkLoading: false,
                platform: this.$store.state.platform,
                isVerify: false,
                activeName: 'first',
                previewShow: false,
                loginType: this.$store.state.loginType,
                email: '',
                code: '',
                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                platform_token: this.$store.state.platform_token,


                linkDialogVisible: false,

                configClaStyle: {
                    height: '',
                },
                user: {
                    userName: this.$store.state.user.userName,
                    userId: this.$store.state.user.userId,
                    isAuthorize: false,
                },
            }
        },
        methods: {
            ...mapActions(['setLoginUserAct', 'setTokenAct', 'getLinkedRepoListAct']),
            checkMetadata() {
                let newArr = this.customMetadataArr.concat(this.metadataArr);
                for (let i = 0; i < newArr.length; i++) {
                    for (let j = i + 1; j < newArr.length; j++) {
                        if (newArr[i].title === newArr[j].title || newArr[i].type === newArr[j].type) {
                            return false;
                        }
                    }
                }
                return true;
            },
            editMetadata() {
                let fields = [];
                if (this.checkMetadata()) {
                    this.metadataArr.forEach((item, index) => {
                        fields.push({
                            id: index + '',
                            title: item.title,
                            type: item.type,
                            description: item.description,
                            required: item.required,
                        })
                    })
                    for (let i = 0; i < this.customMetadataArr.length; i++) {
                        if (this.customMetadataArr[i].title !== '' && this.customMetadataArr[i].type !== '') {
                            fields.push({
                                id: this.metadataArr.length + i + '',
                                title: this.customMetadataArr[i].title,
                                type: this.customMetadataArr[i].type,
                                description: this.customMetadataArr[i].description,
                                required: this.customMetadataArr[i].required,
                            })
                        }
                    }
                    return fields
                } else {
                    return false
                }

            },
            binding() {
                let obj = {}
                let metadata = this.editMetadata()
                if (metadata) {
                    let cla = {url: this.cla_Link, language: this.claLanguageValue, fields: metadata}
                    if (this.repositoryChoose) {
                        obj = {
                            repo_id: `${this.repositoryOptions[this.repositoryValue].repoName}`,
                            org_email: this.email,
                            platform: this.platform,
                            org_id: `${this.orgOptions[this.orgValue].label}`,
                            apply_to: this.metadataType,
                            submitter: `${this.platform}/${this.$store.state.user.userName}`,
                            cla: cla,
                        };
                    } else {
                        obj = {
                            repo_id: '',
                            org_email: this.email,
                            platform: this.platform,
                            org_id: `${this.orgOptions[this.orgValue].label}`,
                            apply_to: this.metadataType,
                            submitter: `${this.platform}/${this.$store.state.user.userName}`,
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
                    this.$message.error('Same titles or types are filled.')
                }

            },
            addRow(index) {
                this.customMetadataArr.splice(index + 1, 0, {
                    title: '',
                    type: '',
                    description: '',
                    required: false,
                })

            },
            myDeleteRow(index) {
                if (this.customMetadataArr.length === 1) {
                    this.customMetadataArr[0].type = ''
                    this.customMetadataArr[0].title = ''
                    this.customMetadataArr[0].description = ''
                } else {
                    this.customMetadataArr.splice(index, 1);
                }

            },
            changeRadio() {
                if (this.metadataType === 'individual') {
                    this.metadataArr = [{
                        title: 'Name',
                        type: 'name',
                        description: 'your name',
                        required: true,
                    }, {
                        title: 'E-Mail',
                        type: 'email',
                        description: 'your email',
                        required: true,
                    },]
                    this.customMetadataArr = this.individualCustomMetadataArr;
                } else if (this.metadataType === 'corporation') {
                    this.metadataArr = [

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
                        },];
                    this.customMetadataArr = this.corporationCustomMetadataArr;

                }
            },
            toAuthorizedEmail() {
                this.emailDialogVisible = true
            },
            authorizeEmail() {
                let myUrl = ''
                switch (this.emailType) {
                    case 'G-Mail':
                        myUrl = url.getAuthEmail;
                        break;
                }
                this.$axios({
                    url: '/api' + myUrl,
                    headers: {'Token': this.$store.state.access_token},
                }).then(res => {
                    window.location.href = res.data.data.url;
                }).catch(err => {
                })
            },
            changeEmailType(value) {
            },
            getEmailTypeArr() {
                this.$axios({
                    url: '/api' + url.getEmailTypeArr,
                }).then(res => {
                    this.emailTypeArr = res.data
                }).catch(err => {
                })
            },
            tabsHandleClick(tab, event) {
                tab.index === '0' ? this.$router.push('/linkedRepo') : this.$router.push('/signedRepoLogin')
            },
            openLinkDialog() {
                (this.orgChoose && this.claChoose && this.isEmail) && (this.linkDialogVisible = true)
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
                this.$store.commit('setOrgValue', value)
                if (value === '') {
                    this.org = '';
                    this.org_id = ''
                    this.$store.commit('setOrgChoose', false)
                    this.$store.commit('setRepositoryValue', undefined)
                    this.$store.commit('setRepositoryChoose', false)
                    this.$store.commit('setRepositoryOptions', undefined)
                } else {
                    this.org = this.orgOptions[value].label;
                    this.org_id = this.orgOptions[value].id
                    this.$store.commit('setOrgChoose', true)
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
                let obj = {access_token: this.$store.state.platform_token, org: org, page: 1, per_page: 10};
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
                let obj = {access_token: this.$store.state.platform_token, admin: true, page: 1, per_page: 10};
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
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('configCla').offsetHeight ?
                        this.configClaStyle.height = until.getClientHeight() + 'px' :
                        this.configClaStyle.height = document.getElementById('configCla').offsetHeight
                })
            },
            change(value) {
                this.value = value;
            },
            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split('; ')
                    let email = ''
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        if (arr[0] === 'email') {
                            email = arr[1]
                        }
                    })
                    this.email = email;
                    if (email !== '') {
                        this.$store.commit('setIsEmail', true)
                    }

                }
            },
        },
        created() {
            this.getCookieData()
            this.getOrgsInfo()
        },
        mounted() {
            this.setClientHeight();
        },
    };

</script>

<style lang="less">
    #configCla {
        .el-dialog__body {
            text-align: center;
            word-break: keep-all;
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

        .btDiv {
            margin: 1rem 0;
            text-align: center;
        }

        .typeCol {
            padding: .5rem 10px;
        }

        #section {
            flex-grow: 1;
            text-align: left;

        }
    }

    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

    .paginationClass {
        text-align: center;
        margin-bottom: 1rem;
    }

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .hoverUnderline:hover {
        text-decoration: underline;
    }

    .qusLink {
        text-decoration: underline;
        font-size: .8rem;
        cursor: pointer;
    }

    .dialogDec {
        font-size: 1rem;
        padding: .5rem 0;
    }

    .left {
        text-align: left;
    }

    .right {
        text-align: right;
    }

    .size_b {
        font-size: 1.3rem;
    }

    .size_m {
        font-size: 1rem;
        text-align: left;
    }

    .menuBT {
        display: flex;
        flex-direction: column;

        & > * {

            margin: .2rem 0;
            text-align: center;
        }
    }

    .pointer {
        cursor: pointer;
    }

    .dialogDesc {

        font-size: 1.2rem;
        margin: 2rem 0;
    }

    li {
        margin: 1rem 0;
    }

    .disableClass {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #ACD7E6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .linkBt {
        margin-top: 2rem;
        text-align: center;
        height: 3rem;
        background-color: #0594C6;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &:hover {
            background-color: #046F94;
        }

    }
</style>