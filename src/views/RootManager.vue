<template>
    <div id="section" :style="section">
        <Header @clickItem="clickItem" :user="user"></Header>
        <el-row>
            <el-col :offset="4" :span="16">


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
    // import Header from '@components/NewHeader'
    import Header from '@components/CorporationHeader'
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
            Header,
            Footer,
            pdfReader

        },
        computed: {
            user() {
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
                    case 'c':
                        if (this.$route.path !== '/createUser') {
                            this.$router.push('/createUser');
                        }
                        break;
                    case 'd':
                        if (this.$route.path !== '/rootManager/resetPassword') {
                            this.$router.push('/rootManager/resetPassword');
                        }
                        break;
                    case 'e':
                        this.previewDialogVisible = true
                        break;

                    case 'f':
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
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F0F2F5;
        }

    }
</style>