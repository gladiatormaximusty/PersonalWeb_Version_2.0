<template>
  <el-form label-width="120px" @submit.native.prevent="save">
    <h1>{{ id ? "修改" : "新增" }}使用者</h1>
    <el-form-item label="使用者">
      <el-input v-model="model.username"></el-input>
    </el-form-item>
     <el-form-item label="密碼">
      <el-input type="text" v-model="model.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit"> 保存 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        
      },
      parents: [],
    };
  },
  methods: {
    async save() {
      //請求接口判斷：
      if (this.id) {
        await this.$http.put(`/rest/admin_users/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "新增成功",
      });
    },
    async fetchData() {
      const res = await this.$http.get(`/rest/admin_users/${this.id}`);
      this.model = res.data;
      console.log(res);
    },

  },
  created() {

    this.id && this.fetchData();
  },
};
</script>