<template>
    <el-row>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                :close-on-press-escape="false"
                :show-close="false"
                :close-on-click-modal="false"
                width="30%">
            <el-row>
                <el-col align="center">
                    <p>{{message}}</p>
                    <button class="dialogBt" @click="reTry()">OK</button>
                </el-col>
            </el-row>
        </el-dialog>
    </el-row>
</template>

<script>
    export default {

        name: "ReLoginDialog",
        props: ['dialogVisible', 'message', 'title'],

        data() {
            return {
                domain: this.$store.state.domain,
            }
        },
        methods: {
            reTry() {
                this.$store.commit('errorCodeSet', {
                    dialogVisible: false,
                    dialogMessage: 'System error, please try again',
                })

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