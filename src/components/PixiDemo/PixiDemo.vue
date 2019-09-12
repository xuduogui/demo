<template>
  <div id="pixiBox"></div>
</template>

<script>
import * as PIXI from 'pixi.js'
// import img from ''
export default {
  name: 'PixiDemo',

  data() {
    return {
      PX: PIXI
    }
  },

  mounted() {
    // Create a Pixi Application
    const app = this.makePixi()
    // Aliases
    // const Application = PIXI.Application
    const imgName = 'logo'
    const imgUrl = '/statics/img/logo.png'

    const loader = new PIXI.Loader()

    const Sprite = PIXI.Sprite

    // load an image and run the `setup` function when it's done
    loader.add(imgName, imgUrl)
    loader.load(setup)

    // This `setup` function will run when the image has loaded
    function setup(loader, resources) {
      const cat = new Sprite(resources[imgName].texture)
      cat.x = 96
      cat.y = 96
      cat.width = 80
      cat.height = 80
      cat.rotation = 0.5

      // Add the cat to the stage
      app.stage.addChild(cat)
      app.ticker.add(delta => gameLoop(delta))

      function gameLoop(delta) {
        // Move the cat 1 pixel
        // console.log(delta)
        // cat.x += 1
      }
      debugger
    }
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
      const SHOW_W = '256'
      const SHOW_H = '256'

      const PIXI_CONFIG = {
        width: SHOW_W,
        height: SHOW_H,
        transparent: true
      }

      // Create a Pixi Application
      const app = new PIXI.Application(PIXI_CONFIG)

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
