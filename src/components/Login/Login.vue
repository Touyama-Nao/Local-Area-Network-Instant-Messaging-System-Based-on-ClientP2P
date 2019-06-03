 <template>
  <el-row type="flex" class="row-bg">
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
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
			labelPosition: "left",
			isShowLogin: true,	//登陆框是否出现
      LoginForm: {
        name: ""
			},
			UsersList:[], //用户列表
    };
  },
  methods: {
    onLoginSubmit() {
			//this.isShowLogin = false;
			this.$router.push('/ContactList')
			this.$socket.emit('ServerLogin',{username:this.LoginForm.name})
		},
    resetForm(formName) {
      //重置登陆
			this.$refs[formName].resetFields();
    }
	},
	sockets: {
	ClientLogin(value) {	//服务端触发客户端这边的事件
		console.log(value);
		var isChage = false;
		var username = value.name.split(":")[1];	//根据格式获得名字
		var IP = value.IP;
		var item = {
			IP:IP,
			username:username
		}
		this.UsersList.map(function(value,index,array){
			if(value.IP == IP){	//通过IP判断这个人是否重复
				isChage = true;
			}
		})
		if(!isChage){	//如果遍历列表之后发现没有这个人的话
			this.UsersList.push(item);	//在用户列表中加入这个人
		}

  },
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
