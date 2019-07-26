
<template>
  <div>
    <div
      :id="domId"
      style="width: 800px; height: 600px; border: 1px solid #555; margin-top: 100px;"
    ></div>
    <button>获取组信息</button>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import imgUrl from './img/backImg.jpg'

export default {
  name: 'ZrenderDemo',

  data() {
    return {
      // domId
      domId: '_' + Date.UTC() + Math.random() * 1000000000,
      // zr实例
      zr: null,
      // groups
      groups: {},
      groupsPosition: [10, 10],

      // 渲染数据

      itemList: [{
        draggable: true,
        style: {
          image: imgUrl,
          x: 100,
          y: 100,

          width: 100,
          height: 100
        }
      }]
    }
  },

  methods: {

    zInit(id = this.domId) {
      if (!this.zr) {
        this.zr = zrender.init(document.getElementById(id))
      }
      return this.zr
    },

    groupInit(name = 'myGroup') {
      if (!this.groups[name]) {
        this.$set(this.groups, name, new zrender.Group())
      }
      this.groups[name].position = this.groupsPosition
      this.groups[name].oriPosition = this.groupsPosition
      this.zr.add(this.groups[name])
      return this.groups[name]
    },

    addItem(g, itemConfig, justShow = false, zr = this.zr) {
      const optsItem = itemConfig
      optsItem.draggable = !justShow
      optsItem.oriPosiX = optsItem.style.x
      optsItem.oriPosiY = optsItem.style.y
      optsItem.style.x += g.position[0]
      optsItem.style.y += g.position[1]

      const item = new zrender.Image(optsItem)

      g.add(item)

      return item
    },

    addEvDraw(item, g, zr = this.zr) {
      const _this = this
      let _transform = null

      const itemMove = ev => {
        let _x = 0
        let _y = 0
        const transform = ev.target.transform

        if (_transform) {
          _x = transform[4] - _transform[4]
          _y = transform[5] - _transform[5]
          // 偏移向量
          const _send = []
          zrender.vector.set(_send, _x, _y)
          _this.reDrawPosition(g, ev.target, _send)
        }

        _transform = JSON.parse(JSON.stringify(ev.target.transform))
      }

      let _flag = 0

      item
        .on('mousedown', ev => {
          _flag = 1
        })
        .on('mouseup', ev => {
          _flag = 0
          itemMove(ev)
        })
        .on('mouseleave', ev => {
          _flag = 0
        })
        .on('mousemove', ev => {
          if (_flag === 1) {
            itemMove(ev)
          }
        })
        .on('mousewheel', ev => {
          // 获取原始缩放
          let [s1, s2] = item.scale

          // 不等于1， 下滚动
          if (ev.wheelDelta !== 1) {
            s1 = (s1 * 10 - 1) / 10
            s2 = (s2 * 10 - 1) / 10
          } else {
            s1 = (s1 * 10 + 1) / 10
            s2 = (s2 * 10 + 1) / 10
          }

          _this.reDrawScale(g, item, [ev.offsetX, ev.offsetY], [s1, s2])

          _transform = null
        })

      zr.on('mouseup', ev => {
        _flag = 0
      })
    },

    addEvClick(item, g) {
      const _this = this
      item
        .on('click', ev => {
          console.log(ev)
          console.log(item)
          console.log(item.transform)
        })
        .on('mouseup', ev => {
          console.log(ev.target)
        })
        .on('mousewheel', ev => {
          let _w = 0
          let _h = 0
          const oriw = ev.target.style.width
          const orih = ev.target.style.height

          if (ev.wheelDelta !== 1) {
            _w = -1
            _h = -1
          } else {
            _w = 1
            _h = 1
          }

          _this.reSize(item, {
            w: oriw + _w,
            h: orih + _h
          })
        })
    },

    zRun(zr = this.zr) {
      const g = this.groupInit()
      // 背景原始坐标数据
      const [oriPosiX, oriPosiY] = [0, 0]

      const optsImg = {
        // draggable: true,
        style: {
          image: imgUrl,
          x: g.position[0] + oriPosiX,
          y: g.position[1] + oriPosiY,
          width: 1080,
          height: 1920
        },
        z: -9999
      }

      const back = this.addItem(g, optsImg)
      this.addEvDraw(back, g)

      const _this = this

      this.itemList.forEach((el, index) => {
        el.z = index + 1
        const _item = _this.addItem(g, el)
        this.addEvClick(_item, g)
      })
    },

    reDrawPosition(g, item, offarr) {
      // console.log('拖动')
      g.eachChild(el => {
        if (el.id !== item.id) {
          const out = []
          const m = el.transform
          zrender.matrix.translate(out, m, offarr)
          el.transform = out
          el.decomposeTransform()
          el.attr('draggable', true)
        }
      })
    },

    reDrawScale(g, item, origin, scale) {
      g.eachChild(el => {
        // 设置缩放点
        el.attr('origin', origin)
        // 设置缩放
        el.attr('scale', scale)
        el.attr('draggable', true)

        // const targetTrans = el.transform
        // const _scalex = targetTrans[4] - origin[0]
        // const _scaley = targetTrans[5] - origin[1]

        // // 基础向量
        // let v = []
        // v = zrender.vector.set(v, _scalex, _scaley)

        // // 将向量 v 缩放 1 倍，得到的结果赋值给 _send
        // const _send = []
        // zrender.vector.scale(_send, v, 1)

        // // 将向量 _send 归一化输出到 out，也就是将其模长变为 1。
        // const out = []
        // zrender.vector.normalize(out, _send)

        // const render = []
        // zrender.matrix.scale(render, item.transform, out)

        // const out2 = []
        // zrender.vector.add(out2, render, [targetTrans[0], targetTrans[3]])

        // el.transform[0] = out2[0]
        // el.transform[3] = out2[1]
        // el.decomposeTransform()
        // const out = []
        // const
        // zrender.matrix.scale(out, item.transform, scale)
        // el.transform = JSON.parse(JSON.stringify(out))
        // el.decomposeTransform()
      })
    },

    reSize(item, size) {
      item.attr('style', {
        width: size.w,
        height: size.w
      })
    },

    getItemById() {

    }

  },

  mounted() {
    const preData = [
      {
        'targetType': 'Image4',
        'targetCode': 0.8994307675170921,
        'targetX': 14,
        'targetY': 172,
        'targetWidth': 40,
        'targetHeight': 40,
        'deviceId': 4,
        'deviceType': 'jk'
      },
      { 'targetType': 'Image5', 'targetCode': 0.24800783718344155, 'targetX': 510, 'targetY': 348, 'targetWidth': 40, 'targetHeight': 40, 'deviceId': 69, 'deviceType': 'jk' }, { 'targetType': 'Image1', 'targetCode': 0.7025143405990024, 'targetX': 46, 'targetY': 278, 'targetWidth': 40, 'targetHeight': 40, 'deviceId': 'aada53196a02459f9be9e8deaf38a27f', 'deviceType': 'cgq' }, { 'targetType': 'Image2', 'targetCode': 0.12363094978453049, 'targetX': 424, 'targetY': 444, 'targetWidth': 10, 'targetHeight': 10, 'deviceId': 'd88d3302400c4921b0b4bee866253dcf', 'deviceType': 'cgq' },
      { 'targetType': 'Image2', 'targetCode': 0.39357218551014017, 'targetX': 232, 'targetY': 388, 'targetWidth': 40, 'targetHeight': 40, 'deviceId': 'cfbcad91e90347a8924d21dc79d5c056', 'deviceType': 'cgq' }, { 'targetType': 'Image10', 'targetCode': 0.4900088338588877, 'targetX': 610, 'targetY': 257, 'targetWidth': 40, 'targetHeight': 40, 'deviceId': 'd88d3302400c4921b0b4bee866253dcf', 'deviceType': 'cgq' }]

    this.itemList = preData.map(el => {
      el.draggable = true
      el.style = {
        image: imgUrl,
        x: el.targetX,
        y: el.targetY,

        width: el.targetWidth,
        height: el.targetHeight
      }
      return el
    })
    const z = this.zInit()
    this.zRun(z)
  }
}
</script>

<style>
</style>
