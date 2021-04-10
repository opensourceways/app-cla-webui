<template>
    <el-row id="customDialog">
        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                :width="dialogWidth">
            <div class="titleBox">
                <svg-icon icon-class="warning" class="dialogIcon"></svg-icon>
                <span>{{$t('tips.warningTitle')}}</span>
            </div>
            <el-row>
                <el-col align="center">
                    <p :class="dialogMessage">{{message}}</p>
                    <el-row>
                        <el-col align="center">
                            <button class="dialogBt" @click="clickQuited()">{{$t('tips.quitLogin')}}</button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name: "TokenErrorDialog",
        props: ['dialogVisible', 'message'],
        computed: {
            dialogWidth() {
                if (this.IS_MOBILE) {
                    return '80%'
                } else {
                    return '30%'
                }
            },
            dialogMessage() {
                if (localStorage.getItem('lang') === '0') {
                    return 'dialogMessageEn'
                } else if (localStorage.getItem('lang') === '1') {
                    return 'dialogMessage'
                }
            },
        },
        data() {
            return {}
        },
        methods: {
            cancel() {
                this.$store.commit('setTokenErrorReLogin', {
                    dialogVisible: false,
                    dialogMessage: '',
                })
            },
            clickQuited(){
                this.cancel();
                setTimeout(()=>{
                    this.$emit('checkAction')
                },1000)
            },
        },
    }
</script>

<style lang="less">
    #customDialog {
        .cancelBt{
            margin-top: 3rem;
            width: 8rem;
            height: 3rem;
            background: white;
            border-radius: 1.5rem;
            border: 1px solid black;
            color: black;
            cursor: pointer;
            outline: none;
        }
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

        .el-dialog__header {
            padding: 0;
        }

        .el-dialog__body {
            padding: 20px;
        }

        .titleBox {
            text-align: left;
            font-size: 1.5rem;
            color: #E6A23C;
            margin-bottom: 1rem;

            .dialogIcon {
                width: 1.5rem;
                height: 1.5rem;
                margin-right: 1rem;
            }
        }
    }

</style>