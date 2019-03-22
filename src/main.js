import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GAuth from 'vue-google-oauth2'
import VueSocketIO from 'vue-socket.io'
require('../public/style.css');


// Vue.forceUpdate();

Vue.use(new VueSocketIO({
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
}))


const gauthOption = {
  clientId: '820849539889-rapgnef57mlp2cvormn9j6pkknbo55bm.apps.googleusercontent.com',
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
