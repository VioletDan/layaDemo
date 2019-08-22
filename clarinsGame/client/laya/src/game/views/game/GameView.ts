class GameView extends App.BaseView {

    private ui: ui.views.GameUI;
    private countText: any = 120;//倒计时
    private terminalXInter: any = 5; //猪猪移动的距离缓动
    private terminalX: any; //猪猪移动距离x坐标
    private terminalFlag: boolean = true;// 猪猪移动开关
    private terminalDirection: any = 1; //猪猪移动的方向
    private windowW: any;
    private windowH: any;
    //-------------------------------生成果实
    private objFood: any; //果实对象
    private curTime: number = 0;
    private createTime: number = 1000;

    //-------------------------------小人移动
    private dragRegion: Laya.Rectangle;

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
    private allLevel: number = 3
    private currentLevel: number = 1 //当前关卡
    private arr: any[][] = [null, [1, 2, 6], [3, 4, 5, 6], [1, 4, 3, 6]]

    private randomNum: number = 6
    private objBowl: Laya.Image;//碗的宽高
    private collisionsNum: number = 0;//每关需要碰撞的次数

    //------------------------------------游戏是否结束
    private isGameEnd: boolean = false

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

    // init游戏开始的函数---倒计时/关卡提示等
    private gameInit(): void {
        this.objFood = this.ui.objFood
        this.objBowl = this.ui.Qplayer.getChildByName('objBowl') as Laya.Image
        //执行弹窗提示后再开始运行游戏
        setTimeout(() => {
            GameLevelBoxControl.hide()
            this.gameStart()
        }, 3000);
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
        this.ui.currentObjFood.destroyChildren() //清除碗里的东西
        this.ui.itemBox.destroyChildren() //清除掉的果实
        if (this.currentLevel === 2) this.randomNum = 7
        if (this.currentLevel === 3) this.isGameEnd = true
        this.gameCountdown()
        this.gamePigMove()
        this.gamePlayerMove()
    }
    // 游戏暂停
    private gamePause(): void {
        console.log('游戏暂停,哈哈哈')
    }
    // 游戏结束
    private gameEnded(): void {
        console.log('游戏结束,哈哈哈')
        this.showModal(`游戏结束啦`, `我要跳链接了`)
        this.isGameEnd = true
        this.removeGameEvent()
    }
    //游戏重新开始
    private gameResume(): void {
        console.log('游戏重新开始,哈哈哈')
    }
    private gameLevel(): void {
        console.log('本关通过,哈哈哈')
        this.ui.progressBar.value = 0.33 * this.currentLevel
        this.showModal(`第${this.currentLevel}关通过啦`)
        this.currentLevel++
        this.removeGameEvent()
    }
    // 清除事件处理
    private removeGameEvent(): void {
        Laya.timer.clear(this, this.animateTime)
        Laya.timer.clear(this, this.animatePigMove)
        this.ui.Qplayer.off(Laya.Event.MOUSE_DOWN, this, this.onStartDrag)
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
        this.collisionHandler();
        //  Laya.timer.clear(this,this.animatePigMove)

    }
    // 产生果实
    private createItem(): void {
        // if (this.ui.itemBox.numChildren > 0) return;
        let item: Laya.Image = new Laya.Image();
        let skinIndex: number = Math.floor(Math.random() * this.randomNum) + 1;
        item.skin = 'game/pro' + skinIndex + '.png';
        item.anchorX = 0.5;
        item.anchorY = 0.5;
        item.scale(0.5, 0.5);
        item.pos(this.ui.movePig.x, this.ui.movePig.y);
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
        this.getQplayer()
    }

    //获取小人
    private getQplayer(): void {
        this.ui.Qplayer.on(Laya.Event.MOUSE_DOWN, this, this.onStartDrag)

    }
    private showDragRegion(): void {
        //拖动限制区域
        var dragWidthLimit: number = 750;
        var dragHeightLimit: number = this.ui.Qplayer.height;
        this.dragRegion = new Laya.Rectangle(this.ui.Qplayer.width / 2, this.ui.Qplayer.y, dragWidthLimit - this.ui.Qplayer.width, 0);
    }

    /**按下事件处理*/
    private onStartDrag(e: Event): void {
        //鼠标按下开始拖拽(设置了拖动区域和超界弹回的滑动效果)
        this.ui.Qplayer.startDrag(this.dragRegion, false, 0);
    }

    // 碰撞检测
    private collisionHandler(): void {
        let i: number = 0;
        let len: number = this.ui.itemBox.numChildren;
        for (i = 0; i < len; i++) {
            let img: Laya.Image = this.ui.itemBox.getChildAt(i) as Laya.Image;
            let source: Object = { x: img.x, y: img.y, width: img.width, height: img.height }
            let target: Object = { x: this.objBowl.x + this.ui.Qplayer.x, y: this.objBowl.y + this.ui.Qplayer.y, width: this.objBowl.width, height: this.objBowl.height }
            if (this.hitTest(source, target)) {
                if (this.hitTestCurrentFood(img)) {
                    console.log('碰撞啦')
                    img.alpha = 0;
                    img.removeSelf();
                    this.getFoodToBowl(img)
                    break;
                } else if (Number(img.skin.split('.')[0].split('/pro')[1]) === 10) {
                    this.gameEnded()
                }
            }
        }
    }
    // 将果实放到碗里
    private getFoodToBowl(img): void {
        let item: Laya.Image = new Laya.Image();
        item.skin = img.skin;
        item.scale(0.5, 0.5);
        item.alpha = 0;
        item.rotation = Math.floor(Math.random() * 2) * (Math.random() < 0.5 ? -1 : 1)
        this.ui.currentObjFood.addChild(item)
        this.checkFoodToBowl(item)
    }
    //检查果实的位置,摆放好
    private checkFoodToBowl(item): void {
        let i: number = 0;
        let len: number = this.ui.currentObjFood.numChildren;
        let m: number = 0;
        for (i = 0; i < len; i++) {
            let img: Laya.Image = this.ui.currentObjFood.getChildAt(i) as Laya.Image;
            img.alpha = 1;
            img.pos(m, 0);
            m += img.width * 0.25;
        }
        if (this.ui.currentObjFood.numChildren === this.arr[this.currentLevel].length) {
            this.gameLevel()
            return
        }
    }
    // 测试2个矩形区域是否重合
    private hitTest(source, target): boolean {
        if (source && target) {
            let pos1 = [source.x + source.width * 0.5, source.y + source.height * 0.5];
            let pos2 = [target.x + target.width * 0.5, target.y + target.height * 0.5];
            let disX = Math.abs(pos2[0] - pos1[0]);
            let disY = Math.abs(pos2[1] - pos1[1]);
            let disXMin = (source.width + target.width) * 0.5;
            let disYMin = (source.height + target.height) * 0.5;
            if (disX <= disXMin && disY <= disYMin) return true;
            else return false;
        } //end if
        else return false;
    }

    // 测试碰撞的果实属于那个关卡,如果不是当前关卡,就会直接掉落,否则会放到盘子里
    private hitTestCurrentFood(img): boolean {
        let _skinIndex: number = Number(img.skin.split('.')[0].split('/pro')[1])
        let _currentItem: number[] = this.arr[this.currentLevel]
        // console.log(_currentItem)
        // console.log(_skinIndex)
        // console.log(_currentItem.indexOf(_skinIndex))
        if (_currentItem.indexOf(_skinIndex) === -1) {
            return false
        } else {
            return true
        }
    }
    private showModal(title: string = '提示', content: string = '通过', showCancel: boolean = false, confirmText: string = '确定', cancelText: string = '取消', complete: Function = null): void {
        App.Modal.show({
            title: title,
            content: content,
            confirmText: confirmText,
            cancelText: cancelText,
            showCancel: showCancel,
            complete: (res) => {
                if (this.isGameEnd) {
                    window.location.href = 'http://ldc.layabox.com/'
                } else {
                    this.gameStart()
                }
            },
        });
    }
    //==================== Event ====================
}