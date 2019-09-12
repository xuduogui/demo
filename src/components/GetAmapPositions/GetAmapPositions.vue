
<template>
  <div style="width: 1500px; height: 1000px;">
    <div
      id="container"
      style="width: 100%; height: 100%;"
    ></div>

    <button @click="getWidth">改变</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
/* eslint-disable no-undef */
export default {
  name: 'GetAmapPositions',
  data() {
    return {
      map: ''

    }
  },
  mounted() {
    this.$nextTick(() => {
      this.map = new AMap.Map('container', {
        zoom: 20, // 级别
        center: [120.980737, 31.385598], // 中心点坐标
        viewMode: '3D', // 使用3D视图
        expandZoomRange: true
      })
      this.map.on('click', this.mapClick)
    })
  },
  methods: {
    mapClick(e) {
      console.log([e.lnglat.getLng(), e.lnglat.getLat()])
      console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat())
    },

    getWidth() {
      const _this = this
      const s = this.map.getBounds()
      const d = this.map.getSize()
      console.log(s)
      console.log(d)
      console.log('比例尺(屏幕距离一米代表实际距离多少米)：', this.map.getScale())

      s.path.forEach((el, i) => {
        if (i < 2) {
          const marker = new AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: el
          })
          _this.map.add(marker)
        }
      })

      // 120.97713139631298
      // 120.98517803422669
      const p1 = s.path[0]
      const p2 = s.path[1]
      console.log(AMap.GeometryUtil.distanceOfLine([p1, p2]))
      console.log('1像素最大缩放相当于多少米：', AMap.GeometryUtil.distanceOfLine([p1, p2]) / 1500)
      console.log('1920像素相当于（米）：', AMap.GeometryUtil.distanceOfLine([p1, p2]) / 1500 * 1920)
    }
  }
}
</script>

<style scoped>
</style>
