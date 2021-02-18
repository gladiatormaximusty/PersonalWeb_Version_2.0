<template>
    <el-form label-width="120px" @submit.native.prevent="save">
        <h1>新建分類</h1>
    <el-form-item label='名稱'>
        <el-input v-model="model.name"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" native-type ="submit">
            保存
        </el-button>
    </el-form-item>
    </el-form>
</template>

<script>
export default {
    data(){
        return{
            model:{
                name:''
            }
        }
    },
    methods:{
        async save(){
            //請求接口
            await this.$http.post('/categories',this.model)
            this.$router.push('/categories/list')
            this.$message({
                type:'success',
                message:'新增成功'
            })
        }
    }
}
</script>