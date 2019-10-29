const mixin = {
  mounted() {
    const _this = this
    // // 添加缩放
    this.zrBack.on('mousewheel', ev => {
      // if (ev.wheelDelta === -1) {
      // _this.zrScale = _this.zrScale.map(el => el * (ev.wheelDelta * 0.1 + 1))
      // const scaleEx = cb => {
      //   cb.attr('origin', [ev.offsetX, ev.offsetY])
      //   // 设置缩放
      //   cb.attr('scale', _this.zrScale)
      // }
      // // }
      // _this.curG.eachChild(cb => {
      //   scaleEx(cb)
      // })
      // scaleEx(this.zrBack)
      // _this.curG.dirty()
    })
  }
}

export default mixin
