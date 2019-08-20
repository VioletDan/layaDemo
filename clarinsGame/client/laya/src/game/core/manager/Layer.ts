module App{
    export class Layer{

        public static BG:Laya.Sprite;               //背景层
        public static UI:Laya.Sprite;               //UI层
        public static EFFECT:Laya.Sprite;           //特效层

        public static init():void{
            //用一个空容器装着所有UI 如果后期想全屏截图可以用此显示对象
            let root:Laya.Sprite = new Laya.Sprite();

            this.BG = new Laya.Sprite();
            this.UI = new Laya.Sprite();
            this.EFFECT = new Laya.Sprite();

            root.addChild(this.BG);
            root.addChild(this.UI);
            root.addChild(this.EFFECT);

            Laya.stage.addChild(root);
        }

    }
}