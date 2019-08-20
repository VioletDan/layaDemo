var App;
(function (App) {
    var Alert = (function () {
        function Alert() {
        }
        /**
         * 显示alert
         * @param content       内容
         * @param listen        监听作用域
         * @param listenFuc     监听回调函数
         */
        Alert.show = function (content, listen, listenFuc) {
            if (listen === void 0) { listen = null; }
            if (listenFuc === void 0) { listenFuc = null; }
            if (this.ui == null) {
                this.cache = [];
                this.ui = new ui.common.AlertUI();
                this.ui.closeHandler = new Laya.Handler(this, this.closeHandler);
            }
            this.cur = {
                content: content,
                listen: listen,
                listenFuc: listenFuc
            };
            if (!this.ui.isPopup) {
                this.ui.txt.text = content;
                this.ui.popup();
            }
            else {
                this.cache.push({
                    content: content,
                    listen: listen,
                    listenFuc: listenFuc
                });
            }
        };
        //内部关闭事件监听
        Alert.closeHandler = function () {
            if (this.cur) {
                if (this.cur.listenFuc)
                    this.cur.listenFuc.apply(this.cur.listen);
                this.cur = null;
            }
            if (this.cache.length > 0) {
                var obj = this.cache.shift();
                this.show(obj.content, obj.listen, obj.listenFuc);
            }
        };
        return Alert;
    }());
    App.Alert = Alert;
})(App || (App = {}));
//# sourceMappingURL=Alert.js.map