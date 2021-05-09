//模組化 http
import axios from 'axios'
//import Vue 
import Vue from 'vue'
const http = axios.create({
    baseURL:'http://localhost:3000/admin/api'
})

//確認全局登問題：
http.interceptors.response.use(res =>{
    return res
},err =>{
    if(err.response.data.message){
        Vue.prototype.$message({
            type:'error',
            message:err.response.data.message
        })
    }
    return Promise.reject(err);
})



export default http