function move(item, contain) {
  console.log('开始')
  item
    .on('pointerdown', ev => {
      console.log(ev)
      item.bjq.dragging = true
    })
    .on('pointermove', ev => {
      if (item.bjq.dragging) {
        console.log(ev)
      }
    })
    .on('pointerdown', ev => {
      console.log(ev)
      item.bjq.dragging = false
    })
}

export default move
