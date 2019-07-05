
<template>
  <div>
    WebsocketDemo
  </div>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'WebsocketDemo',
  mounted() {
    // const _protocol = this.makeProtocol()
    const sev = this.serveInit('ws:a1MQOtL3Kad.iot-as-mqtt.cn-shanghai.aliyuncs.com:443?mqttclientId=12345|securemode=3,signmethod=hmacsha1,timestamp=789|&mqttUsername=DTU2-1&a1MQOtL3Kad&mqttPasswrod=E77F2A87F062DDC35C1D034A72BB7410FAAF93B8')

    if (sev) {
      sev.addEventListener('open', ev => {
        console.log('>>>【open】<<<', ev)
      })
      sev.addEventListener('message', ev => {
        console.log('>>>【message】<<<', ev)
      })
      sev.addEventListener('error', ev => {
        console.log('>>>【error】<<<', ev)
      })
      sev.addEventListener('close', ev => {
        console.log('>>>【close】<<<', ev)
      })
    }
  },
  methods: {
    serveInit(url, protocol) {
      if (!window.WebSocket) {
        return false
      }
      return new WebSocket(url, protocol)
    },
    makeProtocol() {
      return [
        'mqttclientId=12345|securemode=3,signmethod=hmacsha1,timestamp=789|',
        'mqttUsername=device&pk',
        'mqttPasswrod=E77F2A87F062DDC35C1D034A72BB7410FAAF93B8'
      ]
    }
  }
}
</script>

<style>
</style>
