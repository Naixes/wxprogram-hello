// pages/shopList/shopList.js
const fetch = require('../../utils/fetch.js')
Page({
  /**
   * 页面的初始数据，不定义方法
   */
  data: {
    shopList: [],
    limit: 20,
    page: 0,
    cat: 1,
    hasData: true
  },
  // 获取列表数据
  getList: function() {
    // console.log(this.data.cat)
    // 判断是否还有数据
    if (!this.data.hasData) return
    wx.request({
      url: 'https://locally.uieee.com/categories/' + this.data.cat + '/shops',
      data: {
        _limit: this.data.limit,
        _page: ++this.data.page
      },
      success: (res) => {
        console.log(res)
        // 设置判断是否还有数据的flag
        let totle = res.header['X-Total-Count'] - 0
        let hasData = this.data.limit * this.data.page < totle
        // 添加shopList
        let shopList = this.data.shopList.concat(res.data)
        this.setData({
          shopList,
          hasData
        })
      }
    })

  },
  // getList: function() {
  //   console.log(this.data.cat)
  //   fetch(`https://locally.uieee.com/categories/{this.data.cat}/shops`,
  //   'GET',
  //   { 
  //     _limit: this.data.limit,
  //     _page: ++this.data.page
  //     }).then(res => {
  //       console.log(res)
  //       // 添加shopList
  //       let list = this.data.shopList.concat(res.data)
  //       this.setData({
  //         shopList: list
  //       })
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.name)
    // console.log(this)
    // 获取页面跳转数据
    this.setData({
      cat: options.cat
    })
    // 设置页面名称，查看API
    if (options.name) {
      wx.setNavigationBarTitle({
        title: options.name
      })
    }
    // 显示导航栏加载动画
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '正在努力加载',
    })
    this.getList()
    // 隐藏加载动画
    wx.hideNavigationBarLoading()
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 下拉时重置data
    this.setData({
      shopList: [],
      page: 0,
      hasData: true
    })
    // 获取数据
    this.getList()
    // 关闭下拉
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showNavigationBarLoading()
    this.getList()
    // 隐藏导航栏加载动画
    wx.hideNavigationBarLoading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})