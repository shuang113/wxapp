// pages/personDetail/personDetail.js

var douban=require('../../comm/script/fetch')
var util=require('../../utils/util')
var config=require('../../comm/script/config')

Page({
  data: {
    personDetail:{},
    showLoading:true,
    showContent:false
  },
  onLoad: function (options) {
    var that=this
    var id=options.id
    douban.fetchPersonDetail.call(that,config.apiList.personDetail,id,function(data){
      wx.getStorage({
        key: 'person_favorite',
        success: function(res) {
          for(var i=0;i<res.data.length;i++){
            if(res.data[i].id==data.id){
              that.setData({
                isPersonFavorite:true
              })
            }
          }
        }
      })

      var date=util.getDate()
      var time=util.getTime()
      var person_history=[]
      wx.getStorage({
        key: 'person_history',
        success: function(res) {
          person_history=res.data
          var now_data={
            time:time,
            data:data
          }

          var sub_data={
            date:date,
            persons:[]
          }
          sub_data.persons.push(now_data);
          if(person_history.length==0){
            person_history.push(sub_data);
          }else if(person_history[0].date==date){
            for(var i=0;i<person_history[0].persons.length;i++){
              if(person_history[0].persons[i].data.id==data.id){
                person_history[0].persons[i].splice(i,1)
              }
            }
            person_history[0].persons.push(now_data)
          }else{
            person_history.push(sub_data)
          }
          wx.setStorage({
            key: 'person_history',
            data: person_history,
          })
        },
        fail:function(){

        }
      })
    })
  },
  viewFilmDetail:function(e){
    var data=e.currentTarget.dataset;
    wx.redirectTo({
      url: '../filmDetail/filmDetail?id='+data.id
    })
  },
 
  onPullDownRefresh: function () {
    var data={
      id:this.data.filmDetail.id
    }
    this.onLoad(data)
  },

  favoritePerson:function(){
    var that=this
    wx.getStorage({
      key: 'person_favorite',
      success: function(res) {
        var person_favorite=res.data
        if(that.data.isPersonFavorite){
            // 删除
            for(var i=0;i<person_favorite.length;i++){
              if(person_favorite[i].data.id==data.id){
                person_favorite.splice(i,1)
                that.setData({
                  isPersonFavorite:false
                })
              }
            }
          
        }else{
          person_favorite.push(that.data.personDetail)
          wx.setStorage({
            key: 'person_favorite',
            data: person_favorite,
            success:function(){
              that.setData({
                isPersonFavorite:true
              })
            }
          })
        }
      },
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})