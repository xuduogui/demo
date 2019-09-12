const EntranceDemo = () =>
  import('../../components/EntranceDemo/EntranceDemo.vue')
const MathDemo = () => import('../../components/MathDemo/MathDemo.vue')
const GetAmapPositions = () =>
  import('../../components/GetAmapPositions/GetAmapPositions.vue')
const EasyPlayerDemo = () =>
  import('../../components/EasyPlayDemo/EasyPlayDemo.vue')
const UtilsTest = () => import('../../components/UtilsTest/UtilsTest.vue')
const MqttDemo = () => import('../../components/MqttDemo/MqttDemo.vue')
const WebsocketDemo = () =>
  import('../../components/WebsocketDemo/WebsocketDemo.vue')
const ZrenderDemo = () => import('../../components/ZrenderDemo/ZrenderDemo.vue')
const ImgZip = () => import('../../components/ImgZip/ImgZip.vue')
const UploadImgDemo = () =>
  import('../../components/UploadImgDemo/UploadImgDemo.vue')
const FileDownDemo = () =>
  import('../../components/FileDownDemo/FileDownDemo.vue')
const PixiDemo = () => import('../../components/PixiDemo/PixiDemo.vue')
const VueQuillEditorDemo = () =>
  import('../../components/VueQuillEditorDemo/VueQuillEditorDemo.vue')
const VueTinymceDemo = () =>
  import('../../components/VueTinymceDemo/VueTinymceDemo.vue')
const ZrenderDemoForScal = () =>
  import('../../components/ZrenderDemoForScal/ZrenderDemoForScal.vue')

export default [
  {
    path: '/',
    component: EntranceDemo,
    xDescription: '入口列表',
    xShow: false
  },
  {
    path: '/math',
    component: MathDemo,
    xDescription: '一个四则运算生成器，支持右键纯净打印',
    xShow: true
  },
  {
    path: '/ZrenderDemoForScal',
    component: ZrenderDemoForScal,
    xDescription: 'ZrenderDemoForScal缩放实例',
    xShow: true
  },
  {
    path: '/VueTinymceDemo',
    component: VueTinymceDemo,
    xDescription: '富文本VueTinymceDemo',
    xShow: VueTinymceDemo
  },
  {
    path: '/VueQuillEditorDemo',
    component: VueQuillEditorDemo,
    xDescription: '富文本编辑器VueQuillEditor',
    xShow: true
  },
  {
    path: '/amap',
    component: GetAmapPositions,
    xDescription: '高德地图的坐标选取器',
    xShow: true
  },
  {
    path: '/easyplayer',
    component: EasyPlayerDemo,
    xDescription: 'easyPlayer',
    xShow: true
  },
  {
    path: '/UtilsTest',
    component: UtilsTest,
    xDescription: 'UtilsTest',
    xShow: false
  },
  {
    path: '/MqttDemo',
    component: MqttDemo,
    xDescription: 'MqttDemo',
    xShow: true
  },
  {
    path: '/WebsocketDemo',
    component: WebsocketDemo,
    xDescription: 'WebsocketDemo',
    xShow: true
  },
  {
    path: '/ZrenderDemo',
    component: ZrenderDemo,
    xDescription: 'ZrenderDemo',
    xShow: true
  },
  {
    path: '/ImgZip',
    component: ImgZip,
    xDescription: 'ImgZip',
    xShow: true
  },
  {
    path: '/UploadImgDemo',
    component: UploadImgDemo,
    xDescription: 'UploadImgDemo',
    xShow: true
  },
  {
    path: '/PixiDemo',
    component: PixiDemo,
    xDescription: 'PixiDemo',
    xShow: true
  },
  {
    path: '/FileDownDemo',
    component: FileDownDemo,
    xDescription: 'FileDownDemo',
    xShow: true
  }
]
