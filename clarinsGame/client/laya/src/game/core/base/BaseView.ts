module App{
    export class BaseView extends Laya.Sprite{

        private _viewName:string = '';
        private _ui:any;

        constructor(name:string = ''){
            super();
            this._viewName = name;
        }

        /**
         * 获取要加载的素材
         */
        public get resource():Array<any>{
            return [];
        }

        public get viewUI():any{
            return this._ui;
        }

        /**
         * 注册UI 对ui的一些属性计算赋值 解决兼容问题
         * @param ui UI对象
         */
        public regUI(ui:Laya.Sprite):void{
            this._ui = ui;

            if(this._ui instanceof Laya.Dialog){

            }else{
                ui.height = Laya.stage.height;
            }
            

            //计算bg
            let bg:Laya.Sprite = ui.getChildByName('bg') as Laya.Sprite;
            if(bg){
                bg.height = Laya.stage.height;
            }
            //计算居中
            let center:Laya.Sprite = ui.getChildByName('center') as Laya.Sprite;
            if(center){
                center.y = (Laya.stage.height - center.height) / 2;
            }
            //计算居底
            let bottom:Laya.Sprite = ui.getChildByName('bottom') as Laya.Sprite;
            if(bottom){
                bottom.y = Laya.stage.height - bottom.height;
            }
            //计算位置不变 但是高度 超过屏幕 自动缩放
            let main:Laya.Sprite =  ui.getChildByName('main') as Laya.Sprite;
            if(main){
                let offsetY:number = Laya.stage.height - main.y;
                if(main.height > offsetY){
                    let scale:number = offsetY / main.height;
                    main.scale(scale, scale);
                    main.x = (Laya.stage.width - main.width * scale) / 2;
                }
            }
        }
        

        /**
         * 页面准备 子类重写
         */
        public onReady():void{

        }
        /**
         * 页面关闭 子类重写
         */
        public onClose():void{

        }

        /**
         * 页面显示 子类重写（wx小游戏会用到）
         */
        public onShow():void{

        }
        /**
         * 页面隐藏 子类重写（wx小游戏会用到）
         */
        public onHide():void{

        }

        /**
         * 给view发送数据
         * @param data 任何数据对象
         */
        public setData(data:any):void{

        }

        /**
         * 获取当前viewName
         */
        public get viewName():string{
            return this._viewName;
        }
    }
}