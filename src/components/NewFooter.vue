<template>
    <el-row id="newFooter" align="middle" style="border-top:2px solid #F2F2F2;">
        <el-col class="footer" :offset="5" :span="14">
            <div class="box" @click="join">
                <svg-icon icon-class="github" class="footerIcon"></svg-icon>
                <!--<span class="join_us">JOIN US</span>-->
            </div>
            <div class="box" @click="viewPrivacy">
                <span class="copyright">©2020 Draven.Designed by LA-Studio</span>
            </div>

        </el-col>

    </el-row>
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

    #newFooter {
        background-color: white;

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