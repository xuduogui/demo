
<template>
  <div>
    <div
      id="z-render-main"
      style="width: 500px; height: 400px; border: 1px solid #555; margin-top: 100px;"
    ></div>
  </div>
</template>

<script>
/* eslint-disable no-undef */

// 输入为图片地址，点位信息
// 输出为各种回调处理

import back from './mixins/back'
import getItem from './mixins/getItem'

export default {
  props: {
    items: []
  },

  name: 'ZrenderDemo',

  mixins: [back, getItem],

  data() {
    return {
      backGroup: new zrender.Group()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const zr = zrender.init(document.getElementById('z-render-main'))
      const backImg = this.getImg()

      this.backGroup.add(backImg)
      this.backGroup.add(this.getCircle())
      zr.add(this.backGroup)
    },

    // dra

    moveCallback(ev, callback) {

    }

    //  'click'、 'mousedown'、 'mouseup'、 'mousewheel'、 'dblclick'、 'contextmenu'。
    // addMouseMove(item, fc) {
    //   let flag = false
    //   item.on('mousedown', () => {
    //     flag = true
    //   })
    // }

  }
}
</script>

<style>
</style>
