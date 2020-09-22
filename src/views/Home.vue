<template>
    <div id="home" :style="home">
        <Header></Header>

        <el-col :offset="4" :span="16" id="section">

            <div id="configBtDiv">
                <el-button v-if="!showConfigForm" class="configBt" type="primary"
                           @click="configCla()">
                    Configure CLA
                </el-button>
            </div>
            <el-row>
                <el-row v-if="showConfigForm">
                    <div style="padding-bottom: 1.5rem;font-size: 1.3rem">Configure CLA</div>
                    <el-row>
                        <el-col :span="10">
                            <div style="background-color: white">
                                <div style="text-align: right;padding: 1rem">
                                    <svg-icon @click="closeConfigForm()" icon-class="close"/>
                                </div>
                                <!--选择仓库-->
                                <div style="font-size: 1.2rem;padding: .5rem">
                                    ① Choose a org or repository
                                    <!--<span v-if="!user.isAuthorize" @click="authorize()" style="font-size: .8rem;text-decoration: underline;cursor: pointer">(want to link an org?)</span>-->
                                </div>
                                <div style="padding: 0 2rem">
                                    <el-row :gutter="20">
                                        <el-col :span="12">
                                            <el-select v-model="orgValue"
                                                       placeholder="select org"
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
                                                       placeholder="select repo"
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
                                <!--选择协议-->
                                <div style="font-size: 1.2rem;padding: .5rem">
                                    ② Choose a CLA
                                    <span @click="createCLA()"
                                          style="font-size: .8rem;text-decoration: underline;cursor: pointer">(don't have one?)
                                    </span>
                                </div>

                                <div style="padding: 0 2rem 1rem 2rem">
                                    <el-collapse v-model="activeNames" @change="handleChange">
                                        <el-collapse-item title="cla filter" name="1">
                                            <el-row :gutter="10">
                                                <el-col :span="12">
                                                    <el-select
                                                            v-model="claTypeValue"
                                                            placeholder="cla type"
                                                            size="medium"
                                                            clearable=""
                                                            @change="claTypeChange">
                                                        <el-option
                                                                v-for="item in claTypeOptions"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-select
                                                            v-model="claLanguageValue"
                                                            placeholder="language"
                                                            size="medium"
                                                            clearable=""
                                                            @change="claLanguageChange">
                                                        <el-option
                                                                v-for="item in languageOptions"
                                                                :key="item.value"
                                                                :label="item.label"
                                                                :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>

                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                                <div style="padding: 0 2rem">
                                    <el-select
                                            ref="claSelect"
                                            v-model="claValue"
                                            placeholder="select cla"
                                            @visible-change="claVisibleChange"
                                            style="width: 100%"
                                            size="medium"
                                            filterable
                                            @change="changeCla">
                                        <el-option
                                                v-for="item in claOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>

                                </div>

                                <div style="font-size: 1.2rem;padding: .5rem">
                                    ③ Email
                                    <span @click="toAuthorizedEmail()"
                                          style="font-size: .8rem;text-decoration: underline;cursor: pointer">(click to grant authorized email)
                                    </span>
                                </div>
                                <div style="padding: 0 2rem">
                                    <el-input
                                            readonly=""
                                            @input="verifyEmail"
                                            size="medium"
                                            placeholder="authorization email"
                                            v-model="email">

                                    </el-input>
                                </div>

                                <div
                                        :class="{'linkBt pointer':claChoose&&orgChoose&&isEmail,'disableClass':!(claChoose&&orgChoose&&isEmail)}"
                                        @click="openLinkDialog()">
                                    <div>
                                        <svg-icon icon-class="link"></svg-icon>
                                        LINK
                                    </div>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12" :offset="2" v-if="showPreviewCla">
                            <el-input rows="16" readonly type="textarea" placeholder="preview cla" v-model="previewText"
                                      style="white-space: pre-wrap">

                            </el-input>
                        </el-col>
                    </el-row>
                </el-row>
            </el-row>
            <div>
                <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
                    <el-tab-pane label="Linked Repositories" name="first" style="margin-top: 1rem">

                    </el-tab-pane>
                </el-tabs>
                <router-view></router-view>
            </div>
        </el-col>
        <Footer></Footer>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="authorizeDialogVisible"
                width="35%">
            <div style="text-align: left">
                <p class="dialogDesc">Why link organizations?</p>
                <!--<p>At <a href="https://gist.github.com/" target="_blank">gist.github.com</a> enter a file name and paste-->
                <!--the content of your CLA.</p>-->
                <p>If you link an organization with your CLA, CLA system sets a web hook on your organization and
                    listens to Pull Requests of all repositories in the organization. That means that your CLA becomes
                    active for each existing and future repositories of your organization.</p>
                <p class="dialogDesc">How can I link an organization?</p>
                <p>CLA system needs an additional authorization from you to be able to create web hooks for
                    organizations. To grant CLA system appropriate rights just click on the button below. For more
                    information on Authorization scopes see github documentation</p>
                <div
                        class="linkBt pointer"
                        style="font-size: 1.1rem"
                        @click="getOrgPermission()">

                    Yes,let's go for it

                </div>
            </div>

        </el-dialog>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="createCLADialogVisible"
                width="35%">
            <div style="text-align: left">
                <p class="dialogDesc">How can I create a CLA Gist?</p>
                <!--<p>At <a href="https://gist.github.com/" target="_blank">gist.github.com</a> enter a file name and paste-->
                <!--the content of your CLA.</p>-->
                <p>To <span @click="toCreateCLA()" style="cursor: pointer;text-decoration: underline;color: blue">createCLA</span>
                    enter a file name and paste
                    the content of your CLA.</p>
                <p class="dialogDesc">What happens if I edit the Gist file?</p>
                <p>CLA system will always show you the current version of your Gist file. Users who accept your CLA
                    sign the current version. If you change the content of your CLA, each contributor has to accept the
                    new version when they create a new pull request.</p>
            </div>
            <span slot="footer" class="dialog-footer">

  </span>
        </el-dialog>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="shareDialogVisible"
                width="35%">
            <div style="text-align: left">
                <p class="dialogDesc">What happens if I choose to share the gist with multiple repos or orgs?</p>
                <!--<p>At <a href="https://gist.github.com/" target="_blank">gist.github.com</a> enter a file name and paste-->
                <!--the content of your CLA.</p>-->
                <p>Contributors will simply need to sign only once for any of the repos or orgs linked with the same
                    shared gist.</p>
                <p class="dialogDesc">Are previous CLA signatures still valid after I choose to share the gist with
                    multiple repos or orgs?</p>
                <p>Yes, but the scope of the previous signatures are still limited to the previous repo or org.</p>
                <p class="dialogDesc">What happens if I uncheck the box and choose NOT to share the gist any more?</p>
                <p>Previous contributors that have signed the shared gist will have to sign again.</p>
            </div>
            <span slot="footer" class="dialog-footer">

  </span>
        </el-dialog>
        <el-dialog
                top="5vh"
                title=""
                :visible.sync="linkDialogVisible"
                width="35%">
            <div>
                <p class="dialogDesc">Would you like to link this CLA
                    to your repository?</p>
                <div>
                    <el-row>
                        <svg-icon style="width: 100%;height: 100%" icon-class="popup_link"></svg-icon>
                    </el-row>
                    <el-row>
                        <el-col :offset="6" :span="5" v-if="claChoose">
                            <!--{{this.claOptions[claValue].label}}-->
                        </el-col>
                        <el-col :offset="2" :span="5" v-if="orgChoose&&repositoryChoose">
                            <!--{{orgOptions[orgValue].label}}/{{this.repositoryOptions[repositoryValue].label}}-->
                        </el-col>
                        <el-col :offset="2" :span="5" v-if="orgChoose&&!repositoryChoose">
                            <!--{{orgOptions[orgValue].label}}-->
                        </el-col>
                    </el-row>
                </div>
                <div style="padding: 0 3rem;color: #409EFF">

                </div>
                <div style="padding: 2rem 6rem;text-align: left;font-size: 1.3rem">
                    <p style="text-align: center">CLA system will...</p>
                    <ul>
                        <li>Create a webhook in your repository and listen for pull requests</li>
                        <li>Set a pull request CLA status</li>
                        <li>Comment on pull requests</li>
                    </ul>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="linkDialogVisible = false">Cancel</el-button>
                    <el-button v-loading.fullscreen.lock="linkLoading" type="primary" @click="linkRepository()">Yes,Let's do this!</el-button>
                </span>
            </div>
        </el-dialog>
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
    import Header from '@components/Header'
    import Footer from '@components/Footer'
    import {mapActions} from 'vuex'
    window.onresize = () => {
        console.log(until.getClientHeight(), document.getElementById('home'));
        if (until.getClientHeight() > document.getElementById('home').offsetHeight) {
            document.getElementById("home").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "Home",
        components: {
            Header,
            Footer,
        },
        computed: {
            orgOptions() {
                console.log(this.$store.state.orgOptions);
                    try {
                        return JSON.parse(this.$store.state.orgOptions)
                    } catch(e) {
                        return this.$store.state.orgOptions
                    }
            },
            orgChoose() {
                console.log(this.$store.state.orgChoose);
                console.log(`${this.$store.state.orgChoose}` === 'true');
                return `${this.$store.state.orgChoose}` === 'true';
            },
            claChoose() {
                console.log(this.$store.state.claChoose);
                console.log(this.$store.state.claChoose === 'true');
                return `${this.$store.state.claChoose}` === 'true';
            },
            isEmail() {
                console.log(this.$store.state.isEmail === 'true');
                return `${this.$store.state.isEmail}` === 'true';
            },
            repositoryChoose() {
                console.log(this.$store.state.repositoryChoose === 'true');
                return `${this.$store.state.repositoryChoose}` === 'true'
            },
            repositoryOptions() {
                try {
                    return JSON.parse(this.$store.state.repositoryOptions)
                } catch(e) {
                    return this.$store.state.repositoryOptions
                }

            },
            claOptions() {
                try {
                    return JSON.parse(this.$store.state.claOptions)
                } catch(e) {
                    return this.$store.state.claOptions
                }

            },
            orgValue() {
                console.log(this.$store.state.orgValue);
                console.log(Number(this.$store.state.orgValue));
                console.log(this.orgOptions);

                if (this.$store.state.orgValue === undefined||this.$store.state.orgValue === '') {
                    return this.$store.state.orgValue

                }else{
                    return Number(this.$store.state.orgValue)

                }
            },
            claValue() {
                console.log(this.$store.state.claValue);
                if (this.$store.state.claValue === undefined||this.$store.state.claValue === '') {
                    return this.$store.state.claValue
                } else{
                    return Number(this.$store.state.claValue)
                }
            },
            repositoryValue() {
                if (this.$store.state.repositoryValue === undefined||this.$store.state.repositoryValue === '') {
                    return this.$store.state.repositoryValue
                } else {
                    return Number(this.$store.state.repositoryValue)
                }
            },
            showConfigForm() {
                return `${this.$store.state.showConfigForm}` === 'true'
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
                org_id: '',
                org: '',
                // showConfigForm:false,
                emailTypeArr: [{value: 'Gmail', label: 'Gmail'}],
                emailType: '',
                emailDialogVisible: false,
                filterChange: true,
                claLanguageValue: '',
                claTypeValue: '',
                claTypeOptions: [{label: 'individual', value: 'individual'}, {
                    label: 'corporation',
                    value: 'corporation'
                }],
                languageOptions: [{label: 'english', value: 'english'}, {label: 'chinese', value: 'chinese'}, {
                    label: 'japanese',
                    value: 'japanese'
                }],
                createMetadataDialogVisible: false,
                linkLoading: false,
                platform: this.$store.state.platform,
                isVerify: false,
                activeName: 'first',
                previewShow: false,
                previewText: '',
                loginType: this.$store.state.loginType,
                tableType: 1,
                tableShow: true,
                listCurrentPage: 1,
                dropdownTitle: 'Linked Repositories',
                email: '',
                code: '',
                gitee_client_id: this.$store.state.gitee_client_id,
                gitee_client_secret: this.$store.state.gitee_client_secret,
                gitee_redirect_uri: this.$store.state.gitee_redirect_uri,
                github_client_id: this.$store.state.github_client_id,
                github_client_secret: this.$store.state.github_client_secret,
                github_redirect_uri: this.$store.state.github_redirect_uri,
                access_token: this.$store.state.access_token,
                refresh_token: this.$store.state.refresh_token,
                platform_token: this.$store.state.platform_token,
                listDialogVisible: false,
                checkClaDialogVisible: false,
                unLinkDialogVisible: false,
                editDialogVisible: false,
                menuVisible: false,
                claName: '',
                repositoryName: '',
                shareGistChecked: false,
                metadataOptions: [{
                    value: 0,
                    label: '',
                    id: '',
                    text: '',
                    language: ''
                }],
                showPreviewCla: false,
                linkDialogVisible: false,
                shareDialogVisible: false,
                createCLADialogVisible: false,
                authorizeDialogVisible: false,
                fileNumber: '',
                lineNumber: '',
                gistUrl: '',
                home: {
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
            authorizeEmail() {
                let myUrl = ''
                switch (this.emailType) {
                    case 'Gmail':
                        myUrl = url.getAuthEmail;
                        break;
                }
                this.$axios({
                    url: '/api' + myUrl,
                    headers: {'Token': this.$store.state.access_token},
                }).then(res => {
                    console.log(res);
                    window.location.href = res.data.data.url;
                }).catch(err => {
                    console.log(err);
                })
                console.log('authorizeEmail');
            },
            changeEmailType(value) {
                console.log('changeEmailType', value);

            },
            getEmailTypeArr() {

                this.$axios({
                    url: '/api' + url.getEmailTypeArr,
                }).then(res => {
                    console.log(res);
                    this.emailTypeArr = res.data
                }).catch(err => {
                    console.log(err);
                })
            },
            toAuthorizedEmail() {
                // this.getEmailTypeArr()
                this.emailDialogVisible = true
            },
            resetCla() {
                this.$store.commit('setClaChoose', false)
                this.filterChange = true
                this.$store.commit('setClaValue', '')
                this.previewText = ''
                this.getCLA()
            },
            claTypeChange(val) {
                console.log(val);
                this.resetCla()
            },
            claLanguageChange(val) {
                console.log(val);
                this.resetCla()
            },
            handleChange(val) {
                console.log(val);
            },
            getPath() {
                let path = this.$route.path;
                if (path === '/linkedRepo' || path === '/home') {
                    this.activeName = 'first';
                } else if (path === '/signedRepo' || path === '/signedRepoLogin') {
                    this.activeName = 'second';
                }
            },
            tabsHandleClick(tab, event) {
                console.log(tab, event);
                tab.index === '0' ? this.$router.push('/linkedRepo') : this.$router.push('/signedRepoLogin')
            },
            /*获取组织权限*/
            getOrgPermission() {
                if (this.platform === 'gitee') {
                } else {
                }
            },
            listChangePage(page) {
                console.log(page);
            },
            newWindow() {
                // window.open()
            },
            openLinkDialog() {
                console.log(this.orgChoose, this.claChoose, this.isEmail);
                (this.orgChoose && this.claChoose && this.isEmail) && (this.linkDialogVisible = true)
            },
            verifyEmail() {
                var email = this.email;
                var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if (reg.test(email)) {
                    this.isEmail = true
                } else {
                    this.isEmail = false
                    return false
                }
            },
            linkRepository() {
                let obj = {}
                if (this.repositoryChoose) {
                    obj = {
                        repo_id: `${this.repositoryOptions[this.repositoryValue].repoName}`,
                        cla_id: this.claOptions[this.claValue].id,
                        org_email: this.email,
                        platform: this.platform,
                        org_id: `${this.orgOptions[this.orgValue].label}`,
                        cla_language: this.claOptions[this.claValue].language,
                        submitter: `${this.platform}/${this.$store.state.user.userName}`,
                        metadata_id: '',
                    };
                } else {
                    obj = {
                        repo_id: '',
                        cla_id: this.claOptions[this.claValue].id,
                        org_email: this.email,
                        platform: this.platform,
                        org_id: `${this.orgOptions[this.orgValue].label}`,
                        cla_language: this.claOptions[this.claValue].language,
                        submitter: `${this.platform}/${this.$store.state.user.userName}`,
                        metadata_id: '',
                    };
                }
                console.log(obj);
                this.$axios({
                    url: '/api' + url.linkRepository,
                    method: 'post',
                    data: obj,
                    headers: {
                        'Token': this.$store.state.access_token,
                        'Access-Token': this.access_token,
                        'Refresh-Token': this.refresh_token,
                        'User': `${this.platform}/${this.user.userName}`
                    }
                }).then(res => {
                    this.linkLoading = false;
                    this.$message.success('success')
                    console.log(res);
                    this.$store.commit('setClaValue', '')
                    this.$store.commit('setRepositoryValue', '')
                    this.$store.commit('setClaChoose', false)
                    this.$store.commit('setRepositoryChoose', false)
                    this.email = '';
                    document.cookie = '';
                    this.linkDialogVisible = false;
                    let data = {
                        access_token: this.$store.state.access_token,
                        refresh_token: this.$store.state.refresh_token,
                        userName: this.$store.state.user.userName,
                        platform: this.platform
                    }
                    this.getLinkedRepoListAct(data)
                }).catch(err => {
                    console.log(err);
                    this.linkLoading = false
                    this.$message.closeAll();
                    this.$message.error(err.response.data)
                })
            },
            checkCla() {
                this.$router.push('/checkCla')
            },
            editHandleClick(index) {
                console.log(index);
                this.editDialogVisible = true
            },
            toCreateCLA() {
                this.$router.push('/createCLA')
                this.$router.push('/createCLA')
            },
            toCreateMetadata() {
                this.$router.push('/createMetadata')
            },
            claVisibleChange(visible) {
                if (visible && this.filterChange) {
                    console.log('claVisibleChange', visible, this.filterChange);
                    this.getCLA();
                    this.filterChange = false;
                }
            },
            orgVisibleChange(visible) {
                if (visible) {
                    this.getOrgsInfo();
                }
            },
            repoVisibleChange(visible) {
                if (visible) {
                    this.getRepositoriesOfOrg(this.org, this.org_id);
                }
            },
            changeCla(value) {
                this.$store.commit('setClaValue', value)
                this.$store.commit('setClaChoose', true)
                this.showPreviewCla = true
                this.previewText = this.claOptions[value].text;
            },
            createCLA() {
                this.createCLADialogVisible = true
            },
            createMetadata() {
                this.createMetadataDialogVisible = true
            },
            authorize() {
                this.authorizeDialogVisible = true
            },
            changeOrg(value) {
                this.$store.commit('setOrgValue', value)
                if (value === '') {
                    this.org = '';
                    this.org_id = ''
                }else{
                    this.org = this.orgOptions[value].label;
                    this.org_id = this.orgOptions[value].id
                }
                if (value !== '') {
                    this.$store.commit('setOrgChoose', true)
                    this.getRepositoriesOfOrg(this.orgOptions[value].label, this.orgOptions[value].id)
                } else {
                    this.$store.commit('setOrgChoose', false)
                    this.$store.commit('setRepositoryValue', undefined)
                    this.$store.commit('setRepositoryChoose', false)
                    this.$store.commit('setRepositoryOptions', undefined)
                }
            },
            changeRepository(value) {
                this.$store.commit('setRepositoryValue', value)
                console.log(this.repositoryValue);
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
                    if (res.status === 200) {
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
                    }
                }).catch(err => {
                })
            },
            getOrgsInfo() {
                let obj = {access_token: this.$store.state.platform_token, admin: true, page: 1, per_page: 10};
                console.log("getOrgsInfo", obj);
                this.$axios({
                    url: url.getOrgsInfo,
                    params: obj,
                }).then(res => {
                    console.log(res);
                    if (res.status === 200) {
                        let orgOptions = [];
                        res.data.forEach((item, index) => {
                            orgOptions.push({value: index, label: item.login, id: item.id});
                        })
                        this.$store.commit('setOrgOption', orgOptions)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            getCLA() {
                console.log("getCLA");
                this.$axios({
                    url: '/api' + url.getClaInfo,
                    params: {language: this.claLanguageValue, apply_to: this.claTypeValue},
                    headers: {
                        'Token': this.$store.state.access_token,
                        'Access-Token': this.$store.state.platform_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.$store.state.platform}/${this.$store.state.user.userName}`
                    }
                }).then(res => {
                    console.log(res);
                    let claOptions = [];
                    if (res.data.data.length) {
                        res.data.data.forEach((item, index) => {
                            claOptions.push({
                                value: index,
                                label: item.name,
                                id: item.id,
                                text: item.text,
                                language: item.language
                            })
                        })
                        this.$store.commit('setClaOptions', claOptions)
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            closeConfigForm() {
                this.$store.commit('setShowConfigForm', 'false')
                this.showConfigForm = false
                this.setClientHeight()
            },
            configCla() {
                this.$store.commit('setShowConfigForm', 'true')
                this.showConfigForm = true;
                this.home.height = 'auto'
                this.getOrgsInfo()
            },
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('home').offsetHeight ?
                        this.home.height = until.getClientHeight() + 'px' :
                        this.home.height = document.getElementById('home').offsetHeight
                })
            },
            change(value) {
                console.log(value);
                this.value = value;
            },
            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    background: 'rgba(255, 255, 255, 0.8)'
                });
                setInterval(() => {
                    this.$store.state.user.userName  && loading.close();
                }, 500)
            },
            clearPageSession() {
                this.$store.commit('setOrgOption', undefined)
                this.$store.commit('setRepositoryOptions', undefined)
                this.$store.commit('setClaOptions', undefined)
                this.$store.commit('setOrgValue', undefined)
                this.$store.commit('setClaValue', undefined)
                this.$store.commit('setRepositoryValue', undefined)
                this.$store.commit('setTableData', undefined)
            },
            getCookieData() {
                if (document.cookie !== '') {
                    let cookieArr = document.cookie.split('; ')
                    let access_token, refresh_token, platform_token = '';
                    let email = ''
                    cookieArr.forEach((item, index) => {
                        let arr = item.split('=');
                        arr[0] === 'access_token' ? access_token = arr[1] : arr[0] === 'refresh_token' ? refresh_token = arr[1] :
                            arr[0] === 'email' ? email = arr[1] : arr[0] === 'platform_token' ? platform_token = arr[1] : platform_token = '';
                    })
                    this.email = email;
                    if (email !== '') {
                        this.$store.commit('setIsEmail', true)
                    }
                    let data = {access_token, refresh_token, platform_token};
                    this.setTokenAct(data);
                    this.getUserInfo(access_token, refresh_token, platform_token)
                }
            },
            getUserInfo(access_token, refresh_token, platform_token) {
                let obj = {access_token: platform_token};
                console.log(obj);
                this.$axios({
                    url: url.getUserInfo,
                    params: obj,
                }).then(res => {
                    console.log(res);
                    let data = {
                        userId: res.data.id,
                        userName: res.data.login,
                        userImg: res.data.avatar_url,
                        userEmail: res.data.email
                    }
                    this.setLoginUserAct(data);
                    let obj = {
                        platform_token: platform_token,
                        access_token: access_token,
                        refresh_token: refresh_token,
                        userName: res.data.login,
                        platform: this.platform
                    }
                    console.log(obj);
                }).catch(err => {
                    console.log(err);
                })
            },
        },
        created() {
            this.clearPageSession();
            this.getPath();
            this.openFullScreen();
            this.getCookieData()
        },
        mounted() {
            this.setClientHeight();
        },
    };

</script>

<style scoped lang="less">
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

    #configBtDiv {
        text-align: left;
        padding-top: 3rem;

        & > .configBt {
            font-size: 1.2rem;
        }
    }

    #home {
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;
        background-color: #F5F5F5;

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F5F5F5;
            text-align: left;


            & > div:nth-of-type(3) {
                padding: 4rem 0 2rem 0;
                font-size: 1.3rem;
                color: #2C3E50;
            }
        }
    }
</style>