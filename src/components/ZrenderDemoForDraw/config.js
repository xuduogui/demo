const config = {
  // 线
  line: {
    style: {
      stroke: 'rgb(81, 163, 200)',
      lineWidth: 4
    }
  },
  // 点
  point: {
    draggable: true
  },
  // 多边形
  poly: {
    style: {
      opacity: 1,
      stroke: 'rgb(81, 163, 200)',
      lineWidth: 4
    }
  },
  // 多边形线
  polyline: {
    style: {
      stroke: 'rgb(81, 163, 200)',
      lineWidth: 4
    }
  },
  // 圆
  circle: {},
  // 文本
  text: {},

  // 拖拉点（如：多边形）
  dragPoint: {
    style: {
      fill: 'blue'
    }
  },

  // 辅助线
  subline: {
    style: {
      lineDash: [3, 3, 3],
      stroke: '#fff',
      lineDashOffset: 50,
      lineWidth: 5
    }
  }
}

export default config
