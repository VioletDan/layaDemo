var DandanControl = /** @class */ (function () {
    function DandanControl() {
    }
    /**
     * 显示
     */
    DandanControl.show = function () {
        this.view = new DandanView();
        App.UI.open(this.view, 'rightIn', false);
    };
    /**
     * 隐藏
     */
    DandanControl.hide = function () {
        if (this.view) {
            App.UI.close(this.view);
            this.view = null;
        }
    };
    /**
     * 设置数据 这里可以自己给view定义public方法然后去添加数据
     */
    DandanControl.setData = function (data) {
        if (this.view) {
            this.view.setData(data);
        }
    };
    return DandanControl;
}());
//# sourceMappingURL=DandanControl.js.map