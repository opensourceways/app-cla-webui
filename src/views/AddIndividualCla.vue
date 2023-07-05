<template>
    <div id="addIndividualCla">
        <div class="pageTitle">{{$t('org.addIndividualCla')}}</div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'AddIndividualCla'
    };
</script>

<style scoped>
    .pageTitle {
        padding: 2rem 0;
        font-size: 1.3rem;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -webkit-touch-callout: none;
        user-select: none;
    }
</style>
