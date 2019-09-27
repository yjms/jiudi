import uma from './unit/uma.min.js';
var app = getApp();
App({
  onLaunch(options) {
      uma.init('5d4d1c5b0cafb2b5030006f4', my);
    console.info('App onLaunch');
    var me = this;

  },
  onShow(options) {
      uma.resume()
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  onHide(){
      uma.pause();
  }
});
