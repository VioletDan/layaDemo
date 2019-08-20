class LoadingControl{

    private static view:LoadingView;

    public static show():void{
        this.view = new LoadingView();
        App.UI.open(this.view, '');
    }

    public static hide():void{
        App.UI.close(this.view);
    }

    public static setProgress(value:number):void{
        this.view.setProgress(value);
    }

}