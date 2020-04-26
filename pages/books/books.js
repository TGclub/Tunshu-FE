var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books_info:'',
    isMe:app.globalData.isMe,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var that = this;
    that.setData({
      isMe: app.globalData.isMe,
    })
    console.log(that.data.isMe);
    if(app.globalData.searchFlag)
    {
      that.setData({
        books_info:app.globalData.search_info
      })
      app.globalData.searchFlag = 0;
    }
    else{
      wx.request({
        url: app.globalData.detail_url,
        header: {
          'Authorization': app.globalData.jwt_token,
        },
        success: function (res) {
          that.setData({
            books_info: res.data.data.books,
          })
          console.log(that.data.books_info);
        }
      })
    }
  },
  copy:function(e)
  {
    wx.setClipboardData({
      data: this.data.books_info[e.currentTarget.id].weixin,
      success:function()
      {
        wx.showToast({
          title: '复制成功',
          icon:'none',
          duration:2000
        })
      }
    });

  },
  deleteBook: function (e) {
    let that = this;
    let index = e.currentTarget.id.slice(0, e.currentTarget.id.length - 1);
    wx.showModal({
      title: '温馨提示',
      content: '您确定要删除你书架上的书吗？',
      success:function(res)
      {
        if(res.confirm)
        {
         
          wx.request({
            url: 'https://cavy.helloyzy.cn/api/book/' + that.data.books_info[index].id + '/',
            header: {
              'Authorization': app.globalData.jwt_token,
            },
            method: 'DELETE',
            data: {
              pk: that.data.books_info[index].id,
            },
            success: function (res) {
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '删除成功',
                  duration: 2000,
                })
              }
            }
          })
        }
      }
    })
    
  } 
})