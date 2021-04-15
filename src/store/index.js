import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        chooseRepo: sessionStorage.getItem('chooseRepo') || undefined,
        chooseOrg: sessionStorage.getItem('chooseOrg') || undefined,
        signRouter: '/sign',
        claChoose: sessionStorage.getItem('claChoose') || undefined,
        orgChoose: sessionStorage.getItem('orgChoose') || undefined,
        repositoryChoose: sessionStorage.getItem('repositoryChoose') || undefined,
        isEmail: sessionStorage.getItem('isEmail') || undefined,
        email: sessionStorage.getItem('email') || undefined,
        repositoryValue: sessionStorage.getItem('repositoryValue') || undefined,
        claValue: sessionStorage.getItem('claValue') || undefined,
        orgValue: sessionStorage.getItem('orgValue') || undefined,
        claOptions: sessionStorage.getItem('claOptions') || undefined,
        repositoryOptions: sessionStorage.getItem('repositoryOptions') || undefined,
        orgOptions: JSON.parse(sessionStorage.getItem('orgOptions')) || undefined,
        showConfigForm: sessionStorage.getItem('showConfigForm') || undefined,
        userLimit: sessionStorage.getItem('userLimit') || undefined,
        loginInfo: JSON.parse(sessionStorage.getItem('loginInfo')) || undefined,
        repoInfo: JSON.parse(sessionStorage.getItem('repoInfo')) || undefined,
        loginType: sessionStorage.getItem('loginType') || undefined,
        tableData: sessionStorage.getItem('tableData') || undefined,
        ready: Boolean(sessionStorage.getItem('ready') || undefined),
        platform: sessionStorage.getItem('platform') || undefined,
        access_token: sessionStorage.getItem('token') || undefined,
        refresh_token: sessionStorage.getItem('refresh_token') || undefined,
        platform_token: sessionStorage.getItem('platform_token') || undefined,
        user: {
            userId: sessionStorage.getItem('userId') || undefined,
            userName: sessionStorage.getItem('userName') || undefined,
            userImg: sessionStorage.getItem('userImg') || undefined,
            userEmail: sessionStorage.getItem('userEmail') || undefined,
        },
        customVisible: false,
        dialogVisible: false,
        emailErrVisible: false,
        dialogMessage: '',
        reTryDialogVisible: false,
        signSuccessDialogVisible: false,
        signReLoginDialogVisible: false,
        tokenErrorDialogVisible: false,
        orgReLoginDialogVisible: false,
        pwdIsChanged: false,
        cla_link: sessionStorage.getItem('cla_link') || undefined,
        metadataType: sessionStorage.getItem('metadataType') || undefined,
        individualCustomMetadataArr: JSON.parse(sessionStorage.getItem('individualCustomMetadataArr')) || undefined,
        corporationCustomMetadataArr: JSON.parse(sessionStorage.getItem('corporationCustomMetadataArr')) || undefined,
        managerList: JSON.parse(sessionStorage.getItem('managerList')) || undefined,
        corpItem: JSON.parse(sessionStorage.getItem('corpItem')) || undefined,
        orgAlias: sessionStorage.getItem('orgAlias') || undefined,
        repo: sessionStorage.getItem('repo') || undefined,
        claLinkIndividual: sessionStorage.getItem('claLinkIndividual') || undefined,
        claLinkCorp: sessionStorage.getItem('claLinkCorp') || undefined,
        individualMetadata: JSON.parse(sessionStorage.getItem('individualMetadata')) || undefined,
        corporationMetadata: JSON.parse(sessionStorage.getItem('corporationMetadata')) || undefined,
        corpFD: JSON.parse(sessionStorage.getItem('corpFD')) || undefined,
        individualLanguage: sessionStorage.getItem('individualLanguage') || undefined,
        corpLanguage: sessionStorage.getItem('corpLanguage') || undefined,
        corpFDName: sessionStorage.getItem('corpFDName') || undefined,
        claData: JSON.parse(sessionStorage.getItem('claData')) || undefined,
        sign_user: sessionStorage.getItem('sign_user') || undefined,
        bindType: sessionStorage.getItem('bindType') || undefined,
        addLang: sessionStorage.getItem('addLang') || undefined,
        add_bind_first: sessionStorage.getItem('add_bind_first') || undefined,
        findPwdEmail: sessionStorage.getItem('findPwdEmail') || undefined,
    },
    mutations: {
        setFindPwdEmail(state, data) {
            state.findPwdEmail = data;
            sessionStorage.setItem('findPwdEmail', data);
        },
        setAddBindFirst(state, data) {
            state.add_bind_first = data;
            sessionStorage.setItem('add_bind_first', data);
        },
        setEmailErr(state, data) {
            state.emailErrVisible = data;
        },
        setAddLang(state, data) {
            state.addLang = data;
            sessionStorage.setItem('addLang', data);
        },
        setBindType(state, data) {
            state.bindType = data;
            sessionStorage.setItem('bindType', data);
        },
        setSignUser(state, data) {
            state.sign_user = data;
            sessionStorage.setItem('sign_user', data);
        },
        setClaData(state, data) {
            state.claData = data;
            sessionStorage.setItem('claData', JSON.stringify(data));
        },
        setCorpItem(state, data) {
            state.corpItem = data;
            sessionStorage.setItem('corpItem', JSON.stringify(data));
        },
        setCorpLanguage(state, data) {
            state.corpLanguage = data;
            sessionStorage.setItem('corpLanguage', data);
        },
        setIndividualLanguage(state, data) {
            state.individualLanguage = data;
            sessionStorage.setItem('individualLanguage', data);
        },
        setCorpFDName(state, data) {
            state.corpFDName = data;
            sessionStorage.setItem('corpFDName', data);
        },
        setCorpFD(state, data) {
            state.corpFD = data;
            sessionStorage.setItem('corpFD', JSON.stringify(data));
        },
        setEmail(state, data) {
            state.email = data;
            sessionStorage.setItem('email', data);
        },
        setIsEmail(state, isEmail) {
            state.isEmail = isEmail;
            sessionStorage.setItem('isEmail', isEmail);
        },
        setIndividualMetadata(state, data) {
            state.individualMetadata = data;
            sessionStorage.setItem('individualMetadata', JSON.stringify(data));
        },
        setCorpMetadata(state, data) {
            state.corporationMetadata = data;
            sessionStorage.setItem('corporationMetadata', JSON.stringify(data));
        },
        setClaLinkCorp(state, data) {
            state.claLinkCorp = data;
            sessionStorage.setItem('claLinkCorp', data);
        },
        setClaLinkIndividual(state, data) {
            state.claLinkIndividual = data;
            sessionStorage.setItem('claLinkIndividual', data);
        },
        setOrgAlias(state, data) {
            state.orgAlias = data;
            sessionStorage.setItem('orgAlias', data);
        },
        setRepo(state, data) {
            state.repo = data;
            sessionStorage.setItem('repo', data);
        },
        setChooseRepo(state, data) {
            state.chooseRepo = data;
            sessionStorage.setItem('chooseRepo', data);
        },
        setChooseOrg(state, data) {
            state.chooseOrg = data;
            sessionStorage.setItem('chooseOrg', data);
        },
        setManagerList(state, data) {
            state.managerList = data;
            sessionStorage.setItem('managerList', JSON.stringify(data));
        },
        setIndividualCustomMetadataArr(state, individualCustomMetadataArr) {
            state.individualCustomMetadataArr = individualCustomMetadataArr;
            sessionStorage.setItem('individualCustomMetadataArr', JSON.stringify(individualCustomMetadataArr));
        },
        setCorporationCustomMetadataArr(state, corporationCustomMetadataArr) {
            state.corporationCustomMetadataArr = corporationCustomMetadataArr;
            sessionStorage.setItem('corporationCustomMetadataArr', JSON.stringify(corporationCustomMetadataArr));
        },
        setMetadataType(state, metadataType) {
            state.metadataType = metadataType;
            sessionStorage.setItem('metadataType', metadataType);
        },
        setClaLink(state, cla_link) {
            state.cla_link = cla_link;
            sessionStorage.setItem('cla_link', cla_link);
        },
        setPwdIsChanged(state, data) {
            state.pwdIsChanged = data;
            sessionStorage.setItem('pwdIsChanged', data);
        },
        setReady(state, data) {
            state.ready = data.ready;
            state.tableData = data.tableData;
            sessionStorage.setItem('ready', data.ready);
            sessionStorage.setItem('tableData', JSON.stringify(data.tableData));
        },
        setToken(state, data) {
            state.access_token = data.access_token;
            state.refresh_token = data.refresh_token;
            state.platform_token = data.platform_token;
            sessionStorage.setItem('token', data.access_token);
            sessionStorage.setItem('refresh_token', data.refresh_token);
            sessionStorage.setItem('platform_token', data.platform_token);
            data.resolve('complete')
        },
        setLoginUser(state, data) {
            state.user.userId = data.userId;
            state.user.userName = data.userName;
            state.user.userImg = data.userImg;
            state.user.userEmail = data.userEmail;
            sessionStorage.setItem('userId', data.userId);
            sessionStorage.setItem('userName', data.userName);
            sessionStorage.setItem('userImg', data.userImg);
            sessionStorage.setItem('userEmail', data.userEmail);
        },
        setPlatform(state, platform) {
            state.platform = platform;
            sessionStorage.setItem('platform', platform);
        },
        setLoginType(state, loginType) {
            state.loginType = loginType;
            sessionStorage.setItem('loginType', loginType);
        },
        setRepoInfo(state, obj) {
            state.repoInfo = obj;
            sessionStorage.setItem('repoInfo', JSON.stringify(obj));
        },
        setLoginInfo(state, obj) {
            state.loginInfo = obj;
            sessionStorage.setItem('loginInfo', JSON.stringify(obj));
        },
        setUserLimit(state, userLimit) {
            state.userLimit = userLimit;
            sessionStorage.setItem('userLimit', userLimit);
        },
        setShowConfigForm(state, showConfigForm) {
            state.showConfigForm = showConfigForm;
            sessionStorage.setItem('showConfigForm', showConfigForm);
        },
        setOrgOption(state, orgOptions) {
            state.orgOptions = orgOptions;
            sessionStorage.setItem('orgOptions', JSON.stringify(orgOptions));
        },
        setRepositoryOptions(state, repositoryOptions) {
            state.repositoryOptions = repositoryOptions;
            sessionStorage.setItem('repositoryOptions', JSON.stringify(repositoryOptions));
        },
        setClaOptions(state, claOptions) {
            state.claOptions = claOptions;
            sessionStorage.setItem('claOptions', JSON.stringify(claOptions));
        },
        setOrgValue(state, orgValue) {
            state.orgValue = orgValue;
            sessionStorage.setItem('orgValue', orgValue);
        },
        setRepositoryValue(state, repositoryValue) {
            state.repositoryValue = repositoryValue;
            sessionStorage.setItem('repositoryValue', repositoryValue);
        },
        setClaValue(state, claValue) {
            state.claValue = claValue;
            sessionStorage.setItem('claValue', claValue);
        },
        setOrgChoose(state, orgChoose) {
            state.orgChoose = orgChoose;
            sessionStorage.setItem('orgChoose', orgChoose);
        },
        setClaChoose(state, claChoose) {
            state.claChoose = claChoose;
            sessionStorage.setItem('claChoose', claChoose);
        },
        setRepositoryChoose(state, repositoryChoose) {
            state.repositoryChoose = repositoryChoose;
            sessionStorage.setItem('repositoryChoose', repositoryChoose);
        },
        setTableData(state, data) {
            state.tableData = data;
            sessionStorage.setItem('tableData', JSON.stringify(data));
        },
        errorSet(state, obj) {
            state.dialogVisible = obj.dialogVisible;
            state.dialogMessage = obj.dialogMessage
        },
        setCustomVisible(state, obj) {
            state.customVisible = obj.dialogVisible;
            state.dialogMessage = obj.dialogMessage
        },
        errorCodeSet(state, obj) {
            state.reTryDialogVisible = obj.dialogVisible;
            state.dialogMessage = obj.dialogMessage
        },
        setSignSuccess(state, obj) {
            state.signSuccessDialogVisible = obj.dialogVisible;
            state.dialogMessage = obj.dialogMessage
        },
        setSignReLogin(state, obj) {
            state.signReLoginDialogVisible = obj.dialogVisible;
            state.dialogMessage = obj.dialogMessage
        },
        setTokenErrorReLogin(state, obj) {
            state.tokenErrorDialogVisible = obj.dialogVisible;
            state.dialogMessage = obj.dialogMessage
        },
        setOrgReLogin(state, obj) {
            state.orgReLoginDialogVisible = obj.dialogVisible;
            state.dialogMessage = obj.dialogMessage
        },
        setCorpToken(state, token) {
            state.access_token = token;
            sessionStorage.setItem('token', token);
        },
    },
    actions: {
        setCorpTokenAct({commit}, token) {
            commit('setCorpToken', token);
        },

        setShowConfigFormAct({commit}, showConfigForm) {
            commit('setShowConfigForm', showConfigForm);
        },
        setUserLimitAct({commit}, userLimit) {
            commit('setUserLimit', userLimit);
        },
        setLoginInfoAct({commit}, obj) {
            commit('setLoginInfo', obj);
        },
        setRepoInfoAct({commit}, obj) {
            commit('setRepoInfo', obj);
        },
        setLoginTypeAct({commit}, loginType) {
            commit('setLoginType', loginType)
        },
        setPlatformAct({commit}, platform) {
            let initials = platform.substring(0, 1);
            let upper = initials.toUpperCase();
            let end = platform.substring(1);
            commit('setPlatform', upper + end)
        },
        setTokenAct({commit}, data) {
            commit('setToken', data);
        },
        setLoginUserAct({commit}, data) {
            commit('setLoginUser', data)
        },
        setTableDataAct({commit}, data) {
            commit('setTableData', data)
        },
        viewPrivacy() {
            window.open('/privacy')
        },
    },
    modules: {}
})
