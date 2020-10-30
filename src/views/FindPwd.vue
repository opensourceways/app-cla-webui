<template>
    <div id="findPwd" :class="findPwdClass">
        <div class="header">
            <el-col :offset="8" :span="8">
                <div>
                    <svg-icon class="pointer" @click="toHome()" id="svg_logo" icon-class="logo_b"/>
                </div>
            </el-col>
        </div>
        <div>Find Password</div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from '@components/Footer'
    import * as until from '../until/until'
    import * as url from '../until/api'

    export default {
        name: "FindPwd",
        components: {
            Footer
        },
        data(){
            return{
                findPwdClass:{
                    height:'',
                }
            }
        },
        methods:{
            toHome() {
                this.$router.push('/home')
            },
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('findPwd').offsetHeight ?
                        this.findPwdClass.height = until.getClientHeight() + 'px' :
                        this.findPwdClass.height = document.getElementById('findPwd').offsetHeight

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
        if (until.getClientHeight() > document.getElementById('findPwd').offsetHeight) {
            document.getElementById("findPwd").style.height = until.getClientHeight() + 'px'
        }
    }
</script>

<style scoped lang="less">
    .pointer {
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
</style>