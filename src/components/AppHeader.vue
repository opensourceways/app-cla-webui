<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import OIcon from "@/components/OIcon.vue";

import logo from "@/assets/common/logo.svg";
import defaultUser from "@/assets/common/default-user.svg";
import IconChevronDown from "~icons/app/icon-chevron-down.svg";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const langList = [
  { value: 0, label: "English" },
  { value: 1, label: "中文" },
];
const currentLang = ref();
const handleCommand = (command: string | number | object) => {
  currentLang.value = command;
};

const showHeaderMenu = ref(true);
const loginRole = ref("corp");
const role = ref("admin");

const toIndex = () => {
  if (
    route.path === "/corporationManagerLogin" ||
    route.path === " /platformSelect"
  ) {
    router.push("/");
  } else if (
    route.path === "/corporationList" ||
    route.path === "/addCorpUrl" ||
    route.path === "/config-check" ||
    route.path === "/addIndividualUrl" ||
    route.path === "/config-org" ||
    route.path === "/config-email" ||
    route.path === "/config-cla-link" ||
    route.path === "/config-fields"
  ) {
    router.push("/linkedRepo");
  } else if (route.path === "/createManager") {
    router.push("/managerList");
  } else if (route.path === "/resetPassword") {
    // if (this.$store.state.loginInfo.userInfo[0].role === 'manager') {
    //     router.push('/employeeList')
    // } else {
    //     router.push('/managerList')
    // }
  }
};

const loginOut = () => {
  if (loginRole.value === "corp") {
    router.push("/corporationManagerLogin");
  } else {
    router.push("/");
  }
};
const toHome = () => {
  if (route.path !== "/linkedRepo") {
    router.push("/home");
  }
};
const toManager = () => {
  if (route.path !== "/managerList") {
    router.push("/managerList");
  }
};
const toEmployee = () => {
  if (route.path !== "/employeeList") {
    router.push("/employeeList");
  }
};
const toCreateManager = () => {
  if (route.path !== "/createManager") {
    router.push("/createManager");
  }
};
const toResetPwd = () => {
  if (route.path !== "/resetPassword") {
    router.push("/resetPassword");
  }
};
const toCLA = () => {};

onMounted(() => {
  currentLang.value = langList[0].label;
});
</script>

<template>
  <div class="app-header">
    <div class="wrap">
      <div @click="toIndex" class="logo">
        <img :src="logo" alt="logo" />
      </div>
      <div class="option">
        <div v-if="showHeaderMenu" class="menu-box">
          <el-dropdown trigger="click" @command="handleCommand" class="lang">
            <span class="">
              <img :src="defaultUser" class="user-img" alt="" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="loginRole === 'org'" @click="toHome">
                  {{ t("header.home") }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="loginRole === 'corp' && role === 'admin'"
                  @click="toManager"
                >
                  {{ t("header.manager") }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="loginRole === 'corp' && role === 'manager'"
                  @click="toEmployee"
                >
                  {{ t("header.emp") }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="loginRole === 'corp' && role === 'admin'"
                  @click="toCreateManager"
                >
                  {{ t("header.createManager") }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="loginRole === 'corp'"
                  @click="toResetPwd"
                >
                  {{ t("header.resetPwd") }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="loginRole === 'corp' && role === 'admin'"
                  @click="toCLA"
                >
                  {{ t("header.corpCla") }}
                </el-dropdown-item>
                <el-dropdown-item @click="loginOut">
                  {{ t("header.loginOut") }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <el-dropdown trigger="click" @command="handleCommand" class="lang">
          <span class="el-dropdown-link">
            {{ currentLang }}
            <OIcon class="icon">
              <IconChevronDown />
            </OIcon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in langList"
                :key="item.value"
                :command="item.label"
                >{{ item.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-header {
  border-bottom: 2px solid var(--o-color-border2);

  .wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 88px;
    max-width: var(--content-max-width);
    padding: 0 var(--content-padding);
    margin: 0 auto;

    .option {
      display: flex;
      justify-content: space-between;

      .user-img {
        width: 40px;
        border-radius: 50%;
        cursor: pointer;
      }

      .menu-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        position: relative;
      }
    }

    .lang {
      margin-left: 16px;
    }
  }

  .el-dropdown-link {
    min-width: 120px;
    height: 40px;
    border: 1px solid var(--o-color-border2);
    border-radius: 40px;
    z-index: 2;
    cursor: pointer;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      margin-left: 5px;
    }
  }
}
</style>
