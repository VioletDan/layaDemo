class DandanView extends App.BaseView {

    private ui: ui.views.DandanUI;
    private scaleDelta: number = 0
    public dandan: string = '';

    private maskSp: Laya.Sprite
    private bg2: Laya.Sprite

    constructor() {
        super('DandanView');
    }


    //==================== Public ====================
    public say(value: string): void {
        console.log(this.dandan + value);
    }
	/**
     * 获取要加载的素材 没有就不管 有就添加
     */
    public get resource(): Array<any> {
        return [GameConfig.DANDAN];
    }

    //页面准备好了
    public onReady(): void {
        //初始化UI
        this.ui = new ui.views.DandanUI();
        //注册UI兼容调整
        this.regUI(this.ui);
        this.addChild(this.ui);
        //添加事件
        this.addEvent();
        this.init()
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

    //==================== Event ====================
    private init(): void {
        this.createApe()
        this.drawPentagram()
        this.magnifierSteup()
    }
    private drawPentagram() {
        let path: Array<number> = []
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

        this.ui.pentagram.graphics.drawPoly(0, 0, path, "#FF7F50")
    }
    private createApe(): void {
        let img: Laya.Image = new Laya.Image()
        img.skin = 'dandan/avatar.jpg'
        this.ui.ape.addChild(img)
        this.ui.ape.x = Laya.stage.width / 2
        this.ui.ape.y = Laya.stage.height / 2
        Laya.timer.frameLoop(1, this, this.animate)
    }
    private animate(): void {
        this.ui.ape.rotation += 2
        //心跳缩放
        this.scaleDelta += 0.02
        let scaleValue: number = Math.sin(this.scaleDelta)
        this.ui.ape.scale(scaleValue, scaleValue)
    }
    private btnClick(e: Laya.Event): void {
        GameData.score = 10;
        //关闭自己
        DandanControl.hide();
        //提示其他需要更新数据的页面更新
        HomeControl.update();
    }
    // 放大镜
    private magnifierSteup(): void {
        this.bg2 = this.ui.magnifierBg
        this.maskSp = this.ui.magnifier
        //设置mask
        this.bg2.
    }
}