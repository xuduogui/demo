<template>
  <div>
    <div
      :id="domId"
      style="width: 800px; height: 600px; border: 1px solid #555; margin-top: 100px;"
    ></div>

    <button>线</button>
    <button>点</button>
    <button>多边形</button>
    <button>圆</button>
    <!-- <button>线</button>
    <button>线</button> -->
  </div>
</template>

<script>
import imgUrl from './img/backImg.jpg'
import zrd from './zrDrag'

export default {
  name: 'ZrenderDemoForScal',

  data() {
    return {
      domId: '_' + Date.UTC() + Math.random() * 1000000000,
      zr: {},
      zrScale: 1,
      // 元素容器，缩放仅仅影响自身
      itemsGroup: {},
      // 背景容器，缩放影响全部元素
      backGroup: {},
      // 容器基准
      groupsPosition: [0, 0],

      // 鼠标点位
      oriPoint: [0, 0],
      // 缩放级别
      oriScale: [1, 1]
    }
  },

  mounted() {
    this.init()
    this.initGroups()

    // 添加元素
  },

  methods: {
    init(id = this.domId) {
      if (!this.zr.id) {
        this.zr = window.zrender.init(document.getElementById(id))
      }
    },

    initGroups() {
      const _this = this
      // 顶级容器
      const gLevel1 = this.getNewGroup()
      gLevel1.position = this.groupsPosition
      // 元素容器
      const gLevel2 = this.getNewGroup()
      gLevel2.position = this.groupsPosition
      // 背景容器
      const gLevel3 = this.getNewGroup()
      gLevel3.position = this.groupsPosition
      gLevel1.add(gLevel2)
      gLevel1.add(gLevel3)
      this.zr.add(gLevel1)

      // 元素容器，缩放仅仅影响自身
      this.itemsGroup = gLevel2
      // 背景容器，缩放影响全部元素
      this.backGroup = gLevel3

      // 缩放
      this.zr.on('mousewheel', ev => {
        const x = ev.event.x
        const y = ev.event.y

        console.log(_this.isInItem(x, y))

        if (_this.oriPoint[0] != x && _this.oriPoint[1] != y) {
          _this.oriPoint = [
            x,
            y
          ]
          gLevel1.attr('origin', _this.oriPoint)
          // 分解 transform 矩阵到 position、 rotation、 scale,防止修改origin的偏移
          gLevel1.decomposeTransform()
          return false
        }
        _this.oriPoint = [
          x,
          y
        ]
        _this.oriScale = _this.oriScale.map(el => el + ev.wheelDelta / 100)

        gLevel1.attr('origin', _this.oriPoint)
        gLevel1.attr('scale', _this.oriScale)
      })
    },

    addItem(item) {
      this.itemsGroup.add(item)
    },
    addBack(back) {
      this.backGroup.add(back)
    },

    isInItem(x, y) {
      let flag = false
      this.itemsGroup.eachChild(cb => {
        if (!flag) {
          flag = cb.contain(x, y)
        }
      })
      return flag
    },

    addImage(config) {
      const img = new window.zrender.Image(config)
      img.on('mouseup', ev => {
      })
      return img
    },

    getNewGroup(config = { position: this.groupsPosition }) {
      const g = new window.zrender.Group()
      g.position[0] = config.position[0]
      g.position[1] = config.position[1]
      return g
    }

  },

  watch: {
  }
}

</script>

<style>
</style>
