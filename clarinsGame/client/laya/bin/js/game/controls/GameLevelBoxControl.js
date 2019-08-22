var GameLevelBoxControl = /** @class */ (function () {
    function GameLevelBoxControl() {
    }
    /**
     * 显示
     */
    GameLevelBoxControl.show = function () {
        this.view = new GameLevelBoxView();
        App.UI.open(this.view);
    };
    /**
     * 隐藏
     */
    GameLevelBoxControl.hide = function () {
        if (this.view) {
            App.UI.close(this.view);
            this.view = null;
        }
    };
    /**
     * 设置数据 这里可以自己给view定义public方法然后去添加数据
     */
    GameLevelBoxControl.setData = function (data) {
        if (this.view) {
            this.view.setData(data);
        }
    };
    return GameLevelBoxControl;
}());
//# sourceMappingURL=GameLevelBoxControl.js.map