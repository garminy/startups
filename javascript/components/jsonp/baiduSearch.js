var baiduFunc = {
    highlightindex: -1, //高亮标记
    searchInput: function (keyCode, value) {
        // 46.  32 space  8delete 执行Baidu 关键字API
        if (keyCode >= 65 && keyCode <= 90 || keyCode >= 48 && keyCode <= 57 || keyCode >= 96 && keyCode <= 122 || keyCode == 8 || keyCode == 32 || keyCode == 46) {
            this.sendBaiDuAPI(value);
            if (this.highlightindex != -1) {
                highlightindex = -1;
            }
        } else if (keyCode == 38 || keyCode == 40) { //向上，向下， 依次高亮搜索的关键字
            var searchkeyAry = searchList.children;
            if (this.highlightindex != -1) {
                for (i = 0; i < searchkeyAry.length; i++) {
                    searchkeyAry[i].className = '';
                }
            }
            if (keyCode == 38) {
                this.highlightindex = (this.highlightindex <= 0) ? (searchkeyAry.length - 1) : (this.highlightindex - 1);
            } else if (keyCode == 40) {
                this.highlightindex = ((this.highlightindex == -1) || (this.highlightindex == searchkeyAry.length - 1) ) ? 0 : (this.highlightindex + 1);
            }
            searchkeyAry[this.highlightindex].className = 'active';
            searchInput.value = searchkeyAry[this.highlightindex].innerText;
        } else if (keyCode == 13) {
            this.searchBtnClick();
        }
    },
    sendBaiDuAPI: function (wordKey) { //请求百度搜索
        var _this = this;
        var requestData = {
            "wd": wordKey,
            "json": "1",
            "p": "3",
            "sid": "1444_21095_22037_21672",
            "req": "2",
            "csor": "1",
            "_": "1488532984556"
        };
        window.x.jsonp('https://www.baidu.com/su', requestData, 'cb', function (data) {
            _this.drawSeachKey(data.s);
        })
    },
    drawSeachKey: function (searchKey) {
        searchList.innerHTML = '';
        for (var i = 0; i < searchKey.length; i++) {
            var liEle = document.createElement('li');
            liEle.innerText = searchKey[i];
            searchList.appendChild(liEle);
        }
        // searchList.style.display = 'inline-block';
    },
    searchBtnClick: function () {
        var searchValue = encodeURIComponent(searchInput.value);
        searchList.style.display = 'none';
        window.location.href = 'https://www.baidu.com/s?ie=utf-8&wd=' + searchValue;
    }
};

var searchInput = document.getElementById('search_key');
var searchList = document.getElementById('search_list');
var searchBtn = document.getElementById('su');


searchInput.onkeyup = function (e) {
    searchList.style.display = 'inline-block';
    e = window.event || e;
    baiduFunc.searchInput(e.keyCode, searchInput.value);
};

searchList.onclick = function(e){
    searchInput.value = e.target.innerText;
    searchList.style.display = 'none';
};

searchBtn.onclick = function (e) {
    e = e || window.event;
    e.preventDefault();
    e.returnValue = false;
    baiduFunc.searchBtnClick();
};

//文本框 blur, focus 分别隐藏 显示搜索关键字框
searchInput.onfocus = function () {
    searchList.style.display = 'inline-block';
};
searchInput.onblur = function () {
    window.timer = setTimeout(function(){
        searchList.style.display = 'none';
    }, 200);
};


/*
 * keyup 调用百度API 把关键字列表渲染出来
 * 键盘上敲上下箭头/鼠标hover，分别高亮对应的关键字
 * 鼠标点击 相应关键字，input搜索框内文字改变且隐藏列表
 * 回车/点击按钮 跳转至百度搜索
 * blur, focus 分别隐藏显示 关键字列表 */