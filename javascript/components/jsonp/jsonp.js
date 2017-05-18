(function () {
    var namespace = {};
    var globalName = 'x';

    var jsonp = function (url, data, jsonpcallback, callback) {
        // 定义全局函数名
        var cbName = 'cb' + jsonp.count++;
        var callbackName = 'window.' + globalName + '.jsonp.' + cbName;    //window.x.jsonp.cb0, window.x.jsonp.cb1

        namespace["jsonp"][cbName] = function (data) {
            try {
                callback(data);
            }
            catch (e) {
                script.parentNode.removeChild(script);
                delete window[globalName]["jsonp"][cbName];
            }
        };


        var script = document.createElement('script');
        if (data) {
            data = tool.encodeToURIString(data);
        }
        if (typeof jsonpcallback == 'string') {
            jsonpcallback += '=' + callbackName;
        }

        //将url 分别与 date  callback 用 ？ & 拼接起来
        url = tool.hasSearch(url, data);
        url = tool.hasSearch(url, jsonpcallback);

        script.src = url;
        document.body.appendChild(script);
    };
    jsonp.count = 0;
    namespace.jsonp = jsonp;
    this.x = namespace;


    tool = {
        //将参数设置为 key=value&key=value&key=value 格式
        encodeToURIString: function (data) {
            if (typeof data == 'string') return;
            if (!data) return;
            var arr = [];
            for (key in data) {
                if (!data.hasOwnProperty(key)) return;
                arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            return arr.join('&');
        },
        //将url 和 参数拼接起来，看是用？ 还是 &
        hasSearch: function (url, padString) {
            if (!padString) return url;
            if (typeof padString != 'string') return url;
            return url + (/\?/.test(url) ? '&' : "?") + padString;
        }
    }
})();