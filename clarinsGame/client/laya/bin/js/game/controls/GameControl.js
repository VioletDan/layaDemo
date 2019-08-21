var GameControl = /** @class */ (function () {
    function GameControl() {
    }
    /**
     * 显示
     */
    GameControl.show = function () {
        this.view = new GameView();
        App.UI.open(this.view);
    };
    /**
     * 隐藏
     */
    GameControl.hide = function () {
        if (this.view) {
            App.UI.close(this.view);
            this.view = null;
        }
    };
    /**
     * 设置数据 这里可以自己给view定义public方法然后去添加数据
     */
    GameControl.setData = function (data) {
        if (this.view) {
            this.view.setData(data);
        }
    };
    return GameControl;
}());
//# sourceMappingURL=GameControl.js.map