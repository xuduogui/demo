/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
let COMMAND_START = 0xfe // 通讯起始位
let COMMAND_END = 0xff // 通讯结束位
let COMMAND_SET = 0x01 // 属性设置
let COMMAND_REPORT_REPLY = 0x02 // 上报数据返回结果
let COMMAND_SET_REPLY = 0x03 // 属性设置设备返回结果
let COMMAD_XUNJIAN = 0x64 // 巡检命令
let COMMAD_HUOJING = 0x6e // 火警110
let COMMAD_GUZHANG = 0x6f // 故障111
let COMMAD_QIDONG = 0x70 // 启动112
let COMMAD_FANKUI = 0x71 // 反馈113
let COMMAD_JIANGUAN = 0x72 // 监管114
let COMMAD_PINGBI = 0x73 // 屏蔽115
let COMMAD_YULIU = 0x74 // 预留116
let COMMAD_PEIZHI1 = 0x67 // 外设读取控制器回路总数、多线总数、层显总数以及各回路节点数的配置
let COMMAD_PEIZHI2 = 0x68 // 外设读取控制器各回路节点的属性配置
let COMMAD_CHONGQI = 0x00 // 控制器重新启动信息
let COMMAD_XIAOYIN = 0xcb // 消音
let COMMAD_JIOASHI = 0xcc // 校时
let ALINK_PROP_REPORT_METHOD = 'thing.event.property.post' // 标准ALink JSON格式topic， 设备上传属性数据到云端
let ALINK_PROP_SET_METHOD = 'thing.service.property.set' // 标准ALink JSON格式topic， 云端下发属性控制指令到设备端
let ALINK_PROP_SET_REPLY_METHOD = 'thing.service.property.set' // 标准ALink JSON格式topic, 设备上报属性设置的结果到云端
let CONST_LENTH = 32 // 每一点的字节数

/*
*火警110故障111启动112反馈113
*监管114屏蔽115预留116
*/

let msgTypeArray = [
  [100, '巡检'],
  [110, '火警'],
  [111, '故障'],
  [112, '启动'],
  [113, '反馈'],
  [114, '监管'],
  [115, '屏蔽'],
  [116, '预留']
]
let msgTypeArrayMap = new Map(msgTypeArray)

/*
0感烟探头 1感温探头 2差温探头 3剩余电流 4电气测温 5手动按钮 6消火栓钮
7感温电缆 8 感温光纤 9红外光束 10压力开关 11可燃气体 12水流指示 13输入模块
14 火灾显示 15并联探头 16传感器２ 17传感器３ 18传感器４ 19传感器５ 20输入输出 21脉冲方式 22自动方式 23自动脉冲 24消防广播 25消防警铃 26声光报警27新风机。 28照明切断 29动力切断 30防排烟阀 31正压风阀 32卷帘半降 33卷帘全降34消防警笛 35排烟风机 36防火阀。 37防火门。 38空调切断 39正压风机 40消防水幕41电梯迫降 42信号蝶阀 43应急照明 44其它０２ 45其它０３ 46其它０４ 47其它０５48其它０６ 49其它０７ 50其它０８ 51其它０９ 52其它１０ 53其它１１ 54多线模块55气体灭火
*/

let equipmentTypeArray = [
  [0, '感烟探头'],
  [1, '感温探头'],
  [2, '差温探头'],
  [3, '剩余电流'],
  [4, '电气测温'],
  [5, '手动按钮'],
  [6, '消火栓钮'],
  [7, '感温电缆'],
  [8, '感温光纤'],
  [9, '红外光束'],
  [10, '压力开关'],
  [11, '可燃气体 '],
  [12, '水流指示'],
  [13, '输入模块'],
  [14, '火灾显示'],
  [15, '并联探头'],
  [16, '传感器２'],
  [17, '传感器３'],
  [18, '传感器４'],
  [19, '传感器５'],
  [20, '输入输出'],
  [21, '脉冲方式'],
  [22, '自动方式'],
  [23, '自动脉冲'],
  [24, '消防广播'],
  [25, '消防警铃'],
  [26, '声光报警'],
  [27, '新风机'],
  [28, '照明切断'],
  [29, '动力切断'],
  [30, '防排烟阀'],
  [31, '正压风阀'],
  [32, '卷帘半降'],
  [33, '卷帘全降'],
  [34, '消防警笛'],
  [35, '排烟风机'],
  [36, '防火阀'],
  [37, '防火门'],
  [38, '空调切断'],
  [39, '正压风机'],
  [40, '消防水幕'],
  [41, '电梯迫降'],
  [42, '信号蝶阀'],
  [43, '应急照明'],
  [44, '其它０２'],
  [45, '其它０３'],
  [46, '其它０４'],
  [47, '其它０５'],
  [48, '其它０６'],
  [49, '其它０７'],
  [50, '其它０８'],
  [51, '其它０９'],
  [52, '其它１０'],
  [53, '其它１１'],
  [54, '多线模块'],
  [55, '气体灭火']
]
let equipmentTypeArrayMap = new Map(equipmentTypeArray)

