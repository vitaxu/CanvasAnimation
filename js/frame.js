;(function(window) {

  var AFrame = function() {

    this.args = arguments;

    this.canvas = document.getElementById(this.args[0]);

    this.context = this.canvas.getContext('2d');

    this.cW  = this.canvas.width;

    this.cH = this.canvas.height;

    this.time = this.canvas.getAttribute('data-time') || 50;

    this.loop = this.canvas.getAttribute('data-loop') || 'false';

    this.chLoop = this.loop == 'true' ? '\u5faa\u73af' : '\u0031\u6b21';

    this.image = this.canvas.getElementsByTagName('img')[0];

    this.iW = this.image.getAttribute('width');

    this.iH = this.image.getAttribute('height');

    this.curFrame = 0;

    this.direction = this.cW * 2 == this.iW ? 'vertical' : 'horizontal';

    this.totalFrame = this.direction == 'vertical'
        ? this.iH / this.cH / 2 : this. iW / this.cW / 2;

    this.flag = true;

    this.timeDiff = 0;

    this.startTime = Date.now();

    this.init();

    console.log('\u52a8\u753b\u4fe1\u606f --> \u603b\u5e27\u6570: '
                + this.totalFrame
                + ', \u8fd0\u52a8\u6b21\u6570: ' + this.chLoop
                + ', \u95f4\u9694\u65f6\u95f4: ' + this.time + 's'
    );

  }

  AFrame.prototype = {

    init : function() {

      var that = this;

      this.loadPic(function() {

        that.renderFrame();

        that.retinaCanvas();

      });

    },

    loadPic: function(callback) {

      var that = this, img = new Image();

      img.src = that.image.getAttribute('src');

      img.onload = function() {

        if (callback && typeof callback === "function"){

          return callback();

        }

      }

    },

    drawFrame : function() {

      var that = this,

          _x = this.direction == 'horizontal'
              ? that.curFrame * that.iW / that.totalFrame : 0,

          _y = this.direction == 'horizontal'
              ? 0 : that.curFrame * that.iH / that.totalFrame,

          _w = this.direction == 'horizontal'
              ? that.iW / that.totalFrame : that.iW,

          _h = this.direction == 'horizontal'
              ? that.iH : that.iH / that.totalFrame;

      that.context.clearRect(0, 0, that.cW, that.cH);

      that.context.drawImage(that.image, _x, _y, _w, _h, 0, 0, that.cW, that.cH);

    },

    renderFrame : function() {

      var that = this,

          now = Date.now();

      that.timeDiff = now - that.startTime;

      if(that.timeDiff > that.time){

        that.startTime = now - (that.timeDiff % that.time);

        that.curFrame ++;

        that.drawFrame();

      }

      window.requestAniFrame(function() {

        if(that.loop == 'true'){

          that.curFrame == (that.totalFrame - 1) && (that.curFrame = 0);

        }else if(that.loop == 'false'){

          if(that.curFrame == (that.totalFrame - 1)){

            that.flag = false;

            setTimeout(that.onComplete(that.args[1]), 500);

          }

        }

        if(that.flag) that.renderFrame();

      });

    },

    onComplete: function(fn) {

      if (fn && typeof fn === "function"){

        return fn();

      }

    },

    retinaCanvas : function() {

      var devicePixelRatio = window.devicePixelRatio || 1,

          backingStoreRatio = this.context.webkitBackingStorePixelRatio || this.context.backingStorePixelRatio || 1,

          ratio = devicePixelRatio / backingStoreRatio;

      if (ratio !== 1) {

        this.canvas.width        = this.cW * ratio;

        this.canvas.height       = this.cH * ratio;

        this.canvas.style.width  = this.cW / 100 + 'rem';

        this.canvas.style.height = this.cH / 100 + 'rem';

        this.context.scale(ratio, ratio);

      }
    }

  }

  window.requestAniFrame = (function() {

    return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||

           function(callback) {

             window.setTimeout(callback, 1000 / 60);

           };

  })();

  var Frame = window['Frame'] =  function(id, fn) {

    return new AFrame(id, fn);

  };

})(window);