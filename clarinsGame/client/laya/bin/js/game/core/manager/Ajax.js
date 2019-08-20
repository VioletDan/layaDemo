var App;
(function (App) {
    var Ajax = /** @class */ (function () {
        function Ajax() {
        }
        /**
         * 添加ajax发送数据时要携带的数据
         * @param key 键
         * @param value 值
         */
        Ajax.addData = function (key, value) {
            this.sendData[key] = value;
        };
        Object.defineProperty(Ajax, "serverUrl", {
            /**
             * 设置接口域名
             */
            set: function (value) {
                this._serverUrl = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * Get请求
         * @param url           请求地址
         * @param data          数据 object
         * @param listenerObj   侦听函数所属对象(作用域)
         * @param onSuccess     成功回调
         * @param onError       失败回调
         */
        Ajax.get = function (url, data, listenerObj, onSuccess, onError) {
            this.ajax(url, data, 'get', listenerObj, onSuccess, onError);
        };
        /**
         * Post请求
         * @param url           请求地址
         * @param data          数据 object
         * @param listenerObj   侦听函数所属对象(作用域)
         * @param onSuccess     成功回调
         * @param onError       失败回调
         */
        Ajax.post = function (url, data, listenerObj, onSuccess, onError) {
            this.ajax(url, data, 'post', listenerObj, onSuccess, onError);
        };
        Ajax.ajax = function (url, data, method, listenerObj, onSuccess, onError) {
            if (url && url != '') {
                //查找一下是否有必填的通用信息 统一添加
                for (var key in this.sendData) {
                    data[key] = this.sendData[key];
                }
                var http = new Laya.HttpRequest();
                http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete, [listenerObj, onSuccess, http]);
                http.once(Laya.Event.ERROR, this, this.onHttpRequestError, [listenerObj, onError, http]);
                http.send(this._serverUrl + url, JSON.stringify(data), method, 'json', ['content-type', 'application/x-www-form-urlencoded']);
            }
        };
        Ajax.urlEncode = function (param, key, encode) {
            if (key === void 0) { key = null; }
            if (encode === void 0) { encode = null; }
            if (param == null)
                return '';
            var paramStr = '';
            var t = typeof (param);
            if (t == 'string' || t == 'number' || t == 'boolean') {
                paramStr += key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
            }
            else {
                var m = 0;
                for (var i in param) {
                    var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                    if (m == 0) {
                        paramStr += this.urlEncode(param[i], k, encode);
                    }
                    else {
                        paramStr += ("&" + this.urlEncode(param[i], k, encode));
                    }
                    m++;
                }
            }
            return paramStr;
        };
        ;
        Ajax.onHttpRequestError = function (listenerObj, callback, http) {
            console.log('error');
            if (listenerObj && callback) {
                callback.apply(listenerObj, [null]);
            }
            http.offAll();
        };
        Ajax.onHttpRequestComplete = function (listenerObj, callback, http) {
            console.log('success', http.data);
            if (listenerObj && callback) {
                callback.apply(listenerObj, [http.data]);
            }
            http.offAll();
        };
        Ajax.sendData = {};
        Ajax._serverUrl = "";
        return Ajax;
    }());
    App.Ajax = Ajax;
})(App || (App = {}));
//# sourceMappingURL=Ajax.js.map