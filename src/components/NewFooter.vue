<template>
    <div class="parentBox">
        <el-row id="newFooter" align="middle">
            <el-col class="footer" >
                <div class="box" @click="join">
                    <svg-icon icon-class="github" class="footerIcon"></svg-icon>
                </div>
                <div class="box" @click="viewPrivacy">
                    <span class="copyright">©2020 Draven.Designed by LA-Studio</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "NewFooter",
        data() {
            return {}
        },
        methods: {
            ...mapActions(['viewPrivacy']),
            join() {
                window.open('https://github.com/opensourceways/app-cla-server')
            },
            viewPrivacy() {
                // window.open('/privacy')
            },
        },
    }
</script>

<style scoped lang="less">

    @import '../assets/font/css/huaweisans-bold.css';
    @import '../assets/font/css/HuaweiSans-Thin.css';
    @import '../assets/font/css/HuaweiSans-Light.css';
    @import '../assets/font/css/HuaweiSans-Regular.css';
    @media screen and (min-width: 1200px) and (max-width: 1920px){
        #newFooter{
            width: 1200px;
            margin: auto;
        }
    }
    @media screen and  (max-width: 1200px){
        #newFooter{
            width: 100%;
        }
    }
.parentBox{
    width: 100%;
    border-top:2px solid #F2F2F2;
}
    #newFooter {
        background-color: white;
        padding: 0 1rem;
        .footer {
            font-family: HuaweiSans-Regular, sans-serif;
            display: flex;
            justify-content: space-between;
            height: 5.5rem;
        }

        .footerIcon {
            width: 3rem;
            height: 3rem;
        }

        .box {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .copyright {
            font-size: .5rem;
            /*font-family: HuaweiSans-Light,sans-serif;*/
        }

        .join_us {
            font-size: 1.8rem;
        }
    }

</style>