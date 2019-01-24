import Vue from 'vue'
import App from './App.vue'
import router from './plugins/vueRouter/vueRouter.js'
import './plugins/element/element.js'
import './plugins/vueRx/vue-rx.js'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
