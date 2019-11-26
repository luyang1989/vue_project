
import Vue from 'vue';
import Vuex from 'vuex';
// import img from '../assets/img/person_picture.png'
Vue.use(Vuex);
 const state={   //要设置的全局访问的state对象
    avator: "",
    // http://10.0.41.102:9870/group1/M00/00/00/CgApZl3ThoOAJKh2AABz0IcK79w278.png
    
     //要设置的初始属性值
   };


 const store = new Vuex.Store({
       state
});
export default store;