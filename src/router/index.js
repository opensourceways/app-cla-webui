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
                path: '/sign/:params',
                component: () => import('../views/SignType.vue')
            },
            {
                path: '/sign/:params/:orgAddress',
                component: () => import('../views/SignType.vue')
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
        name: 'Home',
        component: () => import('../views/Home.vue'),
        children: [
            {
                path: '/',
                component: () => import('../views/LinkedRepo.vue')
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
        ]
    },
    {
        path: '/signedRepo',
        name: 'SignedRepo',
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
            },
            {
                path: '/signedRepo/resetPassword',
                name: 'signedRepoResetPassword',
                component: () => import('../views/ResetPassword.vue'),
            },]
    },
    {
        path: '/rootManager',
        name: 'RootManager',
        component: () => import('../views/RootManager.vue'),
        children: [
            {
                path: '/',
                redirect: '/managerList',
            },
            {
                path: '/managerList',
                name: 'ManagerList',
                component: () => import('../views/UserList.vue'),
            },
            {
                path: '/createManager',
                name: 'CreateManager',
                component: () => import('../views/CreateUser.vue'),
            },
            {
                path: '/rootManager/resetPassword',
                name: 'rootManagerResetPassword',
                component: () => import('../views/ResetPassword.vue'),
            },]
    },
    {
        path: '/createCLA',
        name: 'CreateCLA',
        component: () => import('../views/CreateCLA.vue')
    },
    {
        path: '/bind-cla',
        name: 'ConfigCla',
        component: () => import('../views/ConfigCla.vue')
    },
    {
        path: '/privacy',
        name: 'Privacy',
        component: () => import('../views/Privacy.vue')
    },
    {
        path: '/createMetadata',
        name: 'CreateMetadata',
        component: () => import('../views/CreateMetadata.vue')
    },
    {
        path: '/sign-cla',
        name: 'SignCla',
        component: () => import('../views/SignCla.vue')
    },
    {
        path: '/verifyPage',
        name: 'VerifyPage',
        component: () => import('../views/VerifyPage.vue')
    },
    {
        path: '/findPwd',
        name: 'FindPwd',
        component: () => import('../views/FindPwd.vue')
    },
    {
        path: '/emailVerify',
        name: 'EmailVerify',
        component: () => import('../views/EmailVerify.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (from.path === '/signedRepo/resetPassword' || from.path === '/rootManager/resetPassword') {
        if (to.path === '/corporationManagerLogin') {
            next()
        } else {
            if (sessionStorage.getItem('pwdIsChanged')==='true') {
                next()
            } else {
                // next(from.path)
            }
        }
    } else {
        next()
    }
})
export default router
