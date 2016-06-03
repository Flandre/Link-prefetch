(function () {
  //初始化第一页
  var currentNum = 0;
  var pageHash = [];

  function initFirstPage() {
    fetchNextPage(-1);
    showCurrentPage(currentNum);
    fetchNextPage(currentNum);

    //追加翻页方法
    document.getElementById('nextBtn').onclick = function () {
      if(document.getElementsByTagName('section').length-1 > currentNum){
        currentNum++;
        fetchNextPage(currentNum);
      }
      showCurrentPage(currentNum);
    }
  }

  //显示当前页面
  function showCurrentPage(current) {
    var sectionArr = document.getElementsByTagName('section');
    for (var i = 0; i < sectionArr.length; i++) {
      sectionArr[i].removeAttribute('class')
    }
    var currentPage = sectionArr[current];
    currentPage.setAttribute('class', 'active');
  }

  //加载下一页内容
  function fetchNextPage(current) {
    var nextPage = document.getElementsByTagName('section')[current + 1];
    var url = nextPage.getAttribute('data-dom');
    var pageLoaded = false;
    //查看页面是否已经加载过
    for (var i = 0; i < pageHash.length; i++) {
      if(pageHash[i] == url){
        pageLoaded = true;
        break;
      }
    }
    if (!pageLoaded) {
      getHtml(nextPage, url);
      pageHash.push(url)
    }

    console.log(pageHash);
  }

  //检查页面中需要加载的js
  function checkJs() {

  }

  //检查页面中需要加载的css
  function checkCss() {

  }

  //检查页面中需要加载的图片
  function checkImg() {

  }

  //检查页面中需要加载的资源
  function checkSource() {

  }

  //初始化向下翻页方法
  function nextPage() {

  }

  //初始化向上翻页方法
  function prevPage() {

  }

  //发起Ajax请求
  function getHtml(dom, url) {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    }
    else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("GET", url, true);
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        dom.innerHTML = xhr.responseText;
      }
    }
  }

  initFirstPage();
})(window);