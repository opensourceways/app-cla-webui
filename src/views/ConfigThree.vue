<template>
    <el-row id="configThree">
        <div class="itemBox">
            <div class="stepTitle">
                ③ Email
            </div>
            <div style="padding: 0 2rem">
                <el-input
                        readonly=""
                        size="medium"
                        class="emailInput"
                        placeholder="click to grant authorized email"
                        @click.native="toAuthorizedEmail()"
                        v-model="email">

                </el-input>
            </div>
        </div>
    </el-row>
</template>

<script>
    export default {
        name: "ConfigThree"
    }
</script>

<style lang="less">
    #configThree {
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