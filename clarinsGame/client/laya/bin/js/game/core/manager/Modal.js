var App;
(function (App) {
    var Modal = /** @class */ (function () {
        function Modal() {
        }
        /**
         * 显示模态弹窗
         *
         * object参数说明：
         *
         *      *提示的标题 必填 string
         *      title: '标题'
         *      *提示的内容 必填 string
         *      content: '内容'
         *      *是否显示取消按钮 默认 true boolean
         *      showCancel: true
         *      *取消按钮的文字，默认为"取消"， string
         *      cancelText: '取消'
         *      *确定按钮的文字，默认为"确定"， string
         *      confirmText: '确定'
         *      *确认取消点击回调函数 返回参数 yes or no
         *      complete: Function
         *
         */
        Modal.show = function (object) {
            if (object == null)
                return;
            !object.hasOwnProperty('title') && (object['title'] = this.defaultObj['title']);
            !object.hasOwnProperty('content') && (object['content'] = this.defaultObj['content']);
            !object.hasOwnProperty('cancelText') && (object['cancelText'] = this.defaultObj['cancelText']);
            !object.hasOwnProperty('confirmText') && (object['confirmText'] = this.defaultObj['confirmText']);
            !object.hasOwnProperty('showCancel') && (object['showCancel'] = this.defaultObj['showCancel']);
            if (this.ui == null) {
                this.cache = [];
                this.ui = new ui.common.ModalUI();
                this.ui.closeHandler = new Laya.Handler(this, this.closeHandler);
            }
            this.cur = object;
            if (!this.ui.isPopup) {
                this.updateUI();
                this.ui.popup();
            }
            else {
                this.cache.push(object);
            }
        };
        /**
         * 关闭模态弹窗
         */
        Modal.hide = function () {
            this.ui.close();
        };
        //内部UI更新
        Modal.updateUI = function () {
            this.ui.title.text = this.cur['title'];
            this.ui.content.text = this.cur['content'];
            this.ui.btnOk.label = this.cur['confirmText'];
            this.ui.btnCancel.label = this.cur['cancelText'];
            if (this.cur['showCancel']) {
                this.ui.btnOk.width = this.ui.width / 2;
                this.ui.btnCancel.visible = true;
            }
            else {
                this.ui.btnOk.width = this.ui.width;
                this.ui.btnCancel.visible = false;
            }
        };
        //内部关闭事件监听
        Modal.closeHandler = function (res) {
            if (this.cur) {
                if (this.cur.complete)
                    this.cur.complete(res);
                this.cur = null;
            }
            if (this.cache.length > 0) {
                var obj = this.cache.shift();
                this.show(obj);
            }
        };
        Modal.defaultObj = {
            title: '提示',
            content: '',
            showCancel: true,
            cancelText: '取消',
            confirmText: '确认',
            complete: null
        };
        return Modal;
    }());
    App.Modal = Modal;
})(App || (App = {}));
//# sourceMappingURL=Modal.js.map