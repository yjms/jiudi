const http = require('../../unit/http.js')
Page({
  data: {
      baseUrl:"https://game.flyh5.cn/resources/game/wechat/yls/putDrop",
      isLook:true,
      myWold:"",
      lzPop:true,
      codeObj:'',
      addObj:'',//查看地址信息对象
      biglength:true
  },
  onLoad() {
     this.myexchange();
  },
  backPage(){
     my.navigateBack({
        delta: 1
        })
  },
  copeCode(){
    my.setClipboard({
        text: "75FKJ56DH2W526", // 剪贴板数据
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
  lookCode(e){
     this.setData({isLook:false});
     let dat ={
       redeemId:e.currentTarget.dataset.id
     }
     console.log(e)
     http.Post('signIn/selectOneRedeemCode',dat,'post').then((res)=>{
      //  console.log(res);
      if(res.data.code=='0000'){
          console.log(res.data.result)
          if(res.data.result.endDate){
               let time = res.data.result.endDate.split(' ')[0].split('-');
               res.data.result.time = time;
          }
          this.setData({codeObj:res.data.result});
          // console.log(time)
      }
     }) 
  
  },
  myexchange(){
      let dat = {
         userId:my.getStorageSync({ key: 'useId' }).data
      }
      http.Post('signIn/selectByMemberId',dat,'post').then((res)=>{
          console.log(res.data.code)
          if(res.data.code=='0000'){
             for(let i=0;i<res.data.result.length;i++){
               let str = res.data.result[i].createdDate.split(' ');
               res.data.result[i].createdDate = str[0];
             }
             this.setData({myWold:res.data.result,biglength:res.data.result.length>0})
          }
          //  console.log('我的奖品',this.data.myWold)
          //  console.log('返回的数据',res.data.result)
      })
  },
  closePop(){
    console.log('关闭留资');
    this.setData({isLook:true,lzPop:true})
  },
  lookLz(e){
    // console.log(e)
    this.setData({lzPop:false})
    let dat={
      addressId:e.currentTarget.dataset.id
    }
    http.Post('signIn/selectOneAddress',dat,'post').then((res)=>{
      if(res.data.code=='0000'){
          this.setData({addObj:res.data.result})
      }
    })
  },
  goFund(){
    my.openVoucherList();
  }
});
