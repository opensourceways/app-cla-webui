import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: '/index',
    meta: {
      title: 'index',
      pageType: 'notLogin',
    },
  },
  {
    path: '/index',
    component: () => import('../views/Index.vue'),
    meta: {
      title: 'index',
      pageType: 'notLogin',
    },
    children: [
      {
        path: '/',
        name: 'PlatformSelect',
        component: () => import('../views/PlatformSelect.vue'),
        meta: {
          title: 'platform select',
          pageType: 'notLogin',
        },
      },
      {
        path: '/corporationManagerLogin',
        name: 'CorporationManagerLogin',
        component: () => import('../views/CorporationManagerLogin.vue'),
        meta: {
          title: 'corporation manager login',
          pageType: 'notLogin',
        },
      },
      {
        path: '/orgSelect',
        name: 'OrgSelect',
        meta: {
          title: 'org select',
          pageType: 'notLogin',
        },
        component: () => import('../views/OrgSelect.vue'),
      },
    ],
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'home',
      pageType: 'org',
    },
    children: [
      {
        path: '/',
        meta: {
          title: 'linked repo',
          pageType: 'org',
        },
        redirect: '/linkedRepo',
      },
      {
        path: '/linkedRepo',
        name: 'LinkedRepo',
        meta: {
          title: 'linked repo',
          pageType: 'org',
        },
        component: () => import('../views/LinkedRepo.vue'),
      },
      {
        path: '/corporationList',
        name: 'CorporationList',
        meta: {
          title: 'corporation list',
          pageType: 'org',
        },
        component: () => import('../views/CorporationList.vue'),
      },
      {
        path: '/bind-cla',
        component: () => import('../views/ConfigCla.vue'),
        meta: {
          title: 'bind cla',
          pageType: 'org',
        },
        children: [
          {
            path: '/',
            redirect: '/config-org',
            meta: {
              title: 'config org',
              pageType: 'org',
            },
          },
          {
            path: '/config-org',
            name: 'ConfigOrg',
            meta: {
              title: 'config org',
              pageType: 'org',
            },
            component: () => import('../views/ConfigOrg.vue'),
          },
          {
            path: '/config-cla-link',
            name: 'ConfigClaLink',
            meta: {
              title: 'config cla link',
              pageType: 'org',
            },
            component: () => import('../views/ConfigClaLink.vue'),
          },
          {
            path: '/config-fields',
            name: 'ConfigFields',
            meta: {
              title: 'config fields',
              pageType: 'org',
            },
            component: () => import('../views/ConfigFields.vue'),
          },
          {
            path: '/config-email',
            name: 'ConfigEmail',
            meta: {
              title: 'config email',
              pageType: 'org',
            },
            component: () => import('../views/ConfigEmail.vue'),
          },
          {
            path: '/config-check',
            name: 'ConfigCheck',
            meta: {
              title: 'config check',
              pageType: 'org',
            },
            component: () => import('../views/ConfigCheck.vue'),
          },
        ],
      },
      {
        path: '/addIndividualCla',
        component: () => import('../views/AddIndividualCla.vue'),
        children: [
          {
            path: '/',
            redirect: '/addIndividualUrl',
          },
          {
            path: '/addIndividualUrl',
            name: 'AddIndividualUrl',
            meta: {
              title: 'addIndividual cla',
              pageType: 'org',
            },
            component: () => import('../views/AddIndividualUrl.vue'),
          },
        ],
      },
      {
        path: '/addCorpCla',
        component: () => import('../views/AddCorpCla.vue'),
        children: [
          {
            path: '/',
            redirect: '/addCorpUrl',
          },
          {
            path: '/addCorpUrl',
            name: 'AddCorpUrl',
            meta: {
              title: 'add corp cla',
              pageType: 'org',
            },
            component: () => import('../views/AddCorpUrl.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/signedRepo',
    component: () => import('../views/SignedRepo.vue'),
    children: [
      {
        path: '/',
        redirect: '/employeeList',
      },
      {
        path: '/employeeList',
        name: 'EmployeeList',
        meta: {
          title: 'employee list',
          pageType: 'corp',
        },
        component: () => import('../views/EmployeeList.vue'),
      },
    ],
  },
  {
    path: '/rootManager',
    component: () => import('../views/RootManager.vue'),
    children: [
      {
        path: '/',
        redirect: '/managerList',
      },
      {
        path: '/managerList',
        name: 'ManagerList',
        meta: {
          title: 'manager list',
          pageType: 'corp',
        },
        component: () => import('../views/ManagerList.vue'),
      },
      {
        path: '/subemail',
        name: 'Subemail',
        meta: {
          title: 'subemail',
          pageType: 'corp',
        },
        component: () => import('../views/Subemail.vue'),
      },
      {
        path: '/add-subemail',
        name: 'AddSubemail',
        meta: {
          title: 'add-subemail',
          pageType: 'corp',
        },
        component: () => import('../views/AddSubemail.vue'),
      },
      {
        path: '/createManager',
        name: 'CreateManager',
        meta: {
          title: 'create manager',
          pageType: 'corp',
        },
        component: () => import('../views/CreateManager.vue'),
      },
      {
        path: '/resetPassword',
        name: 'resetPassword',
        meta: {
          title: 'reset password',
          pageType: 'corp',
        },
        component: () => import('../views/ResetPassword.vue'),
      },
    ],
  },
  {
    path: '/sign',
    name: 'SignTypeLookeng',
    meta: {
      title: 'sign',
      pageType: 'notLogin',
    },
    component: () => import('../views/SignType.vue'),
  },
  {
    path: '/sign/:params',
    name: 'SignType',
    meta: {
      title: 'sign',
      pageType: 'notLogin',
    },
    component: () => import('../views/SignType.vue'),
  },
  {
    path: '/sign/:params/:orgAddress',
    name: 'SignType_back',
    meta: {
      title: 'sign',
      pageType: 'notLogin',
    },
    component: () => import('../views/SignType.vue'),
  },

  {
    path: '/sign-page',
    meta: {
      title: 'sign-page',
      pageType: 'notLogin',
    },
    component: () => import('../views/SignPage.vue'),
    children: [
      {
        path: '/',
        redirect: '/sign-cla',
      },
      {
        path: '/sign-cla',
        name: 'SignCla',
        meta: {
          title: 'sign-cla',
          pageType: 'notLogin',
        },
        component: () => import('../views/SignCla.vue'),
      },
      {
        path: '/privacy',
        name: 'Privacy',
        meta: {
          title: 'privacy',
          pageType: 'notLogin',
        },
        component: () => import('../views/Privacy.vue'),
      },
    ],
  },
  {
    path: '/password/:link_id',
    meta: {
      title: 'password',
      pageType: 'notLogin',
    },
    component: () => import('../views/ForgetPassword.vue'),
    children: [
      {
        path: '/',
        redirect: '/retrieve-password/:link_id',
      },
      {
        path: '/retrieve-password/:link_id',
        name: 'ForgetAndResetPwd',
        meta: {
          title: 'retrieve password',
          pageType: 'notLogin',
        },
        component: () => import('../views/ForgetAndSendEmail.vue'),
      },
      {
        path: '/reset-password',
        name: 'FindResetPassword',
        meta: {
          title: 'reset password',
          pageType: 'notLogin',
        },
        component: () => import('../views/FindResetPassword.vue'),
      },
    ],
  },
  {
    path: '/cla-pdf',
    name: 'ClaPdf',
    meta: {
      title: 'cla-pdf',
      pageType: 'notLogin',
    },
    component: () => import('../views/ClaPdf.vue'),
  },
  {
    path: '*',
    name: 'ErrorPath',
    meta: {
      title: 'ErrorPath',
      pageType: 'notLogin',
    },
    component: () => import('../views/ErrorPath.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (from.path === '/resetPassword') {
    if (to.path === '/corporationManagerLogin') {
      next();
    } else {
      if (sessionStorage.getItem('pwdIsChanged') === 'true') {
        next();
      }
    }
  } else {
    next();
  }
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});
export default router;
