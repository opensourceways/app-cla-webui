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
    _this.$store.commit('setIndividualMetadata', INDIVIDUALMETADATAARR);
    _this.$store.commit('setCorpMetadata', CORPORATIONMETADATAARR);
    _this.$store.commit('setIndividualCustomMetadataArr', INITINDIVIDUALCUSTOMMETADATA);
    _this.$store.commit('setCorporationCustomMetadataArr', INITCORPCUSTOMMETADATA);
    _this.$store.commit('setEmail', '');
    _this.$store.commit('setIsEmail', false);
    _this.$store.commit('setChooseRepo', '');
    _this.$store.commit('setChooseOrg', '');
    _this.$store.commit('setBindType', '');
    _this.$store.commit('setAddLang', '');
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
};

