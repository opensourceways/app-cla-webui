<template>
  <div id="employeeList">
    <p id="tabName">{{ $t('signType.emp') }}</p>
    <el-tabs v-model="active">
      <el-tab-pane
        :label="$t('corp.inactive')"
        name="first"
        style="margin-top: 1rem"
      >
        <div style="margin-bottom: 1rem" class="tableStyle">
          <el-row :gutter="10">
            <el-col :offset="15" :span="6">
              <el-input
                clearable
                :placeholder="$t('corp.email_input_holder')"
                @input="searchEmail(inactiveSearchValue, inactiveOriginData)"
                v-model="inactiveSearchValue"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-button
                @click="searchEmail(inactiveSearchValue, inactiveOriginData)"
                class="searchButton"
              >
                {{ $t('corp.search') }}
              </el-button>
            </el-col>
          </el-row>
          <el-table
            :empty-text="$t('corp.no_data')"
            class="tableClass"
            :data="inactivePageData"
            align="center"
            style="width: 100%"
          >
            <el-table-column prop="name" :label="$t('corp.name')">
            </el-table-column>
            <el-table-column prop="email" :label="$t('corp.email')">
            </el-table-column>
            <el-table-column :label="$t('corp.operation')" align="center">
              <template slot-scope="scope">
                <el-row class="mySwitch">
                  <el-col :offset="4" :span="8">
                    <el-switch
                      @change="
                        changeActive(
                          scope.row.cla_org_id,
                          scope.row.email,
                          scope.row.enabled
                        )
                      "
                      v-model="scope.row.enabled"
                      class="mySwitch"
                      :disabled="scope.row.enabled"
                      width="3rem"
                      active-color="#409EFF"
                      :active-text="$t('corp.active')"
                      :inactive-text="$t('corp.inactive')"
                      inactive-color="#EBEEF5"
                    >
                    </el-switch>
                  </el-col>
                  <el-col :span="8">
                    <button
                      class="deleteBt"
                      @click="
                        deleteEmployee(
                          scope.row.cla_org_id,
                          scope.row.email,
                          scope.row.enabled
                        )
                      "
                    >
                      {{ $t('corp.delete') }}
                    </button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination-class"
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page="inactiveCurrentPage"
            :pager-count="pagerPage"
            @current-change="changeInActivePage"
            :hide-on-single-page="true"
            :total="inactiveTotal"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('corp.active')"
        name="second"
        style="margin-top: 1rem"
      >
        <div style="margin-bottom: 1rem" class="tableStyle">
          <el-row :gutter="10">
            <el-col :offset="15" :span="6">
              <el-input
                clearable
                :placeholder="$t('corp.email_input_holder')"
                @input="searchEmail(activeSearchValue, activeOriginData)"
                v-model="activeSearchValue"
              >
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
              </el-input>
            </el-col>
            <el-col :span="3">
              <el-button
                @click="searchEmail(activeSearchValue, activeOriginData)"
                class="searchButton"
              >
                {{ $t('corp.search') }}
              </el-button>
            </el-col>
          </el-row>
          <el-table
            :empty-text="$t('corp.no_data')"
            class="tableClass"
            :data="activePageData"
            align="center"
            style="width: 100%"
          >
            <el-table-column prop="name" :label="$t('corp.name')">
            </el-table-column>
            <el-table-column prop="email" :label="$t('corp.email')">
            </el-table-column>
            <el-table-column :label="$t('corp.operation')" align="center">
              <template slot-scope="scope">
                <el-row class="mySwitch">
                  <el-switch
                    @change="
                      changeActive(
                        scope.row.cla_org_id,
                        scope.row.email,
                        scope.row.enabled
                      )
                    "
                    v-model="scope.row.enabled"
                    class="mySwitch"
                    width="3rem"
                    active-color="#409EFF"
                    :active-text="$t('corp.active')"
                    :inactive-text="$t('corp.inactive')"
                    inactive-color="#EBEEF5"
                  >
                  </el-switch>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination-class"
            layout="prev, pager, next"
            :page-size="pageSize"
            :current-page="activeCurrentPage"
            :pager-count="pagerPage"
            :total="activeTotal"
            :hide-on-single-page="true"
            @current-change="changeActivePage"
          >
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      @delete="submitDeleteEmployee"
      @cancel="cancelDeleteEmployee"
    ></DeleteDialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
const inactiveSearchValue = ref('');
const activeSearchValue = ref('');
const inactivePageData = ref([]);
const activePageData = ref([]);
const pageSize = ref(5);
const pagerPage = ref(5);
const inactiveCurrentPage = ref(1);
const activeCurrentPage = ref(1);
const deleteUserVisible = ref(false);
const active = ref('first');
const activeOriginData = ref([]);
const inactiveData = ref([]);
const inactiveOriginData = ref([]);
const activeData = ref([]);
const deleteData = ref('');
const searchEmail = (searchValue, pageData) => {
  if (searchValue.trim() === '') {
    getEmployee();
  } else {
    let searchData = [];
    for (let i = 0; i < pageData.length; i++) {
      if (pageData[i].email.indexOf(searchValue.trim()) !== -1) {
        searchData.push(pageData[i]);
      }
    }
    if (active.value === 'first') {
      inactiveData.value = searchData;
      inactivePageData.value = getInactivePageData();
    } else if (active.value === 'second') {
      activeData.value = searchData;
      activePageData.value = getActivePageData();
    }
  }
};
const getInactivePageData = () => {
  let data = [];
  data = inactiveData.value.slice(
    (inactiveCurrentPage.value - 1) * pageSize.value,
    inactiveCurrentPage.value * pageSize.value
  );
  if (data.length === 0 && inactiveCurrentPage.value > 1) {
    inactiveCurrentPage.value--;
    return getInactivePageData();
  } else {
    return data;
  }
};

