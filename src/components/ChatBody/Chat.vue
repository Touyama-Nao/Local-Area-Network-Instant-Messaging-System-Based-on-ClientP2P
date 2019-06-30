<template>
  <div class="main">
    <div class="mainPage">
      <div id="mainChat">
        <div id="friends">
          <div class="downMenu">
            <ul class="dropDown" v-if="IsDropDwon == true">
              <li>
                <a href="#" title="关闭桌面通知" class="dropCell" id="mainNotice">
                  <i class="notice"></i>
                  <span id="dropNotice">关闭桌面通知</span>
                </a>
              </li>
              <li>
                <a href="#" title="关闭声音" class="dropCell" id="mainSound">
                  <i class="sound"></i>
                  <span id="dropSound">关闭声音</span>
                </a>
              </li>
              <li>
                <a href="#" title="意见反馈" class="dropCell">
                  <i class="view"></i>意见反馈
                </a>
              </li>
              <li @click="Logout()">
                <a href="#" title="退出" class="dropCell" id="out">
                  <i class="out"></i>退出
                </a>
              </li>
            </ul>
          </div>
          <div class="header">
            <div class="avatar">
              <img src="../../assets/head.jpg" class="headImg" />
            </div>
            <div class="info">
              <h3 class="nickname">
                <span class="user">{{MyInfo.username}}</span>
                <a href="#" class="opt" @click="IsDropDwon = !IsDropDwon">
                  <i class="downLogo"></i>
                </a>
              </h3>
            </div>
          </div>
          <div class="search">
            <i class="searchPhoto"></i>
            <input type="text" placeholder="搜索" class="searchBox" />
          </div>
          <div class="tab">
            <div class="tabElement">
              <a href="#" title="聊天" class="talk" @click="SwitchChooseNum = 1">
                <i class="talkBox" :class="{talkBoxChoose:SwitchChooseNum == 1}"></i>
              </a>
            </div>
            <div class="tabElement">
              <a href="#" title="阅读" class="read" @click="SwitchChooseNum = 2">
                <i class="readBox" :class="{readBoxChoose:SwitchChooseNum == 2}"></i>
              </a>
            </div>
            <div class="tabElement">
              <a href="#" title="通讯录" class="phone" @click="SwitchChooseNum = 3">
                <i class="phoneBox" :class="{phoneBoxChoose:SwitchChooseNum == 3}"></i>
              </a>
            </div>
          </div>
          <div class="friendsListMain">
            <div class="friendsListBox">
              <div class="friendsList">
                <div class="include">
                  <div class="target">
                    <!-- 									<ul>
     								<li
        						v-for="item in usersList"
        						:class="{ active: item.id === currentUserId }"
        						@click="selectSession(item.id)"
      							>
        							<img class="avatar" width="30" height="30" :alt="item.user.name" :src="item.user.img">
        							<p class="name">{{item.user.name}}</p>
      							</li>
                    </ul>-->
                    <div class="peopleBox" v-for="item in usersList" v-show="SwitchChooseNum == 3">
                      <div
                        class="peopleMain"
                        :class="{ active: item.id == currentUserId }"
                        @click="ClickPeopleInfo(item)"
                      >
                        <div class="people">
                          <div class="peopleImg">
                            <img :src="item.user.img" :alt="item.user.name" />
                          </div>
                          <div class="peopleNick">
                            <h4 class="peoplename">{{item.user.name}}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="navListBox">
            <div class="navListMain">
              <div class="navList">
                <div class="nav">
                  <div class="peopleStar"></div>
                  <div class="peopleEnd">
                    <div
                      class="friendsBox"
                      :key="index"
                      v-for="(item,index) in SendContentNumList"
                      v-show="SwitchChooseNum == 1"
                    >
                      <div
                        class="chatItem"
                        :class="{ active: item.id === currentUserId }"
                        @click="GetNewMsg(item,index)"
                      >
                        <div class="ext">
                          <p class="attr"></p>
                          <!-- 红点数目 -->
                        </div>
                        <div class="avatar">
                          <img :src="item.img" :alt="item.name" />
                          <i class="unread" v-if="item.Num != 0">{{item.Num}}</i>
                        </div>
                        <div class="text">
                          <h3 class="chatNick">
                            <span class="chatNicktext" :alt="item.name">{{item.name}}</span>
                          </h3>
                          <p class="chatContent">
                            <span class="chatContenttext">{{item.content}}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="chat">
          <div class="chatPage">
            <div class="boxHead">
              <div class="membersWrap">
                <div class="membersWrapBox slide-down" v-if="membersWrapBoxIsShow == true">
                  <div class="memberBox">
                    <div class="memberMain">
                      <div class="member opt">
                        <i class="add"></i>
                      </div>
                      <div class="member">
                        <img src="../../assets/iron.jpg" class="memberImg" />
                        <p class="memberName">{{menberInfo.memberName}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="call" v-show="isDownShow">
                <div class="titleWrap">
                  <a href="#" class="titleName">{{menberInfo.memberName}}</a>
                  <i
                    class="down"
                    style="width:10px;height:10px;"
                    @click="membersWrapBoxIsShow = !membersWrapBoxIsShow"
                  ></i>
                </div>
              </div>
            </div>
            <div class="room">
              <div class="figureBox">
                <i class="figureImg"></i>
              </div>
              <div class="unitBox" v-show="currentUserId != 0 && IsShowUserInfo == true">
                <div class="unit">
                  <div class="unitImg">
                    <img src="../../assets/iron.jpg" />
                  </div>
                  <div class="unitNickBox">
                    <h4 class="unitNick"></h4>
                  </div>
                  <p class="introduce"></p>
                  <div class="unitMetaBox">
                    <div class="unitMeta">
                      <label class="label">地址：</label>
                      <p class="address"></p>
                    </div>
                  </div>
                  <div class="unitMetaBoxa">
                    <div class="unitMeta">
                      <label class="label">邮箱：</label>
                      <p class="mail"></p>
                    </div>
                  </div>
                  <div class="unitMetaBoxb">
                    <div class="unitMeta">
                      <label class="label">年龄：</label>
                      <p class="age"></p>
                    </div>
                  </div>
                  <div class="actionBox" @click="UnitSendMsg()">
                    <a href="#" class="button">发消息</a>
                  </div>
                </div>
              </div>
              <div class="irc">
                <div class="chatMessageBox" v-show="isDownShow == true">
                  <div class="messageStar" :key="index" v-for="(item,index) in SendContentList">
                    <div class="speak" v-if="item.Sender.IP == menberInfo.IP && item.Sender.port == menberInfo.port">
                      <div class="clearfix">
                        <div class="subjectBox">
                          <div class="subjectMain-1">
                            <div class="timeBox">
                              <div class="time">{{item.date}}</div>
                            </div>
                            <img src="../../assets/head.jpg" />
                            <div class="subject">
                              <div class="plainBox right me">
                                <div class="plainMain">
                                  <div class="plain">
                                    <pre class="messagesend">{{item.content}}</pre>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="speak" v-if="item.Sender.IP == MyInfo.IP && item.Sender.port == MyInfo.port">
                      <div class="clearfix">
                        <div class="subjectBox">
                          <div class="subjectMain-2">
                            <div class="timeBox">
                              <div class="time"></div>
                            </div>
                            <img src="../../assets/iron.jpg" />
                            <div class="subject" style="float:left;">
                              <div class="plainBox right you">
                                <div class="plainMain">
                                  <div class="plain">
                                    <pre class="messagesend">{{item.content}}</pre>
                                    <img src="../../assets/wait.gif" class="wait" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="messageEnd"></div>
                </div>
                <div class="point" v-if="currentUserId == 0">
                  <i class="faceImg"></i>
                  <p class="nomessage news">暂时没有新消息</p>
                  <p class="cue">未选择聊天</p>
                </div>
              </div>
            </div>
            <div class="send" v-show=" IsSendShow == true">
              <div class="toolbar">
                <a href="#" title="表情" class="look"></a>
                <a href="#" title="截屏" class="screen"></a>
                <a href="#" title="图片和文件" class="photo"></a>
              </div>
              <div class="contentBox">
                <textarea class="content" v-model="NowSendContent"></textarea>
                <span class="caretPosHelper"></span>
              </div>
              <div class="action">
                <span class="enter">按下Ctrl+Enter换行</span>
                <a href="#" class="key" @click="SendMsg()">发送</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="help">
        <div class="copr-2">
          © 1998 - 2019 Tencent Inc. All Rights Reserved
          <span class="cut-1 cut-2"></span>帮助
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      IsDropDwon: false, //下拉框是否出现
      SwitchChooseNum: 1, //阅读,聊天,通讯录选择序号
      MyInfo: {
        //用于存放本人信息
        username: "",
        IP: "",
        port: ""
      },
      usersList: [
        //存放用户列表
        /*         {
          id:1,
          IPAddress:"",
					user:{
						name:"珊莎史塔克",
						img:require("../../assets/otherhead.jpg")
					}
        } */
      ],
      currentUserId: 0, //存放用户列表的当前选中的位数
      IsShowUserInfo: true, //确保用户信息页是否显示
      IsSendShow: false,
      membersWrapBoxIsShow: false,
      menberInfo: {
        memberName: "xiao",
        IP: "",
        port: "" //端口号
      },
      isDownShow: false, //聊天框上面的人名
      SendContent: {
        //发送消息的数据格式
        Sender: {
          name: "",
          IP: ""
        },
        receiver: {
          name: "",
          IP: ""
        },
        content: "", //发送内容
        date: "", //发送时间
        type: 0 //指示传送的是文件还是消息
      },
      SendContentList: [], //发送消息的缓存列表
      SendContentNumList: [], //统计发送消息的数量和人
      NowSendContent: "", //现在发送的消息(输入框里面的)
      SendBuffer: [] //发送消息的输入框缓存
    };
  },
  mounted() {
    this.MyInfo.username = this.$route.query.username;
    this.MyInfo.IP = this.$route.query.IP;
    this.MyInfo.port = this.$route.query.port;
  },
  methods: {
    ClickPeopleInfo(item) {
      this.IsSendShow = false;
      this.IsShowUserInfo = true;
      this.currentUserId = item.id;
      this.menberInfo.memberName = item.user.name;
      this.menberInfo.IP = item.user.IPAddress;
      this.menberInfo.port = item.user.port;
      this.isDownShow = false;
    },
    UnitSendMsg(index) {
      //在联系人详情页按下发送消息键
      var that = this;
      for (let index = 0; index < that.SendContentNumList.length; index++) {
        if (that.SendContentNumList[index].IP == that.menberInfo.IP) {
          that.SendContentNumList[index].Num = 0; //获取消息之后红点数量变成零!
        }
      }
      this.IsShowUserInfo = false;
      this.IsSendShow = true;
      this.membersWrapBoxIsShow = false;
      this.isDownShow = true;
      this.$socket.emit("TCPClientConnectServer", {
        Sender: { name: that.MyInfo.username, IP: that.MyInfo.IP,port:that.MyInfo.port },
        receiver: { name: that.menberInfo.memberName, IP: that.menberInfo.IP,port:that.menberInfo.port  }
      }); //登陆触发服务端的函数,建立TCP连接
    },
    SendMsg() {
      var that = this;
      this.$socket.emit("TCPClientSendSever", {
        Sender: { name: that.MyInfo.username, IP: that.MyInfo.IP ,port:that.MyInfo.port},
        receiver: { name: that.menberInfo.memberName, IP: that.menberInfo.IP,port:that.menberInfo.port },
        content: that.NowSendContent,
        date: ""
      });
      this.SendContentList.push({
        Sender: {
          name: that.MyInfo.username,
          IP: that.MyInfo.IP,
          port: that.MyInfo.port
        },
        receiver: { name: that.menberInfo.memberName, IP: that.menberInfo.IP },
        content: that.NowSendContent,
        date: ""
      });
      this.NowSendContent = ""; //清空输入框
    },
    GetNewMsg(item, index) {
      //获取对应人的最新消息
      var that = this;
      that.SendContentNumList[index].Num = 0; //获取消息之后红点数量变成零!
      this.IsShowUserInfo = false;
      this.IsSendShow = true;
      this.membersWrapBoxIsShow = false;
      this.isDownShow = true;
      that.currentUserId = item.IP;
      this.menberInfo.memberName = that.SendContentNumList[index].name;
      this.menberInfo.IP = that.SendContentNumList[index].IP;
      this.menberInfo.port = that.SendContentNumList[index].port;
    },
    Logout() {
      var that = this;
      this.$socket.emit("ServerLogout", {
        username: that.MyInfo.username,
        IP: that.MyInfo.IP,
        port: that.MyInfo.port
      });
      that.$message({
        type: "success",
        message: "登出成功!"
      });
      this.$router.push({
        path: "/",
        query: {

        }
      });
      this.IsDropDwon = false; //关掉下拉框
    }
  },
  sockets: {
    //服务端触发客户端这边的事件
    ClientLogin(value) {
      var that = this;
      console.log(value);
      var username = value.User.name; //根据格式获得名字
      var IP = value.User.IP;
      var isChange = false;
      var item = {
        //用户列表中的数据格式
        id: IP,
        IPAddress: IP,
        port: value.User.port,
        user: {
          name: username,
          img: require("../../assets/otherhead.jpg")
        }
      };
      console.log(value.User.port, that.MyInfo.port);
      if (
        value.User.IP == that.MyInfo.IP &&
        value.User.port == that.MyInfo.port
      ) {
        isChange = true;
      }
      this.usersList.map(function(value, index, array) {
        console.log(value);
        if (value.IPAddress == IP || IP == that.MyInfo.IP) {
          //通过IP判断这个人是否重复
          isChange = true;
        }
      });
      console.log(that.usersList);
      if (isChange == false) {
        //如果遍历列表之后发现没有这个人的话
        that.usersList.push(item); //在用户列表中加入这个人
      }
      this.$notify.info({
        title: "上线提醒",
        message: value.User.name + "上线了!"
      });
    },
    GetMsg(value) {
      console.log(value);
      var that = this;
      var isSame = false;
      for (let i = 0; i < that.SendContentNumList.length; i++) {
        if (that.SendContentNumList[i].IP == value.Sender.IP) {
          isSame = true;
        }
        that.SendContentNumList[i].Num++; //红点数量加一
      }
      if (that.SendContentNumList.length == 0) {
        isSame = false;
      }
      var item = {
        //SendContentNumList的数据格式
        name: "",
        IP: "",
        port: "",
        Num: 0, //红点数量
        content: "", //发消息来的最新内容
        img: require("../../assets/otherhead.jpg") //头像
      };
      if (isSame == false) {
        for (let i = 0; i < that.usersList.length; i++) {
          if (that.usersList[i].IPAddress == value.Sender.IP) {
            item.name = that.usersList[i].user.name;
          }
        }
        item.IP = value.Sender.IP;
        item.port = value.Sender.port;
        item.content = value.content;
        this.SendContentNumList.push(item);
      }
      //从node服务端传回来的TCP信息
      this.SendContentList.push(value); //将返回信息保存
      console.log(this.SendContentList);
      console.log(this.SendContentNumList);
      this.$notify.info({
        //显示通知!
        title: item.name + "发来消息",
        message: value.content,
        duration: 0
      });
    },
    CilentLogout(value) {
      var that = this;
      //用户下线!
      this.$notify({
        title: "下线提醒",
        message: value.User.name + "下线了!朋友我们有缘再见!",
        type: "warning"
      });
      for (let i = 0; i < that.usersList.length; i++) {
        //用户列表去掉这个人!
        if (that.usersList[i].user.IP == value.User.IP) {
          that.usersList.splice(index, 1); //用户列表去掉这个人!
        }
      }
      for (let i = 0; i < that.SendContentNumList.length; i++) {
        //用户列表去掉这个人!
        if (that.SendContentNumList[i].user.IP == value.User.IP) {
          that.SendContentNumList.splice(index, 1); //用户列表去掉这个人!
        }
      }
    }
  }
};
</script>

