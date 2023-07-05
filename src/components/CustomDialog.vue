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
                        <el-col align="center" :span="12">
                            <button class="cancelBt" @click="cancel()">{{$t('corp.cancel')}}</button>
                        </el-col>
                        <el-col align="center" :span="12">
                            <button class="dialogBt" @click="toNext()">{{$t('tips.dialogBt')}}</button>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name: 'CustomDialog',
        props: ['dialogVisible', 'message'],
        computed: {
            dialogWidth() {
                if (this.IS_MOBILE) {
                    return '80%';
                } else {
                    return '30%';
                }
            },
            dialogMessage() {
                if (localStorage.getItem('lang') === this.english) {
                    return 'dialogMessageEn';
                } else if (localStorage.getItem('lang') === this.chinese) {
                    return 'dialogMessage';
                }
            }
        },
        data() {
            return {
                chinese: 'Chinese',
                english: 'English'
            };
        },
        methods: {
            cancel() {
                this.$store.commit('setCustomVisible', {
                    dialogVisible: false,
                    dialogMessage: ''
                });
            },
            toNext() {
                this.cancel();
                this.$router.replace('/config-email');
            }
        }
    };
</script>

<style lang="less">
    #customDialog {
        .cancelBt {
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
