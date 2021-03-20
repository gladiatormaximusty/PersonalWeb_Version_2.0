<template>
  <el-form label-width="120px" @submit.native.prevent="save">
    <h1>{{ id ? "修改" : "新增" }}文章</h1>
    <el-form-item label="文章分類">
      <el-select v-model="model.categories" multiple placeholder="請選擇" >
        <el-option
          v-for="item in categories"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章名稱">
      <el-input v-model="model.title"></el-input>
    </el-form-item>
    <el-form-item label="編輯內容">
      <vue-editor 
        v-model="model.body" 
        use-custom-image-handler 
        @image-added="handleImageAdded"
      />
      <!-- <el-input v-model="model.body"></el-input> -->
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit"> 保存 </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { VueEditor,Quill } from "vue2-editor";
import ImageResize from 'quill-image-resize-vue';
import { ImageDrop } from 'quill-image-drop-module';
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
export default {
  components: { VueEditor },
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        title: "",
      },
      categories: [],
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      //請求接口判斷：
      if (this.id) {
        await this.$http.put(`/rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "新增成功",
      });
    },
    async fetchData() {
      const res = await this.$http.get(`/rest/articles/${this.id}`);
      this.model = res.data;
      console.log(res);
    },
    async fetchCategories() {
      const res = await this.$http.get("/rest/categories");
      this.categories = res.data;
    },
  },
  created() {
    this.fetchCategories();
    this.id && this.fetchData();
  },
};
</script>