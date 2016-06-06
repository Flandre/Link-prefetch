var cssHash = {}, jsHash = {}, pageHash = {};
var sourceStatus = {
  page: false,
  css: false,
  js: false
};
//当前页数
var currentPage = 0;
//初始化首页
function initFirstPage() {
  //处理加载第一页
  fetchPage(currentPage);
  /*暂时仅对第一个页面进行缓冲*/
  (function pageBuffer(){
    if(sourceStatus.css && sourceStatus.js){
      showCurrentPage(currentPage);
    }else{
      setTimeout(pageBuffer,10)
    }
  })();

  //showCurrentPage(currentPage);
  //添加向下翻页
  $('#nextBtn').on('click', nextPage);
  $('#prevBtn').on('click', prevPage);
}

/*翻页事件*/
//向下翻页
function nextPage() {
  var totalPage = $('section', 'main').length;
  if (currentPage + 1 < totalPage) {
    currentPage++;
  }
  showCurrentPage(currentPage)
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
    //$('#jsFetch').html(jsHash[jsUrl].jsBody)
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
      //加载本页需要的css
      fetchCss(next);
      //加载本页需要的js
      fetchJs(next);
      pageHash[url] = true;
    });
  }
}
//预加载页面中需要的css
function fetchCss(index) {
  sourceStatus.css = false;
  console.log(JSON.stringify(sourceStatus));
  var cssUrl = $('section:eq(' + index + ') div:first', 'main').attr('data-css');
  if (cssUrl && (!cssHash[cssUrl] ? true : !cssHash[cssUrl].fatch)) {
    getSource(cssUrl, 'text', function (data) {
      cssHash[cssUrl] = {
        fatch: true,
        cssBody: data
      };
      sourceStatus.css = true;
    });
  }else{
    sourceStatus.css = true;
    console.log('---未请求css---');
  }
}
//预加载页面中需要的js
function fetchJs(index) {
  sourceStatus.js = false;
  console.log(JSON.stringify(sourceStatus));
  var jsUrl = $('section:eq(' + index + ') div:first', 'main').attr('data-js');
  if (jsUrl && (!jsHash[jsUrl] ? true : !jsHash[jsUrl].fatch)) {
    getSource(jsUrl, 'text', function (data) {
      jsHash[jsUrl] = {
        fatch: true,
        jsBody: data
      };
      sourceStatus.js = true;
      //console.log(JSON.stringify(sourceStatus));
    });
  }else{
    sourceStatus.js = true;
    console.log('---未请求js---');
    //console.log(JSON.stringify(sourceStatus));
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
