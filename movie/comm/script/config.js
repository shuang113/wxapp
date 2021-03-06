/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
bannerList: 首页（热映页）轮播图列表列表
skinList: “我的”页面背景列表
shakeSound: 摇一摇音效地址（带url表示远程地址）
shakeWelcomeImg: 摇一摇欢迎图片
*/
var url = 'https://static.sesine.com/wechat-weapp-movie'
module.exports = {
  city: '',
  count: 10,
  baiduAK: 'bUiz7HUMF0BWE2nvjT1HIdGLzyFNeyx1',
  apiList: {
    popular: 'https://api.douban.com/v2/movie/in_theaters',
    coming: 'https://api.douban.com/v2/movie/coming_soon',
    top: 'https://api.douban.com/v2/movie/top250',
    search: {
      byKeyword: 'https://api.douban.com/v2/movie/search?q=',
      byTag: 'https://api.douban.com/v2/movie/search?tag='
    },
    filmDetail: 'https://api.douban.com/v2/movie/subject/',
    personDetail: 'https://api.douban.com/v2/movie/celebrity/',
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
  },
  hotKeyword: ['神偷奶爸3', '变形金刚5：最后的骑士', '京城81号Ⅱ', '绝世高手', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'],
  hotTag: ['动作', '喜剧', '爱情', '悬疑'],
  bannerList: [
    { type: 'film', id: '26683290', imgUrl: url + '/images/banner_1.jpg' },
    { type: 'film', id: '25793398', imgUrl: url + '/images/banner_2.jpg' },
    { type: 'film', id: '26630781', imgUrl: url + '/images/banner_3.jpg' },
    { type: 'film', id: '26415200', imgUrl: url + '/images/banner_4.jpg' },
    { type: 'film', id: '3025375', imgUrl: url + '/images/banner_5.jpg' }
  ]
}