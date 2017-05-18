var toolAjax = {
    getXHR: function () {
        if (window.XMLHttpRequest) {
            this.getXHR = function () {
                return new XMLHttpRequest();
            };
            return new XMLHttpRequest();
        }
        this.getXHR = function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
        return new ActiveXObject('Microsoft.XMLHTTP');
    },
    toJson: function (dataStr) {
        if (window.JSON) {
            return JSON.parse(dataStr);
        }
        return eval('(' + dataStr + ')');
    },
    ajax: function (url, callback) {
        var _this = this;
        var xhr = this.getXHR();
        xhr.open('get', url, 'async');
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                var data = _this.toJson(xhr.responseText);
                callback(data);
            }
        };
        xhr.send();
    }
}