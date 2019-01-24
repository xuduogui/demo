<template>
    <div>
        <el-card
                class="item"
                v-for="item in routersArr"
                :key="item.path"
                @click.native="linkTo(item.path)"
                v-if="item.path !== '/'"
        >
            {{ item.component.name }}
        </el-card>
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
</style>
