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
        this.ui.rankList.renderHandler = new Laya.Handler(this, this.updateItem);
        this.ui.rankList.vScrollBarSkin = ""; // 使用但隐藏滚动条
        //list赋值，先获得一个数据源数组
        var arr = [];
        for (var i = 0; i < 10; i++) {
            arr.push({ label: "item " + i, rank: i + 1, score: (i + 1) + "s" });
        }
        //给list赋值更改list的显示
        this.ui.rankList.array = arr;
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
        this.ui.btnPlay.on(Laya.Event.CLICK, this, this.clickHandler);
    };
    //事件移除
    RankView.prototype.removeEvent = function () {
        this.ui.btnPlay.off(Laya.Event.CLICK, this, this.clickHandler);
    };
    //==================== Event ====================
    RankView.prototype.clickHandler = function () {
        HomeControl.show();
    };
    RankView.prototype.updateItem = function (cell, index) {
        console.log(cell, index);
        var data = cell.dataSource;
        var nameTF = cell.getChildByName('nameTF'); //昵称
        var scoreTF = cell.getChildByName('scoreTF'); //分数
        var r1 = cell.getChildByName('r1');
        var r2 = cell.getChildByName('r2');
        var r3 = cell.getChildByName('r3');
        var rank = cell.getChildByName('rank');
        var rank2 = cell.getChildByName('rank2');
        r1.visible = r2.visible = r3.visible = rank.visible = rank2.visible = false;
        nameTF.changeText(data.label);
        scoreTF.changeText(data.score);
        switch (data.rank) {
            case 1:
                r1.visible = true;
                break;
            case 2:
                r2.visible = true;
                break;
            case 3:
                r3.visible = true;
                break;
            case 10:
                rank.visible = true;
                rank2.visible = true;
            default:
                rank.visible = true;
                break;
        }
    };
    return RankView;
}(App.BaseView));
//# sourceMappingURL=RankView.js.map