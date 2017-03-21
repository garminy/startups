var book = {
    init: function () {
        var _this = this;
        for (var i = 0; i < paperEles.length; i++) {
            var item = paperEles[i];
            item.style.zIndex = (paperEles.length - i) * 2;
            item.setAttribute('posFlag', 'at_right');
            item.onclick = (function (i) {
                if (i == paperEles.length - 1) return;
                return function () {
                    _this.setProperty(i);
                }
            })(i)
        }
    },
    setProperty: function (num_index) {
        var item = paperEles[num_index];
        if (item.getAttribute('posFlag') == 'at_right') {
            item.style.zIndex = num_index * 2;
            item.style.transform = 'rotateY(-180deg) ';
            item.setAttribute('posFlag', 'at_left');
        }else{
            item.style.zIndex = (paperEles.length - num_index) * 2;
            item.style.transform = 'rotateY(0deg)';
            item.setAttribute('posFlag', 'at_right');
        }
    }
};

var bookEle = document.getElementById('book');
var paperEles = bookEle.getElementsByClassName('paper');
book.init();