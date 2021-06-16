export const getClientHeight = () => window.innerHeight;
export const setMinHeight = (box, inner) => {
    document.getElementById(box).style.minHeight = document.getElementById(inner).clientHeight * 2 + 'px'
};
export const strToBase64 = (params) => {
    try {
        return window.btoa(encodeURIComponent(params))
    } catch (e) {
        return false
    }
};
export const base64ToStr = (params) => {
    try {
        return window.decodeURIComponent(window.atob(params))
    } catch (e) {
        return false
    }
};
export const getNowDateToTime = () => {
    let date = new Date();
    return date.getTime();
};
export const clearSession = (_this) => {
    _this.$store.commit('setOrgOption', []);
    _this.$store.commit('setOrgValue', '');
    _this.$store.commit('setOrgChoose', '');
    _this.$store.commit('setRepositoryOptions', []);
    _this.$store.commit('setRepositoryChoose', '');
    _this.$store.commit('setRepositoryValue', '');
    _this.$store.commit('setOrgAlias', '');
    _this.$store.commit('setIndividualLanguage', '');
    _this.$store.commit('setCorpLanguage', '');
    _this.$store.commit('setClaLinkIndividual', '');
    _this.$store.commit('setClaLinkCorp', '');
    _this.$store.commit('setCorpFDName', '');
    _this.$store.commit('setCorpFD', '');
    _this.$store.commit('setIndividualMetadata', INDIVIDUALMETADATAARR_EN);
    _this.$store.commit('setCorpMetadata', CORPORATIONMETADATAARR_EN);
    _this.$store.commit('setIndividualCustomMetadataArr', []);
    _this.$store.commit('setCorporationCustomMetadataArr', []);
    _this.$store.commit('setEmail', '');
    _this.$store.commit('setIsEmail', false);
    _this.$store.commit('setChooseRepo', '');
    _this.$store.commit('setChooseOrg', '');
    _this.$store.commit('setBindType', '');
    _this.$store.commit('setAddLang', '');
    _this.$store.commit('setRepo', '');
    _this.$store.commit('setAddBindFirst', '');
    sessionStorage.removeItem('orgOptions');
    sessionStorage.removeItem('orgValue');
    sessionStorage.removeItem('orgChoose');
    sessionStorage.removeItem('orgAlias');
    sessionStorage.removeItem('repositoryOptions');
    sessionStorage.removeItem('repositoryChoose');
    sessionStorage.removeItem('repositoryValue');
    sessionStorage.removeItem('individualLanguage');
    sessionStorage.removeItem('corpLanguage');
    sessionStorage.removeItem('claLinkIndividual');
    sessionStorage.removeItem('claLinkCorp');
    sessionStorage.removeItem('corpFDName');
    sessionStorage.removeItem('corpFD');
    sessionStorage.removeItem('individualMetadata');
    sessionStorage.removeItem('corporationMetadata');
    sessionStorage.removeItem('individualCustomMetadataArr');
    sessionStorage.removeItem('corporationCustomMetadataArr');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('chooseOrg');
    sessionStorage.removeItem('chooseRepo');
    sessionStorage.removeItem('bindType');
    sessionStorage.removeItem('addLang');
    sessionStorage.removeItem('repo');
    sessionStorage.removeItem('add_bind_first');
};
export const setI18nLang = () => {
    let lang = localStorage.getItem('lang');
    if (lang === null) {
        localStorage.setItem('lang', 'English');
        return 'en-us'
    } else {
        if (lang === 'Chinese') {
            return 'zh-cn'
        } else if (lang === 'English') {
            return 'en-us'
        }
    }
};
export const clearManagerSession = (_this) => {
    _this.$store.commit('setManagerList', '');
    _this.$store.commit('setUserLimit', '');
    _this.$store.commit('setCorpToken', '');
    _this.$store.commit('setLoginInfo', '');
    _this.$store.commit('setPwdIsChanged', '');
    sessionStorage.removeItem('managerList');
    sessionStorage.removeItem('userLimit');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('loginInfo');
    sessionStorage.removeItem('pwdIsChanged');
};
export const successMessage = (_this) => {
    _this.$message.closeAll();
    _this.$message.success(_this.$t('tips.successTitle'))
};
export const getMenuState = (_this) => {
    let name = _this.$route.name;
    let path = _this.$route.path;
    if (name === 'SignType' || name === 'SignType_back' || path === '/sign-cla' || path === '/index'
        || path === '/platformSelect' || path === '/corporationManagerLogin' || path === '/orgSelect'
        || path === '/verify-email' || path === '/reset-password' || path === '/privacy') {
        return false
    } else if (path === '/home' || path === '/linkedRepo' || path === '/corporationList' || path === '/bind-cla'
        || path === '/config-org' || path === '/config-cla-link' || path === '/config-fields'
        || path === '/config-email' || path === '/config-check' || path === '/addIndividualUrl' || path === '/addCorpUrl') {
        return 'org'
    } else {
        return 'corp'
    }
};
export const catchErr = (err,commit,_this) => {
    if (err.data && err.data.hasOwnProperty('data')) {
        switch (err.data.data.error_code) {
            case 'cla.invalid_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.invalid_token'),
                });
                break;
            case 'cla.expired_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.invalid_token'),
                });
                break;
            case 'cla.missing_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.missing_token'),
                });
                break;
            case 'cla.unknown_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unknown_token'),
                });
                break;
            case 'cla.unauthorized_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unauthorized_token'),
                });
                break;
            case 'cla.failed_to_send_email':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.failed_to_send_email'),
                });
                break;
            case 'cla.unknown_email_platform':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unknown_email'),
                });
                break;
            case 'cla.wrong_verification_code':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.wrong_verification_code'),
                });
                break;
            case 'cla.restricted_email_suffix':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.restricted_email_suffix'),
                });
                break;
            case 'cla.expired_verification_code':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.expired_verification_code'),
                });
                break;
            case 'cla.no_link_or_unsigned':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.no_link_or_unsigned'),
                });
                break;
            case 'cla.not_an_email':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.not_fill_email'),
                });
                break;
            case 'cla.unmatch_email_domain':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.subemailErr'),
                });
                break;
            case 'cla.not_same_corp':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.not_same_corp'),
                });
                break;
            case 'cla.error_parsing_api_body':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.error_parsing_api_body'),
                });
                break;
            case 'cla.no_db_record':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.id_pwd_err'),
                });
                break;
            case 'cla.wrong_id_or_pw':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.id_pwd_err'),
                });
                break;
            case 'cla.system_error':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.system_error'),
                });
                break;
            default :
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unknown_error'),
                });
                break;
        }
    } else {
        _this.$store.commit('errorCodeSet', {
            dialogVisible: true,
            dialogMessage: _this.$t('tips.system_error'),
        })
    }
};




