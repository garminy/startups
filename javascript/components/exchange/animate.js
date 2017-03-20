/*
 * ele 要执行动画的对象
 * obj 哪些属性要执行动画
 * duration 动画要执行多长时间
 * callback 动画完成后 回调 */
function animate(ele, obj, duration, callback) {
    var beginObj = {};
    var changeObj = {};
    var flag = 0; //标志obj是否为空
    for (attr in obj) {
        var begin = parseFloat(animate.getCss(ele, attr));
        var change = parseFloat(obj[attr]) - begin;
        if (change) {
            beginObj[attr] = begin;
            changeObj[attr] = change;
            flag++;
        }
    }

    if (flag == 0) return; //没有传过来obj, 元素不做变化，即时退出


    /*
     * setInterval 循环执行
     * change = end - begin;
     * cur = times/duration * change + begin;
     *
     * times 动画已经执行的时间
     * interval 每次执行的间隔
     * */

    var times = 0;
    var interval = 10;
    function step() {
        times += interval;
        var curPos = {};
        for (attr in obj) {
            curPos[attr] = times / duration * changeObj[attr] + beginObj[attr];
        }
        if (times > duration) { //时间过了
            clearInterval(ele.timer);
            ele.timer = null;
            for (attr in obj) {
                animate.setCss(ele, attr, obj[attr]);
            }
            if (typeof callback == 'function') {
                callback.call(ele, null);
            }
            return;
        }
        for (attr in obj) {
            animate.setCss(ele, attr, curPos[attr]);
        }
    }

    ele.timer = setInterval(step, interval)
}


//    js获取 css 的方法， IE8+使用方法window.getComputedStyle(ele)[attr];  IE8及低版本使用属性 ele.currentStyle[attr];
animate.getCss = function (ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele)[attr];
    }
    if (attr != 'opacity') {
        return parseFloat(ele.currentStyle[attr]);
    }
    var value = ele.currentStyle[attr].replace(/ +/g, '');  //alpha(opacity=100) 去除空格
    var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
    if (reg.test(value)) {
        var res = reg.exec(value);
        return parseFloat(res[1]) / 100;

    } else {
        return 1;
    }
};

animate.setCss = function (ele, attr, value) {
    if (attr == 'opacity') {
        ele.style[attr] = value;
        ele.style.filter = 'alpha(opacity = ' + value * 100 + ')';
    }
    ele.style[attr] = value + 'px';
};