<template>
    <el-row id="configTwo">
        <div class="itemBox">
            <div class="stepTitle">
                ② Paste a link of a CLA file
                <el-tooltip class="item" effect="light"
                            content="Paste a link to the original data of a CLA in the repository"
                            placement="right">
                    <svg-icon icon-class="bangzhu"></svg-icon>
                </el-tooltip>
            </div>
            <div style="padding: 0 2rem">
                <el-row :gutter="20">
                    <el-col>
                        <el-input placeholder="Paste a link" size="medium" v-model="cla_link">
                        </el-input>
                    </el-col>
                    <!--<el-col :span="4">-->
                    <!--<el-select v-model="claLanguageValue"-->
                    <!--placeholder="select language"-->
                    <!--style="width: 100%"-->
                    <!--size="medium"-->
                    <!--clearable-->
                    <!--filterable-->
                    <!--@change="changeLanguage">-->
                    <!--<el-option-->
                    <!--v-for="item in languageOptions"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-col>-->
                </el-row>

            </div>


        </div>
    </el-row>
</template>

<script>
    export default {
        name: "ConfigTwo",
        computed:{
            cla_link: {
                get() {
                    return this.$store.state.cla_link;
                },
                set(value) {
                    this.$store.commit('setClaLink', value)
                },
            },
        },
    }
</script>

<style lang="less">
    #configTwo {
        .stepTitle {
            font-size: 1.2rem;
            padding: .5rem;
        }
        .itemBox {
            border-radius: 1.25rem;
            box-shadow: 0 0 20px 10px #F3F3F3;
            padding: 2rem;
            margin-bottom: 2rem;

            .emailInput {
                cursor: pointer;
            }
        }
    }
</style>