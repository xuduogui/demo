<template>
  <div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    >
    </quill-editor>
    <div v-html="content"></div>
  </div>
</template>

<script>
import './pluginAdd'
import Quill from 'quill'
window.Quill = Quill

import { ImageDrop } from 'quill-image-drop-module'
import ImageResize from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)
// import { someModule } from '../yourModulePath/someQuillModule.js'
// Quill.register('modules/someModule', someModule)
export default {
  data() {
    return {
      content: '<h2>I am Example</h2>',
      editorOption: {
        // some quill options
        modules: {
          // 新增下面
          imageDrop: true, // 拖动加载图片组件。
          imageResize: { // 调整大小组件。
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }
      }
    }
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    console.log('this is current quill instance object', this.editor)
  }

}
</script>

<style>
</style>
