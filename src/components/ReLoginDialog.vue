<template>
    <el-row>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                width="30%"
        >
            <el-row>
                <el-col align="center">
                    <p>{{message}}</p>
                    <button class="dialogBt" @click="clickGoHome()">Go Home</button>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {
        name: "ReLoginDialog",
        props: ['dialogVisible', 'message', 'title'],
        data(){
            return{
                domain:'clasign.osinfra.cn'
            }
        },
        methods: {
            clickGoHome() {
                let date = new Date();
                let domain = this.domain
                date.setTime(date.getTime() - 10000);
                document.cookie = `_mark=; expire=${date.toUTCString()}; Domain=${domain}; path=/`;
                let repoInfo = this.$store.state.repoInfo
                let path = repoInfo.repo_id ? `/sign/${repoInfo.platform}/${repoInfo.org_id}/${repoInfo.repo_id}` : `/sign/${repoInfo.platform}/${repoInfo.org_id}`
                this.$router.replace(path)
            },
        },
    }
</script>

<style scoped>
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
</style>