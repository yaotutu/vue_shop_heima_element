<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/users' }">用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="100">
        <el-col :span="15">
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userlist" border>
        <el-table-column type="index"></el-table-column>
        <!-- <el-table-column prop="id" label="id"></el-table-column> -->
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="role_name" label="角色"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{ scope.row.mg_state }} -->
            <!-- scope.row可以获取对应行的 所有信息 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row)"
            >
              <!-- change(事件名称)	switch 状态发生变化时的回调函数	 新状态的值(回调参数) -->
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200rem">
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip effect="dark" content="分配角色" placement="top-start">
              <el-button
                type="info"
                icon="el-icon-s-tools"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 0,
    };
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败");
      }
      this.userlist = res.data.users;
      this.total = res.data.total;
    },
    handleSizeChange(e) {
      console.log("分页事件被触发了");
      console.log("e :>> ", e);
      this.queryInfo.pagesize = e;
      this.getUserList();
    },
    handleCurrentChange(e) {
      // console.log(e);
      this.queryInfo.pagenum = e;
      this.getUserList();
    },
    async userStateChanged(e) {
      const { data: res } = await this.$http.put(
        `users/${e.id}/state/${e.mg_state}`
      );
      console.log("res :>> ", res);
      if (res.meta.status !== 200) {
        // 如果提交失败,弹窗提示用户,并将状态还原回去
        e.mg_state = !e.mg_state;
        return this.$message.error("状态更新失败");
      }
      this.$message.success("状态更新成功");
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style lang="less" scoped></style>
