<template>
    <div>

    </div>
</template>

<script>
    import _m from '../../plugins/utils/utils'
    export default {
        name: "UtilsTest",
        mounted () {
            let obj = {
                test1: '3333',
                test2: function () {
                    return 332222
                }
            }
            let obj2 = _.cloneDeep(obj)
            let myObj = _m.cloneDeep(obj)
            obj.test1 = 2342342342
            console.log(obj, obj2, myObj)
        }
    }
</script>

<style scoped>

</style>
