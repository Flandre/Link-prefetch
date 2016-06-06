var cssHash = {}, jsHash = {}, pageHash = {};
//当前页数
var currentPage = 0;
//初始化首页

var firstLoad = true;
function initFirstPage() {
  //处理加载第一页
  fetchPage(currentPage);

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
      console.log(cssHash);
    });
  }
  console.log((!cssHash[cssUrl] ? true : !cssHash[cssUrl].fatch))
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
