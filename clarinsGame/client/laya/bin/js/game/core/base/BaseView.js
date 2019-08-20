var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var App;
(function (App) {
    var BaseView = /** @class */ (function (_super) {
        __extends(BaseView, _super);
        function BaseView(name) {
            if (name === void 0) { name = ''; }
            var _this = _super.call(this) || this;
            _this._viewName = '';
            _this._viewName = name;
            return _this;
        }
        Object.defineProperty(BaseView.prototype, "resource", {
            /**
             * 获取要加载的素材
             */
            get: function () {
                return [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BaseView.prototype, "viewUI", {
            get: function () {
                return this._ui;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 注册UI 对ui的一些属性计算赋值 解决兼容问题
         * @param ui UI对象
         */
        BaseView.prototype.regUI = function (ui) {
            this._ui = ui;
            if (this._ui instanceof Laya.Dialog) {
            }
            else {
                ui.height = Laya.stage.height;
            }
            //计算bg
            var bg = ui.getChildByName('bg');
            if (bg) {
                bg.height = Laya.stage.height;
            }
            //计算居中
            var center = ui.getChildByName('center');
            if (center) {
                center.y = (Laya.stage.height - center.height) / 2;
            }
            //计算居底
            var bottom = ui.getChildByName('bottom');
            if (bottom) {
                bottom.y = Laya.stage.height - bottom.height;
            }
            //计算位置不变 但是高度 超过屏幕 自动缩放
            var main = ui.getChildByName('main');
            if (main) {
                var offsetY = Laya.stage.height - main.y;
                if (main.height > offsetY) {
                    var scale = offsetY / main.height;
                    main.scale(scale, scale);
                    main.x = (Laya.stage.width - main.width * scale) / 2;
                }
            }
        };
        /**
         * 页面准备 子类重写
         */
        BaseView.prototype.onReady = function () {
        };
        /**
         * 页面关闭 子类重写
         */
        BaseView.prototype.onClose = function () {
        };
        /**
         * 页面显示 子类重写（wx小游戏会用到）
         */
        BaseView.prototype.onShow = function () {
        };
        /**
         * 页面隐藏 子类重写（wx小游戏会用到）
         */
        BaseView.prototype.onHide = function () {
        };
        /**
         * 给view发送数据
         * @param data 任何数据对象
         */
        BaseView.prototype.setData = function (data) {
        };
        Object.defineProperty(BaseView.prototype, "viewName", {
            /**
             * 获取当前viewName
             */
            get: function () {
                return this._viewName;
            },
            enumerable: true,
            configurable: true
        });
        return BaseView;
    }(Laya.Sprite));
    App.BaseView = BaseView;
})(App || (App = {}));
//# sourceMappingURL=BaseView.js.map