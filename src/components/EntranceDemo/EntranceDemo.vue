<template>
  <div>
    <el-container>
      <el-header class="x-contain-head">demo集合</el-header>
      <el-main>
        <el-card
          class="item"
          v-for="item in routersArr"
          :key="item.path"
          @click.native="linkTo(item.path)"
        >
          <div
            slot="header"
            class="clearfix"
          >{{ item.component.name }}</div>
          {{ item.xDescription }}
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import routers from '../../plugins/vueRouter/router.js'

export default {
  name: 'EntranceDemo',
  computed: {
    routersArr() {
      return routers.filter(el => el.xShow)
    }
  },
  methods: {
    linkTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.item {
  width: 200px;
  margin: 20px;
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  color: #e6a23c;
}
.x-contain-head {
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
  color: #67c23a;
  border-bottom: 1px solid #909399;
}
</style>
