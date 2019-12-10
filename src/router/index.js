import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/personlist'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '' },
            children: [
                {
                    path: '/personlist',
                    name:"personlist",
                    component: () => import(/* webpackChunkName: "person" */ '../components/page/person/personlist.vue'),
                    meta: { title: '员工管理' },
                    children:[]
                },
                {
                    path: '/tenant',
                    name:"tenant",
                    component: () => import(/* webpackChunkName: "tenant" */ '../components/page/Tenant.vue'),
                    meta: { title: '租户管理' }
                },
                {
                    path: '/position',
                    name:"position",
                    component: () => import(/* webpackChunkName: "tenant" */ '../components/page/Position.vue'),
                    meta: { title: '职级管理' }
                },
                {
                    path: '/userinfo',
                    name:"userinfo",
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/user/userinfo.vue'),
                    meta: { title: '个人信息' }
                },
                {
                    path: '/persondetailInfo',
                    name:'persondetail',
                    component: () => import(/* webpackChunkName: "persondetail" */ '../components/page/person/persondetail.vue'),
                    meta: { title: '员工详情' }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/entryMaterials',
                    name:"entryMaterials",
                    
                    component: () => import(/* webpackChunkName: "tenant" */ '../components/page/entry/entryMaterials.vue'),
                    meta: { title: '入离职材料' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
