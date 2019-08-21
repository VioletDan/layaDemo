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
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this, 'GameView') || this;
        _this.countText = 120; //倒计时
        _this.terminalXInter = 5; //猪猪移动的距离缓动
        _this.terminalFlag = true; // 猪猪移动开关
        _this.terminalDirection = 1; //猪猪移动的方向
        _this.curTime = 0;
        _this.createTime = 2000;
        return _this;
    }
    Object.defineProperty(GameView.prototype, "resource", {
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
    GameView.prototype.onReady = function () {
        //初始化UI
        this.ui = new ui.views.GameUI();
        this.windowW = this.ui.width;
        this.windowH = this.ui.height;
        //注册UI兼容调整
        this.regUI(this.ui);
        this.addChild(this.ui);
        //init
        this.gameInit();
        //添加事件
        this.addEvent();
    };
    //页面关闭 
    GameView.prototype.onClose = function () {
        //在这里清除定时器等
        //移除事件
        this.removeEvent();
    };
    /**
     * 页面打开传入数据
     * @param data 携带的数据
     */
    GameView.prototype.setData = function (data) {
    };
    //==================== Private ====================
    //事件监听
    GameView.prototype.addEvent = function () {
    };
    //事件移除
    GameView.prototype.removeEvent = function () {
    };
    // 游戏开始的函数---倒计时/关卡提示等
    GameView.prototype.gameInit = function () {
        this.objFood = this.ui.objFood;
        this.gameCountdown();
        this.gamePigMove();
        this.gamePlayerMove();
    };
    // 游戏倒计时
    GameView.prototype.gameCountdown = function () {
        this.ui.timeNum.changeText(this.countText + "s");
        this.countText = Number(this.ui.timeNum.text.split('s')[0]);
        Laya.timer.loop(1000, this, this.animateTime);
    };
    // 时间--
    GameView.prototype.animateTime = function () {
        this.countText = this.countText - 1;
        if (this.countText <= 0) {
            this.countText = 0;
            Laya.timer.clear(this, this.animateTime);
            this.gameEnded();
        }
        this.ui.timeNum.changeText(this.countText + "s");
    };
    // 游戏关卡提示
    GameView.prototype.gameTips = function () {
        console.log('游戏关卡提示,哈哈哈');
    };
    // 游戏开始
    GameView.prototype.gameStart = function () {
        console.log('游戏开始,哈哈哈');
    };
    // 游戏暂停
    GameView.prototype.gamePause = function () {
        console.log('游戏暂停,哈哈哈');
    };
    // 游戏结束
    GameView.prototype.gameEnded = function () {
        console.log('游戏结束,哈哈哈');
    };
    //游戏重新开始
    GameView.prototype.gameResume = function () {
        console.log('游戏重新开始,哈哈哈');
    };
    //游戏猪猪移动
    GameView.prototype.gamePigMove = function () {
        console.log('猪猪移动');
        Laya.timer.loop(1, this, this.animatePigMove);
        this.curTime = Date.now();
    };
    // 猪猪循环移动
    GameView.prototype.animatePigMove = function () {
        // console.log(this.ui.movePig,this.windowW)
        var movePig = this.ui.movePig;
        this.terminalX = movePig.x + (this.terminalXInter * this.terminalDirection);
        if ((movePig.x < (this.windowW - movePig.width)) && this.terminalFlag) {
            this.terminalDirection = 1;
        }
        else {
            if (movePig.x <= 0) {
                this.terminalFlag = true;
                this.terminalDirection = 1;
            }
            else {
                this.terminalFlag = false;
                this.terminalDirection = -1;
            }
        }
        movePig.x = this.terminalX;
        var time = Date.now() - this.curTime;
        if (time > this.createTime) {
            this.createItem();
            this.curTime = Date.now();
        }
        this.checkItem();
        //  Laya.timer.clear(this,this.animatePigMove)
    };
    // 产生果实
    GameView.prototype.createItem = function () {
        var item = new Laya.Image();
        var skinIndex = Math.floor(Math.random() * 9) + 1;
        item.skin = 'game/pro' + skinIndex + '.png';
        item.scale(0.5, 0.5);
        item.pos(this.ui.movePig.x, this.ui.movePig.y + this.ui.gameContent.y);
        this.ui.itemBox.addChild(item);
    };
    GameView.prototype.checkItem = function () {
        var i = 0;
        var len = this.ui.itemBox.numChildren;
        for (i = 0; i < len; i++) {
            var img = this.ui.itemBox.getChildAt(i);
            if (img.y > Laya.stage.height) {
                img.removeSelf();
                break;
            }
            img.y += 5;
        }
    };
    //游戏盘子移动
    GameView.prototype.gamePlayerMove = function () {
        console.log('小人移动');
        this.showDragRegion();
        this.ui.Qplayer.on(Laya.Event.MOUSE_DOWN, this, this.onStartDrag);
    };
    GameView.prototype.showDragRegion = function () {
        //拖动限制区域
        var dragWidthLimit = this.windowW;
        var dragHeightLimit = this.ui.Qplayer.height;
        this.dragRegion = new Laya.Rectangle(0, this.ui.Qplayer.y, dragWidthLimit, dragHeightLimit);
        console.log(this.dragRegion);
        //画出拖动限制区域
        Laya.stage.graphics.drawRect(this.dragRegion.x, this.dragRegion.y, this.dragRegion.width, this.dragRegion.height, null, "#FFFFFF", 2);
    };
    GameView.prototype.onStartDrag = function (e) {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        this.ui.Qplayer.startDrag(this.dragRegion, false, 100);
    };
    return GameView;
}(App.BaseView));
//# sourceMappingURL=GameView.js.map