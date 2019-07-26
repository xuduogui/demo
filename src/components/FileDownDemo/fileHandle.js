const downFile = (preUrl, fileName = 'file.xls', tokenArr = []) => {
  // # 创建对象
  const xhr = new XMLHttpRequest()
  // # 创建一个 GET 请求，异步
  xhr.open('GET', preUrl)
  // # 设置返回数据的类型为arraybuffer
  xhr.responseType = 'arraybuffer'
  // # 设置请求头值
  // xhr.setRequestHeader(KEYS.JWTToken, getStorageItem(KEYS.JWTToken))
  tokenArr.forEach(tokenObj => {
    xhr.setRequestHeader(tokenObj.key, tokenObj.val)
  })
  // # 接收到完整的响应数据时触发回调处理函数
  xhr.onload = function() {
    if (this.status === 200) {
      // # 获取请求头Content-Type的值，用来判断是否是文件流下载
      const type = xhr.getResponseHeader('Content-Type')
      // # application/json;charset=UTF-8：就是指“无类型”，一般的字节流用于数据传输，非文件下载
      // if (type === 'application/json;charset=UTF-8') {
      //   // # this.response为arraybuffer对象，转为uint8数组
      //   const uint8 = new Uint8Array(this.response)
      //   // # 解决使用fromCharCode后中文乱码的问题
      //   const resToString = decodeURIComponent(
      //     escape(String.fromCharCode(...uint8))
      //   )
      //   const message = JSON.parse(resToString).message
      //   console.log(message)
      //   return
      // }
      // # Blob()的第一个参数必须为数组，即使只有一个字符串也必须用数组装起来
      const blob = new Blob([this.response], { type: type })
      // const blob = new Blob([this.response], {
      //   type: 'application/x-www-form-urlencoded'
      // })
      // # window.navigator.msSaveBlob：以本地方式保存文件
      if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, fileName)
      } else {
        // # 创建新的URL表示指定的File对象或者Blob对象
        const URL = window.URL || window.webkitURL
        const objectUrl = URL.createObjectURL(blob)
        if (fileName) {
          // # 创建a标签用于跳转至下载链接
          const a = document.createElement('a')
          // # download：指示浏览器下载URL而不是导航到它，也可设置下载文件的名称
          if (typeof a.download === 'undefined') {
            // # window.location：获得当前页面的地址 (URL)，并把浏览器重定向到新的页面
            window.location = objectUrl
          } else {
            // # href属性指定下载链接
            a.href = objectUrl
            // # dowload属性指定文件名
            a.download = fileName
            // # 将a标签插入body中
            document.body.appendChild(a)
            // # click()事件触发下载
            a.click()
            // # 去除a标签，以免影响其他操作
            a.remove()
          }
        } else {
          window.location = objectUrl
        }
        // # 将URL释放
        URL.revokeObjectURL(objectUrl)
      }
    }
  }
  xhr.send()
}

export default downFile
