<template>
    <el-container id="jumpPage">
        <header>
            <Header></Header>
        </header>
        <el-main>
            <div id="pageContent">
                <p v-for="(item,index) in textData" :key="index" :class="{'lastP':index===textDataLength-1}">
                    {{item}}</p>
                <section v-for="(item,index) in community" :key="index+item">
                    <span @click="toSignIndex(item.linkId)">
                        {{item.text}}
                    </span>
                    <span class="line">
                    </span>
                </section>
            </div>
        </el-main>
        <footer>
            <Footer></Footer>
        </footer>
    </el-container>
</template>

<script>
    import Header from '../components/NewHeader';
    import Footer from '../components/NewFooter';
    import {setComponentHeight, strToBase64} from '../util/util';

    export default {
        name: 'JumpPage',
        components: {
            Header,
            Footer
        },
        computed: {
            textDataLength() {
                return this.textData.length;
            }
        },
        data() {
            return {
                textData: [
                    '我们已将企业登录入口迁移至对应社区的CLA签署首页中，您可以通过下面的按钮进行访问。',
                    '此网页仅保留1个月，之后将无法从此处进行登录，请到签署首页执行相关操作。',
                    'We have moved the enterprise login portal to the CLA signing home page of the corresponding community.',
                    'You can click the button below to access it. This page will only be retained for one month.',
                    'After that, you will not be able to log in from this page.',
                    'Please go to the CLA signing home page to perform related operations.'
                ],
                community: [{
                    linkId: 'gitee_openeuler-1611298811283968340',
                    text: 'openEuler'
                }, {
                    linkId: 'gitee_ascend-1611222220829317930',
                    text: 'Ascend'
                }, {
                    linkId: 'gitee_mindspore-1614155835277678289',
                    text: 'MindSpore'
                }, {
                    linkId: 'gitee_opengauss-1614047760000855378',
                    text: 'openGauss'
                }, {
                    linkId: 'gitee_openlookeng-1614322910578209320',
                    text: 'openLookeng'
                }, {
                    linkId: 'gitee_edahelper-1620887083478580559',
                    text: 'EDAHelper'
                }, {
                    linkId: 'gitee_HW-PLLab-1628740605522948013',
                    text: 'HW-PLLab'
                }, {
                    linkId: 'github_kunpengcompute-1623060284995657822',
                    text: 'Kunpeng'
                }]
            };
        },
        methods: {
            toSignIndex(linkId) {
                let params = strToBase64(`${SIGN_LINK}/${linkId}`);
                this.$router.push(`/sign/${params}`);
            }
        },
        mounted() {
            setComponentHeight(this, 'jumpPage');
        }
    };
</script>

<style scoped lang="less">
    @import '../assets/font/css/HuaweiSans-Regular.css';

    @media screen and (min-width: 1200px) {
        #pageContent {
            width: 1200px;
            margin: auto;
        }
    }

    @media screen and  (max-width: 1200px) {
        #pageContent {
            width: 100%;
        }
    }

    #jumpPage {
        font-family: HuaweiSans-Regular, sans-serif;
        flex-direction: column;

        main {
            flex-grow: 1;
            display: grid;
            place-content: center;

            #pageContent {
                padding: 30px;

                section {
                    display: inline-block;
                }

                section:last-child > span:last-child {
                    display: none;
                }

                p {
                    margin: 20px 0;
                    line-height: 30px;
                }

                .lastP {
                    margin-bottom: 50px;
                }

                span {
                    margin: 0 10px;
                    text-decoration: underline;
                    color: #3EA650;
                    cursor: pointer;
                }

                .line {
                    border: 1px solid black;

                    height: 100%;
                }
            }
        }

    }
</style>
