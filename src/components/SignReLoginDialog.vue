<template>
    <el-row id="signReLoginDialog">
        <el-dialog
                title=""
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                width="30%">
            <div class="titleBox" align="middle">
                <svg-icon icon-class="fail_icon" class="dialogIcon"></svg-icon>
                <span>{{$t('tips.failedTitle')}}</span>
            </div>
            <el-row>
                <el-col align="center">
                    <p class="messageBox">{{message}}</p>
                    <button class="dialogBt" @click="clickGoHome()">{{$t('tips.dialogBt')}}</button>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    import * as until from '../until/until'

    export default {
        name: "ReLoginDialog",
        props: ['dialogVisible', 'message'],
        data() {
            return {
                domain: this.$store.state.domain,
                signRouter: this.$store.state.signRouter,
            }
        },
        methods: {
            clickGoHome() {
                this.$store.commit('setSignReLogin', {
                    dialogVisible: false,
                    dialogMessage: '',
                });

                let date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = `_mark=; expire=${date.toUTCString()}; Domain=${this.domain}; path=/`;
                let repoInfo = this.$store.state.repoInfo;
                let params = repoInfo.repo_id ? `${repoInfo.platform}/${repoInfo.org_id}/${repoInfo.repo_id}` : `${repoInfo.platform}/${repoInfo.org_id}`
                let path = '';
                if (sessionStorage.getItem('orgAddress')) {
                    path = `${this.signRouter}/${until.strToBase64(params)}/${sessionStorage.getItem('orgAddress')}`
                } else {
                    path = `${this.signRouter}/${until.strToBase64(params)}`
                }

                this.$router.replace(path)

            },
        },
    }
</script>

<style lang="less">
    #signReLoginDialog {
        .messageBox {
            word-break: keep-all;
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
            font-size: 1rem;
            color: #E22424;
            margin-bottom: 1rem;

            .dialogIcon {
                width: 1.5rem;
                height: 1.5rem;
                margin-right: .5rem;
            }

        }
    }

</style>