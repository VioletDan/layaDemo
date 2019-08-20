class HomeView extends App.BaseView {

    private ui: ui.views.HomeUI;

    constructor() {
        super('HomeView');
    }


    //==================== Public ====================

    //页面准备好了
    public onReady(): void {
        //初始化UI
        this.ui = new ui.views.HomeUI();
        this.regUI(this.ui);
        this.addChild(this.ui);


        //头像赋值
        // this.ui.headImage.skin = GameConfig.userInfo.HeadImage;
        // //昵称赋值
        // this.ui.nickName.text = GameConfig.userInfo.NickName;
        this.parseData();
        
        this.addEvent();
    }

    //页面关闭 
    public onClose(): void {
        //在这里清除定时器等
        this.removeEvent();
    }

    public update():void{
        this.parseData();
    }

    //==================== Private ====================
    private parseData(){
        // this.ui.scroeTxt.text = GameData.score + "";
        // //实例化导出的UI类
        // var efc:ui.EffectAnimationDemoUI = new ui.EffectAnimationDemoUI();
        // //添加到舞台
        // Laya.stage.addChild(efc);
    }

    private addEvent(): void {
        this.ui.on(Laya.Event.CLICK, this, this.clickHandler);
        this.ui.gameTpsBtn.on(Laya.Event.CLICK, this, this.showGameTipsModal)
    }
    private removeEvent(): void {
        this.ui.off(Laya.Event.CLICK, this, this.clickHandler);
        this.ui.gameTpsBtn.off(Laya.Event.CLICK, this, this.showGameTipsModal)        
    }

    //    功能展示

    private showLoading(): void {
        App.Loading.show();
        setTimeout(() => {
            App.Loading.hide();
        }, 1000);
    }
    private showModal(title: string = '提示', content: string = '内容', showCancel: boolean = true, confirmText: string = '确定', cancelText: string = '取消', complete: Function = null): void {
        App.Modal.show({
            title: title,
            content: content,
            confirmText: confirmText,
            cancelText: cancelText,
            showCancel: showCancel,
            complete: (res) => {
                App.Modal.show({
                    title: '提示',
                    content: '你点击了' + res,
                    showCancel: false
                })
            },
        });
    }
     // 显示游戏规则弹窗
     private showGameTipsModal(): void {
        //  console.log(22)
        // let dialog: Dialog = new Dialog();
        // dialog.show();
     }

    //==================== Event ====================

    private clickHandler(e: Laya.Event): void {
        switch (e.target.name) {
            case 'btnLoading':
                this.showLoading();
                break;
            case 'btnModal1':
                this.showModal();
                break;
            case 'btnModal2':
                this.showModal('提示', '我没有取消按钮', false);
                break;
            case 'btnModal3':
                this.showModal('提示', '按钮文字自定义', true, 'yes', 'no');
                break;
            case 'btnModal4':
                RankControl.show({abc:1});
                break;
            case 'btnModal5':
                DandanControl.show();
                break;
            default:
                break;
        }
    }
}