<template>
    <el-row class="headerBox" style="border-bottom:2px solid #F2F2F2;">
        <el-col class="header" :offset="4" :span="16">
            <div class="box">
                <!--<svg-icon icon-class="icon" class="icon"></svg-icon>-->
            </div>

            <div>

                <!--<div class="my_select_box">-->
                    <!--<el-row class="my_select" @click.native="clickSelect()">-->
                        <!--<el-col :span="20" class="select_content">-->
                            <!--{{language}}-->
                        <!--</el-col>-->
                        <!--<el-col :span="4" class="select_content">-->
                            <!--<svg-icon icon-class="arrow" ></svg-icon>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                    <!--<div id="my_option" :class="visible">-->
                        <!--<div-->
                                <!--v-for="item in options"-->
                                <!--:key="item.value"-->
                                <!--:label="item.label"-->
                                <!--:value="item.value">-->
                            <!--<div style="width: 100%">-->
                                <!--<div>-->
                                    <!--<div class="mark">-->
                                    <!--</div>-->
                                <!--</div>-->

                                <!--<div>-->
                                    <!--{{item.label}}-->
                                <!--</div>-->

                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "NewHeader",
        data() {
            return {
                language: 'English',
                value:0,
                options: [{value: 0, label: 'English'}, {value: 1, label: '中文'}, {value: 2, label: '日语'}],
                visible:{
                    visibility:'hidden',
                },
            }
        },
        methods:{
            clickSelect(){
                console.log('clickSelect');
                document.getElementById('my_option').style.visibility='hidden'
            },
        },
    }
</script>

<style scoped lang="less">
    .mark{
        visibility: hidden;
        height: 6px;
        width: 6px;
        border-radius: 50%;
        background-color: #2E9C55;
    }
    .my_box {
        height: 2.6rem;
        position: relative;

    }

    .my_box > div {
        position: absolute;
        top: 0;
        left: 0;
        border: 1px solid black;
        border-radius: 1.3rem;
        width: 8rem;

    }

    .my_select_box {
        /*font-size: 1.2rem;*/
        height: 2.6rem;
        width: 8rem;
        position: relative;

    }

    .my_select {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 8rem;
        height: 2.6rem;
        border: 1px solid black;
        border-radius: 1.3rem;
        padding: 0 1rem;
        z-index: 2;
        cursor: pointer;
    }
    .select_content{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    #my_option {
        z-index: 1;
        position: absolute;
        background-color: white;
        top: 0;
        left: 0;
        padding-top: 2.6rem;
        box-sizing: border-box;
        width: 8rem;
        border: 1px solid black;
        border-radius: 1.3rem;
        cursor: pointer;

    }

    #my_option > div {
        cursor: pointer;
        background-color: white;
        border-radius: 1.3rem;
        height: 2.6rem;
        padding: 0 1rem;
        display: flex;
        justify-content: center;
    }

    #my_option > div > div {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    #my_option > div > div>div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
    }
    #my_option > div > div>div:last-child{
        flex-grow: 1;
    }

    #my_option > div:not(:last-child) > div {
        border-bottom: 1px solid black;
    }


    .ul_box > div {
        box-sizing: border-box;
        /*padding: 2.6rem 0 0 0;*/
        /*overflow: hidden;*/
        width: 8rem;
        height: 2.6rem;
        border: 1px solid black;
        border-radius: 1.3rem;
    }


    .icon {
        width: 3.5rem;
        height: 3.5rem;
    }

    .pointer {
        cursor: pointer;
    }

    .headerBox {
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        height: 4.5rem;
        width: 100%;
        /*z-index: 10;*/
    }

    .header {
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .header > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>