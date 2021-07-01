<template>
    <div>
        <el-steps :active="steping" align-center>
            <el-step :title="$t('corp.find_pwd_step1')" description=""></el-step>
            <el-step :title="$t('corp.find_pwd_step2')" description=""></el-step>
        </el-steps>
    </div>
</template>

<script>
    export default {
        name: "FindPwdSteps",
        props: ['steping'],
    }
</script>

<style scoped>

</style>
