var cssCatch = [], jsCatch = [], cssHash = {}, jsHash = {}, pageHash = {};
//当前页数
var currentPage = 0;
//初始化首页
function initFirstPage() {
  //处理加载第一页
  var totalPage = $('section', 'main').length;
  fetchPage(currentPage);
  showCurrentPage(currentPage, totalPage);
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
  showCurrentPage(currentPage, totalPage)
}
//向上翻页
function prevPage() {
  var totalPage = $('section', 'main').length;
  if (currentPage > 0) {
    currentPage--;
  }
  showCurrentPage(currentPage, totalPage)
}

//显示当前页面
function showCurrentPage(current, total) {
  $('section', 'main').removeClass('active');
  $('section:eq(' + current + ')', 'main').addClass('active');
  //判断还有没有下一页,如果有则加载下一页
  if (current + 1 < total) {
    fetchPage(current + 1)
  }
}

//预加载下一页
function fetchPage(next) {
  console.log(next);
  var nextPage = $('section:eq(' + next + ')', 'main'),
  url = nextPage.attr('data-dom');
  getSource(url, 'html', function(data){
    console.log(data);
    nextPage.html(data)
  })
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