/*
1表示火警。
2表示监管报警。
3表示屏蔽。
7表示模块启动。
8表示故障。
16表示回路板上通讯故障。
78表示短路。
79表示开路。
83表示气体控制板通讯故障。
196应急广播故障。
*当回路为0时，点号1- 252
1启动  2反馈  3启动并反馈  8故障
*当回路为200- 207时
0面板信号 1现场信号 2火警信号 3面板喷洒 4现场喷洒 5火警喷洒
6面板启动 7现场启动 8火警启动 9不明启动
*/

let msgStatusArray1 = [
  [1, '火警'],
  [2, '监管报警'],
  [3, '屏蔽'],
  [7, '模块启动'],
  [8, '故障'],
  [16, '回路板上通讯故障'],
  [78, '短路'],
  [79, '开路'],
  [83, '气体控制板通讯故障'],
  [196, '应急广播故障']
]
let msgStatusArray1Map = new Map(msgStatusArray1)

let msgStatusArray2 = [[1, '启动'], [2, '反馈'], [3, '启动并反馈'], [8, '故障']]
let msgStatusArray2Map = new Map(msgStatusArray2)

let msgStatusArray3 = [
  [0, '面板信号'],
  [1, '现场信号'],
  [2, '火警信号'],
  [3, '面板喷洒'],
  [4, '现场喷洒'],
  [5, '火警喷洒'],
  [6, '面板启动'],
  [7, '现场启动'],
  [8, '火警启动'],
  [9, '不明启动']
]
let msgStatusArray3Map = new Map(msgStatusArray3)

/*
*当回路为200- 207时，描述区的第一个字节为
0面板按钮发出启动信号   1现场按钮发出启动信号
2火警信号发出启动信号   3面板按钮发出喷洒信号
4现场按钮发出喷洒信号   5火警信号发出喷洒信号
6面板启动按钮启动喷洒   7现场启动按钮启动喷洒
8火灾报警信号启动喷洒  9不明控制信号启动喷洒
10气体声光报警器＿动作 11气体声光报警器＿故障
12气体喷洒警告灯＿动作 13气体喷洒警告灯＿故障
14气体灭火＿瓶头阀动作 15气体灭火＿瓶头阀故障
16气体灭火＿启动阀动作 17气体灭火＿启动阀故障
18气体灭火控制模块动作 19气体灭火控制模块故障
20气体现场控制盘＿故障 21面板启动＿声光报警器
22面板启动＿喷洒警告灯 23面板启动＿＿＿瓶头阀
24面板启动＿＿＿启动阀 25面板启动＿＿控制模块
26现场启动＿声光报警器 27现场启动＿喷洒警告灯
28现场启动＿＿＿瓶头阀 29现场启动＿＿＿启动阀
30现场启动＿＿控制模块 31火警启动＿声光报警器
32火警启动＿喷洒警告灯 33火警启动＿＿＿瓶头阀
34火警启动＿＿＿启动阀 35火警启动＿＿控制模块
36不明启动＿声光报警器 37不明启动＿喷洒警告灯
38不明信号启动＿瓶头阀 39不明信号启动＿启动阀
40不明信号启动控制模块
*/

