
<template>
  <div>
    mqtt
    <button @click="publishTopic">Publish</button>
  </div>
</template>

<script>
/* eslint-disable no-console */
const mqtt = require('mqtt')

import rd from './dataRender'

export default {
  name: 'MqttDemo',
  data() {
    return {
      storeMsg: [],
      client: {},
      // topics: '/sys/a1krMJCaXEW/pvQV5Vl7AhyezU7ivVqH/thing/model/down_raw',
      topics: '/a1MQOtL3Kad/DTU2-1/user/rx/tx',
      topic_pub: '/sys/a1krMJCaXEW/pvQV5Vl7AhyezU7ivVqH/thing/model/up_raw',
      host: 'mqtt:a1MQOtL3Kad.iot-as-mqtt.cn-shanghai.aliyuncs.com:443'
    }
  },
  mounted() {
    const options = {
      protocolId: 'MQTT',
      protocolVersion: 4,

      // 设置0为禁用
      keepalive: 300,

      // 两次重新连接之间的间隔
      reconnectPeriod: 1000,

      // clientId
      // 填写mqttClientId，用于MQTT的底层协议报文。
      // 格式固定：${clientId}|securemode=3,signmethod=hmacsha1|。
      // 完整示例：12345|securemode=3,signmethod=hmacsha1|。
      // 其中
      // ${clientId}为设备的ID信息。可取任意值，长度在64字符以内。建议使用设备的MAC地址或SN码。
      // securemode为安全模式，TCP直连模式设置为securemode=3，TLS直连为securemode=2。
      // signmethod为算法类型，支持hmacmd5和hmacsha1。
      clientId: '123123|securemode=3,signmethod=hmacsha1|',

      username: 'DTU2-1&a1MQOtL3Kad',
      password: '3BE8C1BE0DDB2D362A6AE809B95A1D949BDA444C'

      // username
      // 由设备名DeviceName、符号（&）和产品ProductKey组成。
      // 固定格式：${ YourDeviceName }& ${ YourPrductKey } 。
      // 完整示例如：device & alxxxxxxxxxx。
      // =======================================================
      // password
      // 可以使用物联网平台提供的生成工具自动生成Password，也可以手动生成Password。
      // productKey：设备所属产品Key。可在控制台设备详情页查看。
      // deviceName：设备名称。可在控制台设备详情页查看。
      // deviceSecret：设备密钥。可在控制台设备详情页查看。
      // timestamp：（可选）时间戳。
      // clientId：设备的ID信息，与Client ID中${clientId}一致。
      // method：选择签名算法类型，与Client ID中signmethod确定的加密方法一致。
      // username: 'pvQV5Vl7AhyezU7ivVqH&a1krMJCaXEW',
      // password: 'F2B3912808494660B9E5D21D9AB9CBF36DBBB43A'

      // rejectUnauthorized: false
    }

    this.client = mqtt.connect(this.host, options)

    this.eveAdd(this.client)
  },
  methods: {
    /**
     * 发布消息到主题
     */
    publishTopic() {
      const _this = this
      this.$log.primary('>>>【== 开始发布主题 == 】<<<')
      if (this.client.publish) {
        this.client.publish(this.topic_pub, 'Hello i am mqtt', err => {
          if (!err) {
            _this.$log.danger('>>>【== publish error == 】<<<')
            console.log(err)
          } else {
            _this.$log.primary('>>>【== 发布主题无异常 == 】<<<')
          }
        })
      } else {
        this.$log.warning('>>>【== mqtt 加载中 。。。。。。 == 】<<<')
      }
    },
    /**
     * 添加服务监听
     */
    eveAdd(client) {
      const _this = this
      // const _topic = [this.topics, this.topic_pub]
      const _topic = this.topics

      client.on('connect', function(connack) {
        _this.$log.success('>>>【connect(成功（重新）连接)】<<<')
        _this.$log.primary('>>>【== connack == 】<<<')
        console.log(connack)

        const subscribeOption = {
          qos: 2
        }

        client.subscribe(_topic, subscribeOption, function(err, granted) {
          if (!err) {
            _this.$log.primary('>>>【 subscribe suc 成功订阅主题 (' + _topic + ')】<<<')
            _this.$log.primary('>>>【== granted == 】<<<')
            console.log(granted)
          } else {
            _this.$log.warning('>>>【 subscribe error (' + _topic + ')】<<<')
          }
        })
      })

      client.on('reconnect', function() {
        _this.$log.primary('>>>【reconnect(重新连接开始)】<<<')
      })

      client.on('close', function() {
        _this.$log.warning('>>>【close(断开连接)】<<<')
      })

      client.on('disconnect', function() {
        _this.$log.warning('>>>【disconnect(从代理接收断开数据包)】<<<')
      })

      client.on('offline', function() {
        _this.$log.danger('>>>【offline(客户端脱机)】<<<')
      })

      client.on('error', function() {
        _this.$log.danger('>>>【error(客户端无法连接（即connack rc！= 0）或发生解析错误)】<<<')
      })
      client.on('end', function() {
        _this.$log.danger('>>>【end(被叫时发出)】<<<')
      })

      client.on('message', function(topic, message, packet) {
        // message is Buffer
        _this.$log.primary('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>【 message(客户端收到发布数据包)】<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        _this.$log.primary('>>>【 == topic == 】 <<<')
        console.log(topic)

        _this.$log.primary('>>>【 == message == 】 <<<')
        console.log(message)

        const show = rd.rawDataToProtocol(message)
        _this.$log.primary('>>>【 == show message == 】 <<<')
        console.log(show)

        _this.$log.primary('>>>【 == packet == 】 <<<')
        console.log(packet)

        _this.storeMsg.push({
          topic,
          show,
          packet
        })
        _this.$log.primary('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>【 message(客户端收到发布数据包) 结束 】<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        // client.end()
      })

      client.on('packetsend', function(packet) {
        _this.$log.success('>>>【packetsend(客户端 发送 任何数据包)】<<<', packet)
        _this.$log.primary('>>>【 == packet == 】 <<<')
        console.log(packet)
        // client.end()
      })

      client.on('packetreceive', function(packet) {
        // message is Buffer
        _this.$log.success('>>>【packetreceive(客户端 收到 任何数据包)】<<<', packet)
        _this.$log.primary('>>>【 == packet == 】 <<<')
        console.log(packet)
        // client.end()
      })
    }
  }
}
</script>

<style>
</style>
