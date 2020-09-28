<template>
    <div class="header">
        <el-col :span="8">
            <div style="display: flex;">
                <!--<img class="pointer" style="width: 2rem" :src="this.$store.state.user.userImg" alt="" @click="newWindow()">-->
                <!--<div style="display: flex;flex-direction: column;justify-content: center;margin-left: .5rem">-->
                <!--<span>Hi, <span class="pointer" style="font-weight: bold">{{this.$store.state.user.userName}}!</span></span>-->
                <!--</div>-->
            </div>
        </el-col>
        <el-col :span="8">
            <div>

                <svg-icon class="pointer" @click="toHome()" id="svg_logo" icon-class="CLA_SYSTEM_BLACK"/>
            </div>
        </el-col>
        <el-col :span="8">
            <div>

                <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
    {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-if="userInfo[orgValue].role==='admin'" command="a">user</el-dropdown-item>
                        <el-dropdown-item v-else command="b">employee</el-dropdown-item>
                        <el-dropdown-item v-if="userInfo[orgValue].role==='admin'" command="c">create user
                        </el-dropdown-item>
                        <el-dropdown-item command="d">reset password</el-dropdown-item>
                        <el-dropdown-item v-if="userInfo[orgValue].role==='admin'" command="e">my cla</el-dropdown-item>
                        <el-dropdown-item command="f">login out</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>


    </div>
</template>

<script>
    export default {
        name: "CorporationHeader",
        // computed: {user:{get:()=>{return this.userName}}},
        props: ['user'],
        computed: {

            userInfo() {
                console.log(this.user.userInfo);
                return this.user.userInfo
            },
            orgValue() {
                console.log(this.user.orgValue);
                return this.user.orgValue
            },
        },

        data() {
            return {
                userName: this.user.userName

            }
        },
        created() {
            console.log(this.user);
        },
        methods: {
            handleCommand(command) {
                this.$emit('clickItem', command);
            },
            toHome() {
                this.$router.push('/home')
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

    .header {
        position: fixed;
        top: 0;
        left: 0;
        background-color: #ececec;
        height: 4rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 10;
        width: 100%;

        & > div:nth-of-type(1) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            padding-left: 3rem;
        }

        & > div:nth-of-type(2) {
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

        & > div:nth-of-type(3) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: right;
            padding-right: 3rem;
        }
    }
</style>