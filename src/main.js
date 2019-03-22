import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GAuth from 'vue-google-oauth2'
import VueSocketIO from 'vue-socket.io'
require('../public/style.css');


// Vue.forceUpdate();

Vue.use(new VueSocketIO({
  connection: 'http://localhost:3000' || process.env.VUE_APP_ROOT_API,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))


const gauthOption = {
  clientId: '201646696161-b8gb265qrhombmq4b2km112n97ic8gn8.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
