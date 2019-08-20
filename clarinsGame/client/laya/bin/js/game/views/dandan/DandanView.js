var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DandanView = /** @class */ (function (_super) {
    __extends(DandanView, _super);
    function DandanView() {
        return _super.call(this, 'DandanView') || this;
    }
    Object.defineProperty(DandanView.prototype, "resource", {
        //==================== Public ====================
        /**
         * 获取要加载的素材 没有就不管 有就添加
         */
        get: function () {
            return [GameConfig.DANDAN];
        },
        enumerable: true,
        configurable: true
    });
    //页面准备好了
    DandanView.prototype.onReady = function () {
        //初始化UI
        this.ui = new ui.views.DandanUI();
        //注册UI兼容调整
        this.regUI(this.ui);
        this.addChild(this.ui);
        //添加事件
        this.addEvent();
    };
    //页面关闭 
    DandanView.prototype.onClose = function () {
        //在这里清除定时器等
        //移除事件
        this.removeEvent();
    };
    /**
     * 页面打开传入数据
     * @param data 携带的数据
     */
    DandanView.prototype.setData = function (data) {
    };
    //==================== Private ====================
    //事件监听
    DandanView.prototype.addEvent = function () {
        this.ui.btn.on(Laya.Event.CLICK, this, this.btnClick);
    };
    //事件移除
    DandanView.prototype.removeEvent = function () {
        this.ui.btn.off(Laya.Event.CLICK, this, this.btnClick);
    };
    //==================== Event ====================
    DandanView.prototype.btnClick = function (e) {
        GameData.score = 10;
        //关闭自己
        DandanControl.hide();
        //提示其他需要更新数据的页面更新
        HomeControl.update();
    };
    return DandanView;
}(App.BaseView));
//# sourceMappingURL=DandanView.js.map