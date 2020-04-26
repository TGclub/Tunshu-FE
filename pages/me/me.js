let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flage:true,
    font_img: '',
    nickName: '',
    books: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      font_img: app.globalData.avatarUrl,
      nickName: app.globalData.nickName,
    })
    console.log(111);
  },
  onShow:function()
  {
    let that = this;
    wx.request({
      url: 'https://cavy.helloyzy.cn/api/user/books',
      header: {
        'Authorization': app.globalData.jwt_token,
      },
      success: function (res) {
        if(res.data.data.books != null){
          that.setData({
            books: res.data.data.books.slice(0, 5)
          })
        }
        else{
          that.setData({
            books: false,
          })
        }
      }
    })
  },
  information:function(){
    wx.navigateTo({
      url: '../information/information',
    })
  },
  toMyAll:function()
  {
    console.log(123);
    app.globalData.detail_url = 'https://cavy.helloyzy.cn/api/user/books';
    app.globalData.isMe = true;
    wx.switchTab({
      url: '../books/books',
    })
  }

})