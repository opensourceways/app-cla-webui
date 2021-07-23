<template>
    <el-row>
        <el-col class="index" id="transparentDiv">
            <NewHeader></NewHeader>
            <el-row id="section">
                <el-col>
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
    import NewHeader from '@components/NewHeader';
    import NewFooter from '@components/NewFooter';
    import * as util from '../util/util';
    import {mapActions} from 'vuex';

    window.onresize = () => {
        if (util.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
            document.getElementById('transparentDiv').style.height = util.getClientHeight() + 'px';
        }
    };
    export default {
        name: 'Login',
        components: {
            NewHeader,
            NewFooter
        },
        data() {
            return {
                showGuide: false,
                signType: 'corporation'
            };
        },
        provide() {
            return {
                setClientHeight: this.setClientHeight
            };
        },
        methods: {
            clickSignTypeGuide(type) {
                this.signType = type;
            },
            setClientHeight() {
                this.$nextTick(() => {
                    document.getElementById('transparentDiv').style.minHeight = '0px';
                    if (util.getClientHeight() > document.getElementById('transparentDiv').offsetHeight) {
                        document.getElementById('transparentDiv').style.minHeight = util.getClientHeight() + 'px';
                    } else {
                        document.getElementById('transparentDiv').style.minHeight = document.getElementById('transparentDiv').offsetHeight + 'px';
                    }
                });
            }
        },
        mounted() {
            this.$store.commit('', '');
            this.setClientHeight();
        }
    };
</script>
<style lang="less">
    @import "../assets/font/css/Roboto-Bold.css";
    @import "../assets/font/css/Roboto-Regular.css";

    @media screen and (min-width: 100px) and (max-width: 1200px) {
        #section {
            width: 100%;
        }

        .backgroundBox {
            width: 66.6%;
            left: 25%;

            img {
                width: 51rem;
            }
        }
    }

    @media screen and (min-width: 1200px) {
        #section {
            width: 1200px;
            margin: auto;
        }

        .backgroundBox {
            left: 280px;
        }
    }

    .index {
        display: flex;
        flex-direction: column;
        width: 100%;

        #section {
            flex-grow: 1;
            padding: 0 1rem;
        }

        .guideBox {
            box-shadow: 0 10px 20px 10px #F3F3F3;
            margin-bottom: 5rem;
            padding-top: 4rem;
            padding-bottom: 10rem;
        }

        .typeShadow {
            box-shadow: 0 -10px 20px 10px #F3F3F3;
        }

        .SignTypeCol {
            cursor: pointer;
            height: 16rem;
            font-size: 1.5rem;
            font-family: Roboto-Bold, sans-serif;
            display: flex;
            justify-content: center;
            flex-direction: column;
        }

        .SignTypeIcon {
            width: 5rem;
            height: 5rem;
            margin: 1rem;
        }

        .SignTypeBox {

        }

        .guideTitle {
            font-size: 2.5rem;
            margin: 5rem 0;
        }

        .backgroundBox {
            background-repeat: no-repeat;
            position: absolute;
            overflow: hidden;
            top: 7.5rem;

        }

        .actionBox {
            position: relative;
            height: 45rem;
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

            p {
                span {
                    font-family: Roboto-Bold, sans-serif;
                    font-weight: bold;
                }
            }
        }

        .description {
            font-family: Roboto-Regular, sans-serif;
            font-size: 1.5rem;
        }
    }

</style>
