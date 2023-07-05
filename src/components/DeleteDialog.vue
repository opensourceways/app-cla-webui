<template>
    <div>
        <el-dialog
                width="20%"
                title=""
                align="center"
                :show-close="false"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                :visible.sync="deleteVisible">
            <el-row align="center">
                {{deleteMessage}}
            </el-row>
            <el-row align="center" class="margin-top-1rem">
                <button class="deleteBt" @click="submit">{{$t('corp.yes')}}</button>
                <button class="cancelBt" @click="cancel">{{$t('corp.no')}}</button>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'DeleteDialog',
        props: ['deleteVisible', 'deleteMessage'],
        methods: {
            submit() {
                this.$emit('delete');
            },
            cancel() {
                this.$emit('cancel');
            }
        }
    };
</script>

<style scoped>

</style>
