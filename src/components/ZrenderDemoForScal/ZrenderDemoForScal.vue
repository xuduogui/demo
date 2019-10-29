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
    <br>
    <button @click="outMsg">输出</button>
  </div>
</template>

<script>
import imgUrl from './img/backImg.jpg'
import { config } from './config'

export default {
  name: 'ZrenderDemoForScal',

  data() {
    return {
      config,
      // 随机id
      domId: '_' + Date.UTC() + Math.random() * 1000000000,
      // zrender实例
      zr: {},
      // 顶级容器，包含了元素和背景
      topGroup: {},
      // 元素容器，缩放仅仅影响自身
      itemsGroup: {},
      // 背景容器，缩放影响全部元素
      backGroup: {},
      // 容器基准
      groupsPosition: [0, 0],

      // 鼠标点位
      oriPoint: [0, 0],
      // 缩放级别
      oriScale: [1, 1],

      // 缩放点
      oriOrigin: [400, 300],

      // 是元素容器中的元素，由事件驱动
      isChoseItem: false
    }
  },

  mounted() {
    this.init()
    this.initGroups()
    // 添加缩放事件
    this.zrEvScale(this.zr, this.topGroup)
    // 添加事件系统
    this.zrMove(this.zr)
    this.zrEvDom(this.zr)

    // 添加元素
    const img = this.addImage({
      draggable: this.config.ITEMS.move,
      style: {
        image: imgUrl,
        x: 100,
        y: 100,

        width: 100,
        height: 100
      }
    })

    const img2 = this.addImage({
      style: {
        image: imgUrl,
        x: 0,
        y: 0,

        width: 100,
        height: 100
      }
    })

    const img3 = this.addImage({
      // 背景图必须设置为false
      draggable: false,
      z: -100,
      style: {
        image: imgUrl,
        x: 0,
        y: 0,

        width: 800,
        height: 600
      }
    })

    this.addItem(img)
    this.addItem(img2)
    this.addBack(img3)
  },

  methods: {
    init(id = this.domId) {
      if (!this.zr.id) {
        this.zr = window.zrender.init(document.getElementById(id))
      }
    },

    initGroups() {
      // 顶级容器
      const gLevel1 = this.getNewGroup()
      gLevel1.position = this.groupsPosition
      gLevel1.attr('origin', this.oriOrigin)

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
      // 顶级容器
      this.topGroup = gLevel1
    },

    zrEvScale(zr, topLevel) {
      const _this = this
      // 缩放
      zr.on('mousewheel', ev => {
        const handleGroup = topLevel

        if (
          (
            (_this.oriScale[0] < 0.5 || _this.oriScale[1] < 0.5) &&
            ev.wheelDelta < 0
          ) ||
          !_this.config.BACK_MOVE.scale
        ) {
          return false
        }

        _this.oriScale = _this.oriScale.map(el => el + ev.wheelDelta / 10)

        handleGroup.attr('scale', _this.oriScale)
      })
    },

    // 实例拖动事件
    zrMove(zr) {
      const _this = this
      zr.dragData = { drag: false, pos: [0, 0], group: null, target: null }
      zr.on('mousedown', e => {
        zr.dragData.pos = [e.event.zrX, e.event.zrY]
        zr.dragData.drag = true
      })
      zr.on('mouseup', e => {
        zr.dragData.drag = false
        zr.dragData.group = null
      })
      zr.on('mousemove', e => {
        if (!zr.dragData.drag) return false
        // 判断是否是元素
        if (_this.isChoseItem) return false
        // 读配置
        if (!_this.config.BACK_MOVE.move) return false

        const new_pos = [e.event.zrX, e.event.zrY]

        // 不分组逻辑
        const pos = [
          new_pos[0] - zr.dragData.pos[0],
          new_pos[1] - zr.dragData.pos[1]
        ]
        zr.storage.getDisplayList(true, true).forEach(function(x) {
          x.position[0] += pos[0] / _this.oriScale[0]
          x.position[1] += pos[1] / _this.oriScale[1]
          x.dirty()
        })

        zr.dragData.pos = [e.event.zrX, e.event.zrY]
      })
    },

    // 移除dom事件
    zrEvDom(zr) {
      zr.dom.addEventListener('mouseout', e => {
        // 取消zr移动
        if (zr.dragData) {
          zr.dragData.drag = false
        }
      })
    },

    addItem(item) {
      const _this = this
      // 拖拽加入总开关
      item.attr('draggable', this.config.ITEMS.move && item.draggable)

      _this.itemsGroup.add(item)

      item.dragging = false
      item.on('mousedown', e => {
        _this.isChoseItem = true
        item.dragging = true
      })
      item.on('mouseup', e => {
        _this.isChoseItem = false
        item.dragging = false
      })
    },

    addBack(back) {
      const _this = this
      back.attr('draggable', false)
      this.backGroup.add(back)
      back.on('mousedown', e => {
        _this.isChoseItem = false
      })
    },

    isInItem(x, y) {
      let flag = false
      this.itemsGroup.eachChild(cb => {
        if (!flag) {
          flag = cb.rectContain(x, y)
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
    },

    outMsg() {
      console.log(this.topGroup)
    }

  },

  watch: {
  }
}

</script>

<style>
</style>
