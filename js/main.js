$(document).off().on('touchmove', function(event) {
  event.preventDefault();
});


var flag = true;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var image = new Image();

image.src = 'http://mat1.gtimg.com/ent/vitaxu/starTalk/1/cover-keyframe.png';
var imgWidth = 8250; //8250  30750

var imgHeight = 1334;
var canvasWidth = 375;
var canvasHeight = 667;
var frameIndex = 0;
var frameNum = imgWidth/canvasWidth/2;

(function retinaCanvas () {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                          context.backingStorePixelRatio || 1;
  var ratio = devicePixelRatio / backingStoreRatio;

  console.log(ratio);
  var oldWidth = canvas.width;
  var oldHeight = canvas.height;
  if (ratio !== 1) {
    canvas.width        = oldWidth * ratio;
    canvas.height       = oldHeight * ratio;
    canvas.style.width  = oldWidth/100 + 'rem';
    canvas.style.height = oldHeight/100 + 'rem';
    context.scale(ratio, ratio);
  }
}());

function drawImage() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(
      image,
      frameIndex * imgWidth / frameNum,
      0,
      imgWidth / frameNum,
      imgHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
  )
}

var Timer;
var startTime = Date.now();
var timeDiff = 0;
var frameInterval = 2000/60;

function play() {

  var now = Date.now();
  timeDiff = now - startTime;
  if(timeDiff > frameInterval){
    startTime = now - (timeDiff % frameInterval);
    frameIndex ++;
    console.log(frameIndex);
    drawImage();
  }

  Timer = window.requestAniFrame(function() {
    if(flag) play() ;
    if(frameIndex == (frameNum-1)){
      flag = false;
    }
  });

}

var page = null,
    Timer = null,
    isTrue = false;

window.onload = function(){
  page = new Page();
  page.init();
};

var Page = function(){
  this.loadPage   = $('.load-page');
  this.layout     = $('.layout');
  this.coverPage  = this.layout.eq(0);
  this.keyframe   = $('.star-keyframe');
  this.imgWraper  = $('.img-wraper');
  this.imgItem    = $('.img-item');
  this.passPicBtn = $('.pass-btn');
};

Page.prototype = {
  init:function(){
    this.showCover();
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

  lazyDown:function(pics){
    var index = 0,
        len = pics.length,
        img = new Image(),
        load = function(){
          img.src = pics[index];
          img.onload = function() {
            index ++ ;
            index < len && load();
          }
        };
    len > 0 && load();
  },

  showCover:function(){
    var that = this;
    this.lazyLoad(loadPics, function(){
      setTimeout(function () {
        that.start();
      },1000);
    });
  },

  start: function(){
    var that = this, photos = [];
    that.loadPage.addClass('fadeOut');
    that.coverPage.addClass('fadeIn');
    setTimeout(function() {
      that.loadPage.hide();
      play();
    },250);
  }
};

window.requestAniFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         function(callback) {
           window.setTimeout(callback, 1000 / 60);
         };
})();