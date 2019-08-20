class RankView extends App.BaseView {

    private ui: ui.views.RankUI;

    constructor() {
        super('RankView');
    }


    //==================== Public ====================
	/**
     * 获取要加载的素材 没有就不管 有就添加
     */
    public get resource():Array<any>{
        return [];
    }

    //页面准备好了
    public onReady(): void {
        //初始化UI
        this.ui = new ui.views.RankUI();
        this.regUI(this.ui);
        this.addChild(this.ui);

        //list赋值，先获得一个数据源数组
		var arr = [];
		for (var i = 0; i < 100; i++) {
			arr.push({label: "item " + i, clip: i % 9});
		}
		//给list赋值更改list的显示
		this.ui.list.array = arr;

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
        console.log('setData:',data);
    }

    //==================== Private ====================

    //事件监听
    private addEvent(): void {
        this.ui.btnIndex.on(Laya.Event.CLICK, this, this.clickHandler);
    }
    //事件移除
    private removeEvent(): void {
        this.ui.btnIndex.off(Laya.Event.CLICK, this, this.clickHandler);
    }
	
    //==================== Event ====================
    private clickHandler():void{
        HomeControl.show();
    }
}