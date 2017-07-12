import { Home } from 'home-model.js';

var home = new Home();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this._loadData();
  },

  _loadData: function(callback) {
    var that = this;

    //获得banner信息
    home.getBannerData((data) => {
      that.setData({
        bannerArr: data
      });
    });

    // 获取精选主题信息
    home.getThemeData((data) => {
      that.setData({
        themeArr: data,
        loadingHidden: true
      });
    });

    //获取单品信息
    home.getProductorData((data) => {
      that.setData({
        productsArr: data
      });
      callback && callback();
    });
  },
  
  /*跳转到商品详情 */
  onProductsItemTap: function(event) {
    var id = home.getDataSet(event, 'id');
    wx.navigateTo({
      url: '../product/product?id=' + id
    });
  },

  /*跳转到主题列表 */
  onThemeItemTap: function (event) {
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../theme/theme?id='+id+'&name='+name
    });
  },

  /**下拉刷新页面 */
  onPullDownRefresh: function() {
    this._loadData(() => {
      wx.stopPullDownRefresh();
    });
  },

  /**分享效果 */
  onShareAppMessage: function() {
    return {
      title: '东海鲜味',
      path: 'pages/home/home'
    }
  }
})