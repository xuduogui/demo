import * as PIXI from 'pixi.js'
import act from '../type-act'
// 解析与生产的数据表
const DATA_TYPE_LIST = {
  TYPE_LINE: {
    name: '线',
    // 解析
    analyze: function(d, app) {
      return d
    },
    // 数据模型
    data: function() {
      const o = {}
      return o
    }
  },

  TYPE_IMG: {
    name: '图片',
    analyze: function(d, app) {
      const loader = new PIXI.Loader()
      loader.add('name' + d.id, d.data.src)
      loader.load((loader, resources) => {
        const img = new PIXI.Sprite(resources['name' + d.id].texture)
        img.x = d.data.x
        img.y = d.data.y
        img.width = d.data.w
        img.height = d.data.h
        d.data.z ? (img.zIndex = d.data.z) : ''
        // 自定义属性
        img.bjq = {
          id: d.id
        }
        img.buttonMode = true
        img.interactive = true
        img.draggable = true

        // 游戏循环
        window.PIXI_APP.ticker.add(delta => gameLoop(delta))
        function gameLoop(delta) {
          window.PIXI_APP.pls.tink.update()
        }

        window.PIXI_APP.pls.tink.makeDraggable(img)

        // 判断图片类型（背景/元素）
        switch (d.type) {
          case 'back':
            window.PIXI_APP.pls.tink.makeInteractive(img)
            img.press = () => console.log(img)
            img.release = () => console.log(img)
            img.tap = () => console.log(img)
            console.log(img)
            // console.log(d.id, p)
            break
          case 'item':
            // act.move(img)
            break

          default:
            break
        }
        app.addChild(img)
      })
    }
  }
}

export default DATA_TYPE_LIST
