<template>
    <div id="verifyPage" :style="verifyCLAClass">
        <div class="header">

            <el-col :offset="8" :span="8">
                <div>

                    <svg-icon class="pointer" @click="toHome()" id="svg_logo" icon-class="logo_b"/>
                </div>
            </el-col>


        </div>
        <div id="section">
            <div v-if="!isVerify" class="content ">
                <el-col :offset="10" :span="10" class="verifyClass">
                    <p>请输入6位数验证码完成验证</p>
                    <el-row>
                        <el-col :span="6" style="margin-right: 2rem">

                            <el-input v-model="verifyCode" size="medium"></el-input>
                        </el-col>
                        <el-col :span="6">
                            <el-button type="primary" size="medium" @click="verify()">确定</el-button>
                        </el-col>
                    </el-row>

                </el-col>
            </div>
            <div v-else class="content">
                <el-col :offset="6" :span="12" class="verifyClass">
                    <p style="text-align: center">
                        {{passContent}}
                    </p>
                </el-col>
            </div>
        </div>

        <Footer></Footer>
        <el-dialog
                title=""
                top="5vh"
                :visible.sync="dialogVisible"
                width="50%">
            <div style="margin-bottom: 2rem">
                请在48小时内输入邮箱{{ruleForm.email}}中的验证码进行验证

            </div>
            <div>
                <el-button type="primary" size="medium" @click="dialogVisible=false">确定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import Footer from '@components/Footer'
    import * as until from '../until/until'
    import * as url from '../until/api'
    export default {
        name: "verifyPage",
        components: {
            Footer
        },
        data(){
            return{
                ruleForm: {
                    name: '',
                    email: '',
                    tel: '',
                    date1: '',

                },
                dialogVisible:false,
                isVerify:false,
                passContent:'',
                verifyCode:'',
                verifyCLAClass: {
                    height: '',
                },
            }
        },
        methods:{
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('verifyPage').offsetHeight ?
                        this.verifyCLAClass.height = until.getClientHeight() + 'px' :
                        this.verifyCLAClass.height = document.getElementById('verifyPage').offsetHeight
                })
            },
            getParams(){
                let params = window.location.href.split('?')[1];
                let paramsArr = params.split('&');
                paramsArr.forEach((item,i)=>{
                    if (item.split('=')[0]==='role'){
                        item.split('=')[1]==='0'?this.passContent='验证通过，你已成功签署CLA':this.passContent='验证通过,请根据邮件提示完成签署流程'
                    }
                })
            },
            verify() {
                this.isVerify = true;
                let obj = {code: this.verifyCode}
                this.$axios({
                    url: '/api' + url.verifyCode,
                    method: 'post',
                    data: obj,
                    headers: {
                        'Access-Token': this.$store.state.access_token,
                        'Refresh-Token': this.$store.state.refresh_token,
                        'User': `${this.platform}/${this.$store.state.user.userName}`
                    }

                }).then(res => {
                    if (res.data.code === 200) {
                        this.isVerify = true;
                    } else {
                        this.$message.error('验证码错误')
                    }
                }).catch(err => {
                })
            },
        },
        created() {
            this.getParams()

        },
        mounted() {
            this.setClientHeight();


        }
    }
    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('verifyPage').offsetHeight) {
            document.getElementById("verifyPage").style.height = until.getClientHeight() + 'px'
        }
    }
</script>

<style scoped lang="less">
    .pointer{
        cursor: pointer;
    }
    .header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: white;
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 1;
        width: 100%;


        & > div:nth-of-type(1) {
            display: flex;
            justify-content: center;

            & > div {
                display: flex;
                flex-direction: column;
                justify-content: center;

                #svg_logo {
                    height: 4rem;
                    width: 4rem;
                }
            }

        }


    }
    .verifyClass {
        padding: 10rem 0;

    }

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

    #verifyPage {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding-top: 4rem;

        & > .header {
            height: 4rem;
            width: 100%;
        }

        & > #section {
            flex-grow: 1;
            background-color: #F5F5F5;

            & > .content {
                padding: 1rem;
                text-align: left;


            }
        }

        & > .footer {
            height: 4rem;
            width: 100%;
        }


    }
</style>