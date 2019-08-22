var GameTipBoxControl = /** @class */ (function () {
    function GameTipBoxControl() {
    }
    /**
     * 显示
     */
    GameTipBoxControl.show = function () {
        this.view = new GameTipBoxView();
        App.UI.open(this.view);
    };
    /**
     * 隐藏
     */
    GameTipBoxControl.hide = function () {
        if (this.view) {
            App.UI.close(this.view);
            this.view = null;
        }
    };
    /**
     * 设置数据 这里可以自己给view定义public方法然后去添加数据
     */
    GameTipBoxControl.setData = function (data) {
        if (this.view) {
            this.view.setData(data);
        }
    };
    return GameTipBoxControl;
}());
//# sourceMappingURL=GameTipBoxControl.js.map