<style scoped>
* {
  border: 0;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: MicrosoftYaHei;
}
a,
button {
  cursor: pointer;
}
.main {
  background: url(../../assets/background.jpg) no-repeat 50%;
  background-size: cover;
  height: 100%;
}
.active {
  background-color: #3a3f45 !important;
  color: #fff;
}
.loginPage {
  display: block;
  /*display: none;*/
  position: relative;
  height: 100%;
  overflow: auto;
  min-width: 860px;
  min-height: 700px;
}
#logo {
  background-image: url(../../assets/logo.png);
  width: 40px;
  height: 32px;
  background-size: 100% 100%;
  position: absolute;
  left: 60px;
  top: 60px;
  z-index: 1;
}
#login-box {
  background-color: #fff;
  width: 380px;
  height: 540px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -190px;
  margin-top: -270px;
  box-shadow: 0 2px 10px #999;
  border-radius: 4px;
}
.login-title {
  width: 100%;
  text-align: center;
  color: #666;
  margin-top: 70px;
  font-weight: 400;
}
.login-EN {
  width: 100%;
  text-align: center;
  color: #999;
  margin-top: 20px;
}
.mainMessage {
  font-size: 18px;
  color: #666;
  line-height: 60px;
  margin-left: 40px;
}
.error {
  color: #f00;
  font-size: 14px;
  font-weight: bold;
  margin-left: 40px;
  margin-top: 40px;
}
.message {
  border-bottom: 1px solid #666;
  width: 250px;
  height: 30px;
  font-size: 18px;
  text-indent: 0.3em;
  color: #666;
}
.message:focus {
  outline: none;
}
::placeholder {
  color: #999;
}
#remember {
  margin-left: 80px;
}
.mainMessage div {
  height: 14px;
  font-size: 13px;
  margin-top: -10px;
}
.mainMessage div span {
  display: inline-block;
  margin: 0 10px;
  height: 13px;
  border-left: 1px solid #666;
  vertical-align: middle;
}
#submit {
  margin-top: 80px;
  background-color: #1aad19;
  width: 310px;
  height: 40px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  line-height: 40px;
  letter-spacing: 2px;
  border-radius: 6px;
}
.lang {
  position: absolute;
  left: 60px;
  bottom: 60px;
}
.lang a {
  text-decoration: none;
  font-size: 12px;
  color: #d3d3d3;
}
.cut-1 {
  display: inline-block;
  margin: 0 10px;
  height: 12px;
  border-left: 1px dashed #d3d3d3;
  vertical-align: middle;
}
.copr-1 {
  position: absolute;
  right: 60px;
  bottom: 60px;
  font-size: 12px;
  color: #d3d3d3;
}
.mainPage {
  /*display: block;*/
  /* 	display: none; */
  overflow: auto;
  height: 80%;
  min-height: 600px;
  padding-top: 100px;
  -webkit-transition: padding 0.3s linear;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.copr-2 {
  position: absolute;
  width: 100%;
  bottom: 30px;
  text-align: center;
  font-size: 12px;
  color: #e3e3e3;
}
.cut-2 {
  border-left: 1px solid #e3e3e3;
}
#mainChat {
  max-width: 1000px;
  min-width: 800px;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 3px;
}
#friends {
  position: relative;
  float: left;
  width: 280px;
  height: 100%;
  background-color: #2e3238;
}
.header {
  padding: 18px;
  position: relative;
}
.header .avatar {
  display: table-cell;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-all;
  white-space: nowrap;
  padding-right: 10.625px;
}
.headImg {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  display: block;
  cursor: pointer;
}
.info {
  display: table-cell;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-all;
  width: 2000px;
}
.nickname {
  word-break: break-all;
}
.user {
  display: inline-block;
  font-weight: 400;
  width: 156px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  color: #fff;
  font-size: 18px;
  vertical-align: top;
  line-height: 31px;
  text-decoration: none;
}
.opt {
  display: inline-block;
  vertical-align: top;
}
.downLogo {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -434px -398px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.search {
  position: relative;
  width: 244px;
  margin: 0 auto 6px;
}
.searchPhoto {
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -60px -432px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
  position: absolute;
  z-index: 101;
  top: 1px;
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
}
.searchBox {
  width: 214px;
  height: 32px;
  line-height: 32px;
  border: 0;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  background-color: #26292e;
  color: #fff;
  padding-left: 30px;
  font-size: 12px;
}
.tab {
  overflow: hidden;
  position: relative;
  padding-bottom: 4px;
}
.tab:after {
  content: "";
  position: absolute;
  border-bottom: 1px solid #24272c;
  height: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.tabElement {
  float: left;
  width: 33.33333333%;
  position: relative;
}
.tabElement:after {
  content: "";
  position: absolute;
  top: 7px;
  right: 0;
  width: 0;
  height: 20px;
  border-right: 1px solid #24272c;
}
.tabElement a {
  display: block;
  text-align: center;
}
.talkBox,
.readBox,
.phoneBox {
  display: inline-block;
  vertical-align: middle;
  width: 35px;
  height: 35px;
}
.talkBox {
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -150px -96px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.talkBoxChoose {
  background-position: -185px -96px;
}
.readBox {
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -376px -322px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.readBoxChoose {
  background-position: -304px -281px;
}
.phoneBox {
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -220px -96px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.phoneBoxChoose {
  background-position: -304px -246px;
}
#chat {
  height: 100%;
}
.chatPage {
  position: relative;
  background-color: #eee;
  height: 100%;
  overflow: hidden;
}
@media (max-height: 800px), (max-width: 1000px) {
  .mainPage {
    padding-top: 0;
    height: 100%;
  }
}
@media (max-height: 800px), (max-width: 1000px) {
  .mainPage .copr-2 {
    display: none;
  }
}
.boxHead {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  line-height: 30px;
}
.call {
  position: relative;
  padding: 10px 0;
  margin: 0 19px;
  border-bottom: 1px solid #d6d6d6;
  background-color: #eee;
  z-index: 1024;
}
.titleWrap {
  cursor: pointer;
  font-weight: 400;
  height: 25px;
  display: inline-block;
  font-size: 14px;
}
.titleName {
  display: inline-block;
  vertical-align: middle;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  text-decoration: none;
  color: #000;
  font-weight: 400;
}
.down {
  /* 	display: none; */
  vertical-align: middle;
  display: inline-block !important;
  width: 10px;
  height: 10px;
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -477px -65px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.room {
  position: absolute;
  bottom: 180px;
  overflow: hidden !important;
  padding: 0 !important;
  top: 51px;
  right: 0;
  left: 0;
}
.room1 {
  position: absolute;
  top: 51px;
  right: 0;
  bottom: 0;
  left: 0;
}
.irc {
  margin-bottom: 0px;
  margin-right: 0px;
  height: 523px;
  bottom: 180px;
  padding: 0 19px;
  border: none !important;
  box-sizing: content-box !important;
  left: 0;
  margin: 0;
  max-height: none !important;
  max-width: none !important;
  overflow: scroll !important;
  position: relative !important;
  top: 0;
  width: auto !important;
}
.point {
  text-align: center;
  margin-top: 130px;
  color: #ccc;
  font-size: 13px;
}
.face {
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 90px;
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -96px -150px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.nomessage {
  display: none;
}
.send {
  /* 	display: none; */
  height: 180px;
  margin-right: 19px;
  border-top: 1px solid #d6d6d6;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
.toolbar {
  height: 30px;
  padding: 5px 17px;
}
.look,
.screen,
.photo {
  float: left;
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.look {
  background: url(../../assets/logoAll.png);
  background-position: -404px -398px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.screen {
  background: url(../../assets/logoAll.png);
  background-position: -30px -432px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.photo {
  background: url(../../assets/logoAll.png);
  background-position: -120px -432px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.content {
  line-height: 1.6;
  height: 6em;
  background-color: transparent;
  width: 100%;
  resize: none;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 20px;
  outline: none;
  border: 0;
  font-size: 14px;
  margin: 0;
  font-family: inherit;
  white-space: pre-wrap;
  word-break: normal;
  -webkit-user-modify: read-write;
  -moz-user-modify: read-write;
  user-modify: read-write;
  overflow-wrap: break-word;
  -webkit-line-break: after-white-space;
  -moz-line-break: after-white-space;
}
.caretPosHelper {
  position: absolute;
  filter: alpha(opacity = 0);
  -moz-opacity: 0;
  -khtml-opacity: 0;
  opacity: 0;
  white-space: pre;
}
.action {
  text-align: right;
  margin-top: 5px;
}
.enter {
  color: #888;
  font-size: 12px;
  margin-left: 10px;
  margin-right: 7px;
}
.key {
  ext-decoration: none;
  background-color: #fff;
  color: #222;
  padding-left: 30px;
  padding-right: 30px;
  display: inline-block;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  padding: 3px 20px;
  font-size: 14px;
}
.downMenu {
  top: 60px;
  left: 85px;
  position: absolute;
  background-color: #fff;
  z-index: 99;
  outline: none;
  background: transparent !important;
  z-index: 102 !important;
  width: 180px;
}
.dropDown {
  /* 	display: none; */
  background-color: #fff;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  overflow: hidden;
  border: 1px solid #d6d6d6;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: rgba(0, 0, 0, 0.1) 2px 3px 10px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 2px 3px 10px;
  min-width: 125px;
}
.dropDown li a {
  display: block;
  text-decoration: none;
  color: #000;
  font-size: 14px;
  padding: 8px;
  border-bottom: 1px solid #f1f1f1;
  text-align: left;
}
.dropDown li i {
  margin-right: 8px;
}
.notice {
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -68px -398px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
  display: inline-block;
  vertical-align: middle;
  width: 34px;
  height: 34px;
}
.sound {
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -170px -398px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
  display: inline-block;
  vertical-align: middle;
  width: 34px;
  height: 34px;
}
.view {
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -306px -398px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
  display: inline-block;
  vertical-align: middle;
  width: 34px;
  height: 34px;
}
.out {
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -102px -398px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
  display: inline-block;
  vertical-align: middle;
  width: 34px;
  height: 34px;
}
.material {
  display: none;
  position: absolute;
  background-color: #fff;
  z-index: 99;
  top: 0;
  left: 0;
  outline: none;
  z-index: 999 !important;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: rgba(0, 0, 0, 0.1) 0 5px 10px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0 5px 10px;
}
.scale-fade {
  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
#materialImg {
  width: 220px;
  height: 220px;
  display: block;
}
.materialBehind {
  padding: 20px;
  min-height: 74px;
}
.nicknameArea {
  margin-bottom: 8px;
}
.nicknameChat {
  float: right;
}
#nicknameChat {
  display: inline-block;
  vertical-align: middle;
  width: 22px;
  height: 22px;
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -223px -432px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.nicknameMain {
  font-weight: 400;
  font-size: 18px;
  display: inline-block;
  vertical-align: middle;
  max-width: 110px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.metaMain {
  overflow: hidden;
}
.label {
  float: left;
  font-size: 12px;
  color: #888;
  margin-right: 10px;
  cursor: default;
}
.another {
  font-size: 12px;
  color: #888;
  width: 105px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  padding-left: 5px;
  padding-right: 5px;
}
.change,
.sure {
  position: absolute;
  right: 18px;
  bottom: 18px;
  padding: 5px 10px;
  font-size: 12px;
  background-color: #eee;
  border-radius: 40px;
}
.change,
.sure:focus {
  outline: none;
}
.revise {
  display: none;
  height: 360px;
  width: 400px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -200px;
  text-align: center;
  font-size: 20px;
  color: #666;
  line-height: 50px;
  padding: 20px 0;
}
.revise input {
  font-size: 16px;
  padding: 0 2px;
  border-bottom: 1px solid #d6d6d6;
}
.friendsListMain {
  visibility: visible;
  width: auto;
  top: 154px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
.friendsListBox {
  position: relative;
  height: 100%;
  overflow: hidden !important;
  padding: 0 !important;
}
.friendsList {
  margin-bottom: 0px;
  margin-right: 0px;
  height: 601px;
  order: none !important;
  box-sizing: content-box !important;
  left: 0;
  margin: 0;
  max-height: none !important;
  max-width: none !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
  padding: 0;
  position: relative !important;
  top: 0;
  width: auto !important;
}
.target {
  height: 0px;
}

.friendsBox {
  cursor: pointer;
}
.chatItem {
  background: transparent;
  overflow: hidden;
  padding: 12px 18px 11px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
  position: relative;
}
.ext {
  color: #fff;
  float: right;
  font-size: 13px;
  text-align: right;
}
.attr {
  height: 19px;
  line-height: 1.5;
}
.avatar img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
}
.chatItem .avatar {
  float: left;
  margin-right: 10px;
  position: relative;
}
.text {
  overflow: hidden;
}
.chatNick {
  font-weight: 400;
  font-size: 13px;
  color: #fff;
  line-height: 20px;
}
.chatNicktext {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  vertical-align: top;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-weight: 400;
  font-size: 13px;
  color: #fff;
  line-height: 20px;
}
.chatContent {
  color: #fff;
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  height: 1.5em;
}
.chatContenttext {
  color: #989898;
  font-size: 13px;
  white-space: nowrap;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  /*   display: none; */
}
::-webkit-scrollbar-thumb {
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  background-color: #c3c3c3;
}
::-webkit-scrollbar-track {
  background-color: transparent;
}
.messageStar,
.messageEnd {
  height: 55px;
  margin: 0 auto;
  text-align: center;
  font-size: 12px;
  /*   color: #b2b2b2; */
  color: #000;
  line-height: 120%;
}
.messageStar {
  cursor: pointer;
}
.subjectBox {
  overflow: hidden;
}
.subjectMain-1 {
  float: right;
  text-align: right;
  clear: right;
  margin-bottom: 16px;
  width: 100%;
}
.subjectMain-2 {
  margin-bottom: 16px;
  float: left;
  width: 100%;
}
.subjectMain-1 img {
  float: right;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  cursor: pointer;
}
.subjectMain-2 img {
  width: 40px;
  height: 40px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  float: left;
  cursor: pointer;
}
.subject {
  overflow: hidden;
}
.me {
  background-color: #b2e281;
}
.you {
  background-color: #fff;
}
.plainBox {
  max-width: 500px;
  min-height: 1em;
  display: inline-block;
  vertical-align: top;
  position: relative;
  text-align: left;
  font-size: 14px;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  margin: 0 10px;
}
.timeBox {
  text-align: center;
  margin: 10px auto;
  max-width: 50%;
}
.time {
  display: inline-block;
  font-size: 12px;
  padding: 1px 18px;
  color: #b2b2b2;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
}
.plainBox.me.right:after,
.plainBox.me.right:before {
  left: 100%;
}
.plainBox:after,
.plainBox:before {
  position: absolute;
  top: 14px;
  border: 6px solid transparent;
  content: " ";
}
.plainBox.me.right:after {
  border-left-color: #b2e281;
  border-left-width: 4px;
}
.plainBox.you.right:after {
  border-right-color: #fff;
  border-right-width: 4px;
}
.plainBox.you.right:before,
.plainBox.you.right:after {
  right: 100%;
}
.plainMain {
  word-wrap: break-word;
  word-break: break-all;
  min-height: 25px;
}
.plain {
  padding: 9px 13px;
}
.messagesend {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  white-space: pre-wrap;
  word-break: normal;
}
.people {
  overflow: hidden;
  padding: 10px 18px 9px;
  border-bottom: 1px solid #292c33;
  cursor: pointer;
}
.peopleImg {
  float: left;
  margin-right: 10px;
}
.peopleImg img {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
}
.peopleNick {
  overflow: hidden;
  line-height: 30px;
}
.peoplename {
  color: #fff;
  font-weight: 400;
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.navListBox {
  width: auto;
  top: 154px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
}
.navListMain {
  position: relative;
  height: 100%;
  overflow: hidden !important;
  padding: 0 !important;
}
.navListMain .navList {
  margin-bottom: 0px;
  margin-right: 0px;
  height: 550px;
  border: none !important;
  box-sizing: content-box !important;
  left: 0;
  margin: 0;
  max-height: none !important;
  max-width: none !important;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
  padding: 0;
  position: relative !important;
  top: 0;
  width: auto !important;
}
.peopleStar {
  height: 0px;
}
.peopleEnd {
}
.figureBox {
  display: none;
  margin: 50px;
  text-align: center;
  color: #888;
  font-size: 14px;
}
.figureImg {
  display: inline-block;
  vertical-align: middle;
  width: 150px;
  height: 150px;
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: 0 0;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.faceImg {
  display: inline-block;
  vertical-align: middle;
  width: 100px;
  height: 90px;
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -96px -150px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.unit {
  padding: 80px 0;
  text-align: center;
}
.unitImg {
  margin-bottom: 22px;
}
.unitImg img {
  display: block;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
}
.unitNick {
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 10px;
  display: inline-block;
}
.unitMetaBox {
  width: 250px;
  padding-left: 160px;
  text-align: left;
  margin: 30px auto 10px;
}
.unitMetaBoxa {
  width: 250px;
  padding-left: 160px;
  text-align: left;
  margin: 5px auto 10px;
}
.unitMetaBoxb {
  width: 250px;
  padding-left: 160px;
  text-align: left;
  margin: 5px auto 40px;
}
.unitMeta {
  overflow: hidden;
}
.address,
.mail,
.age {
  font-size: 12px;
  color: #888;
  width: 134px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.button {
  display: inline-block;
  width: 200px;
  text-align: center;
  color: #fff;
  line-height: 40px;
  background-color: #42ac3e;
  font-size: 14px;
  text-decoration: none;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
}
.unread {
  position: absolute;
  top: -6px;
  right: -6px;
  color: #fff;
  font-style: normal;
  font-size: 12px;
  text-align: center;
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -451px -380px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
  display: inline-block;
  vertical-align: middle;
  width: 22px;
  height: 16px;
}
.scrollY {
  height: 100%;
  min-height: 100%;
  right: 2px;
  top: 0;
  width: 7px;
  display: block;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10;
  box-sizing: content-box;
  cursor: default;
}
.scrollY div {
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: content-box;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  z-index: 10;
}
.scroll-element_corner {
  display: block;
  height: 100%;
  left: 0;
  top: 0;
  width: 100%;
}
.scrollY .scroll-element_outer {
  left: auto;
  right: 0;
  top: 2px;
  transition: width 0.2s;
  opacity: 0.3;
  border-radius: 12px;
}
.scrollY .scroll-element_size {
  top: -4px;
  background-color: #ccc;
  opacity: 0;
  border-radius: 12px;
  transition: opacity 0.2s;
}
.scrollY .scroll-bar {
  left: auto;
  height: 52px;
  top: 466.96px;
  min-height: 24px;
  right: 0;
  width: 7px;
  background-color: #6c6e71;
  border-radius: 7px;
}
.wait {
  position: absolute;
  right: 100%;
  top: 50%;
  margin-top: -7px;
  margin-right: 13px;
  vertical-align: middle;
  display: none !important;
}
.membersWrapBox {
  /* 	display: none; */
  top: 50px;
  margin-top: 1px;
  box-shadow: 1px 1px 1px #e0e0e0;
  -moz-box-shadow: 1px 1px 1px #e0e0e0;
  -webkit-box-shadow: 1px 1px 1px #e0e0e0;
  width: 100%;
  position: absolute;
  background-color: #fff;
  z-index: 99;
  left: 0;
  outline: none;
}
.slide-down {
  transition: all 0 cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.memberBox {
  padding: 10px 4px 8px 17px;
  background-color: #eee;
  border-bottom: 1px solid #dedede;
}
.memberMain {
  margin-right: -4px;
  max-height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
.memberMain:after {
  content: "";
  display: block;
  clear: both;
}
.member.opt {
  cursor: pointer;
  margin-right: 15px;
}
.member {
  float: left;
  position: relative;
  height: 85px;
  margin-right: 7px;
  margin-left: 7px;
  padding-top: 10px;
}
.add {
  display: inline-block;
  vertical-align: middle;
  width: 55px;
  height: 55px;
  background: url(../../assets/logoAll.png) no-repeat;
  background-position: -422px -55px;
  -webkit-background-size: 487px 462px;
  background-size: 487px 462px;
}
.memberImg {
  display: block;
  cursor: pointer;
  width: 55px;
  height: 55px;
  background-color: #ccc;
}
.memberName {
  color: #888;
  width: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  font-size: 12px;
  margin-left: -8px;
  vertical-align: middle;
}
.rightdown {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
}
.rightdownMenu {
  background-color: #fff;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  overflow: hidden;
  border: 1px solid #d6d6d6;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: rgba(0, 0, 0, 0.1) 2px 3px 10px;
  -webkit-box-shadow: rgba(0, 0, 0, 0.1) 2px 3px 10px;
  min-width: 125px;
  padding-left: 0;
  list-style-type: none;
}
.rightdownCell {
  display: block;
  text-decoration: none;
  color: #000;
  font-size: 14px;
  padding: 8px;
  /*border-bottom: 1px solid #f1f1f1;*/
  text-align: left;
}
.rightdownMenu:hover {
  background-color: #f1f1f1;
}
</style>