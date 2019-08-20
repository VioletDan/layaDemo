var LoadingControl = /** @class */ (function () {
    function LoadingControl() {
    }
    LoadingControl.show = function () {
        this.view = new LoadingView();
        App.UI.open(this.view, '');
    };
    LoadingControl.hide = function () {
        App.UI.close(this.view);
    };
    LoadingControl.setProgress = function (value) {
        this.view.setProgress(value);
    };
    return LoadingControl;
}());
//# sourceMappingURL=LoadingControl.js.map