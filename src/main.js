import Vue from 'vue'
import App from './App.vue'
import store from './store/store.js'
require('dotenv').config()

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
