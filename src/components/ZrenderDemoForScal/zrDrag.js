function zrd(zr) {
  // /拖动组, 整体拖动
  zr.dragData = { drag: false, pos: [0, 0], group: null, target: null }
  zr.on('mousedown', function(e) {
    zr.dragData.pos = [e.event.zrX, e.event.zrY]
    zr.dragData.target = e.target
    if (e.target == undefined) zr.dragData.drag = true
    else if (e.target.parent && e.target.parent.type == 'group') {
      zr.dragData.drag = true
      zr.dragData.group = e.target.parent
    }
  })
  zr.on('mouseup', function(e) {
    zr.dragData.drag = false
    zr.dragData.group = null
  })
  zr.on('mousemove', function(e) {
    if (zr.dragData.drag != true) return
    const new_pos = [e.event.zrX, e.event.zrY]

    // 分組邏輯
    // if (zr.dragData.group != null) {
    //   const pos = [
    //     new_pos[0] - zr.dragData.pos[0],
    //     new_pos[1] - zr.dragData.pos[1]
    //   ]
    //   zr.dragData.group.children().forEach(function(x) {
    //     x.position = [0, 0]
    //   })
    //   zr.dragData.group.position[0] += pos[0]
    //   zr.dragData.group.position[1] += pos[1]
    //   zr.dragData.group.dirty()
    // } else {
    //   const pos = [
    //     new_pos[0] - zr.dragData.pos[0],
    //     new_pos[1] - zr.dragData.pos[1]
    //   ]
    //   zr.storage.getDisplayList(true, true).forEach(function(x) {
    //     x.position[0] += pos[0]
    //     x.position[1] += pos[1]
    //     x.dirty()
    //   })
    // }

    // 不分组逻辑
    const pos = [
      new_pos[0] - zr.dragData.pos[0],
      new_pos[1] - zr.dragData.pos[1]
    ]
    zr.storage.getDisplayList(true, true).forEach(function(x) {
      x.position[0] += pos[0]
      x.position[1] += pos[1]
      x.dirty()
    })

    zr.dragData.pos = [e.event.zrX, e.event.zrY]
  })
}

export default zrd
