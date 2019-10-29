<template>
  <div>
    <div
      :id="domId"
      style="width: 800px; height: 600px; border: 1px solid #555; margin-top: 100px;"
    ></div>

    <button @click="createLine">线</button>
    <button @click="createPoint">点</button>
    <button @click="createPoly">多边形</button>
    <button @click="createText">文本</button>

    <br>

    <button @click="closePolyLineToGon">多边形闭合</button>

    <button @click="editPolyStart">多边形闭合后修改开始</button>
    <button @click="editPolyEnd">多边形闭合后修改结束</button>

    <br>

    <input
      type="text"
      v-model="curPolyFillColor"
    >
    <button @click="editPolyColor">填充输入框中的颜色</button>

    <br>
    <!-- 储存历史 -->
    <button @click="storeHistoryAdd">储存历史</button>
    <button @click="storeHistoryBack">撤退</button>
    <button @click="storeHistoryBackNo">取消撤退</button>
    <button @click="clearNow">清空当前</button>

    <!-- <button>线</button>
    <button>线</button> -->
  </div>
</template>

<script>

import config from './config'
import zrmouswhell from './mixins/zrmouswhell'
import init from './mixins/init'

export default {
  name: 'ZrenderDemoForDraw',

  mixins: [init, zrmouswhell],

  data() {
    return {
      domId: '_' + Date.UTC() + Math.random() * 1000000000,
      zr: {},

      zrScale: [1, 1],
      // 组群
      groups: [],
      // 组群默认定位
      groupsPosition: [0, 0],
      // 当前组
      curG: {},
      // 背景
      zrBack: {},

      // 当前操作线条
      curLine: {},
      // 当前操作点
      curPoint: {},
      // 当前操作多边形(不闭合)
      curPolyLine: {},
      // 当前操作多边形(闭合)
      curPoly: {},
      // 当前操作多边形角点组合
      curPolyPoiGrp: {},
      // 当前操作多边形的填充
      curPolyFillColor: '#000',

      // 当前状态
      curDraw: '',
      DRAW_STATUS: {
        line: {
          status: 1,
          drawing: false,
          clickNums: 0
        },
        point: {
          status: 2,
          drawing: false
        },
        poly: {
          status: 3,
          drawing: false
        },
        circle: {
          status: 4,
          drawing: false
        },
        text: {
          status: 5,
          drawing: false
        }
      },

      // 辅助线
      subline: {},
      // 辅助组合
      subG: {},

      oriPoint: [0, 0],
      oriScale: [1, 1],

      hoverPoint: [],

      historyData: [],
      historyDataIndex: 0,

      backClickPoint: [0, 0],
      isBackDrag: false
    }
  },

  mounted() {

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

    evText(ev) {
      const _this = this
      _this.$prompt('请输入文本内容', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        _this.curText = new window.zrender.Text({
          style: Object.assign(config.text, {
            text: value,
            textAlign: 'center',
            textVerticalAlign: 'middle',
            fontSize: 20,
            fontFamily: 'Lato',
            fontWeight: 'bolder',
            textFill: '#0ff',
            blend: 'lighten'
          }),
          draggable: true,
          position: [150, 150]
        })

        _this.curG.add(_this.curText)

        _this.stopAnyDraw()

        _this.curText.on('click', ev => {
          _this.$prompt('请输入文本内容', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputValue: ev.target.style.text
          }).then(({ value }) => {
            ev.target.attr('style', {
              text: value
            })
          }).catch(() => {
          })
        })

        _this.curText.on('mouseup', ev => {
          console.log(ev.target)
        })

        // 动作标记与储存

        _this.storeHistoryAdd()
      }).catch(() => {
      })
    },

    evLine(ev) {
      const _this = this

      // 追踪鼠标
      if (_this.DRAW_STATUS.line.clickNums === 0) {
        _this.curLine = new window.zrender.Line(Object.assign(config.line, {
          shape: {
            x1: ev.offsetX - _this.curG.position[0],
            y1: ev.offsetY - _this.curG.position[1],
            x2: ev.offsetX - _this.curG.position[0],
            y2: ev.offsetY - _this.curG.position[1]
          },
          cursor: 'crosshair'
          // position: _this.curG.position.map(el => -el)
        }))
        _this.curG.add(_this.curLine)
      }
      _this.DRAW_STATUS.line.clickNums++

      // 拉线中。。。

      if (_this.DRAW_STATUS.line.clickNums === 1) {
        // 起始点
        _this.curPoint = new window.zrender.Circle({
          shape: {
            cx: ev.offsetX,
            cy: ev.offsetY,
            r: 10
          },
          position: _this.curG.position.map(el => -el)
        })
        _this.DRAW_STATUS.line.drawing = true
        _this.showSub()
        _this.curG.add(_this.curPoint)
        return false
      }

      if (_this.DRAW_STATUS.line.clickNums === 2) {
        _this.DRAW_STATUS.line.drawing = false
        _this.curLine.attr('shape', {
          x2: ev.offsetX,
          y2: ev.offsetY
        })
        _this.hiddenSub()
        _this.curG.remove(_this.curPoint)
        _this.DRAW_STATUS.line.clickNums = 0

        // 动作标记与储存

        _this.storeHistoryAdd()
        return false
      }

      _this.DRAW_STATUS.line.clickNums = 0
      _this.curLine.bjq.drawing = false
      // _this.zrBack.off('mousemove', lineMove)
    },

    evPoint(ev) {
      const _this = this
      _this.curPoint = new window.zrender.Circle(Object.assign(config.point, {
        shape: {
          cx: ev.offsetX - _this.curG.position[0],
          cy: ev.offsetY - _this.curG.position[1],
          r: 10
        }
      }))
      _this.curPoint.on('mousedown', ev => {
        const cb = ev.target
        cb.bjq = {
          point: [ev.offsetX, ev.offsetY]
        }
      })
      _this.curPoint.on('mouseup', ev => {
        const cb = ev.target
        _this.$nextTick(() => {
          cb.attr('shape', {
            // cx: (cb.shape.cx || 0) + cb.position[0],
            // cy: (cb.shape.cy || 0) + cb.position[1]
            cx: ((cb.shape.cx || 0) + ev.offsetX - cb.bjq.point[0]),
            cy: ((cb.shape.cy || 0) + ev.offsetY - cb.bjq.point[1])
          })
          cb.attr('position', [0, 0])
        })
        _this.curG.dirty
      })
      _this.curG.add(_this.curPoint)

      // 动作标记与储存

      _this.storeHistoryAdd()
    },

    evPoly(ev) {
      const _this = this

      // curPolyLine
      if (!_this.curPolyLine.shape) {
        _this.curPolyLine = new window.zrender.Polyline(config.polyline)
        _this.curG.add(_this.curPolyLine)
      }

      const oriPoints = _this.curPolyLine.shape.points || []

      oriPoints.push(
        [ev.offsetX, ev.offsetY]
      )

      _this.showSub()

      _this.curPolyLine.attr('shape', {
        points: oriPoints
      })
    },

    closePolyLineToGon() {
      const _this = this
      if (_this.curPolyLine.shape) {
        _this.stopAnyDraw()
        _this.curPoly = new window.zrender.Polygon(
          Object.assign(
            config.poly,
            {
              cursor: 'crosshair'
            }
          )
        )

        if (_this.curPolyLine.shape && _this.curPolyLine.shape.points) {
          _this.curPoly.attr('shape', {
            points: _this.curPolyLine.shape.points
          })
        }

        _this.curPoly.on('mousemove', ev => {
          ev.target.attr('style', {
            fill: '#eee'
          })
        })

        _this.curPoly.on('mouseout', ev => {
          ev.target.attr('style', {
            fill: _this.curPolyFillColor
          })
        })

        _this.curPoly.on('click', ev => {
          if (_this.curPoly.id !== ev.target.id) {
            _this.clearHandle()
          }
          _this.curPoly = ev.target
        })

        _this.curG.remove(_this.curPolyLine)
        _this.curPolyLine = {}
        _this.curG.add(_this.curPoly)
        _this.hiddenSub()

        // 动作标记与储存

        _this.storeHistoryAdd()
      }
    },

    evCircle(ev) {
      const _this = this
    },

    createLine() {
      this.clearHandle()
      this.curDraw = this.DRAW_STATUS.line.status
    },

    createPoint() {
      this.clearHandle()
      this.curDraw = this.DRAW_STATUS.point.status
    },

    createPoly() {
      this.clearHandle()
      this.curDraw = this.DRAW_STATUS.poly.status
    },

    createCircle() {
      this.clearHandle()
      this.curDraw = this.DRAW_STATUS.circle.status
    },

    createText() {
      this.clearHandle()
      this.curDraw = this.DRAW_STATUS.text.status
    },

    clearHandle() {
      this.editPolyEnd()
    },

    addSubline(ev) {
      const _this = this
      _this.subline.attr('shape', {

        // x1: (ev.offsetX / _this.zrScale[0]) + (_this.curG.position[0] / _this.zrScale[0]),
        // y1: (ev.offsetY / _this.zrScale[1]) + (_this.curG.position[1] / _this.zrScale[1])
        x1: ev.offsetX,
        y1: ev.offsetY
      })
    },

    editPolyStart() {
      const _this = this
      if (_this.curPoly.shape) {
        const points = _this.curPoly.shape.points
        points.forEach((poi, i) => {
          const item = new window.zrender.Isogon(Object.assign(config.dragPoint, {
            shape: {
              x: poi[0],
              y: poi[1],
              r: 10,
              n: 4
            },
            draggable: true,
            // 自定义序列
            poiIndex: i
          }))
          _this.curPolyPoiGrp.add(item)

          item.on('mousemove', ev => {
            const chs = _this.curPolyPoiGrp.children()
            const arr = chs.map((el, chsi) => {
              return [el.position[0] + points[chsi][0], el.position[1] + points[chsi][1]]
            })
            _this.curPoly.attr('shape', {
              points: arr
            })
          })
        })
      }
    },

    editPolyEnd() {
      this.curPolyPoiGrp.removeAll()
    },

    editPolyColor() {
      if (this.curPoly.shape) {
        this.curPoly.attr('style', {
          fill: this.curPolyFillColor
        })
      }
    },

    showSub() {
      if (this.subline.shape) {
        this.subline.show()
      }
    },

    hiddenSub() {
      if (this.subline.shape) {
        this.subline.hide()
      }
    },

    addStroke(displayable) {
      displayable.attr('style', {
        stroke: '1px solid red',
        lineDash: [5, 3, 2, 5, 3, 2.0],
        lineDashOffset: 50,
        lineWidth: 5
      })
    },

    delStroke(displayable) {
      displayable.attr('style', {
        stroke: null,
        lineDash: null,
        lineDashOffset: null,
        lineWidth: 0
      })
    },

    stopAnyDraw() {
      this.curDraw = 0
    },

    storeHistoryAdd() {
      const list = this.historyData.slice(0, this.historyDataIndex)
      list.push(window._.cloneDeep(this.curG))
      this.historyData = list
      this.historyDataIndex = this.historyData.length
    },

    storeHistoryBack() {
      const _this = this
      _this.hiddenSub()
      _this.stopAnyDraw()

      if (_this.historyData.length > 0) {
        this.historyDataIndex--
        const list = _this.historyData[this.historyDataIndex - 1]
        if (list && list._children) {
          _this.clearNow()
          _this.$nextTick(() => {
            list._children.forEach(e => {
              // 深拷贝，防止add方法操作原始数据
              const item = window._.cloneDeep(e)
              _this.curG.add(item)
            })
          })
        }
        this.zr.refreshImmediately()
      }
    },

    storeHistoryBackNo() {
      const _this = this
      _this.hiddenSub()
      _this.stopAnyDraw()
      if (this.historyDataIndex < _this.historyData.length) {
        this.historyDataIndex++
        const list = _this.historyData[this.historyDataIndex - 1]
        if (list && list._children) {
          // 清空
          _this.clearNow()
          // 重新渲染
          _this.$nextTick(() => {
            list._children.forEach(e => {
              // 深拷贝，防止add方法操作原始数据
              const item = window._.cloneDeep(e)
              _this.curG.add(item)
            })
          })
        }
        this.zr.refreshImmediately()
      }
    },

    clearNow() {
      this.curG.removeAll()
    },

    getZrMsgAll() {

    },

    setZrMsgAll() {

    }
  },

  watch: {
  }
}

function treeData(source, id, parentId, children, rootId = '-1') {
  const cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter(father => {
    const branchArr = cloneData.filter(child => father[id] == child[parentId])
    branchArr.length > 0 ? (father[children] = branchArr) : ''
    return father[parentId] == rootId // 如果第一层不是parentId=0，请自行修改
  })
}

</script>

<style>
</style>
