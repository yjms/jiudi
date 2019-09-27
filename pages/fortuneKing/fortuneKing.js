Page({
  data: {
         baseUrl:'https://game.flyh5.cn/resources/game/wechat/yls/putDrop',
         isIphoneX:false,
         forid:'',
         useid:'',
         couponMoney:'',
         num:0,
         stratTime:'',
         endTime:''
  },
  onLoad(option) {
    this.setData({forid:option.forid,useid:option.useid,couponMoney:option.couponMoney,stratTime:option.stratTime,endTime:option.endTime});
   },
   onShow(){
    //  this.setData({num:0})
    //  let bool = my.getStorageSync({ key: 'flag' }).data;
    //  console.log(bool);
    //  if(!bool||bool=='false'){
    //       my.redirectTo({url:'/pages/fangCity/fangCity'});
    //  }
   },
   onHide(){
      //  my.setStorageSync({
      //     key:'flag', // 缓存数据的key
      //     data:'false', // 要缓存的数据
      //   });
   },
    goUse(){
    my.openVoucherList();
    // if(this.data.num !=0)
    // return;
    // let that = this;
    // let bool = my.getStorageSync({ key: 'flag' }).data;
    // let time = setTimeout(function(){
    //         that.setData({num:++that.data.num});
    //         clearTimeout(time);
    //         if(!bool||bool=='false')
    //         return; 
    //         console.log('alipays://platformapi/startapp?appId=68687143&url=%2Fwww%2Findex.html%3FuserId%3D'+that.data.useid+'%26templateId%3D'+that.data.forid);
    //         my.ap.navigateToAlipayPage({
    //         path:'alipays://platformapi/startapp?appId=68687143&url=%2Fwww%2Findex.html%3FuserId%3D'+that.data.useid+'%26templateId%3D'+that.data.forid,
    //         success:(res) => {
    //                   console.log('chenggong',JSON.stringify(res))
    //                   console.log('chenggong')
    //               },
    //               fail:(error) => {
    //                   console.log('shibai',JSON.stringify(res))
    //               }
    //           })
    // },500)
   
    }
});
