import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './Store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: a => a(App)
})
