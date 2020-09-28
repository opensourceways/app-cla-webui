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
                path: '/sign/:platform/:org_id/:repo_id',
                component: () => import('../views/SignType.vue')
            },
            {
                path: '/sign/:platform/:org_id',
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
                name: 'LinkedRepo',
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
            {
                path: '/signedRepoLogin',
                name: 'SignedRepoLogin',
                component: () => import('../views/SignedRepoLogin.vue')
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
                name: 'EmployeeList',
                redirect: '/employeeList',
            },
            {
                path: '/employeeList',
                name: 'EmployeeList',
                component: () => import('../views/EmployeeList.vue'),
            },
            {
                path: '/signedRepo/resetPassword',
                name: 'ResetPassword',
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
                name: 'UserList',
                redirect: '/userList',
            },
            {
                path: '/userList',
                name: 'UserList',
                component: () => import('../views/UserList.vue'),
            },
            {
                path: '/createUser',
                name: 'CreateUser',
                component: () => import('../views/CreateUser.vue'),
            },
            {
                path: '/rootManager/resetPassword',
                name: 'ResetPassword',
                component: () => import('../views/ResetPassword.vue'),
            },]
    },
    {
        path: '/createCLA',
        name: 'CreateCLA',
        component: () => import('../views/CreateCLA.vue')
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
})
export default router
