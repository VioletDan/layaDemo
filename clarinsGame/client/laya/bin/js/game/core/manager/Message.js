var App;
(function (App) {
    var Message = (function () {
        function Message() {
        }
        Message.init = function () {
            if (this.msg == null) {
                this.msg = MessageCenter.getInstance();
            }
        };
        /**
         * 清除所有监听
         */
        Message.clear = function () {
            this.init();
            this.msg.clear();
        };
        /**
         * 添加全局消息监听
         * @param type          消息唯一标识
         * @param listenerObj   侦听函数所属对象(作用域)
         * @param listener      侦听函数
         */
        Message.addEvent = function (type, listenerObj, listener) {
            this.init();
            this.msg.addListener(type, listener, listenerObj);
        };
        /**
         * 移除全局消息监听
         * @param type          消息唯一标识
         * @param listenerObj   侦听函数所属对象(作用域)
         * @param listener      侦听函数
         */
        Message.removeEvent = function (type, listenerObj, listener) {
            this.init();
            this.msg.removeListener(type, listener, listenerObj);
        };
        /**
         * 移除某一对象的所有监听
         * @param listenerObj 侦听函数所属对象
         */
        Message.removeAll = function (listenerObj) {
            this.init();
            this.msg.removeAll(listenerObj);
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
            this.init();
            this.msg.dispatch(type, param);
        };
        return Message;
    }());
    App.Message = Message;
})(App || (App = {}));
//# sourceMappingURL=Message.js.map