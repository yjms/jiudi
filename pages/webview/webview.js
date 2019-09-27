const http = require('../../unit/http.js')
Page({
  data: {},
  onLoad() {
    http.Post('signIn/sendRedirect',{},'post').then((res)=>{
        
    })
  },
});
