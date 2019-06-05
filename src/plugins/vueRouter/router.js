const EntranceDemo = () => import('../../components/EntranceDemo/EntranceDemo.vue')
const MathDemo = () => import('../../components/MathDemo/MathDemo.vue')
const GetAmapPositions = () => import('../../components/GetAmapPositions/GetAmapPositions.vue')
const EasyPlayerDemo = () => import('../../components/EasyPlayDemo/EasyPlayDemo.vue')
const UtilsTest = () => import('../../components/UtilsTest/UtilsTest.vue')

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
    }, {
        path: '/UtilsTest',
        component: UtilsTest,
        xDescription: 'UtilsTest',
        xShow: false
    },
]
