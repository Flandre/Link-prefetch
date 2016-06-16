# README

[测试效果](http://flandre.github.io/Link-prefetch/index.html)    [动画效果](https://flandre.github.io/animate.css/)

###index文件编写

index文件模板如下

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

`main.css`中配置了页面使用的基本信息，用户可以去修改或者覆盖

`animate.min.css`用于显示页面中使用的动画，具体可参考[动画效果](https://flandre.github.io/animate.css/)

style用于存放某些页面按需加载的css内容

```HTML
	<style id="cssFetch"></style>
```

header中用于配置页面中音乐，如果不配置则不显示音乐

```HTML
    <header>
      <audio id="background-audio" autoplay="true" loop="" src="sounds/background.mp3"></audio>
      <div class="music-icon music-icon-active"></div>
    </header>
```

`main`区域用于配置主要显示信息，其中Loading用于配置页面等待动画，可以在main.css中配置

```HTML
      <div id="loading">
        <div class="loading-box">
          <div class="loading-bg"></div>
        </div>
      </div>
```

