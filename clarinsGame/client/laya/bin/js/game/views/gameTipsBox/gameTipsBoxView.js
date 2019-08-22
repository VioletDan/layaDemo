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
var GameTipsBoxView = /** @class */ (function (_super) {
    __extends(GameTipsBoxView, _super);
    function GameTipsBoxView() {
        return _super.call(this, 'GameTipsBoxView') || this;
    }
    Object.defineProperty(GameTipsBoxView.prototype, "resource", {
        //==================== Public ====================
        /**
         * 获取要加载的素材 没有就不管 有就添加
         */
        get: function () {
            return [];
        },
        enumerable: true,
        configurable: true
    });
    //页面准备好了
    GameTipsBoxView.prototype.onReady = function () {
        //初始化UI
        this.ui = new ui.views.GameTipsBoxUI();
        //注册UI兼容调整
        this.regUI(this.ui);
        this.addChild(this.ui);
        //添加事件
        this.addEvent();
    };
    //页面关闭 
    GameTipsBoxView.prototype.onClose = function () {
        //在这里清除定时器等
        //移除事件
        this.removeEvent();
    };
    /**
     * 页面打开传入数据
     * @param data 携带的数据
     */
    GameTipsBoxView.prototype.setData = function (data) {
    };
    //==================== Private ====================
    //事件监听
    GameTipsBoxView.prototype.addEvent = function () {
        this.ui.closeBtn.on(Laya.Event.CLICK, this, this.clickHandler);
    };
    //事件移除
    GameTipsBoxView.prototype.removeEvent = function () {
        this.ui.closeBtn.off(Laya.Event.CLICK, this, this.clickHandler);
    };
    //==================== Event ====================
    //关闭弹窗
    GameTipsBoxView.prototype.clickHandler = function (e) {
        this.ui.close();
    };
    return GameTipsBoxView;
}(App.BaseView));
//# sourceMappingURL=gameTipsBoxView.js.map