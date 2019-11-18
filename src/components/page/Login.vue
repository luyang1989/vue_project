<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="login()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="login()"  :loading="loading">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
 import crypto from 'crypto'
export default {
  data: function() {
    return {
        loading: false,      
      param: {
        username: "",
        password: "",

      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
        //  const md5 = crypto.createHash('md5')
        // md5.update(this.param.password)
        // let md5password = md5.digest('hex')
      this.$refs.login.validate(valid => {
        if (valid) {
           this.loading = true
          this.$http({
            url: `/api/login?username=${this.param.username}&password=${this.param.password}`, 
            method: "post",
            headers: {
              "Content-Type": "application/json"
            }
          }).then(res => {
             if (res.status == 200 && res.data.statusCode==200) {
                localStorage.setItem('token',res.data.msg);  
                this.$message.success(res.data.result)
                this.$router.push('/');
                this.loading = false
               } else {
                 this.$message.error(res.data.msg)
                 this.loading = false   
             }
          })
        } else {
          this.$message.error("请输入账号和密码");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>