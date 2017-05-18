function flow(mh, mv) {
    mh = mh || 10;
    mv = mv || 10;
    var w = document.documentElement.clientWidth || document.body.clientWidth;
    var ulEle = document.getElementById('flow-box');
    var liEles = ulEle.getElementsByTagName('li');
    var iw = liEles[0].offsetWidth + mh;
    var c = Math.floor(w / iw); //当前要展示的列数
    lisLen = liEles.length;
    ulEle.style.width = iw * c - mh + 'px';

    var lenArr = [];
    for (var i = 0; i < lisLen; i++) {
        lenArr.push(liEles[i].offsetHeight);
    }


    // 先将第一行图片放上
    var oArr = []; //永远四个元素，记录每一列的高度
    for (var i = 0; i < c; i++) {
        liEles[i].style.top = 0;
        liEles[i].style.left = iw * i + 'px';
        liEles[i].style.opacity = 1;
        liEles[i].style.filter = "alpha(opacity = 100)";
        oArr.push(lenArr[i]);
    }
    var loading = document.getElementById('loading');
    loading.style.top = _.getMaxValue(oArr) + 50 + 'px';

    for (var i = c; i < lisLen; i++) {
        var minIndex = _.getMinIndex(oArr);
        liEles[i].style.top = oArr[minIndex] + mv + 'px';
        liEles[i].style.left = iw * minIndex + 'px';
        liEles[i].style.opacity = 1;
        liEles[i].style.filter = "alpha(opacity = 100)";
        oArr[minIndex] = oArr[minIndex] + lenArr[i] + mv;  // 更新列高
    }
    loading.style.top = _.getMaxValue(oArr) + 50 + 'px';

    function scroll() {
        var sTop = document.documentElement.scrollTop || document.body.scrollTop;  //页面滚动卷上去的高度
        var minHeightValue = oArr[_.getMinIndex(oArr)]; // 最短列的高度
        var h = document.documentElement.clientHeight || document.body.clientHeight; //屏幕高度
        if (sTop > minHeightValue - h) {
            console.log('start loading img');
            window.onscroll = null;  // 首先清除window.onscroll事件，避免重复loading
            toolAjax.ajax('../public/json/waterfall.json', function (data) {
                console.log('data');
                _.addItem(data, function () {
                    var newLisLen = ulEle.getElementsByTagName('li').length;
                    console.log('load pic finish', lisLen, newLisLen);
                    if (newLisLen <= lisLen) return;

                    // 更新记录图片长度的数组
                    for (var i = lisLen; i < newLisLen; i++) {
                        lenArr.push(liEles[i].offsetHeight);
                    }

                    // 将append到页面的新图片 做 absolute
                    for (var i = lisLen; i < newLisLen; i++) {
                        var minIndex = _.getMinIndex(oArr);
                        liEles[i].style.top = oArr[minIndex] + mv + 'px';
                        liEles[i].style.left = iw * minIndex + 'px';
                        liEles[i].style.opacity = 1;
                        liEles[i].style.filter = "alpha(opacity = 100)";
                        oArr[minIndex] = oArr[minIndex] + lenArr[i] + mv;  // 更新列高
                    }
                    loading.style.top = _.getMaxValue(oArr) + 50 + 'px';

                    // 更新统计数据：长度， 恢复onscroll
                    lisLen = newLisLen;
                    window.onscroll = scroll;

                })
            })
        }
    };

    window.onscroll = scroll;
}

var _ = {
    getMaxValue: function (arr) {
        var arrCoyp = arr.slice(0);
        // 按从大到小排列， 取第一个最大值
        arrCoyp.sort(function (a, b) {
            return b - a;
        });
        return arrCoyp[0];
    },
    getMinIndex: function (arr) {
        var minValue = arr[0];
        var minIndex = 0;
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < minValue) {
                minValue = arr[i];
                minIndex = i;
            }
        }
        return minIndex;
    },
    // 实现图片预加载 然后放到页面DOM中
    addItem: function (data, callback) {
        var _this = this;
        var html = '';
        var len = data.length;
        var loadedCounter = 0;
        (function loadimg() {
            var img = new Image();
            img.src = data[loadedCounter].imgSrc;
            img.onload = function () {
                loadedCounter++;
                if (loadedCounter != len) {
                    loadimg();
                } else {
                    for (var i = 0; i < len; i++) {
                        html += "<li><img src=" + data[i].imgSrc + " /></li>";
                    }
                    _this.appendEles(document.getElementById('flow-box'), html);
                    if (!!callback && typeof callback == 'function') {
                        callback();
                    }
                }
            }
        })();
        callback();
    },
    appendEles: function (parentEle, child) {
        if (typeof child == 'string') {
            var div = document.createElement('div');
            div.innerHTML = child;
            var fragment = document.createDocumentFragment();
            fragment.appendChild(div);
            parentEle.appendChild(fragment);
            return;
        }
        parentEle.appendChild(child);
    }
};


window.onload = function () {
    flow();
};
window.onresize = function () {
    console.log('resize');
    clearTimeout(window.re);
    window.re = setTimeout(flow, 200)
};