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
var DemoView = /** @class */ (function (_super) {
    __extends(DemoView, _super);
    function DemoView() {
        var _this = _super.call(this) || this;
        _this.ui = new ui.test.demoUI();
        _this.addChild(_this.ui);
        _this.ui.btn1.on(Laya.Event.CLICK, _this, _this.lalala);
        _this.ui.btn2.on(Laya.Event.CLICK, _this, _this.lalala);
        return _this;
    }
    DemoView.prototype.lalala = function (e) {
        console.log(e.currentTarget.name);
    };
    return DemoView;
}(Laya.Sprite));
//# sourceMappingURL=DemoView.js.map