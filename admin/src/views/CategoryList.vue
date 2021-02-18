<template>
    
     <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="name" label="分類名稱" >
        </el-table-column>
      </el-table>
</template>

<script>
export default {
  data(){
    return{
      items:[]
    }
  },
  methods:{
    async fetchData(){
      const res =  await this.$http.get('/categories')
      this.items = res.data
      console.log(this.items)
    }
  },
  created(){
    this.items
    this.fetchData();
  }
}
</script>