const getActivePageData = () => {
  let data = [];
  data = activeData.value.slice(
    (activeCurrentPage.value - 1) * pageSize.value,
    activeCurrentPage.value * pageSize.value
  );
  if (data.length === 0 && activeCurrentPage.value > 1) {
    activeCurrentPage.value--;
    return getActivePageData();
  } else {
    return data;
  }
};
const changeActivePage = (page) => {
  activeCurrentPage.value = page;
  activePageData.value = getActivePageData();
};
const changeInActivePage = (page) => {
  inactiveCurrentPage.value = page;
  inactivePageData.value = getInactivePageData();
};
const cancelDeleteEmployee = () => {
  deleteUserVisible.value = false;
};
const submitDeleteEmployee = () => {
  deleteUserVisible.value = false;
  let obj = { enabled: deleteData.value.enabled };
  http({
    url: `${url.enableEmployee}/${deleteData.value.cla_org_id}`,
    method: 'delete',
    // data: obj
  })
    .then((res) => {
      getEmployee();
      util.successMessage(this);
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const deleteEmployee = (cla_org_id, email, enabled) => {
  deleteData.value = {
    cla_org_id: cla_org_id,
    email: email,
    enabled: enabled,
  };
  deleteUserVisible.value = true;
};
const changeActive = (cla_org_id, email, enabled) => {
  let data = {
    enabled: enabled,
  };
  http({
    url: `${url.enableEmployee}/${cla_org_id}`,
    method: 'put',
    data: data,
  })
    .then((res) => {
      getEmployee();
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
const getEmployee = () => {
  http({
    url: url.queryEmployee,
  })
    .then((res) => {
      let inactiveArr = [],
        activeArr = [];
      let data = res.data.data;
      data.forEach((item, index) => {
        item.enabled === false ? inactiveArr.push(item) : activeArr.push(item);
      });
      inactiveData.value = inactiveArr;
      inactiveOriginData.value = inactiveArr;
      activeData.value = activeArr;
      activeOriginData.value = activeArr;
      inactivePageData.value = getInactivePageData();
      activePageData.value = getActivePageData();
    })
    .catch((err) => {
      util.catchErr(err, 'errorSet', this);
    });
};
</script>
<style scoped lang="scss">
#employeeList {
  & .el-dialog {
    border-radius: 1rem;
  }

  & #tabName {
    user-select: none;
    font-family: Roboto-Regular, sans-serif;
    font-size: 2rem;
    text-align: left;
  }

  .el-tabs__active-bar {
    background-color: #319e55;
  }

  .el-tabs__item.is-active {
    color: #319e55;
  }

  .el-tabs__item:hover {
    color: #319e55;
  }

  .el-tabs__item {
    font-size: 1.5rem;
  }

  & .tableStyle {
    margin-bottom: 2rem;
    padding: 3rem;
    background-color: white;
    border-radius: 1.5rem;
  }

  & .cancelBt {
    width: 5rem;
    height: 2rem;
    border-radius: 1rem;
    border: 1px solid black;
    color: black;
    font-size: 1rem;
    cursor: pointer;
    background-color: white;
    margin-left: 1rem;
  }

  & .cancelBt:focus {
    outline: none;
  }

  & .deleteBt {
    margin-left: 1rem;
    width: 5rem;
    height: 2rem;
    border-radius: 1rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(to right, #ff9d58, #e22424);
  }

  & .deleteBt:focus {
    outline: none;
  }

  .tableClass {
    border: 1px solid black;
    border-radius: 1.5rem;
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

  & .mySwitch .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }

  & .mySwitch .el-switch__label--right {
    z-index: 1;
    right: 2.5rem;
  }

  & .mySwitch .el-switch__label--left {
    z-index: 1;
    left: -0.4rem;
  }

  & .mySwitch .el-switch__label.is-active {
    display: block;
  }

  & .mySwitch .el-switch__label.el-switch__label--left.is-active span {
    color: #7b7b7b;
  }

  .el-switch.is-checked .el-switch__core {
    border-color: #319e55 !important;
    background-color: #319e55 !important;
  }

  & .mySwitch .el-switch.is-disabled .el-switch__core,
  .mySwitch .el-switch.is-disabled .el-switch__label {
    cursor: pointer;
  }

  .el-switch .el-switch__label,
  .mySwitch.el-switch .el-switch__core {
    width: 6rem !important;
    height: 2rem;
    border-radius: 1rem;
    line-height: 2rem;
    font-size: 1rem;
    text-align: right;
  }

  .el-switch__label * {
    font-size: 1rem;
  }

  .el-switch__core:after {
    height: 2rem;
    width: 2rem;
    top: -1px;
  }

  .el-switch {
    font-size: 1rem;
    line-height: 2rem;
    height: 2rem;
  }

  .el-switch.is-checked .el-switch__core:after {
    left: 100%;
    margin-left: -2rem;
  }

  .pagination-class {
    margin-top: 2rem;
  }

  .el-pager li.active {
    color: #319e55;
  }

  .el-pager li:hover {
    color: #319e55;
  }

  .el-pagination .btn-next:hover,
  .el-pagination .btn-prev:hover {
    color: #319e55;
  }

  .el-pagination button:disabled:hover {
    color: #c0c4cc;
  }

  .el-pagination button:disabled {
    cursor: auto;
  }

  .searchButton {
    width: 100%;
    border-radius: 1.25rem;
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(to right, #97db30, #319e55);
    margin-bottom: 1rem;
    user-select: none;
  }
}
</style>
