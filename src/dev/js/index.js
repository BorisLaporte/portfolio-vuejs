import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import store from './Store'

import 'SASS/main.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: a => a(App)
})
