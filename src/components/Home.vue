<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>北京百x生产管理系统</span>
      </div>
      <el-button type="primary" @click="logout"> aaa</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->

      <el-aside width="200px">
        <el-col :span="12">
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>Main</el-main>
    </el-container>
    <!-- <el-button type="primary" @click="logout">退出</el-button> -->
  </el-container>
</template>

<script>
export default {
  created() {
    this.getMenuList();
  },
  name: "Home",
  methods: {
    logout() {
      window.sessionStorage.clear("token");
      this.$router.push("/login");
    },
    async getMenuList() {
      const {data: res} = await this.$http.get("menus");
      console.log('@@@@@res :>> ', res);
    },
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #c6cfd9;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
    }
    // flex-direction: column;
  }
}
.el-container {
  height: 100vh;
}

.el-aside {
  background-color: #ffffff;
}
</style>
