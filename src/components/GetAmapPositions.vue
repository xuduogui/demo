<template>
    <div style="width: 1500px; height: 1000px;">
        <div id="container" style="width: 100%; height: 100%;"></div>
    </div>
</template>

<script>
    export default {
        name: "GetAmapPositions",
        data () {
            return {
                map: ''
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.map = new AMap.Map('container', {
                    zoom:11,//级别
                    center: [120.980737,31.385598],//中心点坐标
                    viewMode:'3D'//使用3D视图
                });
                this.map.on('click', this.mapClick);
            })
        },
        methods: {
            mapClick (e) {
                console.log([e.lnglat.getLng(), e.lnglat.getLat()])
                console.log(e.lnglat.getLng() + ',' + e.lnglat.getLat())
            }
        }
    }
</script>

<style scoped>

</style>
