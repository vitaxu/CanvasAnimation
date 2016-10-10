;(function($, window, undefined) {

  var canvas       = document.getElementById('canvas'),
      context      = canvas.getContext('2d'),
      canvasWidth  = canvas.width,
      canvasHeight = canvas.height,
      curFrame = 0,
      totalFrame = 0,
      flag = true,
      timeDiff = 0,
      startTime = Date.now();

  window.requestAniFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
           function(callback) {
             window.setTimeout(callback, 1000 / 60);
           };
  })();

  var AFrame = function(options) {

    this.settings = $.extend({}, AFrame.defaults, options);

    this.init();

  }

  AFrame.prototype = {

    init : function() {
      var that = this;
      that.renderFrame();
      that.retinaCanvas();
    },

    drawFrame : function() {

      var that = this, image = new Image();

      image.src = that.settings.img;
      totalFrame = that.settings.width / canvasWidth / 2;

      console.log(totalFrame);

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      context.drawImage(
          image,                          //规定要使用的图像、画布或视频。
          curFrame * that.settings.width / totalFrame,  //开始剪切的 x 坐标位置
          0,                                          //开始剪切的 y 坐标位置
          that.settings.width / totalFrame,        //被剪切图像的宽度
          that.settings.height,                    //被剪切图像的高度
          0,                                          //在画布上放置图像的 x 坐标位置。
          0,                                          //在画布上放置图像的 y 坐标位置。
          canvasWidth,                                //要使用的图像的宽度
          canvasHeight                                //要使用的图像的高度
      );
    },

    renderFrame : function() {
      var that = this,
          now = Date.now(),
          time = this.settings.time,
          timeDiff = now - startTime;

      if(timeDiff > time){
        startTime = now - (timeDiff % time);
        curFrame ++;
        console.log(curFrame);
        that.drawFrame();
      }

      requestAniFrame(function() {
        if(flag) that.renderFrame();
        if(!that.settings.isLoop && curFrame == (totalFrame - 1)){
          flag = false;
        }
      });

    },

    retinaCanvas : function() {
      var devicePixelRatio = window.devicePixelRatio || 1,
          backingStoreRatio = context.webkitBackingStorePixelRatio || context.backingStorePixelRatio || 1,
          ratio = devicePixelRatio / backingStoreRatio;

      if (ratio !== 1) {
        canvas.width        = canvasWidth * ratio;
        canvas.height       = canvasHeight * ratio;
        canvas.style.width  = canvasWidth / 100 + 'rem';
        canvas.style.height = canvasHeight / 100 + 'rem';
        context.scale(ratio, ratio);
      }
    }

  }

  AFrame.defaults = {

    // 图片
    img: 'http://mat1.gtimg.com/ent/vitaxu/starTalk/1/cover-keyframe.png',

    // 图片实际宽度
    width: 8250,

    // 图片实际高度
    height: 1334,

    // 每帧间隔时间
    time: 50,

    // 是否循环
    isLoop: false

  }

  var Frame = function(options) {
    return new AFrame(options);
  }

  window.Frame = $.aFrame = $.Frame = Frame;

})(window.jQuery || window.Zepto, window);