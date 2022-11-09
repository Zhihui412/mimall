import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 将axios挂载到vue实例上，方便调用
import VueAxios from 'vue-axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
import router from './router'
// import env from './env'

// mock开关
const mock  = false;
if (mock) {
  require('./mock/api')
}
// 根据前端的跨域方式做调整
// axios.defaults.baseURL = 'https://mock.mengxuegu.com/mock/6357dcfb8c51366598ff49b6/api';
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 使用jsonp或者js实现跨域，就用下面这种方法
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(function(response) {
  let res = response.data;
  let path = location.hash;
  // 状态码0:成功
  if(res.status === 0){
    return res.data;
    // 未登录:状态码 100
  } else if(res.status == 10){
    if(path !== '#/index'){
      window.location.href = '/#/login';
    }    
  } else{
    Message.warning(res.msg)
    return Promise.reject(res);
  }
},(error) =>{
  let res = error.response;
  Message.error(res.data.message)
  return Promise.reject(error);
}
);

Vue.use(VueAxios,axios);
Vue.use(VueCookie);
Vue.use(VueLazyload,{
  loading:'/imgs/loading-svg/loading-bars.svg'
});
Vue.prototype.$message = Message;
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
