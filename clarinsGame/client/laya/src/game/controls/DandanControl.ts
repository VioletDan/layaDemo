class DandanControl{

    //view
    private static view:DandanView;

    /**
     * 显示
     */
    public static show():void{
        this.view = new DandanView();
        App.UI.open(this.view, 'rightIn', false);

        let dd1:DandanView = new DandanView();
        // dd1.graphics.drar
        dd1.dandan = '丹丹1号';
        
        let dd2:DandanView = new DandanView();
        dd2.dandan = '丹丹2号';

        let dd3:DandanView = new DandanView();
        dd3.dandan = '丹丹3号';
        
        let dd4:DandanView = new DandanView();
        dd4.dandan = '丹丹4号';

        dd1.say('吃饭了');
        dd2.say('上班了');
        dd3.say('回家了');
        dd4.say('下班了');
        console.log(dd1);

        // DandanView
        // App.Ajax
        // new HomeView();


        // let img:Laya.Image = new Laya.Text();
        // let img = new Text();

        // DandanView.

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