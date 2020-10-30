<template>
    <el-row>
        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                width="30%">
            <div class="titleBox">
                <svg-icon icon-class="chenggong" class="dialogIcon"></svg-icon>
                <span>Successfully</span>
            </div>
            <el-row>
                <el-col align="center">
                    <p>{{message}}</p>
                    <button class="dialogBt" @click="clickGoHome()">OK</button>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    import * as until from '../until/until'

    export default {
        name: "SignSuccessDialog",
        props: ['dialogVisible', 'message', 'title'],
        data() {
            return {
                domain: this.$store.state.domain,
                signRouter: this.$store.state.signRouter,
            }
        },
        methods: {
            clickGoHome() {
                this.$store.commit('setSignSuccess', {
                    dialogVisible: false,
                    dialogMessage: '',
                })


                if (until.base64ToStr(sessionStorage.getItem('orgAddress'))) {
                    window.location.href = until.base64ToStr(sessionStorage.getItem('orgAddress'))
                }

            },
        },
    }
</script>

<style scoped lang="less">
    .dialogBt {
        margin-top: 3rem;
        width: 8rem;
        height: 3rem;
        background: linear-gradient(to right, #97DB30, #319E55);
        border-radius: 1.5rem;
        border: none;
        color: white;
        cursor: pointer;
        outline: none;
    }

    .titleBox {
       text-align: center;

        .dialogIcon {
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
        }
    }

</style>