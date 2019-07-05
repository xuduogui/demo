import Vue from 'vue'
import './plugins/axios'
import './plugins/axiosUpload'
import App from './App.vue'
import router from './plugins/vueRouter/vueRouter.js'
import './plugins/element/element.js'
import './plugins/vueRx/vue-rx.js'

// 插件
import './plugins/utils/index'

Vue.config.productionTip = false

// eslint-disable-next-line no-unused-vars
const _ = require('lodash')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
