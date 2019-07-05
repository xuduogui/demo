'use strict'

import Vue from 'vue'
import axios from 'axios'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

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

_axios.interceptors.request.use(
  function(config) {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnR1dWlkIjoiNDRjOGI3YzZiOWQ0NGZjODhjNjg2Zjg0NGNhZTFhNzUiLCJlbnZpcm9ubWVudCI6IjEiLCJlbnRuYW1lIjoieHh45rWL6K+V5LyB5Lia5Li75L2TIiwiY3VycmVudFRpbWVNaWxsaXMiOiIxNTYyMjAzMjE5NjYyIiwicm9sZXMiOiIyIiwiZXhwIjoxNTYyODA4MDE5LCJ1c2VySWQiOiI4OGQxMmIyNGJlZTg0YWE3YjQ0MjM2ZmExODdjODY4ZiIsInVzZXJuYW1lIjoidXNlciJ9.3qxbWtzaFPC-xCQmR4xcireL57TLfonNSpuHgftFk84'
    config.headers.common['Authorization'] = token
    // Do something before request is sent
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function(Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
