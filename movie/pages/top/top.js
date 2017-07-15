// pages/top/top.js
var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')

Page({
  data: {
    films:[],
    hasMore:true,
    showLoading:true,
    start:0
  },
  onLoad: function (options) {
    var that=this
    douban.fetchFilms.call(that,config.apiList.top,that.data.start)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that=this
    that.setData({
      films:[],
      hasMore:true,
      showLoading:true,
      start:0
    })
    douban.fetchFilms.call(that,config.apiList.top,that.data.start)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    if(!that.data.showLoading){
      douban.fetchFilms.call(that,config.apiList.top,that.data.start)
    }
  },
  viewFilmDetail:function(e){
    var data=e.currentTarget.dataset;
    wx.navigateTo({
      url: '../filmDetail/filmDetail?id='+data.id
    })
  },
  viewFilmByTag:function(e){
    var data=e.currentTarget.dataset;
    var keyword=data.tag;
    wx.navigateTo({
      url: '../searchResult/searchResult?url='+encodeURIComponent(config.apiList.search.byTag)+"&keyword="+keyword
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})