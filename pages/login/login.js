const app = getApp();

Page({
  data:{
    encryptedData:'',
    iv:'',
    code:'',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  login:function()
  {
    let that = this;
    wx.login({
      success:function(res)
      {
        if(res.code)
        {
          console.log(123);
          that.setData({
            code: res.code
          });
          wx.getSetting({
            success:function(res)
            {
              if (res.authSetting['scope.userInfo'])
              {
                wx.getUserInfo({
                  success: function (res) {
                    console.log(456);
                    if(res.iv&&res.encryptedData)
                    {
                      that.setData({
                        iv: res.iv,
                        encryptedData: res.encryptedData
                      });
                      wx.request({
                        url: 'https://cavy.helloyzy.cn/api/user/wx_login/',
                        method: "POST",
                        data: {
                          code: that.data.code,
                          iv: that.data.iv,
                          encryptedData: that.data.encryptedData,
                        },
                        success: function (res) {
                          console.log(res);
                          app.globalData.nickName = res.data.data.nickname;
                          app.globalData.avatarUrl = res.data.data.avatarUrl;
                          app.globalData.jwt_token = res.data.data.jwt_token;
                          wx.switchTab({
                            url: '../index/index',
                          })
                          wx.setStorageSync('jwt_token', res.data.data.jwt_token);
                          wx.setStorageSync('nickname', res.data.data.nickname);
                          wx.setStorageSync('avatarUrl', res.data.data.avatarUrl);
                        }
                      })
                    }
                  }
          })
              }
            }
          })
          
        }
       
      }
    })
   
     
   
   
  }
  
})