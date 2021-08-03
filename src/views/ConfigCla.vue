<template>
    <div id="configCla" :style="configClaStyle">
        <div id="section">
            <div class="pageTitle">{{title}}</div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ConfigCla',
        inject: ['setClientHeight'],
        watch: {
            '$i18n.locale'() {
                this.setTitle();
            }
        },
        data() {
            return {
                title: '',
                configClaStyle: {
                    height: ''
                }
            };
        },
        methods: {
            setTitle() {
                if (this.$store.state.bindType === 'add-bind') {
                    if (this.$store.state.claLinkCorp) {
                        this.title = this.$t('org.addCorpCla');
                    } else {
                        this.title = this.$t('org.addIndividualCla');
                    }
                } else {
                    this.title = this.$t('org.configure_bt');
                }
            }
        },
        created() {
            this.setTitle();
        },
        updated() {
            this.setClientHeight();
        }
    };
</script>

<style lang="less">
    .margin-top-2rem {
        margin-top: 2rem;
    }

    .margin-top-1rem {
        margin-top: 1rem;
    }

    .padding-left-right-2rem {
        padding: 0 2rem;
    }

    .stepBtBox {
        margin-bottom: 2rem;
        display: flex;
        justify-content: space-between;
    }

    .stepBt {
        width: 12rem;
    }

    #configCla {

        #section {
            flex-grow: 1;
            text-align: left;

            .pageTitle {
                padding: 2rem 0;
                font-size: 1.3rem;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                -webkit-touch-callout: none;
                user-select: none;
            }
        }
    }

    .el-dropdown-link {
        cursor: pointer;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

    .dialogDesc {
        font-size: 1.2rem;
        margin: 2rem 0;
    }

    li {
        margin: 1rem 0;
    }
</style>