let msgDetailArray = [
  [0, '面板按钮发出启动信号'],
  [1, '现场按钮发出启动信号'],
  [2, '火警信号发出启动信号'],
  [3, '面板按钮发出喷洒信号'],
  [4, '现场按钮发出喷洒信号'],
  [5, '火警信号发出喷洒信号'],
  [6, '面板启动按钮启动喷洒'],
  [7, '现场启动按钮启动喷洒'],
  [8, '火灾报警信号启动喷洒'],
  [9, '不明控制信号启动喷洒'],
  [10, '气体声光报警器＿动作'],
  [11, '气体声光报警器＿故障 '],
  [12, '气体喷洒警告灯＿动作'],
  [13, '气体喷洒警告灯＿故障'],
  [14, '气体灭火＿瓶头阀动作'],
  [15, '气体灭火＿瓶头阀故障'],
  [16, '气体灭火＿启动阀动作'],
  [17, '气体灭火＿启动阀故障'],
  [18, '气体灭火控制模块动作'],
  [19, '气体灭火控制模块故障'],
  [20, '气体现场控制盘＿故障'],
  [21, '面板启动＿声光报警器'],
  [22, '面板启动＿喷洒警告灯'],
  [23, '面板启动＿＿＿瓶头阀'],
  [24, '面板启动＿＿＿启动阀'],
  [25, '面板启动＿＿控制模块'],
  [26, '现场启动＿声光报警器'],
  [27, '现场启动＿喷洒警告灯'],
  [28, '现场启动＿＿＿瓶头阀'],
  [29, '现场启动＿＿＿启动阀'],
  [30, '现场启动＿＿控制模块'],
  [31, '火警启动＿声光报警器'],
  [32, '火警启动＿喷洒警告灯'],
  [33, '火警启动＿＿＿瓶头阀'],
  [34, '火警启动＿＿＿启动阀'],
  [35, '火警启动＿＿控制模块'],
  [36, '不明启动＿声光报警器'],
  [37, '不明启动＿喷洒警告灯'],
  [38, '不明信号启动＿瓶头阀'],
  [39, '不明信号启动＿启动阀'],
  [40, '不明信号启动控制模块']
]
let msgDetailArrayArrayMap = new Map(msgDetailArray)

