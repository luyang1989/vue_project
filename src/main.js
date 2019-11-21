import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import store from './store'
import axios from './ajax.js'
Vue.prototype.$http = axios;


Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} |后台管理系统`;
    let token = localStorage.getItem('token');
      if (token === null || token === '') {// 判断是否登录
        next({
            // path: '/login',
          })
      } else {// 没登录则跳转到登录界面
        next()
      }
    
  })
new Vue({
    router,
store,

    i18n,
    render: h => h(App)
}).$mount('#app');
