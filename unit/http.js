function Post(url, param, method){
  let baseurl = 'https://dev.flyh5.cn/winedrops/wineApi/';
  // console.log(mstr);
  return new Promise((resolve,reject)=>{
   my.httpRequest({
      url: baseurl+url,
      data: param,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res);
      }
    })
  })
}
function Post2(url, param, method){
  let baseurl = 'https://dev.flyh5.cn/winedrops/';
  // console.log(mstr);
  return new Promise((resolve,reject)=>{
   my.httpRequest({
      url: baseurl+url,
      data: param,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      dataType: 'json',
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res);
      }
    })
  })
}
function checkIphone(phone) {
    console.log(phone)
    if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
      return false;
    } else {
      return true;
    }
  }

function checkMail(ss){
    console.log(ss)
     var re= /^[0-9][0-9]{5}$/
        if(re.test(ss)){
            return true;
        }else{
            return false;
        }
}
module.exports ={
    Post : Post,
    Post2 : Post2,
    checkIphone:checkIphone,
    checkMail:checkMail
}