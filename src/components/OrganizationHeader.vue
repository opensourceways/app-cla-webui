<template>
    <div class="corpHeader">
        <el-col class="header" :offset="5" :span="14">
            <div class="box">
                <svg-icon @click="toHome()" icon-class="logo" class="icon"></svg-icon>
            </div>
            <div>
                <div>
                    <div class="menuBox">
                        <div class="userImgBox" id="imgBox">
                            <svg-icon id="defaultImg" class="userImg" @click.native="openOrCloseMenu()"
                                      icon-class="default-user"></svg-icon>
                        </div>
                        <div v-if="menuVisible" id="menuOption">
                            <div  @click="openOrCloseMenu('a')">
                                Home
                            </div>
                            <div @click="openOrCloseMenu('b')">
                                Login out
                            </div>
                        </div>
                    </div>
                </div>

                <!--<div>-->
                    <!--<div class="my_select_box">-->
                        <!--<el-row class="my_select" @click.native="clickSelect()">-->
                            <!--<el-col :span="20" class="select_content">-->
                                <!--{{language}}-->
                            <!--</el-col>-->
                            <!--<el-col :span="4" class="select_content">-->
                                <!--<svg-icon icon-class="arrow"></svg-icon>-->
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
                <!--</div>-->
            </div>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "CorporationHeader",

        data() {
            return {
                userName: this.user.userName,
                language: 'English',
                value: 0,
                options: [{value: 0, label: 'English'}, {value: 1, label: 'Chinese'}, {value: 2, label: 'Japanese'}],
                visible: {
                    visibility: 'hidden',
                },
                menuVisible: false

            }
        },
        created() {
        },
        mounted() {
            document.addEventListener('click', (e) => {
                if (e.target.id !== 'menuOption' && e.target.id !== 'defaultImg' && e.target.id !== 'imgBox') {
                    this.menuVisible = false
                }
            })
        },

        methods: {
            openOrCloseMenu(command) {
                this.menuVisible = !this.menuVisible
                this.$emit('clickItem', command);
            },

            clickSelect() {
                document.getElementById('my_option').style.visibility = 'hidden'
            },
            handleCommand(command) {
                this.$emit('clickItem', command);
            },
            toHome() {
                this.$router.push('/managerList')
            },
            loginOut() {
                this.$router.push('/')
            },
            newWindow() {
                // window.open('https://github.com/ouchengle/Test','_black')
                // window.open('https://github.com/ouchengle')
            },
        },
    }
</script>

<style lang="less">
    .corpHeader {
        /*position: fixed;*/
        /*top: 0;*/
        /*left: 0;*/
        border-bottom: 2px solid #F2F2F2;
        height: 5.5rem;
        width: 100%;
        /*z-index: 10;*/

        .menuBox {
            position: relative;
            height: 2.6rem;
        }

        .userImgBox {
            cursor: pointer;
            height: 2.6rem;
            width: 2.6rem;
            overflow: hidden;
            border-radius: 1.3rem;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 10;

            & .userImg {
                height: 2.6rem;
                width: 2.6rem;
            }
        }

        #menuOption {
            border: 1px solid black;
            border-radius: 1.3rem;
            position: absolute;
            right: 0;
            top: 0;
            z-index: 9;
            background-color: white;
            white-space: pre;

            & > div {
                height: 2.6rem;
                line-height: 2.6rem;
                margin: 0 1rem;
                cursor: pointer;
                user-select: none;
            }

            & > div:not(:last-of-type) {
                border-bottom: 1px solid black;
            }
        }

        & .mark {
            visibility: hidden;
            height: 6px;
            width: 6px;
            border-radius: 50%;
            background-color: #2E9C55;
        }

        & .my_box {
            height: 2.6rem;
            position: relative;

        }

        & .my_box > div {
            position: absolute;
            top: 0;
            left: 0;
            border: 1px solid black;
            border-radius: 1.3rem;
            width: 8rem;

        }

        & .my_select_box {
            /*font-size: 1.2rem;*/
            height: 2.6rem;
            width: 8rem;
            position: relative;

        }

        & .my_select {
            position: absolute;
            top: 0;
            left: 0;
            box-sizing: border-box;
            width: 8rem;
            height: 2.6rem;
            border: 1px solid black;
            border-radius: 1.3rem;
            padding: 0 1rem;
            z-index: 3;
            cursor: pointer;
        }

        & .select_content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & #my_option {
            z-index: 2;
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

        & #my_option > div {
            cursor: pointer;
            background-color: white;
            border-radius: 1.3rem;
            height: 2.6rem;
            padding: 0 1rem;
            display: flex;
            justify-content: center;
        }

        & #my_option > div > div {
            cursor: pointer;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        & #my_option > div > div > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            cursor: pointer;
        }

        & #my_option > div > div > div:last-child {
            flex-grow: 1;
        }

        & #my_option > div:not(:last-child) > div {
            border-bottom: 1px solid black;
        }


        & .ul_box > div {
            box-sizing: border-box;
            /*padding: 2.6rem 0 0 0;*/
            /*overflow: hidden;*/
            width: 8rem;
            height: 2.6rem;
            border: 1px solid black;
            border-radius: 1.3rem;
        }

        & .icon {
            width: 3.5rem;
            height: 3.5rem;
        }

        & .header {
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        & .header > div:nth-of-type(1) {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        & .header > div:nth-of-type(2) {
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        & .header > div:nth-of-type(2) > div {
            margin-left: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

    }

    .el-dropdown-link {
        cursor: pointer;
        color: rgba(54, 54, 54, 0.91);
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .pointer {
        cursor: pointer;
    }

    /*.header {*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*background-color: #ececec;*/
    /*height: 4rem;*/
    /*display: flex;*/
    /*flex-direction: row;*/
    /*justify-content: space-between;*/
    /*z-index: 10;*/
    /*width: 100%;*/

    /*& > div:nth-of-type(1) {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*text-align: left;*/
    /*padding-left: 3rem;*/
    /*}*/

    /*& > div:nth-of-type(2) {*/
    /*display: flex;*/
    /*justify-content: center;*/

    /*& > div {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/

    /*#svg_logo {*/
    /*height: 4rem;*/
    /*width: 4rem;*/
    /*}*/
    /*}*/

    /*}*/

    /*& > div:nth-of-type(3) {*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    /*text-align: right;*/
    /*padding-right: 3rem;*/
    /*}*/
    /*}*/
</style>