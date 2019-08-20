var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingView = (function (_super) {
    __extends(LoadingView, _super);
    function LoadingView() {
        return _super.call(this) || this;
    }
    //页面准备好了
    LoadingView.prototype.onReady = function () {
        this.ui = new ui.views.LoadingUI();
        this.addChild(this.ui);
    };
    LoadingView.prototype.onClose = function () {
    };
    LoadingView.prototype.setProgress = function (value) {
        console.log(value);
    };
    return LoadingView;
}(App.BaseView));
//# sourceMappingURL=LoadingView.js.map