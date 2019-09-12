<template>
  <div>
    <div
      :id="domId"
      style="width: 800px; height: 600px; border: 1px solid #555; margin-top: 100px;"
    ></div>
  </div>
</template>

<script>
import imgUrl from './img/backImg.jpg'

export default {
  name: 'ZrenderDemoForScal',

  data() {
    return {
      domId: '_' + Date.UTC() + Math.random() * 1000000000,
      zr: {},
      groups: [],
      groupsPosition: [0, 0],

      oriPoint: [0, 0],
      oriScale: [1, 1]
    }
  },

  mounted() {
    this.init()
    this.addScaleListen()
    const g = this.getNewGroup()
    const img = this.addImage({
      draggable: true,
      style: {
        image: imgUrl,
        x: 100,
        y: 100,

        width: 100,
        height: 100
      }
    })
    g.add(img)
    const img2 = this.addImage({
      draggable: true,
      style: {
        image: imgUrl,
        x: 0,
        y: 0,

        width: 100,
        height: 100
      }
    })
    g.add(img2)
    this.groups.push(g)
    this.zr.add(g)
    console.log(g.children())
  },

  methods: {
    init(id = this.domId) {
      if (!this.zr.id) {
        this.zr = window.zrender.init(document.getElementById(id))
      }
    },

    addImage(config) {
      const img = new window.zrender.Image(config)
      return img
    },

    getNewGroup(config = { position: this.groupsPosition }) {
      const g = new window.zrender.Group()
      g.position[0] = config.position[0]
      g.position[1] = config.position[1]
      return g
    },

    // 目标缩放监听
    addScaleListen(target = this.zr) {
      const _this = this
      target
        .on('mousewheel', ev => {
          _this.oriPoint = [ev.offsetX, ev.offsetY]
        })
    },

    // 矩阵缩放和位移计算
    matrixScaleEx(oriMa, scale = [1.1, 1.1]) {
      const out = window.zrender.matrix.create()
      window.zrender.matrix.scale(out, oriMa, scale)
      return out
    },

    matrixTranslateEx(oriMa, position, scale) {

    }
  },

  watch: {
    oriPoint() {
      const _this = this
      console.log('当前点：' + _this.oriPoint)
      this.groups.forEach(gp => {
        gp.eachChild(dp => {
          console.log(dp)
          const oriMa = dp.transform || window.zrender.matrix.create()
          const scale = dp.scale.map(s => s + 0.1)
          const out = _this.matrixScaleEx(oriMa, scale)
          console.log('原本：' + oriMa + '现在' + out + '缩放' + scale)

          dp.transform = out
          dp.decomposeTransform()
          // console.log(dp)
          // dp.scale = dp.scale.map(e => e * _this.oriScale)
          // dp.origin = _this.oriPoint
        })
      })
      this.zr.refreshImmediately()
    }
  }
}

</script>

<style>
</style>
