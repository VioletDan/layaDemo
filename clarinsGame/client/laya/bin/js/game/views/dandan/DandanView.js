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
        var _this = _super.call(this, 'DandanView') || this;
        _this.scaleDelta = 0;
        _this.dandan = '';
        return _this;
    }
    //==================== Public ====================
    DandanView.prototype.say = function (value) {
        console.log(this.dandan + value);
    };
    Object.defineProperty(DandanView.prototype, "resource", {
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
        this.init();
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
    };
    //事件移除
    DandanView.prototype.removeEvent = function () {
    };
    //==================== Event ====================
    DandanView.prototype.init = function () {
        this.createApe();
        this.drawPentagram();
    };
    DandanView.prototype.drawPentagram = function () {
        var path = [];
        // path.push(-70,0)
        // path.push(-35,0)
        // path.push(0,70)
        // path.push(35,0)
        // path.push(70,0)
        // path.push(35,-35)
        // path.push(35,-105)
        // path.push(0,-70)
        // path.push(-35,-105)
        // path.push(-35,-35)
        path.push(0, -130);
        path.push(33, -33);
        path.push(137, -30);
        path.push(55, 32);
        path.push(85, 130);
        path.push(0, 73);
        path.push(-85, 130);
        path.push(-55, 32);
        path.push(-137, -30);
        path.push(-33, -33);
        this.ui.pentagram.graphics.drawPoly(0, 0, path, "#FF7F50");
    };
    DandanView.prototype.createApe = function () {
        var img = new Laya.Image();
        img.skin = 'dandan/avatar.jpg';
        this.ui.ape.addChild(img);
        this.ui.ape.x = Laya.stage.width / 2;
        this.ui.ape.y = Laya.stage.height / 2;
        Laya.timer.frameLoop(1, this, this.animate);
    };
    DandanView.prototype.animate = function () {
        this.ui.ape.rotation += 2;
        //心跳缩放
        this.scaleDelta += 0.02;
        var scaleValue = Math.sin(this.scaleDelta);
        this.ui.ape.scale(scaleValue, scaleValue);
    };
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