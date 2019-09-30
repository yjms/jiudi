const http = require('../../unit/http.js');
Page({
    data:{
         baseUrl:'https://game.flyh5.cn/resources/game/wechat/yls/putDrop',
         popShow:false,
         zouma:{},//走马灯数据
         canIUseAuthButton:true,
         useInfo:'',
         islogin:true,
         wineDropCount:100,
         nickName:'滴一滴',
         avatar:'',
         qdDay:[
           'one.png','two.png','three.png','fore.png','five.png','six.png','seven.png'
         ],//签到天数
         dayNum:0,//后台返回的天数
         qdshow:true,
         qdshow2:true,
         delays:2,
         isSigin:true
    },
  onLoad(query) {
    // 页面加载  
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    let isUse = my.getStorageSync({ key: 'useId' }).data;
    let useInfo = my.getStorageSync({ key: 'usrinfo' }).data;
    console.log(useInfo)
    // let isUse = my.getStorageSync({ key: 'useId' }).data;
    console.log('是否有用户id',isUse)
    if(isUse&&isUse!=''){
       this.setData({islogin:false,nickName:useInfo.nickName,avatar:useInfo.avatar})
      //  this.signIn(isUse);
    }
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    this.getZM()//获取走马灯数据
    // 页面显示
    let num = my.getStorageSync({ key: 'useId' }).data;
    if(num && num!='')
    this.getWinedrops();
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
  linkCity(){
    my.navigateTo({
        url: '../fangCity/fangCity'
    })
  },
  closePop(){
      this.setData({popShow:false,qdshow:true,qdshow2:true});
  },
  activePop(){
      this.setData({popShow:true});
  },
  overBrand(){
      my.showToast({content:"今日已签到！"});
    },
 onGetAuthorize(res){
   let self = this;
    my.getAuthCode({
      scopes: 'auth_user', // 主动授权（弹框）：auth_user，静默授权（不弹框）：auth_base
      success: (res) => {
      my.getOpenUserInfo({
      fail: (res) => {
      },
      success: (data) => {
        let userInfo = JSON.parse(data.response).response // 以下方的报文格式解析两层 response
            // console.log();
            my.setStorageSync({
              key: 'usrinfo', // 缓存数据的key
              data: {
                   nickName:userInfo.nickName,
                   avatar:userInfo.avatar
              }, // 要缓存的数据
            });
            let dat ={
                code:res.authCode,
                nickName:userInfo.nickName,
                avatar:userInfo.avatar
            }
           http.Post('signIn/auth',dat,'post').then((data)=>{
               if(data.data.code=='0000'){
                  self.setData({useInfo:data.data.result,islogin:false,nickName:userInfo.nickName, avatar:userInfo.avatar});
                  my.setStorageSync({
                    key: 'useId', // 缓存数据的key
                    data: data.data.result.userId, // 要缓存的数据
                  });
                  self.signIn(data.data.result.userId);
               }
           }) 
      }
    });
    },
    })
  }, 
  signIn(){
        let dat ={
                userId:my.getStorageSync({ key: 'useId' }).data
            }
           http.Post('signIn/signIn',dat,'post').then((data)=>{
               if(data.data.code=='0000'){
                 this.setData({dayNum:data.data.result.dayNum,isSigin:true})
                 this.getWinedrops();
                 if(data.data.result.signIn){
                    console.log('连续登陆多少天',data.data.result.dayNum,'==',data.data.result.dayNum%7==0)
                    if(data.data.result.dayNum%7==0){
                        my.navigateTo({
                              url:"/pages/overBrand/overBrand"
                        });
                        return;
                    }
                    this.setData({dayNum:data.data.result.dayNum,isSigin:true,qdshow:false})
                 }
               }
           })
  },
  // 获取酒滴数
  getWinedrops(){
       let dat ={
                userId:my.getStorageSync({ key: 'useId' }).data
            }
           http.Post('signIn/wineCount',dat,'post').then((data)=>{
               if(data.data.code=='0000'){
                  console.log('酒滴数',data.data.result.wineDropCount);
                  this.setData({wineDropCount:data.data.result.wineDropCount,delays:2,isSigin:data.data.result.signUp})
               }
           })
  },
  getZM(){
    http.Post('signIn/selectTenExchange',{},'post').then((res)=>{
        console.log(res);
        if(res.data.code=='0000'){
          this.setData({zouma:res.data.result})
          console.log(this.data.zouma)
        }
    })
  },
  tipsOver(){
      this.setData({qdshow:false});
      this.signIn();
  }
  // ,
  // tips(){
  //    my.showToast({content:''});
  // }
});
