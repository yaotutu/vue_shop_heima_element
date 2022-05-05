import Vue from "vue";
import {
  Button,
  Select,
  Form,
  FormItem,
  Input,
  Message,
  Header,
  Container,
  Aside,
  Main,
  Submenu,
  Menu,
  MenuItem,
  MenuItemGroup,
  Col
} from "element-ui";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// 导入全局样式表
import "./assets/css/global.css";
// 导入阿里图标
import "./assets/fonts/iconfont.css";
// 配置axios
axios.defaults.baseURL = "https://lianghj.top:8888/api/private/v1/";
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log('config :>> ', config);
  return config
})
Vue.prototype.$http = axios;
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Header);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.use(MenuItemGroup);
Vue.use(Main);
Vue.use(Col);


// 全局挂载message组件,message与通知组件,需要全局挂载
Vue.prototype.$message = Message;

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
}).$mount("#app");
