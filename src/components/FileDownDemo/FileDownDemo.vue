<template>
  <div>
    <button @click="downF">下载测试</button>
  </div>
</template>

<script>
import downFile from './fileHandle'
export default {
  name: 'FileDownDemo',
  methods: {
    downF() {
      const obj = {
        key: 'authorization',
        val: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbnR1dWlkIjoiIiwiZW52aXJvbm1lbnQiOiIxIiwiZW50bmFtZSI6IiIsImN1cnJlbnRUaW1lTWlsbGlzIjoiMTU2MzE2NzA4ODQ0OSIsInJvbGVzIjoiMSwyLDMiLCJleHAiOjE1NjM3NzE4ODgsInVzZXJJZCI6IjQ2MmU0ZDc4MWM1MDQ2YmRiZDQxZDk5MDI1NWNhZTQxIiwidXNlcm5hbWUiOiJhZG1pbiJ9.4QGIJYulcy7qFDrLTZzww10zjWciSta2dKf9TwbZ1wU'
      }
      downFile('/other/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3300305952,1328708913&fm=27&gp=0.jpg', [obj])
    }
  }
}
</script>

<style>
</style>
