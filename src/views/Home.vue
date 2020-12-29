<template>
    <div id="home" :style="home">
        <Header></Header>
        <div>
            <div id="section">
                <router-view></router-view>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>
<script>
    import * as until from '../until/until'
    import Header from '@components/NewHeader'
    import Footer from '@components/NewFooter'

    window.onresize = () => {
        if (until.getClientHeight() > document.getElementById('home').offsetHeight) {
            document.getElementById("home").style.minHeight = until.getClientHeight() + 'px'
        }
    };
    export default {
        name: "Home",
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                home: {
                    height: '',
                },
            }
        },
        provide() {
            return {
                setClientHeight: this.setClientHeight
            }
        },
        methods: {
            setClientHeight() {
                this.$nextTick(() => {
                    document.getElementById("home").style.minHeight = '0px';
                    if (until.getClientHeight() > document.getElementById('home').offsetHeight) {
                        document.getElementById("home").style.minHeight = until.getClientHeight() + 'px'
                    } else {
                        document.getElementById("home").style.minHeight = document.getElementById('home').offsetHeight + 'px'
                    }
                })
            },


        },
        updated() {
            this.setClientHeight();
        },

    };

</script>

<style lang="less">
    @media screen and (min-width: 1200px) {
        #section {
            width: 1200px;
            margin: auto;
        }
    }

    .el-table th > .cell {
        word-break: keep-all;
    }

    #home {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        overflow: hidden;


        & > div:nth-of-type(2) {
            flex-grow: 1;
            text-align: left;
            background-color: #f9f9f9;
            padding: 0 1rem;
        }

        .el-dropdown-link {
            cursor: pointer;
            color: #409EFF;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

    }
</style>