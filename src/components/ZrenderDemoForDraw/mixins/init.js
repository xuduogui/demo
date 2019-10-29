import config from '../config'
import imgUrl from '../img/pmt.jpg'
const mixin = {
  mounted() {
    const _this = this
    this.init()
    // this.addScaleListen()
    const g = this.getNewGroup()
    const s = this.getNewGroup()
    // 当前组
    this.curG = g
    // 辅助工具组合
    this.subG = s
    // 多边形角点组合
    this.curPolyPoiGrp = this.getNewGroup()

    this.groups.push(g)
    this.groups.push(s)
    this.groups.push(this.curPolyPoiGrp)
    this.zr.add(g)
    this.zr.add(s)
    this.zr.add(this.curPolyPoiGrp)

    // 背景
    const back = this.addImage({
      style: {
        image: imgUrl,
        x: 0,
        y: 0,
        width: 800,
        height: 600
      },
      cursor: 'crosshair',
      z: -1
    })

    back.attr('draggable', true)

    back.on('mousemove', ev => {
      _this.curG.attr('position', back.position)
    })

    // back.on('mouseup', ev => {
    //   _this.curG.eachChild(cb => {
    //     cb.attr('position', _this.curG.position)
    //   })
    //   _this.curG.attr('position', [0, 0])
    //   _this.curG.dirty()
    // })
    // back.on('mousemove', ev => {
    //   if (_this.isBackDrag) {
    //     _this.curG.attr('position', [ev.offsetX - _this.backClickPoint[0], ev.offsety - _this.backClickPoint[1]])
    //   }
    // })

    this.zrBack = back

    this.zr.add(back)

    if (!_this.subline.shape) {
      _this.subline = new window.zrender.Line(
        Object.assign(config.subline, {
          cursor: 'crosshair'
        })
      )
      _this.subG.add(_this.subline)
    }

    this.hiddenSub()

    // 添加事件系统
    const clickEv = ev => {
      // ev.offsetX = ev.offsetX - _this.curG.position[0]
      // ev.offsetY = ev.offsetY - _this.curG.position[1]
      if (this.curDraw === this.DRAW_STATUS.poly.status) {
        this.evPoly(ev)
      }
      if (this.curDraw === this.DRAW_STATUS.point.status) {
        this.evPoint(ev)
      }
      if (this.curDraw === this.DRAW_STATUS.line.status) {
        this.evLine(ev)
      }
      if (this.curDraw === this.DRAW_STATUS.text.status) {
        this.evText(ev)
      }
      // 添加辅助线
      this.addSubline(ev)
    }

    // addEventListener
    this.zr.on('click', clickEv)
    this.zr.dom.addEventListener('mousemove', ev => {
      _this.hoverPoint = [ev.offsetX, ev.offsetY]
      if (_this.subline.shape) {
        _this.subline.attr('shape', {
          x2: ev.offsetX,
          y2: ev.offsetY
        })
      }
    })

    // 添加缩放
    // this.zr.on('mousewheel', ev => {
    //   // if (ev.wheelDelta === -1) {
    //   _this.zrScale = _this.zrScale * (ev.wheelDelta * 0.1 + 1)
    //   const scaleEx = cb => {
    //     cb.attr('origin', [ev.offsetX, ev.offsetY])
    //     // 设置缩放
    //     cb.attr('scale', _this.zrScale)
    //   }
    //   // }
    //   _this.curG.eachChild(cb => {
    //     scaleEx(cb)
    //   })
    //   scaleEx(this.zrBack)
    //   _this.curG.dirty()
    // })

    // 记录
    this.storeHistoryAdd()
  }
}

export default mixin
