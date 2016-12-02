var banner = {
    initAnimate: function () {
        var banner_l = banners.length;
        var banner_index = banner_l - 1;

        this.rotateScale = 360 / banner_l;  //刻度
        var _this = this;
        window.timer = setInterval(function () {
            if (banner_index < 0) {
                window.timer = null;
                clearInterval(window.timer);
                document.addEventListener('mousedown', _this.down, false);
                return;
            }
            var yDeg = 360 / banner_l * banner_index; //逆时针出现
            banners[banner_index].style.transform = 'rotateY(' + yDeg + 'deg) translateZ(400px)';
            banner_index--;
        }, 30);

        this.rotateYDeg = 0; //记录水平旋转角度，方便左右切换
    },
    hRotateAnimate: function (hDirection) { //水平旋转
        div1.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(-18deg)';
        var banner_l = banners.length;
        this.rotateYDeg += hDirection * this.rotateScale;
        for (var i = 0; i < banner_l; i++) {
            yDeg = 360 / banner_l * i + this.rotateYDeg;
            banners[i].style.transform = 'rotateY(' + yDeg + 'deg) translateZ(400px)';
        }
    },
    down: function (e) {
        console.log('down');
        console.log(this);   // this --> document

        if (!this.rotate) {
            this.rotate = {
                x: -18,
                y: banner.rotateYDeg || 0
            };
        }

        this.startPos = {   //手指按下的位置
            x: e.pageX,
            y: e.pageY
        };

        document.addEventListener('mousemove', banner.move, false);
        document.addEventListener('mouseup', banner.up, false);
    },
    move: function (e) {
        this.movePos = { //手指移动到的位置
            x: e.pageX,
            y: e.pageY
        };
        this.relativePos = { //移动的长度
            x: (this.movePos.x - this.startPos.x) / 6 + this.rotate.x,
            y: -(this.movePos.y - this.startPos.y) / 6 + this.rotate.y
        };

        div1.style.transform = 'perspective(1000px) rotateY(' + this.relativePos.x + 'deg) rotateX(' + this.relativePos.y + 'deg)';
    },
    up: function (e) {
        console.log('up');
        this.rotate = { //移动的长度
            x: this.relativePos.x,
            y: this.relativePos.y
        };

        document.removeEventListener('mousemove', banner.move, false);
        document.removeEventListener('mouseup', banner.up, false);
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
    banner.hRotateAnimate(1);
};
next.onclick = function () {
    banner.hRotateAnimate(-1);
};