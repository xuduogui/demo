import typeData from '../../type-data/index'

function renderData(data, app) {
  data.forEach(el => {
    switch (el.dataType) {
      case 1:
        typeData.TYPE_IMG.analyze(el, app)
        break

      default:
        break
    }
  })
}

export default renderData
