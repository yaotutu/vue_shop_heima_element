import Vue from 'vue';
import { Button, Select,Form, FormItem, Input  } from 'element-ui';
import App from './App.vue';
import router from './router'


// 导入全局样式表
import './assets/css/global.css'
// 导入阿里图标
import './assets/fonts/iconfont.css'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)




 

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')