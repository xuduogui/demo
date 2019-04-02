const EntranceDemo = () => import('../../components/EntranceDemo.vue')
const MathDemo = () => import('../../components/MathDemo.vue')
const GetAmapPositions = () => import('../../components/GetAmapPositions.vue')
const EasyPlayerDemo = () => import('../../components/EasyPlayDemo.vue')

export default [
    {
        path: '/',
        component: EntranceDemo,
        xDescription: '入口列表'
    },
    {
        path: '/math',
        component: MathDemo,
        xDescription: '一个四则运算生成器，支持右键纯净打印'
    },
    {
        path: '/amap',
        component: GetAmapPositions,
        xDescription: '高德地图的坐标选取器'
    },
    {
        path: '/easyplayer',
        component: EasyPlayerDemo,
        xDescription: 'easyPlayer'
    },
]
