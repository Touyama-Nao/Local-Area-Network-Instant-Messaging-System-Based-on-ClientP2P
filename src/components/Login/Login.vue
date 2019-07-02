 <template>
  <!--   <el-row type="flex" class="row-bg">
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple-light" v-if="isShowLogin">
        <el-container>
          <el-header>登陆</el-header>
          <el-main>
            <el-form
              ref="LoginForm"
              :model="LoginForm"
              label-width="80px"
              :label-position="labelPosition"
            >
              <el-form-item label="姓名:">
                <el-input v-model="LoginForm.name"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onLoginSubmit">立即注册登录</el-button>
                <el-button @click="resetForm('LoginForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-main>
          <el-footer></el-footer>
        </el-container>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple"></div>
    </el-col>
  </el-row>-->
  <div class="main">
    <!-- 登录 -->
    <div class="logIn">
      <h2 class="title">SIGN IN</h2>
      <input
        type="text"
        name="username"
        placeholder="USERNAME"
        class="logIn-input"
        id="username"
        v-model="LoginForm.name"
      />
      <input
        type="text"
        name="ip"
        placeholder="IP"
        class="logIn-input"
        id="ip_input"
        v-model="Ipaddress"
      />
      <div class="remember">
        <input type="checkbox" name="checkbox" id="remember" /> Remember Me
      </div>
      <div class="register-text">
        <span class="text-button">Register</span>
        <span>|</span>
        <span class="text-button">Forgot Password?</span>
      </div>
      <input type="submit" placeholder="Sign In" id="logIn-submit" @click="onLoginSubmit" />
    </div>
    <span class="middle"></span>
    <Star id="canvas"></Star>
    <remote-js src="http://pv.sohu.com/cityjson?ie=utf-8"></remote-js>
  </div>
</template>


