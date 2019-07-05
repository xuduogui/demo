<template>
  <div>
    <!-- <img
      src="../../assets/logo.png"
      id="imgZip"
      alt=""
      width="100"
      height="100"
    > -->
    <img
      v-for="item in imgUrl"
      :key="item"
      :src="item"
      alt=""
    >
    <input
      type="file"
      name=""
      :value="uploadFile"
      id="ImgZipupload"
    >

  </div>
</template>

<script>
import img from '../../assets/phone.jpg'
import upload from './uploadImg'

export default {
  name: 'ImgZip',

  data() {
    return {
      imgUrl: [],
      uploadFile: ''
    }
  },

  mounted() {
    this.imgMsg(img, async el => {
      const img = el.target
      const b64 = this.canvasZip(img, 0.1)
      // const toImg = document.getElementById('toImg')
      // toImg.src = b64
      this.imgUrl.push(b64)

      // this.imgMsg(b64, el => {
      //   const img2 = el.target
      //   const b642 = this.canvasZip(img2, 0.1)
      //   // const toImg = document.getElementById('toImg')
      //   // toImg.src = b64
      //   this.imgUrl.push(b642)
      // })

      // const formData = uput.b64ToFormData(b64)
      // const filemy = uput.dataURLtoFile(b64)
      // const formData = new FormData()
      // formData.append('file', filemy)

      const res = await upload.up('/plat/file/uploadOneImg', b64)

      debugger
    })
  },

  methods: {

    imgMsg(url, callback) {
      const img = new Image()
      img.src = url
      img.onload = el => {
        callback(el)
      }
    },

    /**
     * type: jpeg,png,webp
     */
    canvasZip(img, quality = 0.8, type = 'jpeg') {
      const w = img.width
      const h = img.height
      // 生成canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      // 创建属性节点
      const anw = document.createAttribute('width')
      anw.nodeValue = w
      const anh = document.createAttribute('height')
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(img, 0, 0, w, h)
      // quality值越小，所绘制出的图像越模糊
      const base64 = canvas.toDataURL('image/' + type, quality)
      return base64
    }
  }
}
</script>

<style>
</style>