function rawDataToProtocol(bytes) {
  let uint8Array = new Uint8Array(bytes.length)
  for (let i = 0; i < bytes.length; i++) {
    uint8Array[i] = bytes[i] & 0xff
  }
  let dataView = new DataView(uint8Array.buffer, 0)
  let jsonMap = {}
  let params = {}
  class msg {
    constructor(
      prop_machine2,
      prop_line,
      prop_point,
      prop_zone,
      prop_equipmentType,
      prop_equipmentTypeDesc,
      prop_msgStatus,
      prop_msgStatusDesc,
      prop_time,
      prop_msgDetail
    ) {
      this.prop_machine2 = prop_machine2 // 机号
      this.prop_line = prop_line // 回路号
      this.prop_point = prop_point // 点号
      this.prop_zone = prop_zone // 机号分区
      this.prop_equipmentType = prop_equipmentType // 类型
      this.prop_equipmentTypeDesc = prop_equipmentTypeDesc // 类型描述
      this.prop_msgStatus = prop_msgStatus // 状态
      this.prop_msgStatusDesc = prop_msgStatusDesc // 状态描述
      this.prop_time = prop_time // 报警时间
      this.prop_msgDetail = prop_msgDetail // 描述
    }
  } // 每一点的具体信息结构体
  let msgs = []
  let fHead = uint8Array[0] // 数据起始位
  let fEnd = uint8Array[bytes.length - 1] // 数据结束位
  if (fHead == COMMAND_START && fEnd == COMMAND_END) {
    // 共通部分
    jsonMap.method = ALINK_PROP_REPORT_METHOD // ALink JSON格式 - 属性上报topic
    jsonMap.version = '1.0' // ALink JSON格式 - 协议版本号固定字段
    jsonMap.id = '' + dataView.getInt8(1) // ALink JSON格式 - 标示该次请求id值
    params.sensorType = 'jb3208' // 设备型号
    params.dataType = 0 // 0：报警数据；1：实时数据
    params.prop_machine1 = uint8Array[1] // 控制器编号
    params.prop_msgType = uint8Array[2] // 信息代码
    params.prop_msgTypeDesc = msgTypeArrayMap.get(params.prop_msgType)
      ? msgTypeArrayMap.get(params.prop_msgType)
      : '缺省' // 代表信息代码描述
    params.prop_msgLength = parseInt(
      uint8Array[4].toString(16).concat(uint8Array[3].toString(16)),
      16
    ) // 信息体长度（低高）
    if (
      params.prop_msgType == COMMAD_HUOJING ||
      params.prop_msgType == COMMAD_GUZHANG ||
      params.prop_msgType == COMMAD_QIDONG ||
      params.prop_msgType == COMMAD_FANKUI ||
      params.prop_msgType == COMMAD_JIANGUAN ||
      params.prop_msgType == COMMAD_PINGBI ||
      params.prop_msgType == COMMAD_YULIU
    ) {
      //* 火警110故障111启动112反馈113*监管114屏蔽115预留116
      // 信息体详情
      params.prop_total = parseInt(
        uint8Array[6].toString(16).concat(uint8Array[5].toString(16)),
        16
      ) // 总数（低高）
      for (var index = 0; index < params.prop_total; index++) {
        var msgTmp = new msg()
        var prop_year = ''
        var prop_month = ''
        var prop_day = ''
        var prop_hour = ''
        var prop_minute = ''
        let prop_msgDetailTmp = ''
        msgTmp.prop_machine2 = padNumber(uint8Array[7 + CONST_LENTH * index], 2) // 机号
        msgTmp.prop_line = padNumber(uint8Array[8 + CONST_LENTH * index], 2) // 回路号
        msgTmp.prop_point = padNumber(uint8Array[9 + CONST_LENTH * index], 3) // 点号
        msgTmp.prop_zone = padNumber(
          parseInt(
            uint8Array[11 + CONST_LENTH * index]
              .toString(16)
              .concat(uint8Array[10 + CONST_LENTH * index].toString(16)),
            16
          ),
          4
        ) // 分区（低高）
        msgTmp.prop_equipmentType = uint8Array[12 + CONST_LENTH * index] // 代表类型
        msgTmp.prop_equipmentTypeDesc = equipmentTypeArrayMap.get(
          msgTmp.prop_equipmentType
        )
          ? equipmentTypeArrayMap.get(msgTmp.prop_equipmentType)
          : '缺省' // 代表类型描述

        msgTmp.prop_msgStatus = uint8Array[13 + CONST_LENTH * index] // 代表数据状态
        msgTmp.prop_msgStatusDesc = msgStatusArray1Map.get(
          msgTmp.prop_msgStatus
        )
          ? msgStatusArray1Map.get(msgTmp.prop_msgStatus)
          : '缺省' // 代表数据状态描述
        if (
          parseInt(msgTmp.prop_line) == 0 &&
          (parseInt(msgTmp.prop_point) >= 0 &&
            parseInt(msgTmp.prop_point) <= 252)
        ) {
          // 当回路为0时，点号1- 252
          msgTmp.prop_msgStatusDesc = msgStatusArray2Map.get(
            msgTmp.prop_msgStatus
          )
            ? msgStatusArray2Map.get(msgTmp.prop_msgStatus)
            : '缺省' // 代表数据状态描述
        }
        if (
          parseInt(msgTmp.prop_line) >= 200 &&
          parseInt(msgTmp.prop_line) <= 207
        ) {
          // 当回路为200- 207
          msgTmp.prop_msgStatusDesc = msgStatusArray3Map.get(
            msgTmp.prop_msgStatus
          )
            ? msgStatusArray3Map.get(msgTmp.prop_msgStatus)
            : '缺省' // 代表数据状态描述
        }
        // 原始数据就是十进制-start
        prop_year = uint8Array[14 + CONST_LENTH * index].toString(16) // 代表报警年
        prop_month = uint8Array[15 + CONST_LENTH * index].toString(16) // 代表报警月
        prop_day = uint8Array[16 + CONST_LENTH * index].toString(16) // 代表报警日
        prop_hour = uint8Array[17 + CONST_LENTH * index].toString(16) // 代表报警时
        prop_minute = uint8Array[18 + CONST_LENTH * index].toString(16) // 代表报警分
        msgTmp.prop_time =
          '20' +
          padNumber(prop_year, 2) +
          padNumber(prop_month, 2) +
          padNumber(prop_day, 2) +
          padNumber(prop_hour, 2) +
          padNumber(prop_minute, 2)
        // 原始数据就是十进制-end
        prop_msgDetailTmp = uint8Array[19 + CONST_LENTH * index] // 代表描述区第一字节
        msgTmp.prop_msgDetail =
          msgTmp.prop_line + '回路' + msgTmp.prop_point + '号' // 代表描述
        if (
          parseInt(msgTmp.prop_line) >= 200 &&
          parseInt(msgTmp.prop_line) <= 207
        ) {
          // 当回路为200- 207
          msgTmp.prop_msgDetail = msgDetailArrayArrayMap.get(prop_msgDetailTmp)
            ? msgStatusArramsgDetailArrayArrayMapy3Map.get(prop_msgDetailTmp)
            : '缺省'
        } // 代表描述
        msgs[index] = msgTmp
      }
      params.msgs = msgs
    } else if (params.prop_msgType == COMMAD_PEIZHI2) {
      //* 外设读取控制器各回路节点的属性配置
      // 信息体详情
      // TODO
      params.prop_total = parseInt(
        uint8Array[6].toString(16).concat(uint8Array[5].toString(16)),
        16
      ) // 总数（低高）
      for (var index = 0; index < params.prop_total; index++) {
        var msgTmp = new msg()
        var prop_year = ''
        var prop_month = ''
        var prop_day = ''
        var prop_hour = ''
        var prop_minute = ''
        msgTmp.prop_machine2 = uint8Array[7 + CONST_LENTH * index] // 机号
        msgTmp.prop_line = uint8Array[8 + CONST_LENTH * index] // 回路号
        msgTmp.prop_point = uint8Array[9 + CONST_LENTH * index] // 点号
        msgTmp.prop_zone = parseInt(
          uint8Array[11 + CONST_LENTH * index]
            .toString(16)
            .concat(uint8Array[10 + CONST_LENTH * index].toString(16)),
          16
        ) // 分区（低高）
        msgTmp.prop_equipmentType = uint8Array[12 + CONST_LENTH * index] // 代表类型
        msgTmp.prop_msgStatus = uint8Array[13 + CONST_LENTH * index] // 代表数据状态
        // 原始数据就是十进制-start
        prop_year = uint8Array[14 + CONST_LENTH * index].toString(16) // 代表报警年
        prop_month = uint8Array[15 + CONST_LENTH * index].toString(16) // 代表报警月
        prop_day = uint8Array[16 + CONST_LENTH * index].toString(16) // 代表报警日
        prop_hour = uint8Array[17 + CONST_LENTH * index].toString(16) // 代表报警时
        prop_minute = uint8Array[18 + CONST_LENTH * index].toString(16) // 代表报警分
        msgTmp.prop_time =
          '20' + prop_year + prop_month + prop_day + prop_hour + prop_minute
        // 原始数据就是十进制-end
        msgs[index] = msgTmp
      }
      params.msgs = msgs
      params.prop_msgDetail = '99' // 描述 99：缺省
    }
  } else {
    jsonMap.version = '1.0' // ALink JSON格式 - 协议版本号固定字段
    jsonMap.id = '' + dataView.getInt32(1) // ALink JSON格式 - 标示该次请求id值
    jsonMap.code = '' + dataView.getUint8(5)
    jsonMap.data = {}
  }
  jsonMap.params = params // ALink JSON格式 - params标准字段
  return jsonMap
}

