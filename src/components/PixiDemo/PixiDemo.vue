<template>
  <div id="pixiBox"></div>
</template>

<script>
import * as PIXI from 'pixi.js'
import bjqPX from './index'
import pl from './plugins/index'
import img from './img/logo.png'
import back from './img/back.jpg'

export default {
  name: 'PixiDemo',

  data() {
    return {
      PX: PIXI,

      historyData: [
        {
          type: 'back',
          id: 1,
          dataType: 1,
          descript: '背景',
          data: {
            x: 0,
            y: 0,
            w: 800,
            h: 800,
            z: -99,
            src: back
          }
        }, {
          type: 'item',
          id: 2,
          dataType: 1,
          descript: '元素1',
          data: {
            x: 100,
            y: 100,
            w: 100,
            h: 100,
            z: 99,
            src: img
          }
        }, {
          type: 'item',
          id: 3,
          dataType: 2,
          descript: '元素（绘制）',
          data: {
            path: [],
            fill: {
              color: 'red'
            }
          }
        }
      ]
    }
  },

  mounted() {
    // 创建 Pixi Application
    const app = this.makePixi()

    debugger

    window.PIXI_APP = app

    const t = new pl.Tink(PIXI, app.view)

    // 该pointer对象有三个用户自定义的方法，您可以编写：press，release，和tap。
    // press当按下鼠标左键或用户将他或她的手指按到设备屏幕时触发。
    // release释放鼠标按钮时触发，或者用户将其从屏幕上抬起。
    // tap如果单击鼠标左键或用户点击屏幕，则会触发
    const pointer = t.makePointer()
    // pointer.press = () => console.log(pointer)
    // pointer.release = () => console.log(pointer)
    // pointer.tap = () => console.log(pointer)

    // 添加插件到app
    app.pls = {
      tink: t,
      pointer
    }

    // 渲染已有数据
    const hisCon = new PIXI.Container()
    hisCon.sortableChildren = true
    bjqPX.render.history(this.historyData, hisCon)
    app.stage.addChild(hisCon)

    console.log(app)
    // 加载操作能力
  },

  methods: {
    makePixi() {
      // 判断系统兼容
      let type = 'WebGL'
      if (!PIXI.utils.isWebGLSupported()) {
        type = 'canvas'
      }

      PIXI.utils.sayHello(type)

      // 配置pixi
      const SHOW_W = '800'
      const SHOW_H = '800'

      const PIXI_CONFIG = {
        width: SHOW_W,
        height: SHOW_H,
        transparent: true
      }

      // Create a Pixi Application
      const app = new PIXI.Application(PIXI_CONFIG)

      app.stage.sortableChildren = true

      // Add the canvas that Pixi automatically created for you to the HTML document
      const pixiBox = document.querySelector('#pixiBox')
      pixiBox.appendChild(app.view)

      return app
    },

    makeSprite() {

    }

    // loadSetUp(url) {
    //   const sprite = new PIXI.Sprite(
    //     PIXI.loader.resources['images/anyImage.png'].texture
    //   )
    // }
  }

}
</script>

<style>
</style>
