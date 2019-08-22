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
var GameLevelBoxView = /** @class */ (function (_super) {
    __extends(GameLevelBoxView, _super);
    function GameLevelBoxView() {
        return _super.call(this, 'GameLevelBoxView') || this;
    }
    Object.defineProperty(GameLevelBoxView.prototype, "resource", {
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
    GameLevelBoxView.prototype.onReady = function () {
        //初始化UI
        this.ui = new ui.views.GameLevelBoxUI();
        //注册UI兼容调整
        this.regUI(this.ui);
        this.addChild(this.ui);
        //添加事件
        this.addEvent();
    };
    //页面关闭 
    GameLevelBoxView.prototype.onClose = function () {
        //在这里清除定时器等
        //移除事件
        this.removeEvent();
    };
    /**
     * 页面打开传入数据
     * @param data 携带的数据
     */
    GameLevelBoxView.prototype.setData = function (data) {
    };
    //==================== Private ====================
    //事件监听
    GameLevelBoxView.prototype.addEvent = function () {
    };
    //事件移除
    GameLevelBoxView.prototype.removeEvent = function () {
    };
    return GameLevelBoxView;
}(App.BaseView));
//# sourceMappingURL=GameLevelBoxView.js.map