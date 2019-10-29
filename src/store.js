import Vue from 'vue'
import Vuex from 'vuex'

import pixi from './components/PixiDemo/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  modules: {
    pixi
  },
  actions: {}
})
