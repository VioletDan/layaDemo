var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TempView = (function (_super) {
    __extends(TempView, _super);
    function TempView() {
        return _super.call(this, 'HomeView') || this;
    }
    //==================== Public ====================
    //页面准备好了
    TempView.prototype.onReady = function () {
        //初始化UI
        this.ui = new ui.views.HomeUI();
        //注册UI兼容调整
        this.regUI(this.ui);
        this.addChild(this.ui);
        //添加事件
        this.addEvent();
    };
    //页面关闭 
    TempView.prototype.onClose = function () {
        //在这里清除定时器等
        //移除事件
        this.removeEvent();
    };
    /**
     * 页面打开传入数据
     * @param data 携带的数据
     */
    TempView.prototype.setData = function (data) {
    };
    //==================== Private ====================
    //事件监听
    TempView.prototype.addEvent = function () {
    };
    //事件移除
    TempView.prototype.removeEvent = function () {
    };
    return TempView;
}(App.BaseView));
//# sourceMappingURL=TempView.js.map