<template>
    <div style="position: relative;">
        <EasyPlayer
                :videoUrl="videoUrl"
                :aspect="aspect"
                videoTitle="WO SHI CE SHIWO SHI CE SHIWO SHI CE SHI"
                live
                @message="$message"
                :fluent="fluent"
                :autoplay="autoplay"
        ></EasyPlayer>
        <div style="position: absolute; top: 10px; right: 30px; width: 200px; color: red; background: rgba( 200, 200, 200, .5);">
            我是测试
            我是测试
            我是测试
            我是测试
            我是测试
            我是测试
            我是测试
            我是测试
            我是测试
            我是测试
        </div>
    </div>
</template>

<script>
    import EasyPlayer from '@easydarwin/easyplayer'

    export default {
        name: "EasyPlayDemo",
        components: {
            EasyPlayer
        },
        data() {
            return {
                videoUrl: '',
                aspect: '',
                fluent: '',
                autoplay: '',
            }
        },
        method: {
            // message 触发通知消息, 参数: { type: '', message: ''}
            // ended 播放结束, 参数: 无
            // timeupdate 进度更新, 参数: 当前时间进度
            // pause 暂停, 参数: 当前时间进度
            // play 播放, 参数: 当前时间进度
            $message() {

            }
        }
    }
</script>

<style scoped>

</style>
<!--配置属性-->
<!--// video-url 视频流地址 String default ''-->
<!--// video-title 视频右上角显示的标题 String default ''-->
<!--// snap-url 视频封面图片 String default ''-->
<!--// auto-play 自动播放 Boolean default true-->
<!--// live 是否直播, 标识要不要显示进度条 Boolean default false-->
<!--// alt 视频流地址没有指定情况下, 视频所在区域显示的文字, 相当于 html img 标签的 alt 属性 String default '无信号'-->
<!--// muted 是否静音 Boolean default false-->
<!--// aspect 视频显示区域的宽高比 String default '16:9'-->
<!--// loading 指示加载状态, 支持 sync 修饰符-->
<!--// fluent 流畅模式, Boolean default true-->
<!--// timeout 加载超时(秒) Number default 20-->
<!--// stretch 是否不同分辨率强制铺满窗口，默认为false-->
<!--// show-custom-button 是否在工具栏显示自定义按钮(极速/流畅, 拉伸/标准), Boolean default true-->

<!--HTTP-FLV播放相关属性-->
<!--// hasaudio 是否有音频，传递该属性可以加快启播速度 Boolean，默认不配置自动判断-->
<!--// hasvideo 是否有视频，传递该属性可以加快启播速度 Boolean，默认不配置自动判断-->

<!--事件回调-->
<!--// message 触发通知消息, 参数: { type: '', message: ''}-->
<!--// ended 播放结束, 参数: 无-->
<!--// timeupdate 进度更新, 参数: 当前时间进度-->
<!--// pause 暂停, 参数: 当前时间进度-->
<!--// play 播放, 参数: 当前时间进度-->

<!--安装-->
<!--npm install @easydarwin/easyplayer --save-->

<!--copy dist/component/*.swf 到 www 根目录-->
<!--在 Vue 中使用-->
<!--copy dist/component/easy-player-lib.min.js 到 www 根目录-->

<!--在 html 中引用 dist/component/easy-player-lib.min.js-->

<!--......-->

<!--import EasyPlayer from '@easydarwin/easyplayer-->

<!--......-->
<!--components: {-->
<!--EasyPlayer-->
<!--}-->
<!--......-->

<!--<EasyPlayer :videoUrl="videoUrl" :aspect="aspect" live-->
            <!--@message="$message" :fluent="fluent" :autoplay="autoplay"></EasyPlayer>-->
<!--脱离 Vue 使用-->
<!--copy dist/element/easy-player-element.min.js 到 www 根目录-->

<!--在 html 中引用 dist/element/easy-player-element.min.js-->
