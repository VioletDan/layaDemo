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
var RankView = /** @class */ (function (_super) {
    __extends(RankView, _super);
    function RankView() {
        return _super.call(this, 'RankView') || this;
    }
    Object.defineProperty(RankView.prototype, "resource", {
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
    RankView.prototype.onReady = function () {
        //初始化UI
        this.ui = new ui.views.RankUI();
        this.regUI(this.ui);
        this.addChild(this.ui);
        //list赋值，先获得一个数据源数组
        var arr = [];
        for (var i = 0; i < 100; i++) {
            arr.push({ label: "item " + i, clip: i % 9 });
        }
        //给list赋值更改list的显示
        this.ui.list.array = arr;
        this.addEvent();
    };
    //页面关闭 
    RankView.prototype.onClose = function () {
        //在这里清除定时器等
        //移除事件
        this.removeEvent();
    };
    /**
     * 页面打开传入数据
     * @param data 携带的数据
     */
    RankView.prototype.setData = function (data) {
        console.log('setData:', data);
    };
    //==================== Private ====================
    //事件监听
    RankView.prototype.addEvent = function () {
        this.ui.btnIndex.on(Laya.Event.CLICK, this, this.clickHandler);
    };
    //事件移除
    RankView.prototype.removeEvent = function () {
        this.ui.btnIndex.off(Laya.Event.CLICK, this, this.clickHandler);
    };
    //==================== Event ====================
    RankView.prototype.clickHandler = function () {
        HomeControl.show();
    };
    return RankView;
}(App.BaseView));
//# sourceMappingURL=RankView.js.map