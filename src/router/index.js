import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: '/index',
        meta: {
            title: 'index',
        },
    },

    {
        path: '/index',
        component: () => import('../views/Index.vue'),
        meta: {
            title: 'index',
        },
        children: [
            {
                path: '/',
                name: 'LoginTypeSelect',
                meta: {
                    title: 'index',
                },
                component: () => import('../views/LoginTypeSelect.vue')
            },

            {
                path: '/platformSelect',
                name: 'PlatformSelect',
                component: () => import('../views/PlatformSelect.vue'),
                meta: {
                    title: 'platformSelect',
                },
            },
            {
                path: '/corporationManagerLogin',
                name: 'CorporationManagerLogin',
                component: () => import('../views/CorporationManagerLogin.vue'),
                meta: {
                    title: 'corporationManagerLogin',
                },
            },
            {
                path: '/orgSelect',
                name: 'OrgSelect',
                meta: {
                    title: 'orgSelect',
                },
                component: () => import('../views/OrgSelect.vue')
            },
        ]
    },
    {
        path: '/home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'home',
        },
        children: [
            {
                path: '/',
                meta: {
                    title: 'linkedRepo',
                },
                redirect: '/linkedRepo'
            },
            {
                path: '/linkedRepo',
                name: 'LinkedRepo',
                meta: {
                    title: 'linkedRepo',
                },
                component: () => import('../views/LinkedRepo.vue')
            },
            {
                path: '/corporationList',
                name: 'CorporationList',
                meta: {
                    title: 'corporationList',
                },
                component: () => import('../views/CorporationList.vue')
            },
            {
                path: '/bind-cla',
                component: () => import('../views/ConfigCla.vue'),
                meta: {
                    title: 'bind-cla',
                },
                children: [
                    {
                        path: '/',
                        redirect: '/config-org',
                        meta: {
                            title: 'bind-cla',
                        },
                    },
                    {
                        path: '/config-org',
                        name: 'ConfigOrg',
                        meta: {
                            title: 'bind-cla',
                        },
                        component: () => import('../views/ConfigOrg.vue')
                    },
                    {
                        path: '/config-cla-link',
                        name: 'ConfigClaLink',
                        component: () => import('../views/ConfigClaLink.vue')
                    },
                    {
                        path: '/config-fields',
                        name: 'ConfigFields',
                        component: () => import('../views/ConfigFields.vue')
                    },
                    {
                        path: '/config-email',
                        name: 'ConfigEmail',
                        component: () => import('../views/ConfigEmail.vue')
                    },
                    {
                        path: '/config-check',
                        name: 'ConfigCheck',
                        component: () => import('../views/ConfigCheck.vue')
                    },]
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
                            title: 'addIndividualCla',
                        },
                        component: () => import('../views/AddIndividualUrl.vue')
                    },
                ]
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
                            title: 'addCorpCla',
                        },
                        component: () => import('../views/AddCorpUrl.vue')
                    },
                ]
            }
        ]
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
                    title: 'employeeList',
                },
                component: () => import('../views/EmployeeList.vue'),
            },]
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
                    title: 'managerList',
                },
                component: () => import('../views/ManagerList.vue'),
            },
            {
                path: '/subemail',
                name: 'Subemail',
                meta: {
                    title: 'subemail',
                },
                component: () => import('../views/Subemail.vue'),
            },
            {
                path: '/add-subemail',
                name: 'AddSubemail',
                meta: {
                    title: 'add-subemail',
                },
                component: () => import('../views/AddSubemail.vue'),
            },
            {
                path: '/createManager',
                name: 'CreateManager',
                meta: {
                    title: 'createManager',
                },
                component: () => import('../views/CreateManager.vue'),
            },
            {
                path: '/resetPassword',
                name: 'resetPassword',
                meta: {
                    title: 'resetPassword',
                },
                component: () => import('../views/ResetPassword.vue'),
            },]
    },
    {
        path: '/sign/:params',
        name: 'SignType',
        meta: {
            title: 'sign',
        },
        component: () => import('../views/SignType.vue')
    },
    {
        path: '/sign/:params/:orgAddress',
        name: 'SignType_back',
        meta: {
            title: 'sign',
        },
        component: () => import('../views/SignType.vue')
    },

    {
        path: '/sign-page',
        name: 'SignPage',
        meta: {
            title: 'sign-page',
        },
        component: () => import('../views/SignPage.vue'),
        children: [
            {
                path: '/',
                redirect: '/sign-cla'
            },
            {
                path: '/sign-cla',
                name: 'SignCla',
                meta: {
                    title: 'sign-cla',
                },
                component: () => import('../views/SignCla.vue'),
            },
            {
                path: '/privacy',
                name: 'Privacy',
                meta: {
                    title: 'privacy',
                },
                component: () => import('../views/Privacy.vue')
            },]
    },
    {
        path: '/password',
        meta: {
            title: 'password',
        },
        component: () => import('../views/ForgetPassword.vue'),
        children: [
            {
                path: '/',
                redirect: '/find-password'
            },
            {
                path: '/find-password',
                name: 'ForgetAndResetPwd',
                meta: {
                    title: 'find password',
                },
                component: () => import('../views/ForgetAndResetPwd.vue'),
            },
            {
                path: '/reset-done',
                name: 'ResetDone',
                meta: {
                    title: 'reset done',
                },
                component: () => import('../views/ResetPwdDone.vue'),
            }],
    },
    {
        path: '/cla-pdf',
        name: 'ClaPdf',
        meta: {
            title: 'cla-pdf',
        },
        component: () => import('../views/ClaPdf.vue')
    },
    {
        path: '*',
        name: 'ErrorPath',
        meta: {
            title: 'ErrorPath',
        },
        component: () => import('../views/ErrorPath.vue')
    },

];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (from.path === '/resetPassword') {
        if (to.path === '/corporationManagerLogin') {
            next()
        } else {
            if (sessionStorage.getItem('pwdIsChanged') === 'true') {
                next()
            } else {
            }
        }
    } else {
        next()
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
export default router
