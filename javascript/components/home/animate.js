var homeJs = {
    loadImg: function (ary, column) {
        var _this = this;
        var loaded_column = 0; //统计已经加载完成的图片的个数
        for (var i = 0; i < ary.length; i++) {
            var route = ary[i].imgRoute;
            var imgAry = ary[i].imgAry;
            for (var j = 0; j < imgAry.length; j++) {
                var oImg = new Image();
                oImg.src = route + imgAry[j];
                oImg.onload = function () {
                    loaded_column += 1;
                    _this.drawProgressBar(loaded_column / column);
                    if (column == loaded_column) {
                        console.log('finished to load img');
                    }
                }
            }
        }
    },
    drawProgressBar: function (percentage) {
        var loadingEle = document.getElementById('loading_line');
        loadingEle.style.width = percentage * 100 + '%';
        if (percentage >= 1) { //图片加载完成后显示出进入主页按钮，并且绑定进入主页的方法
            var goInBtn = document.getElementById('go_in');
            goInBtn.style.display = 'inline-block';
            goInBtn.onclick = function () {
                var loadingEles = document.getElementById('loading');
                loadingEles.className += ' finish';
                var home = document.getElementById('home');
                home.style.display = 'block';
                window.timer = setTimeout(function () {
                    homeJs.initAnimate();
                    homeJs.initSkills('public/json/skills.json');
                    homeJs.initStartups('public/json/startups.json');
                    document.body.removeChild(loadingEles);
                }, 1000);
            }

        }
    },
    initAnimate: function () {
        document.getElementById('first').className += ' animate';
    },
    navChange: function (navEles, ele, index) {
        console.log(ele);
        for (var i = 0; i < navEles.length; i++) {
            navEles[i].className = '';
        }
        navEles[index].className = 'active';

        // var lineLeftValue = ele.offsetLeft;
        // var lineWidthValue = ele.clientWidth;
        // var line = document.getElementsByTagName('nav')[0].getElementsByClassName('line')[0];
        // line.style.left = lineLeftValue + 'px';
        // line.style.width = lineWidthValue + 'px';
    },
    initSkills: function (url) {
        toolAjax.ajax(url, function (res) {
            var skillList = document.getElementById('skill_list');
            var fragment = document.createDocumentFragment();
            for (var i = 0; i < res.length; i++) {
                var bar = document.createElement('div');
                bar.className = "bar";
                var deviceW = document.documentElement.clientWidth || document.body.clientWidth;
                //设置百分比
                if (deviceW <= 768) {
                    bar.style.width = res[i].percentage * 100 + '%';
                }
                else {
                    bar.style.top = (1 - res[i].percentage) * 100 + '%';
                }

                var percentage = document.createElement('div');
                percentage.className = "percentage";
                percentage.innerHTML = "<span>" + res[i].name + "</span>";
                percentage.appendChild(bar);

                var section = document.createElement('div');
                section.className = "section";

                section.appendChild(percentage);
                fragment.appendChild(section);
            }
            skillList.appendChild(fragment);
        })
    },
    initStartups: function (url, page) {
        var _this = this;
        page = page || 1;
        per_page = 6;
        toolAjax.ajax(url, function (res) {
            var startIndex = (page - 1) * per_page;
            var endIndex = page * per_page - 1;
            endIndex = (endIndex > res.length - 1) ? (res.length - 1) : endIndex;

            var startupList = document.getElementById('startup_list');
            var fragment = document.createDocumentFragment();
            for (var i = startIndex; i <= endIndex; i++) {

                var startupOption = document.createElement('div');
                startupOption.className = 'startup_option';

                var imgEle = document.createElement('img');
                imgEle.src = res[i].img;
                var coverEle = document.createElement('div');
                coverEle.className = 'cover';
                coverEle.appendChild(imgEle);
                startupOption.appendChild(coverEle);

                var titleEle = document.createElement('div');
                titleEle.innerText = res[i].title;
                titleEle.className = 'title';
                startupOption.appendChild(titleEle);

                var descEle = document.createElement('div');
                descEle.innerText = res[i].desc;
                descEle.className = 'desc';
                startupOption.appendChild(descEle);

                var link = document.createElement('a');
                link.href = res[i].url;
                link.target="_blank";
                link.appendChild(startupOption);

                var section = document.createElement('div');
                section.className = 'section';
                section.appendChild(link);

                fragment.appendChild(section);
            }
            startupList.appendChild(fragment);

            var moreBtn = document.getElementById('load_more_startup');
            moreBtn.innerHTML = '';
            if (res.length - 1 > endIndex) {
                var btn = document.createElement('span');
                btn.innerText = '加载更多';
                btn.setAttribute('nextPage', page + 1);
                moreBtn.appendChild(btn);
                btn.onclick = function () {
                    nextPage = this.getAttribute('nextPage');
                    _this.initStartups(url, parseInt(nextPage));
                }
            }
        })
    }
};

var ary = [
    {
        imgRoute: 'public/images/home/',
        imgAry: ['door_left.jpg', 'door_right.jpg', 'loading_bg.jpg', 'loading_bg_bottom.jpg', 'loading_bg_top.jpg']
    }
];
homeJs.loadImg(ary, 5);
var navEles = document.getElementsByTagName('nav')[0].getElementsByTagName('li');
for (var i = 0; i < navEles.length; i++) {
    navEles[i].onclick = (function (i) {
        return function () {
            homeJs.navChange(navEles, this, i);
        }
    })(i);
}


// var loadingEles = document.getElementById('loading');
// document.body.removeChild(loadingEles);
// var home = document.getElementById('home');
// document.getElementById('first').style.display = 'none';
// home.style.display = 'block';
// homeJs.initAnimate();
// homeJs.initSkills('public/json/skills.json');
// homeJs.initStartups('public/json/startups.json');