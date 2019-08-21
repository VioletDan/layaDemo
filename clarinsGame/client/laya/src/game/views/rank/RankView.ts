class RankView extends App.BaseView {

    private ui: ui.views.RankUI;

    constructor() {
        super('RankView');
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
        this.ui = new ui.views.RankUI();
        this.regUI(this.ui);
        this.addChild(this.ui);
        this.ui.rankList.renderHandler = new Laya.Handler(this, this.updateItem);
        this.ui.rankList.vScrollBarSkin = ""; // 使用但隐藏滚动条
        //list赋值，先获得一个数据源数组
        var arr = [];
        for (var i = 0; i < 10; i++) {
            arr.push({ label: "item " + i, rank: i + 1, score: `${(i + 1)}s` });
        }
        //给list赋值更改list的显示
        this.ui.rankList.array = arr;

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
        console.log('setData:', data);
    }

    //==================== Private ====================

    //事件监听
    private addEvent(): void {
        this.ui.btnPlay.on(Laya.Event.CLICK, this, this.clickHandler);
    }
    //事件移除
    private removeEvent(): void {
        this.ui.btnPlay.off(Laya.Event.CLICK, this, this.clickHandler);
    }

    //==================== Event ====================
    private clickHandler(): void {
        HomeControl.show();
    }

    private updateItem(cell: Laya.Box, index: any): void {
        console.log(cell, index)
        let data: any = cell.dataSource;
        let nameTF: Laya.Label = cell.getChildByName('nameTF') as Laya.Label; //昵称
        let scoreTF: Laya.Label = cell.getChildByName('scoreTF') as Laya.Label;//分数
        let r1: Laya.Image = cell.getChildByName('r1') as Laya.Image;
        let r2: Laya.Image = cell.getChildByName('r2') as Laya.Image;
        let r3: Laya.Image = cell.getChildByName('r3') as Laya.Image;
        let rank: Laya.Clip = cell.getChildByName('rank') as Laya.Clip;
        let rank2: Laya.Clip = cell.getChildByName('rank2') as Laya.Clip;
        r1.visible = r2.visible = r3.visible = rank.visible =rank2.visible = false;
        nameTF.changeText(data.label);
        scoreTF.changeText(data.score)
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
                rank.visible = true
                rank2.visible = true
            default:
                rank.visible = true
                break;
        }
    }
}