var App;
(function (App) {
    var Layer = /** @class */ (function () {
        function Layer() {
        }
        Layer.init = function () {
            //用一个空容器装着所有UI 如果后期想全屏截图可以用此显示对象
            var root = new Laya.Sprite();
            this.BG = new Laya.Sprite();
            this.UI = new Laya.Sprite();
            this.EFFECT = new Laya.Sprite();
            root.addChild(this.BG);
            root.addChild(this.UI);
            root.addChild(this.EFFECT);
            Laya.stage.addChild(root);
        };
        return Layer;
    }());
    App.Layer = Layer;
})(App || (App = {}));
//# sourceMappingURL=Layer.js.map