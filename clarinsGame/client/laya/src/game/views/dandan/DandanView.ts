class DandanView extends App.BaseView {

    private ui: ui.views.DandanUI;

    constructor() {
        super('DandanView');
    }


    //==================== Public ====================
	/**
     * 获取要加载的素材 没有就不管 有就添加
     */
    public get resource():Array<any>{
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
        this.ui.btn.on(Laya.Event.CLICK, this, this.btnClick);
    }
    //事件移除
    private removeEvent(): void {
        this.ui.btn.off(Laya.Event.CLICK, this, this.btnClick);
    }
	
    //==================== Event ====================
    private btnClick(e:Laya.Event):void{
        GameData.score = 10;
        //关闭自己
        DandanControl.hide();
        //提示其他需要更新数据的页面更新
        HomeControl.update();
    }
}