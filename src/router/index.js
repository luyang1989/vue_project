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
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/personlist.vue'),
                    meta: { title: '系统首页' }
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
                    path: '/persondetail',
                    component: () => import(/* webpackChunkName: "login" */ '../components/page/personadetail/index.vue'),
                    meta: { title: '个人信息' }
                },
            ],
            
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

