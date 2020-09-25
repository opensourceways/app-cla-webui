<template>
    <div id="section" :style="section">
        <Header @clickItem="clickItem" :user="user"></Header>
        <el-row style="margin-top: 2rem">
            <el-col :offset="4" :span="16">
                <el-tabs v-model="active">
                    <el-tab-pane label="User Management" name="first" style="margin-top: 1rem">
                    </el-tab-pane>
                </el-tabs>
                <router-view></router-view>
            </el-col>
        </el-row>

        <Footer></Footer>
        <el-dialog
                style="background-color: #3C3C3C"
                title="pdf-reader"
                top="5vh"
                :visible.sync="previewDialogVisible"
                width="50%">
            <div>
                <pdfReader
                        v-if="docInfo.type === 'pdf'"
                        :doctype="docInfo.type"
                        :dochref="docInfo.href">

                </pdfReader>

            </div>

        </el-dialog>
    </div>

</template>

<script>
    import * as url from '../until/api'
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'
    import * as until from '../until/until'
    import pdfReader from "@components/PdfReader";

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('section').offsetHeight) {
            document.getElementById("section").style.height = until.getClientHeight() + 'px'
        }
    }
    export default {
        name: "rootManager",
        components: {
            CorporationHeader,
            Footer,
            pdfReader

        },
        computed:{
            user(){
                return this.$store.state.loginInfo
            },
        },
        data() {
            return {
                docInfo: {
                    type: "pdf",
                    href: "/static/pdf/merge.pdf"
                },
                previewDialogVisible: false,

                section: {
                    height: '',
                },
                active: 'first',

            }
        },
        created() {
        },
        mounted() {
            this.setClientHeight();
        },

        methods: {

            clickItem(command) {
                switch (command) {
                    case 'a':
                        if (this.$route.path !== '/userList') {
                            this.$router.push('/userList');
                        }
                        break;
                    case 'b':
                        if (this.$route.path !== '/createUser') {
                            this.$router.push('/createUser');
                        }
                        break;
                    case 'c':
                        if (this.$route.path !== '/resetPassword') {
                            this.$router.push('/resetPassword');
                        }
                        break;
                    case 'd':
                            this.previewDialogVisible=true
                        break;

                    case 'e':
                        this.loginOut()
                        break;
                }
            },
            loginOut() {
                sessionStorage.clear();
                this.$router.push('/')
            },
            setClientHeight() {
                this.$nextTick(() => {
                    until.getClientHeight() > document.getElementById('section').offsetHeight ?
                        this.section.height = until.getClientHeight() + 'px' :
                        this.section.height = document.getElementById('section').offsetHeight
                })
            },

        },
    }
</script>

<style scoped lang="less">
    #section {
        padding-top: 4rem;
        background-color: #F5F5F5;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        & > div:nth-of-type(2) {
            flex-grow: 1;
        }
    }

    .pointer {
        cursor: pointer;
    }

    .tableStyle {
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

    .borderClass {
        padding: .5rem 0;
        border-bottom: 1px solid lightgray;
        border-top: 1px solid lightgray;
    }

    .marginTop1rem {
        margin-top: 1rem;
    }

    .contentTitle {
        font-size: 1.2rem;
    }

    .size_s {
        font-size: .9rem;
    }

</style>