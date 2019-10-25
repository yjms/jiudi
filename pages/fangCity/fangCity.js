const http = require('../../unit/http.js');
Page({
  data: {
      baseUrl:'https://game.flyh5.cn/resources/game/wechat/yls/putDrop',
      levShow:true,//留资弹窗
      towPop:true,//财运金弹窗
      shopList:'',//商品列表
      youku:true,//优酷弹窗
      xhJD:true,//消耗酒滴弹窗  
      type:'0',//兑换奖品类型
      prizeId:'',//需要兑换奖品的id
      userId:'',//用户id
      xhnum:'',//消耗酒滴数
      prizeName:'',//商品名字
      redeemCode:'',//兑换码
      endyeal:"",//兑换码截至日期
      consigneeName:'',//姓名
      consigneePhone:'',//电话
      zipCode:'',//邮编
      address:'',//address
      forId:'',//模板id
      jdbugou:true,//酒滴不够弹窗
      fortuneTime:[],//财运金有效期
      startTime:'',//开始时间
      endTime:'',//结束时间
      otherWorld:true,//其他奖品
      otherText:'',//其他奖品文案
      changePage:false,
      wineCount:0,//个人酒滴数
      biglength:true,
  },
  onLoad() {
    this.getshopList();
    this.getWinedrops();
  },
  myExchange(){//跳转我的兑换
      my.navigateTo({
          url:"/pages/myChange/myChange"
      });
  },
  exchange(e){//兑换按钮
      this.setData({
          type:e.currentTarget.dataset.type,
          prizeId:e.currentTarget.dataset.wid,
          xhnum:e.currentTarget.dataset.xhnum,
          prizeName:e.currentTarget.dataset.name, 
          userId:my.getStorageSync({ key: 'useId' }).data,
          forId:e.currentTarget.dataset.forId,
          couponMoney:e.currentTarget.dataset.couponMoney,
          otherText:e.currentTarget.dataset.other
      })
      if(this.data.wineCount<this.data.xhnum){
          this.setData({xhJD:true,jdbugou:false})
          return;
      }
      this.setData({xhJD:false})
      console.log("自己酒滴数",this.data.wineCount,"消耗酒滴数",this.data.xhnum);
  },
  comfigJD(){//消耗酒滴确定
      // console.log("酒滴数确认");
      let dat ={
        userId: my.getStorageSync({ key: 'useId' }).data,
        prizeId:this.data.prizeId
      }
      if(this.data.type==3){//如果是实物跳出
         this.setData({levShow:false,xhJD:true})
         return;
        }
      http.Post('signIn/exchangePrize',dat,'post').then((res)=>{
        //  console.log(res);
        if(res.data.code == '0000'){
               this.getshopList();
               this.getWinedrops();
           if(this.data.type==2){
                  this.setData({
                      redeemCode:res.data.result.redeemCode,
                      endDate:res.data.result.endDate.split(' ')[0].split('-'),
                      youku:false,
                      xhJD:true
                  })
            }else if(this.data.type==1){
                  let time = res.data.result[0].split(' ')[0].split('-');
                  my.setStorageSync({
                    key:'flag', // 缓存数据的key
                    data:'true', // 要缓存的数据
                  });
                  this.setData({
                      towPop:false,
                      xhJD:true,
                      fortuneTime:time,
                      startTime:res.data.result[1].substr(0,16).replace(/-/g,'.'),
                      endTime:res.data.result[0].substr(0,16).replace(/-/g,'.')
                  })
            }else{
                 this.setData({otherWorld:false,xhJD:true});
            }
            }else{
                  // my.showToast({
                  //   content:res.data.message
                  // })
                  if(res.data.message=='对不起，您的酒滴数量不够，请兑换其它奖品'){
                      this.setData({xhJD:true,jdbugou:false})
                    }
        }
      })
  },
  getValue(e){//获取表单内容并验证
      let val = e.detail.value;
      let type = e.currentTarget.dataset.type;
      if(type=='name'){
          this.setData({consigneeName:val});
      }else if(type=='phone'){
          this.setData({consigneePhone:val});
      }
      // else if(type=="mail"){
      //     this.setData({zipCode:val});
      // }
      else if(type=="address"){ 
        console.log(val);
          this.setData({address:val});
          this.setData({changePage:true});
      }
  },
  sublev(){//点击留资
    let name = this.data.consigneeName;
    let phone = this.data.consigneePhone;
    let mail = this.data.zipCode;
    let address = this.data.address;
    let useId = this.data.userId;
    let prizeId = this.data.prizeId;
    console.log(this.data.address);
    if(name==''){
      my.showToast({
        content:'姓名不能为空哦 !'
      });
      return;
    }else if(phone=='' || !http.checkIphone(phone)){
       console.log(6)
       my.showToast({
        content:'正确填写电话哦 !'
      });
      return;
    }
    // else if(mail=='' || !http.checkMail(mail)){
    //    my.showToast({
    //     content:'正确填写邮编哦 !'
    //   });
    //   return;
    // }
    else if(address==''){
      console.log(666)
      my.showToast({
        content:'地址不能为空哦 !'
      });
      return;
    }
    let dat ={
        userId:useId,//用户id
        prizeId:prizeId,//奖品id
        consigneeName:name,//姓名
        consigneePhone:phone,//电话
        zipCode:mail,//邮编
        address:address,//address
    }
    http.Post('signIn/exchangePrize',dat,'post').then((res)=>{
        // console.log('留资成功',res);
        if(res.data.code=='0000'){
            my.showToast({content:'恭喜您兑换成功!'});
            this.closePop();
            this.getshopList();
            this.getWinedrops();
        }
        if(res.data.message=='对不起，您的酒滴数量不够，请兑换其它奖品'){
          this.setData({levShow:true,xhJD:true,jdbugou:false})
        }
        
    })
  },
  closePop(){//关闭弹窗
      this.setData({
          levShow:true,
          towPop:true,
          youku:true,
          xhJD:true,
          jdbugou:true,
          couponMoney:0,
          otherWorld:true
      })
  },
  goUse(){//点击去使用
    console.log(123)
    this.setData({towPop:true})
    my.openVoucherList();
    //  my.redirectTo({
    //     url:"/pages/fortuneKing/fortuneKing?useid="+my.getStorageSync({ key: 'useId' }).data+'&forid='+this.data.forId+'&couponMoney='+this.data.couponMoney+'&stratTime='+this.data.startTime+'&endTime='+this.data.endTime
    //  })
  },
  copeCode(e){//复制兑换码
     console.log(e);
     my.setClipboard({
      text: e.currentTarget.dataset.redeemCode, // 剪贴板数据
      success: (res) => {
      my.showToast({
            type: 'none',
            content: '复制成功',
            duration: 3000,
            success: () => {
            },
            });
      },
    })
  },
  getshopList(){//获取所有奖品
      http.Post2('wineApi/signIn/selectAllPrize',{},'post').then((res)=>{
        if(res.data.code=="0000")
        this.setData({shopList:res.data.result,biglength:res.data.result.length>0});
        console.log(res.data.result,this.data.shopList);
      })
  },
  scollPage(){
    // let that = this;
    // let time= setInterval(function(){
    //   clearInterval(time)
       that.setData({changePage:true})
    // },200) 
  },
  toBottm(){
     console.log('失焦')
    this.setData({changePage:false})
  },
    // 获取酒滴数
  getWinedrops(){
       let dat ={
                userId:my.getStorageSync({ key: 'useId' }).data
            }
           http.Post('signIn/wineCount',dat,'post').then((data)=>{
               if(data.data.code=='0000'){
                  console.log('酒滴数',data.data.result.wineDropCount);
                 this.setData({wineCount:data.data.result.wineDropCount});
               }
           })
           
  }
});