function protocolToRawData(json) {
  let method = json.method
  let id = json.id
  let version = json.version
  let code = json.code
  let payloadArray = []
  if (method == ALINK_PROP_REPORT_METHOD) {
    // 设备上报数据返回结果

    payloadArray = payloadArray.concat(buffer_uint8(COMMAND_REPORT_REPLY)) // command字段
    payloadArray = payloadArray.concat(buffer_int32(parseInt(id))) // ALink JSON格式 'id'
    payloadArray = payloadArray.concat(buffer_uint8(code))
  } else {
    // 未知命令，对于有些命令不做处理
    // eslint-disable-next-line no-undef
    payloadArray = payloadArray.concat(buffer_uint8(COMMAD_UNKOWN)) // command字段
    payloadArray = payloadArray.concat(buffer_int32(parseInt(id))) // ALink JSON格式 'id'
    payloadArray = payloadArray.concat(buffer_uint8(code))
  }
  return payloadArray
}

// 以下是部分辅助函数
function buffer_uint8(value) {
  let uint8Array = new Uint8Array(1)
  let dv = new DataView(uint8Array.buffer, 0)
  dv.setUint8(0, value)
  return [].slice.call(uint8Array)
}
function buffer_int16(value) {
  let uint8Array = new Uint8Array(2)
  let dv = new DataView(uint8Array.buffer, 0)
  dv.setInt16(0, value)
  return [].slice.call(uint8Array)
}
function buffer_int32(value) {
  let uint8Array = new Uint8Array(4)
  let dv = new DataView(uint8Array.buffer, 0)
  dv.setInt32(0, value)
  return [].slice.call(uint8Array)
}
function buffer_float32(value) {
  let uint8Array = new Uint8Array(4)
  let dv = new DataView(uint8Array.buffer, 0)
  dv.setFloat32(0, value)
  return [].slice.call(uint8Array)
}

