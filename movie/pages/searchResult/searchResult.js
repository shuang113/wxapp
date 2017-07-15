// pages/searchResult/searchResult.js
var douban=require('../../comm/script/fetch')
var config=require('../../comm/script/config')

Page({
  data: {
    films:[],
    hasMore:true,
    showLoading:true,
    start:0,
    url:'',
    keyword:'',
    isNull:false,
    nullTip:{
      tipText:'对不起，没有更多内容，换个关键词试试',
      actionText:'返回',
      routerUrl:'../../pages/search/search'
    }
  },
  onLoad: function (options) {
    var that=this
    that.setData({
      url:options.url,
      keyword:options.keyword,
      title:options.keyword
    })
    douban.search.call(that,that.data.url,that.data.keyword,that.data.start,config.count,function(data){
      if(data.subjects.length==0){
        that.setData({
          isNull:true
        })
      }
    })
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
    douban.search.call(that,that.data.url,that.data.keyword,that.data.start,config.count)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this
    if(!that.data.showLoading){
      douban.search.call(that,that.data.url,that.data.keyword,that.data.start,config.count)
    }
  },
  viewFilmDetail:function(e){
    var data=e.currentTarget.dataset;
    wx.redirectTo({
      url: '../filmDetail/filmDetail?id='+data.id
    })
  },
  viewFilmByTag:function(e){
    var data=e.currentTarget.dataset;
    var keyword=data.tag;
    wx.redirectTo({
      url: '../searchResult/searchResult?url='+encodeURIComponent(config.apiList.search.byTag)+'&keyword='+keyword,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})