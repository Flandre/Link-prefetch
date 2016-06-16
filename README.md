# README

[测试效果](http://flandre.github.io/Link-prefetch/index.html)    [动画效果](https://flandre.github.io/animate.css/)

##index文件编写

index文件模板如下：

```HTML
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit"/>
    <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="black"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title></title>
    <link href="css/main.css" rel="stylesheet" type="text/css">
    <link href="css/animate.min.css" rel="stylesheet" type="text/css">
    <style id="cssFetch"></style>
  </head>
  <body>
    <header>
      <audio id="background-audio" autoplay="true" loop="" src="sounds/background.mp3"></audio>
      <div class="music-icon music-icon-active"></div>
    </header>
    <main>
      <!--创建等待页面-->
      <div id="loading">
        <div class="loading-box">
          <div class="loading-bg"></div>
        </div>
      </div>
      <section data-dom="test/html/dom1.html"></section>
    </main>
    <footer class="page-tip-wrapper">
      <span class="page-tip"></span>
    </footer>
    <div class="progress-bar">
      <div class="progress"></div>
    </div>
    <!--引入js文件-->
    <script src="js/jquery.min.js"></script>
    <script src="js/jquery.initPage.js"></script>
  </body>
</html>

```

`main.css`中配置了页面使用的基本信息，用户可以去修改或者覆盖。

`animate.min.css`用于显示页面中使用的动画，具体可参考[动画效果](https://flandre.github.io/animate.css/)。

`<style id="cssFetch"></style>`用于存放某些页面按需加载的css内容。

`header`中用于配置页面中音乐，如果不配置则不显示音乐。

```HTML
    <header>
      <audio id="background-audio" autoplay="true" loop="" src="sounds/background.mp3"></audio>
      <div class="music-icon music-icon-active"></div>
    </header>
```

`main`区域用于配置主要显示信息，其中Loading用于配置页面等待动画，可以在`main.css`中配置使用的图片或者SVG。

```HTML
      <div id="loading">
        <div class="loading-box">
          <div class="loading-bg"></div>
        </div>
      </div>
```

`<section>`用于配置主要显示的页面，每个`<section>`都是100%的宽高，属性`data-dom`用于配置具体的显示页面。

**首页只配置section而不配置内容，section仅仅用来确定页面个数和预留空间。**

`footer`中配置底部向上滑动提示图标

```HTML
    <footer class="page-tip-wrapper">
      <span class="page-tip"></span>
    </footer>
```

如果需要进度条，则需要增加以下代码，如果需要更改进度条样式需修改`main.css`

```HTML
    <div class="progress-bar">
      <div class="progress"></div>
    </div>
```

##具体页面编写

页面显示的具体页面就是`section`中`data-dom`配置的文件HTML文件，此文件只是一个文件片段，例如：

```HTML
	<div class="p1" data-css="test/css/testCss1.css" data-js="test/js/testJs1.js">
	    <h2 class="effect" data-an="slideInDown 1s" data-an-finished="hidden" id="p3_1">实例文本</h2>
	    <h2 class="effect" data-an="slideInDown 1s" data-an-depends="p3_1" id="p3_2" style="top:0;">实例文本</h2>
	</div>
```

其中外层必须是一个`<div>`标签，可以任意添加css类以便控制样式，如果需要按需加载css或者javascript，只需将目标路径配置在根div的`data-css`属性和`data-js`属性即可，重复引用的文件（目标地址相同）则不会重复加载。

内容部分可以随意添加动画，不过添加动画的元素一定要有`class='effect'`类，配置动画仅需按`animation`的写法写到`data-an`属性中即可，动画效果可参照[动画效果](https://flandre.github.io/animate.css/)页面填写。

动画执行完毕后，如果希望再次隐藏此元素，则需要在此元素中添加`data-an-finished='hidden'`属性。

###关于动画序列

如果希望页面中动画按照某一顺序执行，则触发的元素需要加上`id`属性，此id是页面中唯一ID，建议使用`p[页数]_[页内ID]`来命名，以确保唯一性。

触发动画需要添加`data-an-depends=[前一个动画的ID]`属性，这样当前一个元素动画结束后就会执行此元素的动画。

##页面默认配置

页面配置存放在`main.css`中，可以根据自己的需求去更改，默认只保留了最基础的配置。

###页面层级关系

所有`section`页面均有`z-index`属性，值为9，
当前显示的`section`页面的`z-index`值则为99，
正在滑入的页面的`z-index`值为999，
音乐图标、向上箭头、进度条的`z-index`值为1999，
`loading`页面的`z-index`值为9999。

###图片样式

所有图片均有`max-width: 100%;height: auto`的样式，所以当图片小于显示宽度的时候则按比例缩放。