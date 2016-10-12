## 简介

在移动端用canvas实现的逐祯动画，使用简单方便。

## 使用

### html：

> canvas1

    <canvas id="canvas1" width="112" height="100" data-time="200" data-loop="true">
        <img src="http://mat1.gtimg.com/ent/vitaxu/2016/bigBang/img/loading2.png" width="224" height="600">
    </canvas>

> canvas2   [点击预览](https://vitaxu.github.io/CanvasAnimation/)  （移动端效果更佳）

    <canvas id="canvas2" width="375" height="667">
        <img src="http://mat1.gtimg.com/ent/vitaxu/starTalk/1/cover-keyframe.png" width="8250" height="1334">
    </canvas>

#### 参数说明：

canvas 

* `id` 必填，JS调用时填入此id
* `width` 必填，需要渲染的宽度
* `height` 必填，需要渲染的高度
* `data-time` 选填，默认值：`50s`，指定每帧之间的间隔时间，如果不指定，则为默认值
* `data-loop` 选填，默认值：`false`，指定逐帧是否循环，如果不指定，则为运动1次后，动画停留在最后一帧。 

img  

* `src` 必填，雪碧图
* `width` 必填，雪碧图实际宽度
* `height` 必填，雪碧图实际高度

### js调用：

在页面中引用`frame.min.js`，然后在自己的js代码中调用即可  

    Frame(id,callback) 

####参数说明：  

* `id` 必填，canvas元素的id选择器

* `callback` 选填，动画完成一次之后的回调函数，对循环动画无效