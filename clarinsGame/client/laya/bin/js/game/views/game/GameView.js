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
        _this.createTime = 1000;
        //--------------------------------碰撞
        //---------------------------------第二关是否显示坏坏猪猪
        //----------------------------------关卡
        /**
         * l1:pro1 pro 2 pro3
         * l2:pro4 pro5
         * l3:pro6 pro7 pro8
         * 奶酪加4s
         * 第二关碰到坏坏的猪猪就会直接死亡
         */
        _this.allLevel = 3;
        _this.currentLevel = 1; //当前关卡
        _this.arr = [null, [1, 2, 6], [3, 4, 5, 6], [1, 4, 3, 6]];
        _this.randomNum = 6;
        _this.collisionsNum = 0; //每关需要碰撞的次数
        //------------------------------------游戏是否结束
        _this.isGameEnd = false;
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
    // init游戏开始的函数---倒计时/关卡提示等
    GameView.prototype.gameInit = function () {
        var _this = this;
        this.objFood = this.ui.objFood;
        this.objBowl = this.ui.Qplayer.getChildByName('objBowl');
        //执行弹窗提示后再开始运行游戏
        setTimeout(function () {
            GameLevelBoxControl.hide();
            _this.gameStart();
        }, 3000);
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
        this.ui.currentObjFood.destroyChildren(); //清除碗里的东西
        this.ui.itemBox.destroyChildren(); //清除掉的果实
        if (this.currentLevel === 2)
            this.randomNum = 7;
        if (this.currentLevel === 3)
            this.isGameEnd = true;
        this.gameCountdown();
        this.gamePigMove();
        this.gamePlayerMove();
    };
    // 游戏暂停
    GameView.prototype.gamePause = function () {
        console.log('游戏暂停,哈哈哈');
    };
    // 游戏结束
    GameView.prototype.gameEnded = function () {
        console.log('游戏结束,哈哈哈');
        this.showModal("\u6E38\u620F\u7ED3\u675F\u5566", "\u6211\u8981\u8DF3\u94FE\u63A5\u4E86");
        this.isGameEnd = true;
        this.removeGameEvent();
    };
    //游戏重新开始
    GameView.prototype.gameResume = function () {
        console.log('游戏重新开始,哈哈哈');
    };
    GameView.prototype.gameLevel = function () {
        console.log('本关通过,哈哈哈');
        this.ui.progressBar.value = 0.33 * this.currentLevel;
        this.showModal("\u7B2C" + this.currentLevel + "\u5173\u901A\u8FC7\u5566");
        this.currentLevel++;
        this.removeGameEvent();
    };
    // 清除事件处理
    GameView.prototype.removeGameEvent = function () {
        Laya.timer.clear(this, this.animateTime);
        Laya.timer.clear(this, this.animatePigMove);
        this.ui.Qplayer.off(Laya.Event.MOUSE_DOWN, this, this.onStartDrag);
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
        this.collisionHandler();
        //  Laya.timer.clear(this,this.animatePigMove)
    };
    // 产生果实
    GameView.prototype.createItem = function () {
        // if (this.ui.itemBox.numChildren > 0) return;
        var item = new Laya.Image();
        var skinIndex = Math.floor(Math.random() * this.randomNum) + 1;
        item.skin = 'game/pro' + skinIndex + '.png';
        item.anchorX = 0.5;
        item.anchorY = 0.5;
        item.scale(0.5, 0.5);
        item.pos(this.ui.movePig.x, this.ui.movePig.y);
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
        this.getQplayer();
    };
    //获取小人
    GameView.prototype.getQplayer = function () {
        this.ui.Qplayer.on(Laya.Event.MOUSE_DOWN, this, this.onStartDrag);
    };
    GameView.prototype.showDragRegion = function () {
        //拖动限制区域
        var dragWidthLimit = 750;
        var dragHeightLimit = this.ui.Qplayer.height;
        this.dragRegion = new Laya.Rectangle(this.ui.Qplayer.width / 2, this.ui.Qplayer.y, dragWidthLimit - this.ui.Qplayer.width, 0);
    };
    /**按下事件处理*/
    GameView.prototype.onStartDrag = function (e) {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        this.ui.Qplayer.startDrag(this.dragRegion, false, 0);
    };
    // 碰撞检测
    GameView.prototype.collisionHandler = function () {
        var i = 0;
        var len = this.ui.itemBox.numChildren;
        for (i = 0; i < len; i++) {
            var img = this.ui.itemBox.getChildAt(i);
            var source = { x: img.x, y: img.y, width: img.width, height: img.height };
            var target = { x: this.objBowl.x + this.ui.Qplayer.x, y: this.objBowl.y + this.ui.Qplayer.y, width: this.objBowl.width, height: this.objBowl.height };
            if (this.hitTest(source, target)) {
                if (this.hitTestCurrentFood(img)) {
                    console.log('碰撞啦');
                    img.alpha = 0;
                    img.removeSelf();
                    this.getFoodToBowl(img);
                    break;
                }
                else if (Number(img.skin.split('.')[0].split('/pro')[1]) === 10) {
                    this.gameEnded();
                }
            }
        }
    };
    // 将果实放到碗里
    GameView.prototype.getFoodToBowl = function (img) {
        var item = new Laya.Image();
        item.skin = img.skin;
        item.scale(0.5, 0.5);
        item.alpha = 0;
        item.rotation = Math.floor(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1);
        this.ui.currentObjFood.addChild(item);
        this.checkFoodToBowl(item);
    };
    //检查果实的位置,摆放好
    GameView.prototype.checkFoodToBowl = function (item) {
        var i = 0;
        var len = this.ui.currentObjFood.numChildren;
        var m = 0;
        for (i = 0; i < len; i++) {
            var img = this.ui.currentObjFood.getChildAt(i);
            img.alpha = 1;
            img.pos(m, 0);
            m += img.width * 0.25;
        }
        if (this.ui.currentObjFood.numChildren === this.arr[this.currentLevel].length) {
            this.gameLevel();
            return;
        }
    };
    // 测试2个矩形区域是否重合
    GameView.prototype.hitTest = function (source, target) {
        if (source && target) {
            var pos1 = [source.x + source.width * 0.5, source.y + source.height * 0.5];
            var pos2 = [target.x + target.width * 0.5, target.y + target.height * 0.5];
            var disX = Math.abs(pos2[0] - pos1[0]);
            var disY = Math.abs(pos2[1] - pos1[1]);
            var disXMin = (source.width + target.width) * 0.5;
            var disYMin = (source.height + target.height) * 0.5;
            if (disX <= disXMin && disY <= disYMin)
                return true;
            else
                return false;
        } //end if
        else
            return false;
    };
    // 测试碰撞的果实属于那个关卡,如果不是当前关卡,就会直接掉落,否则会放到盘子里
    GameView.prototype.hitTestCurrentFood = function (img) {
        var _skinIndex = Number(img.skin.split('.')[0].split('/pro')[1]);
        var _currentItem = this.arr[this.currentLevel];
        // console.log(_currentItem)
        // console.log(_skinIndex)
        // console.log(_currentItem.indexOf(_skinIndex))
        if (_currentItem.indexOf(_skinIndex) === -1) {
            return false;
        }
        else {
            return true;
        }
    };
    GameView.prototype.showModal = function (title, content, showCancel, confirmText, cancelText, complete) {
        var _this = this;
        if (title === void 0) { title = '提示'; }
        if (content === void 0) { content = '通过'; }
        if (showCancel === void 0) { showCancel = false; }
        if (confirmText === void 0) { confirmText = '确定'; }
        if (cancelText === void 0) { cancelText = '取消'; }
        if (complete === void 0) { complete = null; }
        App.Modal.show({
            title: title,
            content: content,
            confirmText: confirmText,
            cancelText: cancelText,
            showCancel: showCancel,
            complete: function (res) {
                if (_this.isGameEnd) {
                    window.location.href = 'http://ldc.layabox.com/';
                }
                else {
                    _this.gameStart();
                }
            },
        });
    };
    return GameView;
}(App.BaseView));
//# sourceMappingURL=GameView.js.map