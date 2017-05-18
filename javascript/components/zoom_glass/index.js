var content = document.getElementById('content');

// 区域放大倍数
var areaScale = 3;

var imgEle = content.getElementsByClassName('thumb')[0];
content.onmouseenter = function () {
    // 添加半透明块
    var focu = document.createElement('div');
    focu.className = 'focu';
    focu.id = 'focu';
    focu.style.width = this.clientWidth / 4 + 'px';
    focu.style.height = this.clientHeight / 4 + 'px';
    content.appendChild(focu);

    // 添加放大区图片
    var bigImg = document.createElement('div');
    bigImg.className = 'big';
    bigImg.id = 'big';
    with (bigImg.style) {
        width = imgEle.clientWidth * areaScale + 'px';
        height = imgEle.clientHeight * areaScale + 'px';
        backgroundImage = 'url(' + imgEle.src + ')';
        backgroundSize = '400% auto';

    }
    content.appendChild(bigImg)
};
content.onmousemove = function (e) {
    var focu = document.getElementById('focu');
    var big = document.getElementById('big');

    // 半透明块的left，top 值
    var lValue = e.clientX - this.offsetLeft - focu.clientWidth / 2;
    var tValue = e.clientY - this.offsetTop - focu.clientHeight / 2;

    var lMax = this.clientWidth - focu.clientWidth;
    var tMax = this.clientHeight - focu.clientHeight;

    // 放大区 背景position
    var zoomScale = this.clientWidth / focu.clientWidth;
    var posX = zoomScale * lValue * -1 * areaScale + 'px';
    var posY = zoomScale * tValue * -1 * areaScale + 'px';


    if (lValue < 0) {
        lValue = 0;
        posX = 0;
    } else if (lValue > lMax) {
        lValue = lMax + 'px';
        posX = 'right'
    } else {
        lValue += 'px';
    }

    if (tValue < 0) {
        tValue = 0;
        posY = 0;

    } else if (tValue > tMax) {
        tValue = tMax + 'px';
        posY = 'bottom';
    } else {
        tValue += 'px';
    }

    // console.log(lValue, tValue);
    focu.style.left = lValue;
    focu.style.top = tValue;
    big.style.backgroundPosition = posX + ' ' + posY;

};
content.onmouseleave = function () {
    // 移除半透明块和放大区图片
    var focu = document.getElementById('focu');
    if (focu) {
        content.removeChild(focu);
    }
    var big = document.getElementById('big');
    if (big) {
        content.removeChild(big);
    }
};