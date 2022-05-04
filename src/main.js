import Vue from 'vue';
import { Button, Select } from 'element-ui';
import App from './App.vue';
import router from './router'

Vue.use(Button)
 

new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount('#app')