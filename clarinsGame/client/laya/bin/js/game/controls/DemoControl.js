var DemoControl = /** @class */ (function () {
    function DemoControl() {
    }
    /**
     * 显示
     */
    DemoControl.show = function () {
        this.view = new DemoView();
        App.UI.open(this.view);
    };
    /**
     * 隐藏
     */
    DemoControl.hide = function () {
        if (this.view) {
            App.UI.close(this.view);
            this.view = null;
        }
    };
    /**
     * 设置数据 这里可以自己给view定义public方法然后去添加数据
     */
    DemoControl.setData = function (data) {
        if (this.view) {
            this.view.setData(data);
        }
    };
    return DemoControl;
}());
//# sourceMappingURL=DemoControl.js.map