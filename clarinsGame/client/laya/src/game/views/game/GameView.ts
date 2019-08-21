class GameView extends App.BaseView {

    private ui: ui.views.GameUI;
    private countText: any = 120;//倒计时
    private terminalXInter: any = 5; //猪猪移动的距离缓动
    private terminalX: any; //猪猪移动距离x坐标
    private terminalFlag: boolean = true;// 猪猪移动开关
    private terminalDirection: any = 1; //猪猪移动的方向
    private windowW: any;
    private windowH: any;
    //生成果实
    private objFood: any; //果实对象
    private curTime: number = 0;
    private createTime: number = 2000;

    //小人移动
    private dragRegion: Laya.Rectangle;

    constructor() {
        super('GameView');
    }


    //==================== Public ====================
	/**
     * 获取要加载的素材 没有就不管 有就添加
     */
    public get resource(): Array<any> {
        return [];
    }

    //页面准备好了
    public onReady(): void {
        //初始化UI
        this.ui = new ui.views.GameUI();
        this.windowW = this.ui.width
        this.windowH = this.ui.height
        //注册UI兼容调整
        this.regUI(this.ui);
        this.addChild(this.ui);
        //init
        this.gameInit()
        //添加事件
        this.addEvent();
    }

    //页面关闭 
    public onClose(): void {
        //在这里清除定时器等
        //移除事件
        this.removeEvent();
    }

    /**
     * 页面打开传入数据
     * @param data 携带的数据
     */
    public setData(data: any): void {

    }

    //==================== Private ====================

    //事件监听
    private addEvent(): void {

    }
    //事件移除
    private removeEvent(): void {

    }

    // 游戏开始的函数---倒计时/关卡提示等
    private gameInit(): void {
        this.objFood = this.ui.objFood
        this.gameCountdown()
        this.gamePigMove()
        this.gamePlayerMove()
    }
    // 游戏倒计时
    private gameCountdown(): void {
        this.ui.timeNum.changeText(`${this.countText}s`)
        this.countText = Number(this.ui.timeNum.text.split('s')[0])
        Laya.timer.loop(1000, this, this.animateTime)
    }
    // 时间--
    private animateTime(): void {
        this.countText = this.countText - 1
        if (this.countText <= 0) {
            this.countText = 0
            Laya.timer.clear(this, this.animateTime)
            this.gameEnded()
        }
        this.ui.timeNum.changeText(`${this.countText}s`)

    }
    // 游戏关卡提示
    private gameTips(): void {
        console.log('游戏关卡提示,哈哈哈')
    }
    // 游戏开始
    private gameStart(): void {
        console.log('游戏开始,哈哈哈')
    }
    // 游戏暂停
    private gamePause(): void {
        console.log('游戏暂停,哈哈哈')
    }
    // 游戏结束
    private gameEnded(): void {
        console.log('游戏结束,哈哈哈')
    }
    //游戏重新开始
    private gameResume(): void {
        console.log('游戏重新开始,哈哈哈')
    }

    //游戏猪猪移动
    private gamePigMove(): void {
        console.log('猪猪移动')
        Laya.timer.loop(1, this, this.animatePigMove);
        this.curTime = Date.now();
    }
    // 猪猪循环移动
    private animatePigMove(): void {
        // console.log(this.ui.movePig,this.windowW)
        let movePig = this.ui.movePig
        this.terminalX = movePig.x + (this.terminalXInter * this.terminalDirection)
        if ((movePig.x < (this.windowW - movePig.width)) && this.terminalFlag) {
            this.terminalDirection = 1
        } else {
            if (movePig.x <= 0) {
                this.terminalFlag = true
                this.terminalDirection = 1
            } else {
                this.terminalFlag = false
                this.terminalDirection = -1
            }
        }
        movePig.x = this.terminalX;

        let time: number = Date.now() - this.curTime;
        if (time > this.createTime) {
            this.createItem();
            this.curTime = Date.now();
        }
        this.checkItem();
        //  Laya.timer.clear(this,this.animatePigMove)

    }
    // 产生果实
    private createItem(): void {
        let item: Laya.Image = new Laya.Image();
        let skinIndex: number = Math.floor(Math.random() * 9) + 1;
        item.skin = 'game/pro' + skinIndex + '.png';
        item.scale(0.5, 0.5);
        item.pos(this.ui.movePig.x, this.ui.movePig.y + this.ui.gameContent.y);
        this.ui.itemBox.addChild(item);

    }
    private checkItem(): void {
        let i: number = 0;
        let len: number = this.ui.itemBox.numChildren;
        for (i = 0; i < len; i++) {
            let img: Laya.Image = this.ui.itemBox.getChildAt(i) as Laya.Image;
            if (img.y > Laya.stage.height) {
                img.removeSelf();
                break;
            }
            img.y += 5;
        }
    }
    //游戏盘子移动
    private gamePlayerMove(): void {
        console.log('小人移动')
        this.showDragRegion()
        this.ui.Qplayer.on(Laya.Event.MOUSE_DOWN, this, this.onStartDrag)
    }

    private showDragRegion(): void {
        //拖动限制区域
        var dragWidthLimit: number = this.windowW;
        var dragHeightLimit: number = this.ui.Qplayer.height;
        this.dragRegion = new Laya.Rectangle(0, this.ui.Qplayer.y, dragWidthLimit, dragHeightLimit);
        console.log(this.dragRegion)
    }

    private onStartDrag(e: Event): void {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        this.ui.Qplayer.startDrag(this.dragRegion, false, 100);
    }

    //==================== Event ====================
}