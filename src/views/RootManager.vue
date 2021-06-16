<template>
    <div id="rootManager">
        <Header></Header>
        <div>
            <div id="rootManager_section">
                <router-view></router-view>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'
    import * as util from '../util/util'

    window.onresize = () => {
        if (util.getClientHeight() > document.getElementById('rootManager').offsetHeight) {
            document.getElementById("rootManager").style.height = util.getClientHeight() + 'px'
        }
    };
    export default {
        name: "rootManager",
        components: {
            Header,
            Footer,
        },
        computed: {
            user() {
                return this.$store.state.loginInfo
            },
        },
        data() {
            return {
                active: 'first',
            }
        },
        mounted() {
            this.setClientHeight();
        },
        methods: {
            setClientHeight() {
                this.$nextTick(() => {
                    document.getElementById("rootManager").style.minHeight = '0px';
                    if (util.getClientHeight() > document.getElementById('rootManager').offsetHeight) {
                        document.getElementById('rootManager').style.minHeight = util.getClientHeight() + 'px'
                    } else {
                        document.getElementById('rootManager').style.minHeight = document.getElementById('rootManager').offsetHeight + 'px'
                    }
                })
            },
        },
    }
</script>
<style lang="less">
    @media screen and (min-width: 1200px) {
        #rootManager_section {
            width: 1200px;
            margin: auto;
        }
    }

    #rootManager {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F0F2F5;
            padding: 0 1rem;
        }

    }
    .tableBox {
        border-radius: 1.5rem;
        margin-bottom: 2rem;
        padding: 3rem;
        background-color: white;
    }

     .tableClass {
        border: 1px solid black;
        border-radius: 1.5rem;
    }

     .el-dialog {
        border-radius: 1rem;
    }

     .button {
        width: 10rem;
        height: 2rem;
        border-radius: 1rem;
        border: none;
        color: white;
        font-size: 1rem;
        cursor: pointer;
        background: linear-gradient(to right, #97DB30, #319E55);
        margin-bottom: 1rem;
        user-select: none;
    }

     .button:focus {
        outline: none;
    }

    .tabName {
        user-select: none;
        font-family: Roboto-Regular, sans-serif;
        font-size: 2rem;
        text-align: left;
    }
</style>
