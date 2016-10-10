
var page = null;

window.onload = function(){
  page = new Page();
  page.init();
};

var Page = function(){
  this.loadPage   = $('.load-page');
  this.layout     = $('.layout');
};

Page.prototype = {
  init:function(){
    this.showLayout();
    return this;
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
        (index < len) ? load() : callback();
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

  showLayout:function(){
    var that = this;
    this.lazyLoad(loadPics, function(){
      setTimeout(function () {
        that.loadPage.addClass('fadeOut');
        that.layout.addClass('fadeIn');
        setTimeout(function() {
          that.loadPage.hide();
          $.aFrame();
        },250);
      },1000);
    });
  },
};