/*  *///index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    res:'',
    booksUrl_1:'',
    booksUrl_2: '',
    booksUrl_3: '',
    booksUrl_4: '',
    books_info:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    if(!app.globalData.hasWeChat)
    {
      wx.showModal({
        title: '豚鼠小贴士',
        content: '请您尽快完善个人信息以便上传图书',
        showCancel:false,
        confirmText:'前往设置',
        success:function(res)
        {
          if(res.confirm)
          {
            wx.navigateTo({
              url: '../information/information',
            })
          }
        }
      })
    }
    wx.request({
      url: 'https://cavy.helloyzy.cn/api/categories/',
      method:"GET",
      success:function(res){
        console.log(res);
        that.setData({
          res:res,
          booksUrl_1: res.data.data.categories[0].image_url,
          booksUrl_2: res.data.data.categories[1].image_url,
          booksUrl_3: res.data.data.categories[2].image_url,
          booksUrl_4: res.data.data.categories[3].image_url,
        })
      }
    })
    
  },
  onShow:function(){
    let that = this;
    wx.request({
      url: 'https://cavy.helloyzy.cn/api/book/advice/',
      success: function (res) {
        console.log(res);
        that.setData({
          books_info: res.data.data.books
        })
      }
    })
  },

  toDetail:function(e){
    // console.log(e);
    console.log(app.globalData.detail_url);
    switch (e.currentTarget.id){
      case 'one':
        app.globalData.detail_url = this.data.res.data.data.categories[0].detail_url;
        break;
      case 'two':
        app.globalData.detail_url = this.data.res.data.data.categories[1].detail_url;
        break;
      case 'three':
        app.globalData.detail_url = this.data.res.data.data.categories[2].detail_url;
        break;
      case 'four':
        app.globalData.detail_url = this.data.res.data.data.categories[3].detail_url;
        break;
      case 'all':
        app.globalData.detail_url = 'https://cavy.helloyzy.cn/api/books/';
    }
    app.globalData.isMe = false;
    wx.switchTab({
      url: '../books/books',
    })
  },
  add:function(){
    wx.navigateTo({
      url: '../add/add',
    })
  },
  search: function () {
    let that = this;
    wx.request({
      url: 'https://cavy.helloyzy.cn/api/book/search/?query=%s',
      method: "GET",
      data: {
        query: that.data.searchKey
      },
      success: function (res) {
        app.globalData.search_info = res.data.data.books;
        app.globalData.searchFlag = 1;
        wx.switchTab({
          url: '../books/books',
        })
      }
    })
  },
  changeKey: function (e) {
    this.setData({
      searchKey: e.detail.value
    })
  },
  copy: function (e) {
    wx.setClipboardData({
      data: this.data.books_info[e.currentTarget.id].weixin,
      success: function () {
        wx.showToast({
          title: '复制成功',
          icon: 'none',
          duration: 2000
        })
      }
    });
  } 
})