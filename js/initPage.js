(function () {
  //初始化第一页
  var currentNum = 0, pageHash = [], cssHash = [], jsHash = [], jsCatch = [];

  function initFirstPage() {
    fetchPage(currentNum);
    showCurrentPage(currentNum);
    fetchPage(currentNum + 1);

    //绑定向下翻页方法
    document.getElementById('nextBtn').onclick = function () {
      if (document.getElementsByTagName('section').length - 1 > currentNum) {
        currentNum++;
        if (document.getElementsByTagName('section').length - 1 > currentNum) {
          fetchPage(currentNum + 1);
        }
      }
      showCurrentPage(currentNum);
      console.log(currentNum);
    };

    //绑定向上翻页方法
    document.getElementById('prevBtn').onclick = function () {
      if (currentNum > 0) {
        currentNum--;
        showCurrentPage(currentNum);
      }
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
    //执行预加载的js
    document.getElementsByTagName('script').innerHtml = jsCatch[current]
  }

  //加载下一页内容
  function fetchPage(next) {
    var nextPage = document.getElementsByTagName('section')[next];
    var url = nextPage.getAttribute('data-dom');
    var pageLoaded = false;
    //查看页面是否已经加载过
    for (var i = 0; i < pageHash.length; i++) {
      if (pageHash[i] == url) {
        pageLoaded = true;
        break;
      }
    }
    if (!pageLoaded) {
      getHtml(nextPage, url);
      pageHash.push(url)
    }
  }

  //检查页面中需要加载的js
  function checkJs(section) {
    var url = section.childNodes[0].getAttribute('data-js');
    //检查cssHash
    if(url && url != ''){
    }
    var jsLoaded = false;
    for (var i = 0; i < jsHash.length; i++) {
      if (jsHash[i] == url) {
        jsLoaded = true;
        break;
      }
    }
    if (!jsLoaded) {
      getJs(url);
      jsHash.push(url)
    }
    //console.log(url);
  }

  //检查页面中需要加载的css
  function checkCss(section) {
    var url = section.childNodes[0].getAttribute('data-css');
    //检查cssHash
    if(url && url != ''){
      var cssLoaded = false;
      for (var i = 0; i < cssHash.length; i++) {
        if (cssHash[i] == url) {
          cssLoaded = true;
          break;
        }
      }
      if (!cssLoaded) {
        getCss(url);
        cssHash.push(url)
      }
      //console.log(url);
    }
  }

  //检查页面中需要加载的图片
  function checkImg() {

  }

  //检查页面中需要加载的资源
  function checkSource() {

  }

  /**发起Ajax请求**/
  //请求dom
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
        //console.log(xhr.responseText);
        //检查并加载css
        checkCss(dom);
        //检查并加载js
        checkJs(dom);
      }
    }
  }
  //请求css
  function getCss(url){
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
        document.getElementsByTagName('style')[0].innerHTML += xhr.response
      }
    }
  }
  //请求js
  function getJs(url){
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
        jsCatch.push(xhr.responseText);
        console.log(jsCatch);
      }
    }
  }
  initFirstPage();
})(window);