class LoadingView extends App.BaseView{

    private ui:ui.views.LoadingUI;

    constructor(){
        super();
    }
    
    //页面准备好了
    public onReady():void{
        this.ui = new ui.views.LoadingUI();
        this.addChild(this.ui);
    }

    public onClose():void{

    }

    public setProgress(value:number):void{
        console.log(value);
    }
}