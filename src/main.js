import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
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
  // 状态码0:成功
  if(res.status === 0){
    return res.data;
    // 未登录:状态码 10
  } else if(res.status == 10){
    window.location.href = '/#/login';
  } else{
    alert(res.msg);
  }
});

Vue.use(VueAxios,axios)
Vue.use(VueLazyload,{
  loading:'/imgs/loading-svg/loading-bars.svg'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
