<template>
    <div class="margin-top-5rem margin-bottom-3rem">
        <Step class="margin-top-5rem margin-bottom-2rem" :steping="1"></Step>
        <div class="findPwdBox">
            <p class="margin-bottom-2rem">{{$t('corp.resetSuccess')}}</p>
            <button class="reset_pwd_button" @click="toLogin">{{$t('corp.goToLogin')}}</button>
        </div>
    </div>
</template>

<script>
    import Step from '../components/FindPwdSteps'

    export default {
        name: "ResetPwdDone",
        components: {
            Step,
        },
        methods: {
            toLogin() {
                this.$router.push('/corporationManagerLogin')
            },
        },
    }
</script>

<style scoped>
</style>
