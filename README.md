# README

#TEST
##TEST
###TEST

> 这是标记文字
> >asdfasdfasdfasd
> 
>>adfadsfasdfdas

*adadf*

**aaaa**

***aaaaa***

asdfasdfasdfasd

* 产品特点
    1. 特点1
    - 特点2
    - 特点3
* 产品功能
    1. 功能1
    - 功能2
    - 功能3


	```bash
function(){
sfdgsdfg
			aaaaa
}```

*adadf*
**aaaa**
***aaaaa***



	function
	aaa
	int



```json

{
  "/Absolute/path/to/other/destination": true
}
```

```javascript

function nextPage() {
  console.log(JSON.stringify(pageStatus));
  //如果下一页没加载完则阻止向下翻页
  if (pageStatus[currentPage + 1]) {
    if (pageStatus[currentPage + 1].css && pageStatus[currentPage + 1].js && !pageStatus[currentPage + 1].imgRest) {
      var totalPage = $('section', 'main').length;
      if (currentPage + 1 < totalPage) {
        currentPage++;
        $('section:eq(' + currentPage + ')', 'main').addClass('scroll-up');
        setTimeout(function () {
            showCurrentPage(currentPage)
          }, 1000
        )
      }
    }
  }
}
```