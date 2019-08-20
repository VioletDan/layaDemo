class RankControl{

    private static view:RankView;

    public static show(data:any):void{
        this.view = new RankView();
        App.UI.open(this.view, 'alpha', true, data);
    }

    public static hide():void{
        App.UI.close(this.view);
        this.view = null;
    }


}