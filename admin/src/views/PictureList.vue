<template>
  <el-table :data="items">
    <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
    <el-table-column prop="name" label="圖片名稱"> </el-table-column>
    <el-table-column prop="name" label="圖示"> 
      <template slot-scope="scope">
        <img :src="scope.row.picture" style="height:3rem">
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="$router.push(`/rest/pictures/edit/${scope.row._id}`)"
          >编辑</el-button
        >
        <el-button size="mini" type="danger" @click="remove(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetchData() {
      const res = await this.$http.get("/rest/pictures");
      this.items = res.data;
      console.log(this.items);
    },
    async remove(row) {
      this.$confirm(`確定是否要刪除？${row.name}`, "提示", {
        confirmButtonText: "確定",
        cancelVuttonText: "取消",
        type: "warning",
      }).then(async () => {
        await this.$http.delete(`/rest/pictures/${row._id}`);
        this.$message({
          type: "success",
          message: "刪除成功",
        });
        this.fetchData();
      });
    },
  },
  created() {
    this.fetchData();
  },
};
</script>