var GameTipsBoxControl = /** @class */ (function () {
    function GameTipsBoxControl() {
    }
    /**
     * 显示
     */
    GameTipsBoxControl.show = function () {
        this.view = new GameTipsBoxView();
        App.UI.open(this.view);
    };
    /**
     * 隐藏
     */
    GameTipsBoxControl.hide = function () {
        if (this.view) {
            App.UI.close(this.view);
            this.view = null;
        }
    };
    /**
     * 设置数据 这里可以自己给view定义public方法然后去添加数据
     */
    GameTipsBoxControl.setData = function (data) {
        if (this.view) {
            this.view.setData(data);
        }
    };
    return GameTipsBoxControl;
}());
//# sourceMappingURL=gameTipsBoxControl.js.map