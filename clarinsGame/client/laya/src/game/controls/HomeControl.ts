class HomeControl{

    private static view:HomeView;

    public static show():void{
        this.view = new HomeView();
        App.UI.open(this.view);
    }

    public static hide():void{
        App.UI.close(this.view);
    }


    public static update():void{
        this.view.update();
    }

}