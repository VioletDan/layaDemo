var ObjScaleControl = /** @class */ (function () {
    function ObjScaleControl() {
    }
    /**
     * 显示
     */
    ObjScaleControl.show = function () {
        this.view = new ObjScaleView();
        App.UI.open(this.view);
    };
    /**
     * 隐藏
     */
    ObjScaleControl.hide = function () {
        if (this.view) {
            App.UI.close(this.view);
            this.view = null;
        }
    };
    /**
     * 设置数据 这里可以自己给view定义public方法然后去添加数据
     */
    ObjScaleControl.setData = function (data) {
        if (this.view) {
            this.view.setData(data);
        }
    };
    return ObjScaleControl;
}());
//# sourceMappingURL=ObjScaleControl.js.map