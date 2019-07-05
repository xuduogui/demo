import axios from 'axios'
const dataURLtoFile = (dataurl, filename = 'name.jpg') => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  // 转换成file对象
  return new File([u8arr], filename, { type: mime })
  // 转换成成blob对象
  // return new Blob([u8arr],{type:mime});
}

const b64ToFormData = (b64, name = 'name.jpg') => {
  const filemy = dataURLtoFile(b64, name)
  const formData = new FormData()
  formData.append('file', filemy)
  return formData
}

const up = async(url, b64, httpconfig = {}) => {
  const config = Object.assign(
    {
      baseURL: '/',
      timeout: 60 * 1000, // Timeout
      withCredentials: true, // Check cross-site Access-Control
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;'
      }
    },
    httpconfig.config
  )
  const noHandle = config => config
  const requestSuc = httpconfig.requestSuc ? httpconfig.requestSuc : noHandle
  const requestErr = httpconfig.requestErr ? httpconfig.requestErr : noHandle
  const responseSuc = httpconfig.responseSuc ? httpconfig.responseSuc : noHandle
  const responseErr = httpconfig.responseErr ? httpconfig.responseErr : noHandle

  const _axios = axios.create(config)

  _axios.interceptors.request.use(
    function(config) {
      config = requestSuc(config)
      return config
    },
    function(error) {
      requestErr(error)
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  _axios.interceptors.response.use(
    function(response) {
      response = responseSuc(response)
      return response
    },
    function(error) {
      responseErr(error)
      return Promise.reject(error)
    }
  )

  const formData = b64ToFormData(b64)

  return await _axios.post(url, formData)
}

export default {
  up,
  dataURLtoFile,
  b64ToFormData
}
