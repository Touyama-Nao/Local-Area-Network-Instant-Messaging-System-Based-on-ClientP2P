// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io';
import socketio from 'socket.io-client';


Vue.config.productionTip = false
Vue.use(ElementUI);
//Vue.use(VueSocketio, socketio('http://localhost:8082'));        //IP填后台给的socket地址，端口号根据实际后台端口写--有bug

Vue.use(new VueSocketIO({                                 
      debug: true,
      connection: 'http://localhost:8082'                                 //我用的这种方式，可行
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
