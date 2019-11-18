import axios from 'axios'

axios.interceptors.request.use(
  config=>{
    let token = localStorage.getItem('token') ? localStorage.getItem('token'):null;
    if(token){
      config.headers.Authorization = token;
    }
    return config;
  },
  err=>{
    return Promise.reject(err);
  }
)
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
          switch (error.response.status) {
              case 401:
                  // 返回 401 清除token信息并跳转到登录页面
                  localStorage.removeItem('token');
                  this.$router.push('/login');
          }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  });
export default axios;
  