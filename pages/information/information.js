const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qqNum:"",
    wechatNum:"",
  },

 
  onReady: function () {
    wx.showModal({
      title: '豚鼠小贴士',
      content: '请您输入正确的联系方式，以便买书者能够联系到您。',
    })
  },
  wechatNum:function(e){
    this.setData({
      wechatNum:e.detail.value
    })
  },
  submit:function(){
    let that = this;
    console.log(that.data.wechatNum);
    if(!that.data.wechatNum)
    {
      wx.showToast({
        title: '微信号不得为空，请重新输入',
        icon:'none',
        duration:2000,
      })
    }
    wx.request({
      url: 'https://cavy.helloyzy.cn/api/user/',
      header: {
        'Authorization': app.globalData.jwt_token,
      },
      method:"POST",
      data:{
        jwt_token:app.globalData.jwt_token,
        weixin:that.data.wechatNum,
      },
      success:function(res)
      {
        console.log(res);
        if(res.statusCode == 200)
        {
          app.globalData.hasWeChat = true;
          wx.showToast({
            title: '修改成功',
            duration: 2000,
            complete:function()
            {
              setTimeout(function(){
                wx.navigateBack({

                })
              },1500)
              
            }
          })
        }
      }
    })
  }
})