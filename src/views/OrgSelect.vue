<template>
    <el-row id="orgSelect" style="height: 100%">
        <el-col align="right" class="formBox">
            <div class="formBack_Box">
                <div class="formBack">
                    <el-row class="marginTop">
                        <el-col>
                            <span>{{$t('corp.select_community')}}</span>
                        </el-col>
                    </el-row>
                    <el-row class="marginTop margin-bottom">
                        <el-col>
                            <el-select value="" v-model="orgValue"
                                       clearable=""
                                       filterable=""
                                       class="select"
                                       :placeholder="$t('corp.select_placeholder')"
                                       @change="changeOrg">
                                <el-option
                                        v-for="item in orgData"
                                        :key="item.value"
                                        :value="item.value"
                                        :label="item.label">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <div class="marginTop buttonRow">
                        <div class="buttonBox">
                            <button class="org-button" @click="submit">
                                {{$t('corp.submit')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name: 'OrgSelect',
        computed: {
            orgData() {
                let data = [];
                if (this.$store.state.loginInfo.userInfo.length) {
                    this.$store.state.loginInfo.userInfo.forEach((item, index) => {
                        if (item.repo_id) {
                            data.push({value: index, label: `${item.org_id}/${item.repo_id}`});
                        } else {
                            data.push({value: index, label: item.org_id});
                        }
                    });
                    this.orgValue = 0;
                }
                return data;
            }
        },
        data() {
            return {
                orgValue: ''
            };
        },
        methods: {
            ...mapActions(['setLoginInfoAct', 'setCorpTokenAct']),
            changeOrg(value) {
                this.orgValue = value;
            },
            submit() {
                let data = JSON.parse(JSON.stringify(this.$store.state.loginInfo));
                Object.assign(data, {orgValue: this.orgValue});
                this.setCorpTokenAct(data.userInfo[this.orgValue].token);
                this.setLoginInfoAct(data);
                if (data.userInfo[this.orgValue].role === 'admin') {
                    this.$router.replace('/rootManager');
                } else {
                    this.$router.replace('/signedRepo');
                }
            }
        }
    };
</script>

<style lang="less">
    .el-select-dropdown__item.selected {
        color: #319E55;
    }

    .el-select .el-input.is-focus .el-input__inner {
        border-color: #319E55
    }

    .el-select .el-input__inner:focus {
        border-color: #319E55
    }

    .el-input--suffix .el-input__inner {
        padding-right: 2rem;
        height: 3rem;
        width: 100%;
        border-radius: 1.5rem;
    }

    #orgSelect {
        .select {
            width: 100%;
        }

        .buttonRow {
            position: relative;

            .buttonBox {
                height: 4rem;
                position: absolute;
                left: 50%;

                .org-button {
                    position: relative;
                    left: -50%;
                    top: -2rem;
                    width: 15rem;
                    height: 4rem;
                    border-radius: 2rem;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    background: linear-gradient(to right, #97DB30, #319E55);
                }

                .org-button:focus {
                    outline: none;
                }
            }
        }


        .formBack_Box {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
        }

        .formBack {
            width: 18rem;
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem 2rem 0 2rem;
            background-color: white;
            border-radius: 2rem;

        }

        .formBox {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .marginTop {
            margin-top: 2rem;
        }

        .margin-bottom {
            margin-bottom: 6rem;
        }
    }

</style>
