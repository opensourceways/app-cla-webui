import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as url from '../until/api'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        signRouter:'/sign',
        claChoose: sessionStorage.getItem('claChoose') || undefined,
        orgChoose: sessionStorage.getItem('orgChoose') || undefined,
        repositoryChoose: sessionStorage.getItem('repositoryChoose') || undefined,
        isEmail: sessionStorage.getItem('isEmail') || undefined,
        repositoryValue: sessionStorage.getItem('repositoryValue') || undefined,
        claValue: sessionStorage.getItem('claValue') || undefined,
        orgValue: sessionStorage.getItem('orgValue') || undefined,
        claOptions: sessionStorage.getItem('claOptions') || undefined,
        repositoryOptions: sessionStorage.getItem('repositoryOptions') || undefined,
        orgOptions: sessionStorage.getItem('orgOptions') || undefined,
        showConfigForm: sessionStorage.getItem('showConfigForm') || undefined,
        userLimit: sessionStorage.getItem('userLimit') || undefined,
        loginInfo: JSON.parse(sessionStorage.getItem('loginInfo')) || undefined,
        repoInfo: JSON.parse(sessionStorage.getItem('repoInfo')) || undefined,
        loginType: sessionStorage.getItem('loginType') || undefined,
        tableData: sessionStorage.getItem('tableData') || undefined,
        ready: Boolean(sessionStorage.getItem('ready') || undefined),
        platform: sessionStorage.getItem('platform') || undefined,
        domain: 'https://clasign.osinfra.cn',
        access_token: sessionStorage.getItem('token') || undefined,
        refresh_token: sessionStorage.getItem('refresh_token') || undefined,
        platform_token: sessionStorage.getItem('platform_token') || undefined,
        user: {
            userId: sessionStorage.getItem('userId') || undefined,
            userName: sessionStorage.getItem('userName') || undefined,
            userImg: sessionStorage.getItem('userImg') || undefined,
            userEmail: sessionStorage.getItem('userEmail') || undefined,
        },
        dialogVisible: false,
        dialogMessage: '',
        reTryDialogVisible:false,
        signSuccessDialogVisible:false,
        signReLoginDialogVisible:false,
        pwdIsChanged:false,
    },
    mutations: {
        setPwdIsChanged(state, data) {
            state.pwdIsChanged = data;
            state.tableData = data.tableData;
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
        setIsEmail(state, isEmail) {
            state.isEmail = isEmail;
            sessionStorage.setItem('isEmail', isEmail);
        },
        setTableData(state, data) {
            state.tableData = data;
            sessionStorage.setItem('tableData', JSON.stringify(data));
        },
        errorSet(state, obj) {
            state.dialogVisible = obj.dialogVisible;
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
        setCorpToken(state, token) {
            state.access_token = token;
            sessionStorage.setItem('token', token);
        },
    },
    actions: {
        setCorpTokenAct({commit}, token) {
            commit('setCorpToken', token);
        },
        errorAct({commit}, err) {
            console.log(err);
            if (err.data.hasOwnProperty('data')) {
                switch (err.data.data.error_code) {
                    case 'cla.no_cla_binding':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'There is no CLA to sign for organization.',
                        });
                        break;
                    case 'cla.has_signed':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'The CLA has been signed before.',
                        });
                        break;
                    case 'cla.invalid_parameter':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'The parameter is invalid and cannot be signed',
                        });
                        break;
                    case 'cla.no_corp_manager':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'Your company has not added any managers for this project.You can\'t sign',
                        });
                        break;
                    case 'cla.has_not_signed':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'Your corporation has not signed.',
                        });
                        break;
                    case 'cla.invalid_token':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'Token expired, please login again.',
                        });
                        break;
                    case 'cla.missing_token':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'Token invalid, please login again.',
                        });
                        break;
                    case 'cla.unknown_token':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'Token invalid, please login again.',
                        });
                        break;
                    case 'cla.uncompleted_signing':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'The signing process of corporation is not finish yet.',
                        });
                        break;
                    case 'cla.unknown_email_platform':
                        commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'This type of mailbox is not supported at the moment',
                        });
                        break;
                    case 'cla.failed_to_send_email':
                        commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'Failed to send mail.',
                        });
                        break;
                    case 'cla.wrong_verification_code':
                        commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'Verification code error.',
                        });
                        break;
                    case 'cla.expired_verification_code':
                        commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'Verification code expired.',
                        });
                        break;
                    case 'cla.pdf_has_not_uploaded':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'Signature of organization is not uploaded.',
                        });
                        break;
                    case 'cla.num_of_corp_managers_exceeded':
                        commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'The number of managers exceeds the limit.',
                        });
                        break;
                    case 'cla.corp_manager_exists':
                        commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'The name is exists already.',
                        });
                        break;
                    case 'cla.not_same_corp':
                        commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'Email does not belong to the corporation.',
                        });
                        break;
                    case 'cla.not_ready_to_sign':
                        commit('setSignReLogin', {
                            dialogVisible: true,
                            dialogMessage: 'The organization is not ready.',
                        });
                        break;
                    case 'cla.system_error':
                        commit('errorCodeSet', {
                            dialogVisible: true,
                            dialogMessage: 'System error, please try again',
                        });
                        break;
                }
            }else{
                commit('errorCodeSet', {
                    dialogVisible: true,
                    dialogMessage: 'System error, please try again',
                })
            }
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
            commit('setPlatform', platform)
        },
        setTokenAct({commit}, data) {
            commit('setToken', data);
        },
        setLoginUserAct({commit}, data) {
            commit('setLoginUser', data)
        },
        getLinkedRepoListAct({commit}, data) {
            axios({
                url: '/api' + url.getLinkedRepoList,
                params: {platform: data.platform, enabled: true},
                headers: {
                    'Token': data.access_token,
                    'Access-Token': data.platform_token,
                    'Refresh-Token': data.refresh_token,
                    'User': `${data.platform}/${data.userName}`
                }
            }).then(res => {
                if (res.data.length) {
                    let tableData = [];
                    let count = res.data.length;
                    res.data.forEach((item, index) => {
                        // console.log(index);
                        tableData.push({
                            id: item.id,
                            repository: `${item.org_id}/${item.repo_id}`,
                            cla: item.cla_id,
                            org_id: item.org_id,
                            repo_id: item.repo_id,
                            apply_to: item.apply_to,
                            cla_language: item.cla_language,
                            platform: item.platform,
                            contributors: '0',
                        });
                        ((index, item, length, {commit}, tableData) => {
                            // console.log(index, tableData, item, length);
                            if (item.apply_to === 'corporation') {
                                count++;
                                // console.log(data);
                                axios({
                                    url: `/api${url.corporation_signing}`,
                                    params: {
                                        platform: item.platform,
                                        org_id: item.org_id,
                                        repo_id: item.repo_id,
                                        cla_language: item.cla_language
                                    },
                                    headers: {
                                        'Token': data.access_token,
                                        'Access-Token': data.platform_token,
                                        'Refresh-Token': data.refresh_token,
                                        'User': `${data.platform}/${data.userName}`
                                    }
                                }).then(resp => {
                                    Object.assign(tableData[index], {
                                        contributors: resp.data.length,
                                        corporationInfo: resp.data,
                                    });
                                    if (--count === 0) {
                                        let obj = {tableData: tableData, ready: true};
                                        // console.log(tableData);
                                        commit('setReady', obj);
                                    }
                                    // console.log(tableData);
                                }).catch(err => {
                                })
                            }
                            axios({
                                url: `/api${url.getClaInfo}/${item.cla_id}`,
                                headers: {
                                    'Token': data.access_token,
                                    'Access-Token': data.platform_token,
                                    'Refresh-Token': data.refresh_token,
                                    'User': `${data.platform}/${data.userName}`
                                }
                            }).then(resp => {
                                Object.assign(tableData[index], {
                                    claName: resp.data.name,
                                });
                                if (--count === 0) {
                                    let obj = {tableData: tableData, ready: true};
                                    commit('setReady', obj);
                                }
                            }).catch(err => {
                            })
                        })(index, item, res.data.length, {commit}, tableData)
                    })
                }
            }).catch(err => {
            })

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
