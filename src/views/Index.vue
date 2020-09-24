<template>
    <el-row>
        <el-col class="index" id="transparentDiv" :style="transparentDiv">
            <NewHeader></NewHeader>
            <el-row id="section">
                <el-col :offset="4" :span="16" style="height: 100%">
                    <el-row style="height: 100%">
                        <el-col :span="14" class="title">
                            <div>
                                <div class="name">
                                    <div>
                                        <p>Contributor License Agreement</p>
                                    </div>
                                    <span>Sign</span>
                                </div>
                                <!--<p class="description">Easily handle Contributor License Agreements (CLAs)</p>-->
                            </div>
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
        data() {
            return {
                transparentDiv: {
                    height: '',
                },
            }
        },
        methods: {
            ...mapActions(['setPlatformAct']),
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
    .title {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: left
    }
    .name {
        font-family: Roboto-Regular, sans-serif;
        font-size: 3rem;
    }
    .description {
        font-family: Roboto-Regular, sans-serif;
        font-size: 1.5rem;
    }
    .index {
        display: flex;
        flex-direction: column;

        & > #section {
            flex-grow: 1;
            background-image: url("../assets/images/backgroundx2.png");
            background-repeat: no-repeat;
            background-position: 40rem center;
            background-size: 55rem;

        }
    }
</style>