// 给数字字符串补零，不支持负数
function padNumber(num, fill) {
  let len = ('' + num).length
  return Array(fill > len ? fill - len + 1 || 0 : 0).join(0) + num
}

function Test() {
  // FFFFFF090000016E010A830000
  // FE 01 6F 42 00 02 00 01 4D 02 00 00 00 08 19 05 08 14 58 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 4D 01 00 00 00 08 19 05 08 15 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 85 73 FF
  // FFFFFF0A01016E0113000101C8140D05110D090F000000000000000001B4
  // 巡检
  // var rawdata_report_prop = new Buffer([
  //     0xFF,0xFF,0xFF, //固定command头, 0代表是上报属性
  //     0x09, 0x00, 0x00, 0x01, //对应id字段， 标记请求的序号
  //     0x6E, 0x01, //两字节 int16, 对应属性 prop_int16
  //     0x0A, //一字节 bool, 对应属性 prop_bool
  //     0x83, 0x00, 0x00 //四字节 float, 对应属性 prop_float
  // ]);
  // 火警
  let rawdata_report_prop1 = Buffer.from([
    0xfe,
    0x01,
    0x6f,
    0x42,
    0x00,
    0x02,
    0x00,
    0x01,
    0x4d,
    0x02,
    0x00,
    0x00,
    0x00,
    0x08,
    0x19,
    0x05,
    0x08,
    0x14,
    0x58,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x01,
    0x4d,
    0x01,
    0x00,
    0x00,
    0x00,
    0x08,
    0x19,
    0x05,
    0x08,
    0x15,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x00,
    0x85,
    0x73,
    0xff
  ])
  // 巡检
  let rawdata_report_prop2 = Buffer.from([
    0xfe,
    0x01,
    0x64,
    0x01,
    0x00,
    0x64,
    0x56,
    0xdb,
    0xff
  ])
  // 0x00002233441232013fa00000
  // var rawdata_report_prop = new Buffer([
  //     0x00, //固定command头, 0代表是上报属性
  //     0x00, 0x22, 0x33, 0x44, //对应id字段， 标记请求的序号
  //     0x12, 0x32, //两字节 int16, 对应属性 prop_int16
  //     0x01, //一字节 bool, 对应属性 prop_bool
  //     0x3f, 0xa0, 0x00, 0x00 //四字节 float, 对应属性 prop_float
  // ]);
  console.log(rawDataToProtocol(rawdata_report_prop1))
}

const tst = Buffer.from([0xfe, 0x01, 0x64, 0x01, 0x00, 0x64, 0x56, 0xdb, 0xff])
// console.log(tst)
// console.log(rawDataToProtocol(tst))
// Test();

export default {
  rawDataToProtocol
}
