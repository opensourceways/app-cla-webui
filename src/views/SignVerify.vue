<template>
    <div id="signVerify" :style="signVerifyClass">
        <v-header></v-header>
        <div id="section">
            <el-col :offset="6" :span="12">
                <p>请输入6位数验证码完成验证</p>
                <el-input v-model="verifyCode" size="medium" style="margin-right: 2rem"></el-input>
                <el-button type="primary" size="medium" @click="verify()">确定</el-button>
            </el-col>
        </div>
        <v-footer></v-footer>

    </div>
</template>

<script>
    import Header from '@components/Header'
    import Footer from '@components/Footer'
    import * as until from '../until/until'
    import * as url from '../until/api'

    export default {

        name: "SignVerify",
        components: {
            'v-header': Header,
            'v-footer': Footer
        },
        data() {

            return {
                platform:this.$store.state.platform,
                verifyCode: '',
                signVerifyClass: {
                    height: '',
                },
            }
        },
        methods: {
            verify() {
                let obj={code:this.verifyCode}
                this.$axios({
                    url: '/api' + url.verifyCode,
                    method:'post',
                    data: obj,
                    headers: {'Access-Token': this.$store.state.access_token, 'Refresh-Token': this.$store.state.refresh_token,'User':`${this.platform}/${this.$store.state.user.userName}`}

                }).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success('验证成功')
                    }else{
                        this.$message.error('验证失败')
                    }
                }).catch(err => {
                })
            },
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('signVerify').offsetHeight ?
                        this.checkCLAClass.height = until.getClientHeight() + 'px' :
                        this.checkCLAClass.height = document.getElementById('signVerify').offsetHeight

                })
            },

        },

        created() {
        },
        mounted() {
            this.setClientHeight();
        }
    }
    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('signVerify').offsetHeight) {
            document.getElementById("signVerify").style.height = until.getClientHeight() + 'px'
        }
    }
</script>

<style scoped lang="less">
    .borderClass {
        padding: .5rem 0;
        border-bottom: 1px solid lightgray;
        border-top: 1px solid lightgray;
    }

    .marginTop1rem {
        margin-top: 1rem;
    }

    .contentTitle {
        font-size: 1.2rem;
    }

    .size_s {
        font-size: .9rem;
    }

    #signVerify {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-top: 4rem;

        & > #section {
            padding: 1rem;
            text-align: left;
            flex-grow: 1;
            background-color: #F5F5F5;

        }
    }
</style>