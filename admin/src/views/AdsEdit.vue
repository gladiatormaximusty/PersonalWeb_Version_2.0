<template>
  <el-form label-width="120px" @submit.native.prevent="save">
    <h1>{{ id ? "修改" : "新增" }}分類</h1>
    <!-- 廣告項目內容 -->
    <el-form-item label="名稱">
      <el-input v-model="model.name"></el-input>
    </el-form-item>
    <!-- 廣告位新增內容 -->
  <el-form-item label="廣告">
    <el-button size="small" @click="model.items.push({})">
      <i class="el-icon-plus"></i> 添加廣告
    </el-button>
    <el-row type="flex" style="flex-wrap:wrap">
      <el-col :md="12" v-for="(item,i) in model.items" :key="i">
        <el-form-item label="連結網站(URL)">
          <el-input v-model="item.url"></el-input>
        </el-form-item>
        <el-form-item label="圖片">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL+'/upload'"
            :show-file-list="false"
            :on-success="res => $set(item,'image',res.url)"
          >
          <img v-if="item.image" :src="item.image" class="avatar">
          <i v-else class="el-icon-plus avatar-upload-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="danger" @click="model.items.splice(i,1)">
            刪除
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
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
        items:[]
      },
    };
  },
  methods: {
    async save() {
      //請求接口判斷：
      if (this.id) {
        await this.$http.put(`/rest/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "新增成功",
      });
    },
    async fetchData() {
      const res = await this.$http.get(`/rest/ads/${this.id}`);
      this.model = Object.assign({},this.model,res.data)
      console.log(res);
    },
  },
  created() {
    this.id && this.fetchData();
  },
};
</script>