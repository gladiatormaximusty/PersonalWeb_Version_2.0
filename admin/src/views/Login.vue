<template>
    <div class="login-container">
        <el-card header="請先登錄" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用戶名稱">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>
                 <el-form-item label="密碼">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" native-type="submit">登入</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            model:{}
        }
    },
    methods:{
        async login(){
            const res = await this.$http.post('login',this.model);
            localStorage.token = res.data.token
            this.$router.push('/')
            this.$message({
                type:'success',
                message:'登入成功'
            })
            console.log(res.data)

        }
    }
}
</script>

<style scoped>
.login-card{
    width: 25rem;
    margin: 5rem auto;
}
</style>