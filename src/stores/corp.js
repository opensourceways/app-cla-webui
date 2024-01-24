import {
  defineStore
} from 'pinia';


export const useCorpStore = defineStore('corp', {
  state: () => ({
    loginInfo: 'aaa'
  }),
  actions: {
    setLoginInfo(obj) {
      this.loginInfo = obj;
    },
  },
  getters: {

  }
});