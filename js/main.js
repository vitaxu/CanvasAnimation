var page = {

  loadPage : $('.load-page'),

  layout : $('.layout'),

  init: function(){
    var that = this;
    this.lazyLoad(loadPics, function() {
      setTimeout(function () {
        that.loadPage.hide();
        Frame('canvas');
      },1000);
    });
  },

  lazyLoad: function(pics, callback){
    var index = 0,
        len = pics.length,
        img = new Image();
    var progress = function(num){
      $('.loading-num').html(num);
      (num == '100%') && callback();
    }
    var load = function(){
      img.src = pics[index];
      img.onload = function() {
        progress(Math.floor(((index + 1) / len) * 100) + "%");
        index ++ ;
        (index < len) && load();
      }
      return img;
    }
    len > 0 ? load() : progress('100%');
    return {
      pics: pics,
      load: load,
      progress: progress
    };
  },

};

page.init();