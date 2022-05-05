<template>
  <div class="loginContainer">
    <div class="loginBox">
      <!-- 头像区域 -->
      <div class="avatarBox">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <div class="loginForm">
        <el-form
          class=""
          :model="loginForm"
          :rules="loginFormRules"
          ref="loginFormRef"
        >
          <el-form-item prop="username">
            <!-- prop属性,用于表单规则验证,与rules规则相匹配 -->
            <el-input
              prefix-icon="iconfont icon-user"
              v-model="loginForm.username"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form>
        <div class="formBtn">
          <el-button type="primary" @click="formLogin">登陆</el-button>
          <el-button type="primary" @click="formReset">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 登录表单的数据绑定
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 登录表单的规则验证
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 表单重置
    formReset() {
      console.log("this.$refs:>> ", this.$refs["loginForm"]);
      // this.$refs['loginFormRef'].resetFields();
      this.$refs.loginFormRef.resetFields();
    },
    // 表单登录
    formLogin() {
      console.log(this.$refs.loginFormRef);
      // 表单验证,对应前面的rules规则,表单预验证.即判断输入框的内容是否符合要求.
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          console.log(valid);
        }
        const { data: res } = await this.$http.post("login", this.loginForm);
        // let res = data.data
        if (res.meta.status !== 200) {
          this.$message({
            message: "登录失败",
            type: "error",
          });
          return console.log("login failed,status:", res.meta.status);
        }
        this.$message.success("登录成功");
        console.log('res :>> ', res);
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home")
      });
    },
  },
};
</script>

<style lang="less" scoped>
.loginContainer {
  background-color: #2b4b6b;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loginBox {
  width: 450px;
  height: 400px;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
}
.avatarBox {
  height: 130px;
  width: 130px;
  //   border增加1px的边框,solid,实线
  border: 1px solid #eee;
  border-radius: 50%;
  //   padding,图片与边框增加10px的边距,更加好看.
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border-radius: 50%;
    background-color: #eee;
  }
}

.formBtn {
  display: flex;
  justify-content: flex-end;
}
.loginForm {
  padding: 0 20px;
}
</style>
