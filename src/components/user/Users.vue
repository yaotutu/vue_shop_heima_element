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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="clearInput"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addUser">添加用户 </el-button>
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
    <!-- // ! bug区域 -->
    <!-- // ! bug 以解决,el-form表单组件用的是:model,而不是v-model -->
    <!--    dialog  对话框-->
    <el-dialog
      title="请输入用户信息"
      width="30%"
      :visible.sync="dialogVisible"
      @close="addDialogClosed"
    >
      <!--    用户表单区域 -->
      <el-form
        label-width="80px"
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Users",
  data() {
    let checkEmail = (rule, value, cb) => {
      // 自定义规则依然写在addFormRules里面,只是哪里制定了这个函数,当执行到规则哪里的时候,会回来调用这个函数.
      const regEmail =
        /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/;
      if (regEmail.test(value)) {
        // 合法邮箱,调用cb
        return cb();
      } else {
        // 邮箱验证不合法
        cb(new Error(" 请输入合法邮箱"));
      }
    };
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      searchInfomation: "",
      dialogVisible: true,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      addFormRules: {
        // ! bug区域表单验证不生效
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  methods: {
    addDialogClosed() {
      // console.log("this.$refs :>> ", this.$refs);
      this.$refs.addFormRef.resetFields();
    },
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
      // console.log("分页事件被触发了");
      // console.log("e :>> ", e);
      this.queryInfo.pagesize = e;
      this.getUserList();
    },
    handleCurrentChange(e) {
      // console.log(e);
      this.queryInfo.pagenum = e;
      this.getUserList();
    },
    test() {
      console.log("haha 我出来了@@@@");
    },
    clearInput() {
      this.queryInfo.query = "";
      this.getUserList();
    },
    addUser() {
      this.dialogVisible = true;
    },
    //关闭dialog
    cancelDialog() {
      this.dialogVisible = false;
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
    async addUser() {
      const { data: res } = await this.$http.post("users", this.addForm);
      console.log("res :>> ", res);
      if (res.meta.status !== 201) {
        this.$message.error("添加失败");
      } else {
        this.$message.success("添加成功");
        this.dialogVisible = false;
        this.getUserList();
      }
    },
  },
  created() {
    this.getUserList();
  },
};
</script>

<style lang="less" scoped></style>
