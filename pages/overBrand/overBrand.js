const http = require('../../unit/http.js');
Page({
  data: {
    baseUrl:'https://game.flyh5.cn/resources/game/wechat/yls/putDrop',
    animationInfo:{},
    arr:[1,2,3,4,5,6],
    num:-1,
    rotate:0,
    rotateNum:-3,
    isShow:false,
    txtShow:false,
    jdImg:['game2_7.png','game2_6.png','game2_5.png','game2_4.png','game2_3.png','game2_2.png'],
    getjdNnm:''
  },
  onLoad() {},
  luckDraw(){
      let dat ={
        userId:my.getStorageSync({ key: 'useId' }).data
      }
      http.Post('signIn/budget',dat,'post').then((res)=>{
        console.log(res);
        if(res.data.code=='0000'){
            this.setData({getjdNnm:res.data.result})
            let that = this;
            let flag = this.data.num;
            const animation = my.createAnimation({
                    transformOrigin: "center center",
                    duration: 100,
                    timingFunction: "linear",
                  })
            animation.scale(1.2,1.2).step();
            animation.scale(1,1).step();
            let time = setInterval(function(){
              if (flag==5){
                    clearInterval(time);
              } 
              console.log(flag);
              flag++;
              that.setData({num:flag});
            },200)
            that.setData({animationInfo:animation.export()})
            }else{
                my.showToast({
                  content: res.data.message
            });
            return;
        }
        
      })
      //  if(this.data.num!=-1)
      //  return;
    
     },
     backHome(){
         my.redirectTo({
           url: '/pages/index/index', // 需要跳转的应用内非 tabBar 的目标页面路径 ,路径后可以带参数。参数规则如下：路径与参数之间使用
         });
     }
});
