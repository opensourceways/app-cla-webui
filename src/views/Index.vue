<template>
    <el-row>
        <el-col class="index" id="transparentDiv" :style="transparentDiv">
            <NewHeader></NewHeader>
            <el-row id="section" :style="sectionStyle">
                <el-col :offset="5" :span="14" >
                    <el-row class="actionBox">
                        <div class="backgroundBox">
                            <img src="../assets/images/backgroundx1.png" alt="">
                        </div>
                        <el-col :span="14" style="height: 100%">
                            <el-row style="height: 100%">
                                <el-col class="title" style="height: 100%">
                                    <div class="name">
                                        <div>
                                            <p><span>C</span>ontributor</p>
                                            <p><span>L</span>icense</p>
                                            <p><span>A</span>greement</p>
                                        </div>
                                        <!--<span>Sign</span>-->
                                    </div>
                                </el-col>

                            </el-row>
                        </el-col>
                        <el-col :span="10" style="height: 100%;">
                            <router-view></router-view>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <NewFooter></NewFooter>
        </el-col>
    </el-row>
</template>
<script>
    import NewHeader from '@components/NewHeader'
    import NewFooter from '@components/NewFooter'
    import * as until from '../until/until'
    import Select from '@components/Select'
    import {mapActions} from 'vuex'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
            document.getElementById("transparentDiv").style.height = until.getClientHeight() + 'px';
        }
    }
    export default {
        name: 'Login',
        components: {
            Select,
            NewHeader,
            NewFooter
        },
        watch: {

        },
        data() {
            return {
                showGuide:false,
                signType: 'corporation',
                transparentDiv: {
                    height: '',
                },
                sectionStyle: {
                    height: '',
                },
            }
        },
        provide() {
            return {
                setClientHeight: this.setClientHeight
            }
        },
        methods: {
            ...mapActions(['setPlatformAct']),
            clickSignTypeGuide(type) {
                this.signType = type;
            },
            setClientHeight() {
                this.$nextTick(() => {
                    if (until.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
                        this.transparentDiv.height = until.getClientHeight() + 'px'
                    }
                })
            },
        },
        mounted() {
            this.setClientHeight();
        }
    }
</script>
<style scoped lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    @import "../assets/font/css/Roboto-Black.css";
    @import "../assets/font/css/Roboto-Light.css";
    @import "../assets/font/css/Roboto-Regular.css";
    .index {
        display: flex;
        flex-direction: column;

        & > #section {
            flex-grow: 1;
        }
        .guideBox{
            box-shadow:0 10px 20px 10px #F3F3F3;
            margin-bottom: 5rem;
            padding-top:4rem;
            padding-bottom: 10rem;
        }
        .typeShadow {
            box-shadow: 0 -10px 20px 10px #F3F3F3;
        }
        .SignTypeCol {
            cursor: pointer;
            height: 16rem;
            font-size: 1.5rem;
            font-family: Roboto-Bold,sans-serif;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
        .SignTypeIcon {
            width: 5rem;
            height: 5rem;
            margin: 1rem;
        }
        .SignTypeBox{

        }
        .guideTitle{
            font-size:2.5rem ;
            margin: 5rem 0;
        }
    }
    .backgroundBox {
        background-repeat: no-repeat;
        position: absolute;
        overflow: hidden;
        top: 120px;
        left: 230px;

    }
    .actionBox {
        position: relative;
        height: 720px;
    }
    .title {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left
    }

    .name {
        font-family: Roboto-Regular, sans-serif;
        color: #424242;
        font-size: 5rem;
        line-height: 30px;
        p{
            span{
                font-family: Roboto-Bold, sans-serif;
                font-weight: bold;
            }
        }
    }

    .description {
        font-family: Roboto-Regular, sans-serif;
        font-size: 1.5rem;
    }


</style>
