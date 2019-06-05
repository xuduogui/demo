<template>
    <div>
        <el-container>
            <el-header class="x-contain-head">
                demo集合
            </el-header>
            <el-main>
                <el-card
                        class="item"
                        v-for="item in routersArr"
                        :key="item.path"
                        @click.native="linkTo(item.path)"
                        v-if="item.path !== '/'"
                >
                    <div slot="header" class="clearfix">
                        {{ item.component.name }}
                    </div>
                    {{ item.xDescription }}
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import routers from '../plugins/vueRouter/router.js'

    export default {
        name: "EntranceDemo",
        data() {
            return {
                routersArr: routers
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
        color: #E6A23C;
    }
    .x-contain-head {
        font-size: 20px;
        font-weight: bold;
        line-height: 60px;
        text-align: center;
        color: #67C23A;
        border-bottom: 1px solid #909399;
    }
</style>
