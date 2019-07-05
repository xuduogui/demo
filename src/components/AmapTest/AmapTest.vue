<template>
  <div>
    <button @click="dialogFormVisible = true"></button>
    <!--列表编辑弹层-->
    <el-dialog
      :close-on-click-modal="false"
      title="测试外部弹层"
      :visible.sync="dialogFormVisible"
      width="720px"
    >
      <div style="position: relative;">
        <!--地图弹层-->
        <el-dialog
          :close-on-click-modal="false"
          width="650px"
          title="测试地图弹层"
          :visible.sync="dialogFormVisibleMap"
          append-to-body
        >

          <!--地图容器-->
          <div id="entLocationMapContainer"></div>

          <!--搜索-->
          <el-input
            style="position: absolute; visibility: visible; right: 20px; top: 20px; width: 200px; z-index: 99999"
            id="mapInputId"
            v-model="mapSearchInput"
            placeholder="请输入内容"
          >
          </el-input>

          <!--搜索下拉容器-->
          <div
            id="mapOutputId"
            style="position: absolute; right: 30px; top: 94px; z-index: 99999; background: #fff"
          ></div>

          <div
            slot="footer"
            class="dialog-footer"
          >
            <!--<el-button @click="dialogFormVisibleTableMap = false">取 消</el-button>-->
            <el-button
              @click="dialogFormVisibleMap = false"
              type="primary"
            >确 定</el-button>
          </div>

        </el-dialog>
        <button></button>
      </div>

      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisibleTableEdit = false">取 消</el-button>
        <el-button
          @click="tableEveEditTrue"
          type="primary"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AmapTest'
}
</script>

<style scoped>
</style>