<script>
import Star from "@/components/Canvas/Star";
export default {
  name: "Login",
  components: {
    "remote-js": {
      render(createElement) {
        return createElement("script", {
          attrs: { type: "text/javascript", src: this.src }
        });
      },
      props: {
        src: { type: String, required: true }
      }
    },
    Star
  },
  data() {
    return {
      labelPosition: "left",
      isShowLogin: true, //登陆框是否出现
      LoginForm: {
        name: ""
      },
      UsersList: [], //用户列表
      dots: {
        n: 500, //圆形粒子个数
        distance: 50, //圆形粒子之间的距离
        d_radius: 100, //粒子距离鼠标点的距离
        array: [] //保存n个圆形粒子对象
      },
      Ipaddress: "",
      port: ""
    };
  },
  sockets: {
    getIPAdress(data) {
      console.log(data);
      //将获取到的IP地址填入input中
      this.Ipaddress = data.User.IP;
      this.port = data.User.port;
    }
  },
  methods: {
    onLoginSubmit() {
      if (this.LoginForm.name.replace(/\s/g, "") == "") {
        this.$message.error("个人姓名不能为空!");
      } else if (this.LoginForm.name.replace(/\s/g, "") != "") {
        this.$socket.emit("ServerLogin", { username: this.LoginForm.name }); //登陆触发服务端的函数
        this.$router.push({
          path: "/Chat",
          query: {
            username: this.LoginForm.name,
            IP: this.Ipaddress,
            port: this.port
          }
        });
        this.$message({
          message: "恭喜你，登陆成功!",
          type: "success"
        });
      }
    },
    resetForm(formName) {
      //重置登陆
      this.$refs[formName].resetFields();
    },
    getUserIP(onNewIP) {
      //弃用，这是另一个IP地址
      //获取当前局域网的ip地址
      let MyPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;
      let pc = new MyPeerConnection({
        iceServers: []
      });
      let noop = () => {};
      let localIPs = {};
      let ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;
      let iterateIP = ip => {
        if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
      };
      pc.createDataChannel("");
      pc.createOffer()
        .then(sdp => {
          sdp.sdp.split("\n").forEach(function(line) {
            if (line.indexOf("candidate") < 0) return;
            line.match(ipRegex).forEach(iterateIP);
          });
          pc.setLocalDescription(sdp, noop, noop);
        })
        .catch(reason => {});
      pc.onicecandidate = ice => {
        if (
          !ice ||
          !ice.candidate ||
          !ice.candidate.candidate ||
          !ice.candidate.candidate.match(ipRegex)
        )
          return;
        ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
      };
    }
  },
  mounted() {
    /*     this.getUserIP(ip => {
      //将获取到的IP地址填入input中
      this.Ipaddress = ip;
    }); */
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  width: 100%;
}
#canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  /*   background: #000; */
  background: -webkit-gradient(
    linear,
    center top,
    center bottom,
    from(#caebdb),
    to(#54a5c5)
  );
  background: -moz-linear-gradient(top, #caebdb, #54a5c5);
  background: -o-linear-gradient(top, #caebdb, #54a5c5);
  background: -webkit-linear-gradient(top, #caebdb, #54a5c5);
}
main {
  background: #000;
}
.main {
  width: 100%;
  height: 100%;
  text-align: center;
}

#logo {
  position: absolute;
  left: 250px;
  top: 60px;
  transition: all 0.2s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
}
/*登录页面*/
.logIn,
.ForPass,
.Register {
  display: inline-block;
  vertical-align: middle;
  background: #ffffff;
  width: 300px;
  height: 380px;
  text-align: left;
  padding: 40px 30px;
  box-shadow: -4px 7px 46px 2px rgba(0, 0, 0, 0.1);
  opacity: 1;
  transform: translateX(0) rotateY(0);
  transition: all 0.6s ease-in-out 0s;
}
.title {
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 20px;
  margin-bottom: 30px;
  color: #000000;
  font-weight: 500;
}
.logIn-input {
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  letter-spacing: 2px;
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: 300;
  height: 50px;
}

.remember,
.fp-text,
.fp-text1 {
  font-weight: 300;
  font-size: 15px;
  margin-bottom: 30px;
  color: #707070;
}
.password-wrapper {
  position: relative;
}
.fa-eye {
  font: normal normal normal 14px/1 FontAwesome;
  color: #d7d7d7;
  font-size: 25px;
  position: absolute;
  top: 10px;
  right: 0;
  margin: auto;
  border: solid #fff;
  border-width: 0px 10px 0px 0;
  cursor: pointer;
}
.register-text {
  font-weight: 300;
  font-size: 15px;
  color: #707070;
  margin-bottom: 30px;
}

.text-button {
  cursor: pointer;
}

#logIn-submit,
#re-submit,
#fp-submit {
  height: 50px;
  border: none;
  background: #33cccc;
  color: #ffffff;
  border-radius: 5px;
  box-shadow: -2px 10px 20px -1px rgba(51, 204, 204, 0.4);
  outline: none;
  cursor: pointer;
  width: 82px;
  text-align: center;
}
#logIn-submit:hover,
#re-submit:hover,
#fp-submit:hover {
  background: #07bbbb;
}
/*注册页面*/
.Register {
  display: none;
  opacity: 0;
  transform: translateX(0) rotateY(90deg);
}
.re-input {
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  letter-spacing: 2px;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 300;
  height: 45px;
}
.re-input1 {
  outline: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  width: 45%;
  letter-spacing: 2px;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 300;
  height: 45px;
  margin-right: 10px;
}
.re-text-button,
.fp-text-button {
  position: relative;
  top: 13px;
  left: 8px;
  font-weight: 300;
  font-size: 15px;
  color: #707070;
  cursor: pointer;
}
/*忘记密码页面*/
.ForPass {
  display: none;
  opacity: 0;
  transform: translateX(0) rotateY(90deg);
}
#fp-submit {
  margin: 20px 0;
}
.fp-text1 {
  display: none;
}

.middle {
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}
/*邮箱自动填充盒子*/
.email-BIGBOX {
  position: relative;
}
.email-box {
  position: absolute;
  width: 300px;
  top: 45px;
  background: #fff;
  z-index: 99;
  display: none;
}
.email-chance {
  display: inline-block;
  width: 100%;
  height: 28px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  line-height: 28px;
  padding-left: 3px;
}
.fold {
  transform: translateX(0) rotateY(90deg);
  opacity: 0;
}
.open {
  transform: translateX(0) rotateY(0deg);
  opacity: 1;
}
/*自适应*/
@media screen and (max-width: 1250px) {
  #logo {
    left: 100px;
  }
}
@media screen and (max-width: 1000px) {
  #logo {
    left: 30px;
  }
}
@media screen and (max-width: 850px) {
  #logo {
    transform: scale(0.7, 0.7);
    left: 0px;
  }
}
</style>
