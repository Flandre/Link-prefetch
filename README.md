# README


##index文件编写

index文件编写如下

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

###[测试效果](http://flandre.github.io/Link-prefetch/index.html)

###[动画效果](https://flandre.github.io/animate.css/)

