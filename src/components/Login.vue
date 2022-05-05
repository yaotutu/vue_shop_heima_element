<template>
  <div class="loginContainer">
    <div class="loginBox">
      <!-- 头像区域 -->
      <div class="avatarBox">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <br />
      <div class="loginForm">
        <el-form class="">
          <el-form-item>
            <el-input prefix-icon="iconfont icon-user">aaa</el-input>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item>
            <el-input prefix-icon="iconfont icon-3702mima">aaa</el-input>
          </el-form-item>
        </el-form>
        <div class="formBtn">
          <el-button type="primary">登陆</el-button>
          <el-button type="primary">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
