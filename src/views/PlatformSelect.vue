<template>
    <el-row style="height: 100%">
        <el-col align="right" class="formBox">

            <el-row>
                <el-col :offset="4" :span="10">
                    <div class="icon_back">
                        <div class="icon_box">
                            <div class="loginSvg">
                                <svg-icon icon-class="gitee_new" class="loginIcon"></svg-icon>
                            </div>

                        </div>
                        <div class="icon_box ">
                            <div class="loginBt">
                                <button class="button" @click="login('gitee')">
                                    Login in
                                </button>
                            </div>

                        </div>
                    </div>

                </el-col>
                <!--<el-col :span="10">-->
                    <!--<div class="icon_back">-->
                        <!--<div class="icon_box">-->
                            <!--<div class="loginSvg">-->
                                <!--<svg-icon icon-class="github_new" class="loginIcon"></svg-icon>-->

                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="icon_box">-->
                            <!--<div class="loginBt">-->
                                <!--<button class="button" @click="login('github')">-->
                                    <!--Login in-->
                                <!--</button>-->
                            <!--</div>-->

                        <!--</div>-->

                    <!--</div>-->
                <!--</el-col>-->
            </el-row>

        </el-col>
    </el-row>

</template>

<script>
    import {mapActions} from 'vuex'
    import * as url from '../until/api'

    export default {
        name: "PlatformSelect",
        data() {
            return {
                platform: '',
            };
        },
        methods: {
            ...mapActions(['setPlatformAct']),
            submit() {
            },
            login(platform) {
                this.setPlatformAct(platform)
                let interval = setInterval(() => {
                    if (this.$store.state.platform) {
                        console.log(this.$store.state.platform);
                        this.$axios({
                            url: `/api${url.getAuthCodeUrl}/${platform}/login`,
                        }).then(res => {
                            window.location.href = res.data.data.url
                        }).catch(err => {
                        })
                        clearInterval(interval)
                    }
                }, 100)

            },
        }
    }
</script>

<style scoped lang="less">
    .bt_desc {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .icon_box {
        display: flex;
        justify-content: center;
        position: relative;
    }

    .loginSvg {
        position: absolute;
        top: 2rem;
    }

    .loginBt {
        position: absolute;
        bottom: -2rem;
    }

    .icon_back {
        background-color: white;
        border-radius: 1rem;
        height: 12.5rem;
        width: 15rem;
        box-shadow: 0 0 20px 10px #F3F3F3;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;

    }

    .button {
        width: 10rem;
        height: 4rem;
        border-radius: 2rem;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
    }

    .button:focus {
        outline: none;
    }

    .formBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .loginIcon {
        cursor: pointer;
        width: 6rem;
        height: 6rem;
        margin: 0 1rem;
    }
</style>