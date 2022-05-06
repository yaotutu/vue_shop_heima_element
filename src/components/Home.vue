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
        <el-col :span="18">
          <el-menu
            class="el-menu-vertical-demo"
            :unique-opened="true"
            :router="true"
            :default-active="activePath"
          >
            <!-- router开启路由模式.index作为全局唯一id,也可作为跳转的路径. 如果出现item.id 20% 字样,
          经排查,%20是空格的意思,item.id并没有被解析,最终排查原因是因为item.id当成字符串来处理了,
          在index前加冒号,把item.id当作变量来解析,即可解决 -->
            <el-submenu
              :index="item.id + ' '"
              v-for="item in menuList"
              :key="item.id"
            >
              <!-- 这个index控制菜单的开关状态,如果写死的话.点开某一个菜单栏,全部的菜单栏都会打开,将它与item.id动态绑定.这样可以解决这个问题 -->
              <!-- 根据element官方文档.这里的index作为唯一标识,只接受字符串,固将item.id想办法转换成字符串 -->
              <!-- 1.在item.id后面拼接一个空字符串,这样系统会自动将number转换成字符串类型,与后面的字符串做拼接. -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span> {{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item-group>
                <el-menu-item
                  :index="'/' + subItem.path"
                  v-for="subItem in item.children"
                  :key="subItem.id"
                  @click="saveNavState('/' + subItem.path)"
                >
                  <i class="el-icon-menu"></i>
                  {{ subItem.authName }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <!-- 右侧内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!-- <el-button type="primary" @click="logout">退出</el-button> -->
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      menuList: [],
      activePath: "",
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear("token");
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      console.log("@@@@@res :>> ", res);
      if (res.meta.status != 200) {
        return this.$message.error(res.meta.msg);
      }
      this.menuList = res.data;
    },
    // 保存链接的激活状态
    saveNavState(event) {
      // console.log('event :>> ', event);
      window.sessionStorage.setItem("activePath", event);
      this.activePath = event;
    },
  },
  created() {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem("activePath");
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
.el-menu-item {
  min-width: 100%;
}
</style>
