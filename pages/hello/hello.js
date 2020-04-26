let token = (wx.getStorageSync('jwt_token'));
let nickname = (wx.getStorageSync('nickname'));
let avatarUrl = (wx.getStorageSync('avatarUrl'));
const app = getApp();
Page({
 
  onShow: function () {
    if (token) {
      wx.request({
        url: 'https://cavy.helloyzy.cn/api/user/auth/',
        header: {
          'Authorization': token,
        },
        success:function(res)
        {
          if(res.statusCode==200)
          {
            setTimeout(function () {
              wx.switchTab({
                url: '../index/index',
              })
            }, 3000)
            app.globalData.jwt_token = res.data.data.jwt_token;
            app.globalData.nickName = nickname;
            app.globalData.avatarUrl = avatarUrl;
            app.globalData.hasWeChat = res.data.data.has_weixin;
            wx.setStorageSync('jwt_token', res.data.data.jwt_token)
          }
          else
          {
            wx.showToast({
              title: '登录失败，请重新登陆',
              icon:'none',
              duration:2000,
              complete:function()
              {
                wx.navigateTo({
                  url: '../login/login',
                })
              }
            })
          }
        }
      })
     
    }
    else{
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
})

