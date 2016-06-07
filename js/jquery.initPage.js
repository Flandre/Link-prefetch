var cssHash = {}, jsHash = {}, pageHash = {};
var pageStatus = [];
//当前页数
var currentPage = 0;
//初始化首页
function initFirstPage() {
  //处理加载第一页
  fetchPage(currentPage);
  /*暂时仅对第一个页面进行缓冲*/
  (function pageBuffer(){
    if(pageStatus[0]){
      if(pageStatus[0].css && pageStatus[0].js && !pageStatus[0].imgRest){
        showCurrentPage(currentPage);
        //首页加载完成后显示，之后不再显示loading页面
        $('#loading').hide()
      }else{
        setTimeout(pageBuffer,10);
      }
    }else{
      setTimeout(pageBuffer,10);
    }
  })();

  //添加向下翻页
  $('#nextBtn').on('click', nextPage);
  $('#prevBtn').on('click', prevPage);
}

/*翻页事件*/
//向下翻页
function nextPage() {
  console.log(JSON.stringify(pageStatus));
  //如果下一页没加载完则阻止向下翻页
  if(pageStatus[currentPage + 1]){
    if(pageStatus[currentPage + 1].css && pageStatus[currentPage + 1].js && !pageStatus[currentPage + 1].imgRest){
      var totalPage = $('section', 'main').length;
      if (currentPage + 1 < totalPage) {
        currentPage++;
      }
      showCurrentPage(currentPage)
    }
  }
}
//向上翻页
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
  }
  showCurrentPage(currentPage)
}

//显示当前页面
function showCurrentPage(current) {
  var total = $('section', 'main').length;
  $('section', 'main').removeClass('active');
  $('section:eq(' + current + ')', 'main').addClass('active');
  //判断还有没有下一页,如果有则加载下一页
  if (current + 1 < total) {
    fetchPage(current + 1)
  }
  var cssUrl = $('section:eq(' + current + ') div:first', 'main').attr('data-css');
  if(cssHash[cssUrl]){
    $('#cssFetch').html(cssHash[cssUrl].cssBody)
  }
  var jsUrl = $('section:eq(' + current + ') div:first', 'main').attr('data-js');
  if(jsHash[jsUrl]){
    //在当前页时执行当前页绑定的js
    eval(jsHash[jsUrl].jsBody);
  }
}

//预加载下一页
function fetchPage(next) {
  var nextPage = $('section:eq(' + next + ')', 'main'),
    url = nextPage.attr('data-dom');
  //判断页面有没有加载过
  if (!pageHash[url]) {
    getSource(url, 'html', function (data) {
      nextPage.html(data);
      //添加加载状态
      pageStatus[next] = {
        css: false,
        js: false,
        imgRest: Infinity
      };
      //加载本页需要的css
      fetchCss(next);
      //加载本页需要的js
      fetchJs(next);
      //加载本页需要的图片
      fetchImg(next);
      pageHash[url] = true;
    });
  }
}
//预加载页面中需要的css
function fetchCss(index) {
  var cssUrl = $('section:eq(' + index + ') div:first', 'main').attr('data-css');
  if (cssUrl && (!cssHash[cssUrl] ? true : !cssHash[cssUrl].fatch)) {
    getSource(cssUrl, 'text', function (data) {
      cssHash[cssUrl] = {
        fatch: true,
        cssBody: data
      };
      pageStatus[index].css = true;
    });
  }else{
    console.log('---未请求css---');
    pageStatus[index].css = true;
  }
}
//预加载页面中需要的js
function fetchJs(index) {
  var jsUrl = $('section:eq(' + index + ') div:first', 'main').attr('data-js');
  if (jsUrl && (!jsHash[jsUrl] ? true : !jsHash[jsUrl].fatch)) {
    getSource(jsUrl, 'text', function (data) {
      jsHash[jsUrl] = {
        fatch: true,
        jsBody: data
      };
      pageStatus[index].js = true;
    });
  }else{
    console.log('---未请求js---');
    pageStatus[index].js = true;
  }
}
//预加载页面中需要的图片
function fetchImg(index){
  //初始化剩余图片
  pageStatus[index].imgRest = $('img', 'section:eq(' + index + ')').length;
  $('img', 'section:eq(' + index + ')').each(function(count){
    getImage(count, index)
  });
}
function getImage(count, index){
  var imgDom = $('img:eq(' + count + ')', 'section:eq(' + index + ')');
  var img = new Image();
  img.src = imgDom.attr('data-src');
  img.onload = function(){
    console.log('加载图片');
    imgDom.attr('src',imgDom.attr('data-src'));
    pageStatus[index].imgRest --;
  }
}

//发起ajax请求
function getSource(url, type, func) {
  $.get({
    url: url,
    dataType: type,
    success: func
  });
}

initFirstPage();
