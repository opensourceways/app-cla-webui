<template>
    <div id="signedRepo" :style="section">
        <Header></Header>
        <div>
            <div id="signedRepo_section">
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
        if (util.getClientHeight() > document.getElementById('signedRepo').offsetHeight) {
            document.getElementById('signedRepo').style.height = util.getClientHeight() + 'px';
        }
    };
    export default {
        name: 'SignedRepo',
        components: {
            Header,
            Footer
        },
        data() {
            return {
                section: {
                    height: ''
                }
            };
        },
        methods: {
            setClientHeight() {
                this.$nextTick(() => {
                    util.getClientHeight() > document.getElementById('signedRepo').offsetHeight ?
                        this.section.height = util.getClientHeight() + 'px' :
                        this.section.height = document.getElementById('signedRepo').offsetHeight;
                });
            }
        },
        mounted() {
            this.setClientHeight();
        },
        destroyed() {
            window.onresize = null;
        }
    };
</script>

<style lang="less">
    @media screen and (min-width: 1200px) {
        #signedRepo_section {
            width: 1200px;
            margin: auto;
        }
    }

    #signedRepo {
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        & > div:nth-of-type(2) {
            flex-grow: 1;
            background-color: #F0F2F5;
            padding: 0 1rem;
        }
    }

</style>
