<template>
  <div>
    <ti-edit v-model="tiVal"></ti-edit>
  </div>
</template>

<script>
import TiEdit from './TiEdit'
export default {
  name: 'VueTinymceDemo',

  components: { TiEdit },

  data() {
    return {
      tiVal: 'woshiceshihhhhh'
    }
  }

}
</script>

<style>
</style>
