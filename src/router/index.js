import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        redirect: '/index',
    },

    {
        path: '/index',
        component: () => import('../views/Index.vue'),
        children: [
            {
                path: '/',
                name: 'LoginTypeSelect',
                component: () => import('../views/LoginTypeSelect.vue')
            },

            {
                path: '/platformSelect',
                name: 'PlatformSelect',
                component: () => import('../views/PlatformSelect.vue')
            },
            {
                path: '/corporationManagerLogin',
                name: 'CorporationManagerLogin',
                component: () => import('../views/CorporationManagerLogin.vue')
            },
            {
                path: '/orgSelect',
                name: 'OrgSelect',
                component: () => import('../views/OrgSelect.vue')
            },
        ]
    },
    {
        path: '/home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/',
                redirect: '/linkedRepo'
            },
            {
                path: '/linkedRepo',
                name: 'LinkedRepo',
                component: () => import('../views/LinkedRepo.vue')
            },
            {
                path: '/corporationList',
                name: 'CorporationList',
                component: () => import('../views/CorporationList.vue')
            },
            {
                path: '/bind-cla',
                component: () => import('../views/ConfigCla.vue'),
                children: [
                    {
                        path: '/',
                        redirect:'/config-org',
                    },
                    {
                        path: '/config-org',
                        name: 'ConfigOrg',
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
                component: () => import('../views/ManagerList.vue'),
            },
            {
                path: '/createManager',
                name: 'CreateManager',
                component: () => import('../views/CreateManager.vue'),
            },
            {
                path: '/resetPassword',
                name: 'resetPassword',
                component: () => import('../views/ResetPassword.vue'),
            },]
    },
    {
        path: '/sign/:params',
        name: 'SignType',
        component: () => import('../views/SignType.vue')
    },
    {
        path: '/sign/:params/:orgAddress',
        name: 'SignType_back',
        component: () => import('../views/SignType.vue')
    },


    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('../views/Privacy.vue')
    },

    {
        path: '/sign-cla',
        name: 'SignCla',
        component: () => import('../views/SignCla.vue')
    },
    {
        path: '/findPwd',
        name: 'FindPwd',
        component: () => import('../views/FindPwd.vue')
    },
    {
        path: '*',
        name: 'ErrorPath',
        component: () => import('../views/ErrorPath.vue')
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    window.scrollTo(0, 0);
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
    if (to.name === 'SignType' || to.name === 'SignType_back' || to.path === '/sign-cla' || to.path === '/index' || to.path === '/platformSelect' || to.path === '/corporationManagerLogin' || to.path === '/orgSelect') {
        sessionStorage.setItem('showHeaderMenu', 'false')
    } else if (to.path === '/home' || to.path === '/linkedRepo' || to.path === '/corporationList' || to.path === '/bind-cla') {
        sessionStorage.setItem('showHeaderMenu', 'org')
    } else {
        sessionStorage.setItem('showHeaderMenu', 'corp')
    }
})
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
