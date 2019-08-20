var App;
(function (App) {
    var UI = /** @class */ (function () {
        function UI() {
        }
        /**
         * 打开显示页面
         * @param view          BaseView 一个继承BaseView的页面
         * @param openEffect    显示效果 目前只有透明性0-1显示效果 默认 alpha
         * @param closeOther    是否关闭上一个UI 默认 true
         * @param data          UI显示的时候传递的数据 会在onReady之后通过setData传递 默认为null
         */
        UI.open = function (view, openEffect, closeOther, data) {
            var _this = this;
            if (openEffect === void 0) { openEffect = 'alpha'; }
            if (closeOther === void 0) { closeOther = true; }
            if (data === void 0) { data = null; }
            this.checkResource(view, function () {
                Laya.stage.addChild(view);
                view.onReady();
                if (data)
                    view.setData(data);
                if (view.viewUI instanceof Laya.Dialog) {
                    view.viewUI.popup();
                    return;
                }
                _this.views.push(view);
                switch (openEffect) {
                    case 'alpha':
                        _this.alphaAni(view, function () {
                            if (closeOther) {
                                _this.close(_this.oldView);
                                _this.oldView = view;
                            }
                        });
                        break;
                    case 'rightIn':
                        _this.rightInAni(view, function () {
                            if (closeOther) {
                                _this.close(_this.oldView);
                                _this.oldView = view;
                            }
                        });
                        break;
                    default:
                        if (closeOther) {
                            _this.close(_this.oldView);
                            _this.oldView = view;
                        }
                        break;
                }
            });
            // console.log('cls:', cls.toString().match(/function\s*([^(]*)\(/)[1]);
        };
        /**
         * 关闭一个页面
         * @param view  BaseView 一个继承BaseView的页面
         */
        UI.close = function (view, closeEffect) {
            var _this = this;
            if (closeEffect === void 0) { closeEffect = ''; }
            var index = this.views.indexOf(view);
            if (index > -1) {
                this.views.splice(index, 1);
            }
            if (view) {
                switch (closeEffect) {
                    case 'rightOut':
                        this.rightOutAni(view, function () {
                            _this.closeView(view);
                        });
                        break;
                    default:
                        this.closeView(view);
                        break;
                }
            }
        };
        UI.removeAll = function () {
            this.oldView = null;
            while (this.views.length > 0) {
                this.close(this.views[0]);
            }
        };
        //检测是否要加载素材
        UI.checkResource = function (view, callback) {
            var resource = view.resource;
            if (resource && resource.length) {
                App.Loading.show('资源加载中...');
                console.log('load res group:' + view.viewName);
                Laya.loader.load(resource, Laya.Handler.create(this, function () {
                    App.Loading.hide();
                    callback();
                }), null, '', 1, true, view.viewName);
            }
            else {
                callback();
            }
        };
        UI.closeView = function (view) {
            var resource = view.resource;
            if (view.viewUI instanceof Laya.Dialog) {
                view.viewUI.close(null, true);
                view.viewUI.closeHandler = Laya.Handler.create(this, function () {
                    if (resource && resource.length) {
                        console.log('clear res group:' + view.viewName);
                        Laya.loader.clearResByGroup(view.viewName);
                        view.onClose();
                    }
                });
            }
            else {
                if (resource && resource.length) {
                    console.log('clear res group:' + view.viewName);
                    Laya.loader.clearResByGroup(view.viewName);
                }
                view.onClose();
                view.destroyChildren();
                view.destroy();
                view.removeSelf();
                view = null;
            }
        };
        UI.alphaAni = function (view, callback) {
            view.alpha = 0;
            Laya.Tween.to(view, { alpha: 1 }, 300, null, Laya.Handler.create(this, callback));
        };
        UI.rightInAni = function (view, callback) {
            view.x = Laya.stage.width;
            Laya.Tween.to(view, { x: 0 }, 300, null, Laya.Handler.create(this, callback));
        };
        UI.rightOutAni = function (view, callback) {
            Laya.Tween.to(view, { x: Laya.stage.width }, 300, null, Laya.Handler.create(this, callback));
        };
        UI.views = [];
        return UI;
    }());
    App.UI = UI;
})(App || (App = {}));
//# sourceMappingURL=UI.js.map