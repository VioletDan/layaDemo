var App;
(function (App) {
    var Message = /** @class */ (function () {
        function Message() {
        }
        /**
         * 清除所有监听
         */
        Message.clear = function () {
            this.dic = {};
        };
        /**
         * 添加全局消息监听
         * @param type          消息唯一标识
         * @param listenerObj   侦听函数所属对象(作用域)
         * @param listener      侦听函数
         */
        Message.on = function (type, listenerObj, listener) {
            var arr = this.dic[type];
            if (arr == null) {
                arr = new Array();
                this.dic[type] = arr;
            }
            //判断是否存在
            var i = 0;
            var len = arr.length;
            var obj;
            for (i = 0; i < len; i++) {
                obj = arr[i];
                if (obj[0] == listener && arr[1] == listenerObj) {
                    return;
                }
            }
            arr.push([listener, listenerObj]);
        };
        /**
         * 移除全局消息监听
         * @param type          消息唯一标识
         * @param listenerObj   侦听函数所属对象(作用域)
         * @param listener      侦听函数
         */
        Message.off = function (type, listenerObj, listener) {
            var arr = this.dic[type];
            if (arr == null) {
                return;
            }
            var i = 0;
            var len = arr.length;
            var obj;
            for (i; i < len; i++) {
                if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                    arr.splice(i, 1);
                    break;
                }
            }
            if (arr.length == 0) {
                this.dic[type] = null;
                delete this.dic[type];
            }
        };
        /**
         * 移除某一对象的所有监听
         * @param listenerObj 侦听函数所属对象
         */
        Message.offAll = function (listenerObj) {
            var keys = Object.keys(this.dic);
            var i;
            var len = keys.length;
            var type, arr;
            var j;
            var arrLen;
            for (i = 0; i < len; i++) {
                type = keys[i];
                arr = this.dic[type];
                arrLen = arr.length;
                for (j = 0; j < arrLen; j++) {
                    if (arr[j][1] == listenerObj) {
                        arr.splice(j, 1);
                        j--;
                    }
                }
                if (arr.length == 0) {
                    this.dic[type] = null;
                    delete this.dic[type];
                }
            }
        };
        /**
         * 触发消息
         * @param type 消息唯一标识
         * @param param 消息参数
         *
         */
        Message.event = function (type) {
            var param = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                param[_i - 1] = arguments[_i];
            }
            if (this.dic[type] == null) {
                return;
            }
            var vo = ObjectPool.getItem("MessageVo");
            if (null == vo) {
                vo = new MessageVo();
            }
            vo.type = type;
            vo.param = param;
            this.dealMsg(vo);
        };
        /**
         * 处理一条消息
         * @param msgVo
         */
        Message.dealMsg = function (msgVo) {
            var listeners = this.dic[msgVo.type];
            var i = 0;
            var len = listeners.length;
            var listener = null;
            while (i < len) {
                listener = listeners[i];
                listener[0].apply(listener[1], msgVo.param);
                if (listeners.length != len) {
                    len = listeners.length;
                    i--;
                }
                i++;
            }
            msgVo.dispose();
            ObjectPool.recover("MessageVo", msgVo);
        };
        Message.dic = {};
        Message.messList = [];
        return Message;
    }());
    App.Message = Message;
})(App || (App = {}));
//# sourceMappingURL=Message.js.map