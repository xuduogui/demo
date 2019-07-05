import Vue from 'vue'

// log
import _log from './log'

Plugin.install = function(Vue, options) {
  // log
  Vue.$log = _log
  window.$log = _log

  Object.defineProperties(Vue.prototype, {
    $log: {
      get() {
        return _log
      }
    }
  })
}

Vue.use(Plugin)
