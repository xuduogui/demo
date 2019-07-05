
<template>
  <div>

  </div>
</template>

<script>
/* eslint-disable no-undef */
import _m from '../../plugins/utils/utils'
export default {
  name: 'UtilsTest',
  mounted() {
    const obj = {
      test1: '3333',
      test2: function() {
        return 332222
      }
    }
    const obj2 = _.cloneDeep(obj)
    const myObj = _m.cloneDeep(obj)
    obj.test1 = 2342342342
    // eslint-disable-next-line no-console
    console.log(obj, obj2, myObj)
  }
}
</script>

<style scoped>
</style>
