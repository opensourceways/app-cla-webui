<template>
    <el-row>
        <el-col id="privacyBox" :style="privacyBox">
            <Header></Header>
            <el-row id="textBox">
                <el-col :offset="4" :span="16">
                    <div class="marginTop3rem" id="contentBox">
                        {{privacyText}}
                    </div>
                </el-col>
            </el-row>
            <Footer></Footer>
        </el-col>

    </el-row>
</template>

<script>
    import Footer from '../components/NewFooter';
    import Header from '../components/NewHeader'
    import * as url from '../until/api'
    import * as until from '../until/until'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('privacyBox').offsetHeight) {
            document.getElementById("privacyBox").style.height = until.getClientHeight() + 'px';

        }
    }
    export default {
        name: "Privacy",
        components: {
            Header,
            Footer
        },
        data() {
            return {
                privacyText: '',
                privacyBox: {
                    height: '',
                },
            }
        },
        methods: {
            setClientHeight() {
                this.$nextTick(() => {
                    if (until.getClientHeight() > document.getElementById('privacyBox').offsetHeight) {
                        this.privacyBox.height = until.getClientHeight() + 'px'
                    }
                })
            },
            getPrivacy() {
                this.$axios({
                    url: '/api' + url.getPrivacy
                }).then(res => {
                    this.privacyText = res.data;
                }).catch(err => {
                })
            },
            init() {
                this.getPrivacy();
            },
        },

        created() {
            this.init()
        },
        mounted() {
            this.setClientHeight()
        }
    }
</script>

<style scoped lang="less">
    #privacyBox {
        display: flex;
        flex-direction: column;
    }

    #textBox {
        flex-grow: 1;
    }

    #contentBox {
        padding-bottom: 2rem;
        margin-bottom: 2rem;
        white-space: pre-wrap;
        font-size: 1.2rem;
    }
</style>