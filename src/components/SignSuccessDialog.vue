<template>
    <el-row id="signSuccessDialog">
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
                    <p class="messageBox">{{message}}</p>
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

                if (sessionStorage.getItem('orgAddress')) {
                    window.location.href = sessionStorage.getItem('orgAddress')
                } else {
                    let date = new Date();
                    date.setTime(date.getTime() - 10000);
                    document.cookie = `_mark=; expire=${date.toUTCString()}; Domain=${this.domain}; path=/`;
                    let repoInfo = this.$store.state.repoInfo
                    let params = repoInfo.repo_id ? `${repoInfo.platform}/${repoInfo.org_id}/${repoInfo.repo_id}` : `${repoInfo.platform}/${repoInfo.org_id}`
                    let path = '';
                    if (sessionStorage.getItem('orgAddress')) {
                        path = `${this.signRouter}/${until.strToBase64(params)}/${sessionStorage.getItem('orgAddress')}`
                    } else {
                        path = `${this.signRouter}/${until.strToBase64(params)}`
                    }
                    this.$router.replace(path)
                }


            },
        },
    }
</script>

<style lang="less">
    #signSuccessDialog {
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

        .messageBox {
            white-space: pre-wrap;
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
            color: #319E55;
            margin-bottom: 1rem;

            .dialogIcon {
                width: 1.5rem;
                height: 1.5rem;
                margin-right: 1rem;
            }
        }
    }


</style>