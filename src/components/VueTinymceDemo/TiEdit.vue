<template>
  <div>
    <editor
      ref="my_editor"
      :init="t_init"
      :plugins="t_plugins"
      :initial-value="'我是初始值'"
    ></editor>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import config from './config'
import '../../../statics/tinymce/themes/silver/theme'

// disabled：使用这个采用布尔值的prop，您可以将编辑器动态设置为“禁用”只读模式或进入正常的可编辑模式。
// id：编辑器的id，以便稍后使用tinymce.get('ID')tinymce上的方法获取实例，默认为自动生成的uuid。
// init：发送到tinymce.init用于初始化编辑器的方法的对象。
// initial-value：初始化编辑器的初始值。
// inline：设置编辑器应该内联的简写，与init中的<editor inline></editor>设置相同{inline: true}。
// tag-name：仅在编辑器内联时使用，决定初始化编辑器的元素，默认为div。
// plugins：设置要使用的插件的简写，与init中的<editor plugins="foo bar"></editor>设置相同{plugins: 'foo bar'}。
// toolbar：设置要显示的工具栏项的简写，与init中的<editor toolbar="foo bar"></editor>设置相同{toolbar: 'foo bar'}。
// model-events：更改要触发v模型事件的事件，默认为'change keyup'。
// api-key：TinyMCE云的Api密钥，更多信息如下。
// cloud-channel：TinyMCE Cloud的云渠道，更多信息如下。
export default {
  name: 'TiEdit',

  components: { Editor },

  props: {
    host: {
      default: 'http://boccaccio.3322.org:7383/bocca/',
      type: String
    },
    url: {
      default: '/bocca/file/uploadOneImg',
      type: String
    },
    accept: {
      default: 'image/jpeg, image/png',
      type: String
    },
    maxSize: {
      default: 2097152,
      type: Number
    },
    withCredentials: {
      default: false,
      type: Boolean
    },

    value: {
      default: '',
      type: String
    }
  },

  data() {
    const self = this
    return {
      // init配置
      t_init: Object.assign(config, {
        language_url: '/statics/tinymce/langs/zh_CN.js', // 语言包的路径
        language: 'zh_CN', // 语言
        // skin_url: '/statics/tinymce/skins/content/dark',
        plugins: 'wordcount advlist autolink link image imagetools lists charmap print preview',

        setup: (editor) => {
          // 抛出 'on-ready' 事件钩子
          editor.on(
            'init', () => {
              self.loading = false
              self.$emit('on-ready')
              editor.setContent(self.value)
            }
          )
          // 抛出 'input' 事件钩子，同步value数据
          editor.on(
            'input change undo redo', () => {
              self.$emit('input', editor.getContent())
            }
          )
        },

        // 图片上传
        images_upload_handler: function(blobInfo, success, failure) {
          if (blobInfo.blob().size > self.maxSize) {
            failure('文件体积过大')
          }

          if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
            uploadPic()
          } else {
            failure('图片格式错误')
          }
          function uploadPic() {
            const xhr = new XMLHttpRequest()
            const formData = new FormData()
            xhr.withCredentials = self.withCredentials
            xhr.open('POST', self.url)
            xhr.onload = function() {
              if (xhr.status !== 200) {
                // 抛出 'on-upload-fail' 钩子
                self.$emit('on-upload-fail')
                failure('上传失败: ' + xhr.status)
                return
              }

              const json = JSON.parse(xhr.responseText)
              success(self.host + json.data.oriImg)
              // 抛出 'on-upload-success' 钩子
              self.$emit('on-upload-complete', [
                json, success, failure
              ])
            }
            formData.append('file', blobInfo.blob())
            xhr.send(formData)
          }
        }
      }),
      // 插件列表
      t_plugins: `
          paste
          importcss
          image
          table
          advlist
          fullscreen
          link
          media
          lists
          textcolor
          colorpicker
          hr
          preview
      `
    }
  },

  beforeDestroy() {
    // 销毁tinymce
    this.$emit('on-destroy')
    window.tinymce.remove(`$#{this.Id}`)
  },

  methods: {
  }
}
</script>

<style>
</style>
