<template>
    <div id="home">
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
    import * as util from '../util/util';
    import Header from '@components/NewHeader';
    import Footer from '@components/NewFooter';

    window.onresize = () => {
        if (util.getClientHeight() > document.getElementById('home').offsetHeight) {
            document.getElementById('home').style.minHeight = util.getClientHeight() + 'px';
        }
    };
    export default {
        name: 'Home',
        components: {
            Header,
            Footer
        },
        data() {
            return {};
        },
        provide() {
            return {
                setClientHeight: this.setClientHeight
            };
        },
        methods: {
            setClientHeight() {
                this.$nextTick(() => {
                    document.getElementById('home').style.minHeight = '0px';
                    if (util.getClientHeight() > document.getElementById('home').offsetHeight) {
                        document.getElementById('home').style.minHeight = util.getClientHeight() + 'px';
                    } else {
                        document.getElementById('home').style.minHeight = document.getElementById('home').offsetHeight + 'px';
                    }
                });
            }
        },
        updated() {
            this.setClientHeight();
        }

    };

</script>

<style lang="less">
    @media screen and (min-width: 1200px) {
        #section {
            width: 1200px;
            margin: auto;
        }
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
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

    }
</style>
