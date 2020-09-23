<template>
    <el-row class="signType" style="height: 100%">
        <el-col style="height: 100%">
            <el-row style="height: 50%">
            </el-row>
            <el-row style="height: 50%">
                <el-col  align="right" class="buttonBox">
                    <div>
                        <div>
                            <button class="button" @click="submit('individual')">
                                Individual
                            </button>
                        </div>
                      <div>
                          <el-tooltip class="item" effect="dark" content="Sorry, it's not open yet" placement="right">
                              <button class="disabledButton">
                                  Corporation
                              </button>
                          </el-tooltip>

                          <!--<button class="button" @click="submit('corporation')">-->
                              <!--Corporation-->
                          <!--</button>-->
                      </div>
                        <el-tooltip class="item" effect="dark" content="Sorry, it's not open yet" placement="right">
                            <button class="disabledButton" >
                                Employee
                            </button>
                        </el-tooltip>
                        <!--<button class="button" @click="submit('employee')">-->
                            <!--Employee-->
                        <!--</button>-->
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
</template>
<script>
    import * as url from '../until/api'
    import {mapActions} from 'vuex'
    export default {
        name: "SignType",
        data() {
            return {
                platform: '',
                org: '',
                repo: '',
                domain:this.$store.state.domain,
            }
        },
        methods: {
            ...mapActions(['setTokenAct', 'setLoginTypeAct', 'setRepoInfoAct']),
            getRepoInfo() {
                let args = window.location.href.split('/sign/')[1].split('/')
                this.platform = args[0]
                this.org = args[1]
                if (args[2]) {
                    this.repo = args[2]
                } else {
                    this.repo = ''
                }
                this.setRepoInfoAct({platform: this.platform, org_id: this.org, repo_id: this.repo});
            },
            submit(loginType) {
                this.setLoginTypeAct(loginType)
                if (this.platform === 'gitee') {
                    if (loginType === 'individual' || loginType === 'employee') {
                        this.$axios({
                            url: `/api${url.getAuthCodeUrl}/${this.platform}/sign`,
                        }).then(res => {
                            window.location.href = res.data.data.url
                        }).catch(err => {
                        })
                    } else {
                        this.$router.push('/sign-cla')
                    }
                } else if (this.platform === 'github') {
                    if (this.$store.state.loginType === 'individual' || this.$store.state.loginType === 'employee') {
                        // window.location.href = 'https://github.com/login/oauth/authorize?client_id=d86f4915398dad23bffc&redirect_uri=http://localhost:8080/home&scope=user,user:email'  //逗号分隔多个权限
                    } else {
                        this.$router.push('/signCla')
                    }
                }
            },
            setCookie(){
                let date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = `_mark=; expire=${date.toUTCString()}; Domain=${this.domain}; path=/`;
            },
        },

        created() {
            this.setCookie();
            this.getRepoInfo();
        }
    }
</script>
<style scoped lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    .signType{
        font-family: Roboto-Bold,sans-serif;
    }
    .buttonBox {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .button {
        width: 15rem;
        height: 4rem;
        border-radius: 2rem;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
        margin: 1.2rem 0;
    }
    .button:focus {
        outline: none;
    }
    .disabledButton {
        width: 15rem;
        height: 4rem;
        border-radius: 2rem;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        /*background: linear-gradient(to right, #97DB30, #319E55);*/
        background-color: lightgrey;
        margin: 1.2rem 0;
    }
    .disabledButton:focus {
        outline: none;
    }
</style>