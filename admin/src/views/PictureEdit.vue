<template>
  <el-form label-width="15%" @submit.native.prevent="save">
    <h1>{{ id ? "修改" : "新增" }}圖片</h1>
    <!-- <el-form-item label="上級分類">
      <el-select v-model="model.parent" placeholder="請選擇">
        <el-option
          v-for="item in parents"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        ></el-option>
      </el-select>
    </el-form-item> -->
    <el-form-item label="名稱">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <el-form-item label="圖片">
      <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
       >
          <img v-if="model.picture" :src="model.picture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
        name: "",
      },
    };
  },
  methods: {
    afterUpload(res){
      this.$set(this.model,"picture",res.url)
    },
    async save() {
      //請求接口判斷：
      if (this.id) {
        await this.$http.put(`/rest/pictures/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/pictures", this.model);
      }
      this.$router.push("/pictures/list");
      this.$message({
        type: "success",
        message: "新增成功",
      });
    },
    async fetchData() {
      const res = await this.$http.get(`/rest/pictures/${this.id}`);
      this.model = res.data;
    },

  },
  created() {
    this.id && this.fetchData();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    /* text-align: center; */
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>