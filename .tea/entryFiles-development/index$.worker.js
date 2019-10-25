if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


var AFAppX = self.AFAppX.getAppContext
  ? self.AFAppX.getAppContext().AFAppX
  : self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;
        


function success() {
require('../../app');
require('../../components/tabs/tabs?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/index/index?hash=7964978c4d753d29be1c1fb425715550bed13f8d');
require('../../pages/fortuneKing/fortuneKing?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/fangCity/fangCity?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/myChange/myChange?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/overBrand/overBrand?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/test/test/test?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/webview/webview?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}