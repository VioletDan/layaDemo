class GameControl{

    //view
    private static view:GameView;

    /**
     * 显示
     */
    public static show():void{
        this.view = new GameView();
        App.UI.open(this.view);
    }

    /**
     * 隐藏
     */
    public static hide():void{
        if(this.view){
            App.UI.close(this.view);
            this.view = null;
        }
    }

    /**
     * 设置数据 这里可以自己给view定义public方法然后去添加数据
     */
    public static setData(data:any):void{
        if(this.view){
            this.view.setData(data);
        }
    }

}