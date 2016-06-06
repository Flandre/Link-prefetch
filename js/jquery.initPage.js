var cssCatch = [], jsCatch = [], cssHash = {}, jsHash = {}, pageHash = {};
//当前页数
var currentPage = 0;
//初始化首页
function initFirstPage() {
  //处理加载第一页
  var totalPage = $('section', 'main').length;
  alert(totalPage);
  fetchPage(-1);
  showCurrentPage(currentPage, totalPage);
  //添加向下翻页
  $('#nextBtn').on('click', nextPage());
  $('#prevBtn').on('click', prevPage());
}

/*翻页事件*/
//向下翻页
function nextPage() {

}
//向上翻页
function prevPage() {

}

//显示当前页面
function showCurrentPage(current, total) {
  //code

  //判断还有没有下一页
  if (current + 1 < total) {
    fetchPage(current + 1)
  }
}

//预加载下一页
function fetchPage(next) {

}

initFirstPage();
