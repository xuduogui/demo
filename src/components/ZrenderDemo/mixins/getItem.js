/* eslint-disable no-undef */
import img from '../img/backImg.jpg'
const mixin = {
  methods: {
    getImg(options = {}) {
      const opts = Object.assign(
        {
          style: {
            image: img,
            x: 0,
            y: 0,
            width: 500,
            height: 400
          },
          draggable: true
        },
        options
      )
      return new zrender.Image(opts)
    },

    getCircle(options = {}) {
      const opts = Object.assign(
        {
          shape: {
            cx: 150,
            cy: 50,
            r: 40
          },
          style: {
            fill: 'none',
            stroke: '#F00'
          },
          draggable: true
        },
        options
      )
      return new zrender.Circle(opts)
    }
  }
}

export default mixin
