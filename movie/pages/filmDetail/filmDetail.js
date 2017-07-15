// pages/filmDetail/filmDetail.js
var douban=require('../../comm/script/fetch')
var util=require('../../utils/util')
var config=require('../../comm/script/config')

Page({
  data:{
    filmDetail:{},
    showLoading:true,
    showContent:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var id=options.id
    douban.fetchFilmDetail.call(that,config.apiList.filmDetail,id,function(data){
      wx.getStorage({
        key: 'film_favorite',
        success: function(res) {
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].id==data.id){
              that.setData({
                isFilmFavorite:true
              })
            }
          }
        },
      })
      var date=util.getDate()
      var time=util.getTime()
      var film_history=[]
      wx.getStorage({
        key: 'film_history',
        success: function(res) {
          film_history=res.data
          // 当前数据
          var now_data={
            time: time,
            data:data
          }
          // 今天数据
          var sub_data={
            date:date,
            films:[]
          }
          sub_data.films.push(now_data)
          if(film_history.length==0){
            film_history.push(sub_data)
          }else if(film_history[0].date==date){//判断第一个数据是否是今天
            for(var i=0;i<film_history[0].films.length;i++){
              // 如果存在则删除，添加最新的
              if(film_history[0].films[i].data.id==data.id){
                film_history[0].films.splice(i,1)
              }
            }
            film_history[0].films.push(now_data)
          }else{
            film_history.push(sub_data)
          }
          wx.setStorage({
            key: 'film_history',
            data: film_history
          })
        },
        fail:function(){

        }
      })
    })
  },
  viewPersonDetail:function(e){
    var data=e.currentTarget.dataset
    wx.navigateTo({
      url: '../personDetail/personDetail?id='+data.id
    })
  },
  viewFilmByTag:function(e){
    var data=e.currentTarget.dataset
    var keyword = data.tag
    wx.navigateTo({
      url: '../searchResult/searchResult?url='+encodeURIComponent(config.apiList.search.byTag)+'&keyword='+keyword
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var data={
      id:this.data.filmDetail.id
    }
    this.onLoad(data)
  },
  favoriteFilm:function(){
    var that=this
    wx.getStorage({
      key: 'film_favorite',
      success: function(res) {
        var film_favorite=res.data
        if(that.data.isFilmFavorite){
          // 删除
          for(var i=0;i<film_favorite.length;i++){
            if(film_favorite[i].id==that.data.filmDetail.id){
              film_favorite.splice(i,1)
              that.setData({
                isFilmFavorite:false
              })
            }
          }
          wx.setStorage({
            key: 'film_favorite',
            data: film_favorite
          })
        }else{
          // 添加
          film_favorite.push(that.data.filmDetail)
          wx.setStorage({
            key: 'film_favorite',
            data: film_favorite,
            success:function(res){
              that.setData({
                isFilmFavorite:true
              })
            }
          })
        }
      }
    })
  }
})