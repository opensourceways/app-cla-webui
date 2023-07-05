import claConfig from '../../public/static/config-store';

export const getClientHeight = () => window.innerHeight;
export const setMinHeight = (box, inner) => {
    document.getElementById(box).style.minHeight = document.getElementById(inner).clientHeight * 2 + 'px';
};
export const strToBase64 = (params) => {
    try {
        return window.btoa(encodeURIComponent(params));
    } catch (e) {
        return false;
    }
};
export const base64ToStr = (params) => {
    try {
        return window.decodeURIComponent(window.atob(params));
    } catch (e) {
        return false;
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
    _this.$store.commit('setIndividualMetadata', claConfig.INDIVIDUALMETADATAARR_EN);
    _this.$store.commit('setCorpMetadata', claConfig.CORPORATIONMETADATAARR_EN);
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
        return 'en-us';
    } else {
        if (lang === 'Chinese') {
            return 'zh-cn';
        } else if (lang === 'English') {
            return 'en-us';
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
    _this.$message.success(_this.$t('tips.successTitle'));
};
export const getMenuState = (_this) => {
    let pageType = _this.$route.meta.pageType;
    if (pageType === 'notLogin') {
        return false;
    } else {
        return pageType;
    }
};
export const catchErr = (err, commit, _this) => {
    if (err.data && Object.prototype.hasOwnProperty.call(err.data,'data')) {
        let message = '';
        switch (err.data.data.error_code) {
            case 'cla.invalid_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.invalid_token')
                });
                break;
            case 'cla.expired_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.invalid_token')
                });
                break;
            case 'cla.missing_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.missing_token')
                });
                break;
            case 'cla.unknown_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unknown_token')
                });
                break;
            case 'cla.unauthorized_token':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unauthorized_token')
                });
                break;
            case 'cla.no_link_or_no_manager':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unknown_email')
                });
                break;
            case 'cla.no_cla_binding':
                if (_this.$store.state.loginType === _this.corporation) {
                    message = _this.$t('tips.no_cla_binding_corp');
                } else if (_this.$store.state.loginType === _this.employee) {
                    message = _this.$t('tips.no_cla_binding_emp');
                } else if (_this.$store.state.loginType === _this.individual) {
                    message = _this.$t('tips.no_cla_binding_individual');
                }
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: message
                });
                break;
            case 'cla.no_corp_manager':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.no_corp_manager')
                });
                break;
            case 'cla.has_not_signed':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.has_not_signed')
                });
                break;
            case 'cla.uncompleted_signing':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.uncompleted_signing')
                });
                break;
            case 'cla.not_ready_to_sign':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.not_ready_to_sign')
                });
                break;
            case 'cla.resigned':
                if (_this.$store.state.loginType === _this.corporation) {
                    message = _this.$t('tips.corp_has_signed');
                } else {
                    message = _this.$t('tips.has_signed');
                }
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: message
                });
                break;
            case 'cla.go_to_sign_employee_cla':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.go_to_sign_employee_cla')
                });
                break;
            case 'cla.no_employee_manager':
                _this.$store.commit(commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.no_corp_manager')
                });
                break;
            case 'cla.no_link':{
                let _commit = '';
                if (_this.$route.path === 'sign-cla') {
                    _commit = commit;
                } else {
                    _commit = 'errorCodeSet';
                }
                _this.$store.commit(_commit, {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.no_link')
                });
                break;
            }
            case 'cla.unmatched_cla':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unmatched_cla')
                });
                break;
            case 'cla.failed_to_send_email':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.failed_to_send_email')
                });
                break;
            case 'cla.unknown_email_platform':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unknown_email')
                });
                break;
            case 'cla.link_exists':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.link_exists')
                });
                break;
            case 'cla.cla_is_used':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.cla_is_used')
                });
                break;
            case 'cla.no_pdf_of_corp':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.no_pdf_of_corp')
                });
                break;
            case 'cla.unuploaded':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.no_pdf_of_corp')
                });
                break;
            case 'cla.not_an_email':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.invalid_email')
                });
                break;
            case 'cla.many_employee_managers':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.many_employee_managers')
                });
                break;
            case 'cla.num_of_corp_managers_exceeded':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.num_of_corp_managers_exceeded')
                });
                break;
            case 'cla.corp_manager_exists':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.corp_manager_exists')
                });
                break;
            case 'cla.admin_as_manager':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('corp.manager_email_same_with_admin')
                });
                break;
            case 'cla.cla_exists':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.cla_exists', {lang: _this.$store.state.addLang})
                });
                break;
            case 'cla.wrong_verification_code':
                if (['/sign-cla', '/config-email'].includes(_this.$route.path)) {
                    message = _this.$t('tips.wrong_verification_code');
                } else {
                    message = _this.$t('tips.link_expired');
                }
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: message
                });
                break;
            case 'cla.too_short_or_long_password':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.newPwd_length_err', {
                        minLength: claConfig.PWD_MIN_LENGTH,
                        maxLength: claConfig.PWD_MAX_LENGTH
                    })
                });
                break;
            case 'cla.invalid_password':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('corp.newPwd_contains_Illegal_character')
                });
                break;
            case 'cla.invalid_account_or_pw':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.invalid_account_or_pw')
                });
                break;
            case 'cla.no_db_record':
                if (_this.$route.path === '/corporationManagerLogin') {
                    message = _this.$t('tips.id_pwd_err');
                } else if (_this.$route.path === '/resetPassword') {
                    message = _this.$t('tips.invalid_account_or_pw');
                }
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: message
                });
                break;
            case 'cla.restricted_email_suffix':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.restricted_email_suffix')
                });
                break;
            case 'cla.expired_verification_code':
                if (_this.$route.path === '/sign-cla') {
                    message = _this.$t('tips.expired_verification_code');
                } else {
                    message = _this.$t('tips.link_expired');
                }
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: message
                });
                break;
            case 'cla.retrieve_pw_encrypt_failure':
            case 'cla.retrieve_pw_decrypt_failure':
            case 'cla.retrieve_pw_validate_failure':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.illegal_link')
                });
                break;
            case 'cla.no_link_or_unsigned':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.no_link_or_unsigned')
                });
                break;
            case 'cla.unmatch_email_domain':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.subemailErr')
                });
                break;
            case 'cla.not_same_corp':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.not_same_corp')
                });
                break;
            case 'cla.error_parsing_api_body':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.error_parsing_api_body')
                });
                break;
            case 'cla.invalid_manager_id':
            case 'cla.wrong_id_or_pw':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.id_pwd_err')
                });
                break;
            case 'cla.system_error':
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.system_error')
                });
                break;
            default :
                _this.$store.commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: _this.$t('tips.unknown_error')
                });
                break;
        }
    } else {
        _this.$store.commit('errorCodeSet', {
            dialogVisible: true,
            dialogMessage: _this.$t('tips.system_error')
        });
    }
};
export const toPrivacy = (_this) => {
    if (_this.$route.path !== '/privacy') {
        _this.$router.push('/privacy');
    }
};
export const upperFirstCase = (word) => {
    let initials = word.substring(0, 1);
    let upper = initials.toUpperCase();
    let end = word.substring(1);
    return upper + end;
};
export const individualFiledExchangeToZh = (individualFieldData) => {
    individualFieldData.forEach(item => {
        switch (item.type) {
            case 'date':
                item.title = '日期';
                item.description = '签署日期';
                break;
            case 'address':
                item.title = '地址';
                item.description = '个人家庭地址';
                break;
            case 'telephone':
                item.title = '电话';
                item.description = '个人电话';
                break;
            case 'fax':
                item.title = '传真';
                item.description = '个人传真';
                break;
        }
    });
};
export const individualFiledExchangeToEn = (individualFieldData) => {
    individualFieldData.forEach(item => {
        switch (item.type) {
            case 'date':
                item.title = 'Date';
                item.description = 'Date of signing';
                break;
            case 'address':
                item.title = 'Address';
                item.description = 'Personal home address';
                break;
            case 'telephone':
                item.title = 'Telephone';
                item.description = 'Personal phone';
                break;
            case 'fax':
                item.title = 'Fax';
                item.description = 'Personal fax';
                break;
        }
    });
};
export const corpFiledExchangeToEn = (corpFieldData) => {
    corpFieldData.forEach(item => {
        switch (item.type) {
            case 'date':
                item.title = 'Date';
                item.description = 'Date of signing';
                break;
            case 'address':
                item.title = 'Address';
                item.description = 'Address of the corporation';
                break;
            case 'telephone':
                item.title = 'Telephone';
                item.description = 'Telephone of the corporation';
                break;
            case 'fax':
                item.title = 'Fax';
                item.description = 'Fax of the corporation';
                break;
        }
    });
};
export const corpFiledExchangeToZh = (corpFieldData) => {
    corpFieldData.forEach(item => {
        switch (item.type) {
            case 'date':
                item.title = '日期';
                item.description = '签署日期';
                break;
            case 'address':
                item.title = '地址';
                item.description = '公司的地址';
                break;
            case 'telephone':
                item.title = '电话';
                item.description = '公司的电话';
                break;
            case 'fax':
                item.title = '传真';
                item.description = '公司的传真';
                break;
        }
    });
};
export const changeCorpTitle = (e, item) => {
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
};
export const checkIllegalChar = (str) => {
    let numType = 0;
    let upperCaseTpe = 0;
    let lowerCaseType = 0;
    let charType = 0;
    for (let char of str) {
        if ( char >= '0' && char <= '9') {
            numType = 1;
        } else if (char >='A' && char <= 'Z') {
            upperCaseTpe = 1;
        } else if (char >= 'a' && char <= 'z') {
            lowerCaseType = 1;
        } else {
            charType = 1;
        }
    }
    return numType + upperCaseTpe + lowerCaseType + charType < 3;
};
export const verifyMsgChangeLang = (ruleForm, _this) => {
    _this.$refs[ruleForm] && _this.$refs[ruleForm].fields.forEach(item => {
        if (item.validateState === 'error') {
            _this.$refs[ruleForm].validateField(item.labelFor);
        }
    });
};
export const setComponentHeight = (_this, id) => {
    _this.$nextTick(() => {
        let offsetHeight = document.getElementById(id).offsetHeight;
        let clientHeight = getClientHeight();
        document.getElementById(id).style.minHeight = '0px';
        document.getElementById(id).style.minHeight = clientHeight > offsetHeight ? clientHeight + 'px' : offsetHeight + 'px';
    });
};
export const getLoading = (_this, langText) => {
    return _this.$loading({
        lock: true,
        text: _this.$t(langText),
        spinner: 'el-icon-loading',
        customClass: 'loading_class',
        background: 'rgba(0, 0, 0, 0.7)'
    });
};





