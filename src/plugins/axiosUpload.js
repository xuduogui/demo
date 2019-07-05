'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || '',
  baseURL: '/plat',
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;'
  }
}

const _axios = axios.create(config)

Plugin.install = function(Vue, options) {
  Object.defineProperties(Vue.prototype, {
    $axup: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
