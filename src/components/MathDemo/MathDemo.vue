<template>
  <div class="x-box">
    <div>

    </div>
    <el-row>
      <el-col :span="1">
        <div style="height: 100px;"></div>
      </el-col>
      <el-col
        :span="widthControl"
        class="print-disappear"
      >
        <div>
          <div v-show="showControl">
            <div>
              <div class="input-class">
                <div>题目总数：</div>
                <el-input
                  v-model="inputNums"
                  placeholder="请输入内容"
                  type="number"
                  min="0"
                ></el-input>
              </div>
              <div class="input-class">
                <div>最大值：</div>
                <el-input
                  v-model="inputBase"
                  placeholder="请输入内容"
                  type="number"
                  min="0"
                ></el-input>
              </div>
              <div class="input-class">
                <div>最小值：</div>
                <el-input
                  v-model="inputBase2"
                  placeholder="请输入内容"
                  type="number"
                  min="0"
                ></el-input>
              </div>
              <div class="input-class">
                <div>运算结果范围不可超过：</div>
                <el-input
                  v-model="inputRes"
                  placeholder="请输入内容"
                  type="number"
                  min="0"
                ></el-input>
              </div>

              <div class="input-class">
                <div>运算规则切换:</div>
                <el-select
                  class="selected-class"
                  v-model="selectValue"
                  multiple
                  placeholder="请选择运算规则"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <!--<el-button type="primary" style="width: 100%; margin-top: 20px;" v-stream:click="mathRun$">重置</el-button>-->
            <el-button
              type="primary"
              style="width: 100%; margin-top: 20px;"
              @click="mathRender"
            >输出</el-button>
          </div>
          <el-button
            v-show="showControl"
            type="info"
            style="width: 100%; margin-top: 20px;"
            @click="showControlFun('disappear')"
          ><i class="el-icon-arrow-left"></i>隐藏控制台
          </el-button>
          <el-button
            v-show="!showControl"
            type="info"
            style="width: 100%; margin-top: 20px;"
            @click="showControlFun('show')"
          ><i class="el-icon-arrow-right"></i></el-button>
        </div>
      </el-col>
      <el-col
        class="print-auto-weight"
        :span="widthContent"
        style="padding-left: 20px;"
      >
        <div>
          <div class="x-content">
            <div style="margin-bottom: 20px;">
              <span>当前实际总数量：</span>
              <el-tag type="success">{{ curCount }}</el-tag>
            </div>
            <el-tag
              class="x-tag"
              v-for="(item, index) in resArr"
              :key="index"
            >
              <div style="width: 120px;">
                {{ item }}
              </div>

            </el-tag>

          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const symbolMap = new Map()
symbolMap
  .set('+', '+')
  .set('-', '-')
  .set('*', '×')
  .set('/', '÷')
export default {
  name: 'MathDemo',
  data() {
    return {
      // 是否隐藏控制台
      showControl: true,
      // 控制台宽度
      widthControl: 4,
      // 输出宽度
      widthContent: 19,
      // 题目总数
      inputNums: 99,
      // 结果不可超过
      inputRes: 50,
      // 输出的基数不可超过
      inputBase: 10,
      // 输出的基数不可小于
      inputBase2: 5,
      // 当前选择的运算法则
      selectValue: ['+'],

      options: [{
        value: '+',
        label: '加法'
      }, {
        value: '-',
        label: '减法'
      }, {
        value: '*',
        label: '乘法'
      }, {
        value: '/',
        label: '除法'
      }],

      // 输出结果储存
      resArr: []
    }
  },
  computed: {
    // 实际输出数量
    curCount() {
      return this.resArr.length
    }
  },
  methods: {
    mathRender() {
      let count = 0
      this.resArr = []
      const historyList = {}
      let safe = 0
      while (count < this.inputNums && safe < 9999) {
        safe++
        const leftNum = Math.floor(Math.random() * (+this.inputBase - +this.inputBase2 + 1)) + +this.inputBase2
        const rightNum = Math.floor(Math.random() * (+this.inputBase - +this.inputBase2 + 1)) + +this.inputBase2
        let res = 0
        const _rules = Math.floor(Math.random() * this.selectValue.length)
        switch (this.selectValue[_rules]) {
          case '+':
            res = leftNum + rightNum
            break
          case '-':
            res = leftNum - rightNum
            break
          case '*':
            res = leftNum * rightNum
            break
          case '/':
            res = leftNum / rightNum
            break
        }
        const booleanIf = (
          res <= this.inputRes &&
          res % 1 === 0 &&
          res >= 0 &&
          !historyList[`${leftNum}__${rightNum}`]
        )
        if (booleanIf) {
          count++
          safe = 0
          this.resArr.push(`${leftNum} ${symbolMap.get(this.selectValue[_rules])} ${rightNum} = `)
          historyList[`${leftNum}__${rightNum}`] = 1
          // historyList[`${rightNum}__${leftNum}`] = 1
        }
      }
      return this.resArr
    },
    showControlFun(flag) {
      this.showControl = !this.showControl
      switch (flag) {
        case 'show':
          this.widthControl = 4
          this.widthContent = 19
          break
        case 'disappear':
          this.widthControl = 1
          this.widthContent = 22
          break
      }
    }
  }

}
</script>

<style scoped>
.selected-class {
  width: 100%;
}

.x-tag {
  margin: 10px 20px 10px 0;
}

@media print {
  .print-disappear {
    display: none;
  }
  .print-auto-weight {
    width: 100%;
  }
}
</style>
