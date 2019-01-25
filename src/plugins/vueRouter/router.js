import EntranceDemo from '../../components/EntranceDemo.vue'
import MathDemo from '../../components/MathDemo.vue'

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
]
