var banner = {
    initAnimate: function () {
        var banner_l = banners.length;
        var banner_index = banner_l - 1;

        this.rotateScale = 360 / banner_l;  //刻度
        window.timer = setInterval(function () {
            if (banner_index < 0) {
                window.timer = null;
                clearInterval(window.timer);
                return;
            }
            var yDeg = 360 / banner_l * banner_index; //逆时针出现
            banners[banner_index].style.transform = 'rotateY(' + yDeg + 'deg) translateZ(400px)';
            banner_index--;
        }, 30);

        this.rotateYDeg = 0;
    },
    hRotateAnimate: function (hDirection) { //水平旋转
        var banner_l = banners.length;
        this.rotateYDeg += hDirection * this.rotateScale;
        for (var i = 0; i < banner_l; i++) {
            yDeg = 360 / banner_l * i + this.rotateYDeg;
            banners[i].style.transform = 'rotateY(' + yDeg + 'deg) translateZ(400px)';
        }
    }
};

var bannerEle = document.getElementById('banner-area');
var banners = bannerEle.getElementsByClassName('banner-unit');
window.onresize = function () {
    bannerEle.style.height = window.innerHeight + 'px';
}
bannerEle.style.height = window.innerHeight + 'px';

banner.initAnimate();
prev.onclick = function () {
    banner.hRotateAnimate(-1);
};
next.onclick = function () {
    banner.hRotateAnimate(1);
};