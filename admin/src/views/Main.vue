<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-openeds="['1','2','3','4']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-data"></i>流量分析</template>
        <el-menu-item-group>
       
          <el-menu-item index="1-1">流量來源</el-menu-item>
          <el-menu-item index="1-2">數據分析</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-management"></i>內容管理</template>
        <el-menu-item-group>
          <el-menu-item index="/categories/create">新增分類</el-menu-item>
          <el-menu-item index="/categories/list">分類列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-management"></i>文章管理</template>
        <el-menu-item-group>
          <el-menu-item index="/articles/create">新增文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-management"></i>頁面設定</template>
        <el-menu-item-group>
          <el-menu-item index="/pictures/create">圖片設定</el-menu-item>
          <el-menu-item index="/pictures/list">圖片列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-s-tools"></i>權限管理</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">新增使用者</el-menu-item>
          <el-menu-item index="1-2">使用者列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>EdwardXiong</span>
    </el-header>
    
    <el-main>
        <router-view></router-view>
     
    </el-main>
  </el-container>
</el-container>

</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
     
      return {
        
      }
    }
  };
</script>