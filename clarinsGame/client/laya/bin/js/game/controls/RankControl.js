var RankControl = /** @class */ (function () {
    function RankControl() {
    }
    RankControl.show = function (data) {
        this.view = new RankView();
        App.UI.open(this.view, 'alpha', true, data);
    };
    RankControl.hide = function () {
        App.UI.close(this.view);
        this.view = null;
    };
    return RankControl;
}());
//# sourceMappingURL=RankControl.js.map