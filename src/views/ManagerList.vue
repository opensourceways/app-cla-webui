<template>
  <el-row id="userList">
    <el-col>
      <p class="tabName">{{ $t('header.manager') }}</p>
      <el-row class="tableBox">
        <el-col>
          <el-row>
            <el-col align="left">
              <button class="create_button" @click="createManager">
                {{ $t('header.createManager') }}
              </button>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              :empty-text="$t('corp.no_data')"
              class="tableClass"
              @selection-change="handleSelectionChange"
              ref="multipleTable"
              :data="tableData"
            >
              <el-table-column prop="id" :label="$t('corp.id')">
              </el-table-column>
              <el-table-column prop="name" :label="$t('corp.name')">
              </el-table-column>
              <el-table-column prop="email" :label="$t('corp.email')">
              </el-table-column>
              <el-table-column prop="role" :label="$t('corp.role')">
              </el-table-column>
              <el-table-column
                :label="$t('corp.operation')"
                v-if="!multipleChoice"
                key="2"
                align="center"
                width="200"
              >
                <template slot-scope="scope">
                  <button class="deleteBt" @click="deleteUser(scope.row)">
                    {{ $t('corp.delete') }}
                  </button>
                </template>
              </el-table-column>
              <el-table-column
                key="3"
                v-if="multipleChoice"
                type="selection"
                align="center"
                width="200"
              >
              </el-table-column>
            </el-table>
          </el-row>
          <el-row style="margin-top: 20px" v-if="multipleChoice">
            <el-col align="left">
              <button class="deleteBt" @click="deleteUser()">
                {{ $t('corp.delete') }}
              </button>
              <button class="cancelBt" @click="cancel()">
                {{ $t('corp.cancel') }}
              </button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <corpReLoginDialog
        :message="corpReLoginMsg"
        :dialogVisible="corpReLoginDialogVisible"
      ></corpReLoginDialog>
      <reTryDialog
        :message="corpReLoginMsg"
        :dialogVisible="corpReTryDialogVisible"
      ></reTryDialog>
      <DeleteDialog
        :deleteMessage="deleteMessage"
        :deleteVisible="deleteUserVisible"
        @delete="submitDeleteManager"
        @cancel="cancelDeleteManager"
      ></DeleteDialog>
    </el-col>
  </el-row>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
const ids = ref([]);
const multipleChoice = ref(false);
const multipleSelection = ref([]);
const row = ref('');
const deleteUserVisible = ref(false);
const tableData = ref([]);
const submitDeleteManager = () => {
  deleteUserVisible.value = false;
//   deleteManager();
};
const cancelDeleteManager = () => {
  deleteUserVisible.value = false;
};
</script>
<style scoped lang="scss">
#userList {
  & .el-checkbox__inner {
    border: 1px solid #319e55;
  }

  & .el-checkbox__inner:hover {
    border: 1px solid #319e55;
  }

  & .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: linear-gradient(to right, #ff9d58, #e22424);
    border-color: transparent;
  }

  & .el-checkbox__input.is-focus .el-checkbox__inner {
    border: 1px solid #319e55;
  }

  & .el-table__body,
  .el-table__footer,
  .el-table__header {
    padding: 0;
    width: auto;
  }

  & .el-table__body-wrapper {
    margin: 0 1rem;
  }

  .el-table__body tr:not(:last-of-type) td {
    border-bottom: 1px dashed lightgrey;
  }

  .el-table::before {
    height: 0;
  }

  & .el-table__body-wrapper,
  .el-table__footer-wrapper,
  .el-table__header-wrapper {
    padding: 0;
    width: auto;
  }

  & .el-table__footer-wrapper,
  .el-table__header-wrapper {
    border-bottom: 1px solid black;
    border-radius: 1.5rem;
    padding: 0 1rem;
  }
}
</style>
