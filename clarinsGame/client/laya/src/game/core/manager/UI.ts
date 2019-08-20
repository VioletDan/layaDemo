module App {
    export class UI {

        private static oldView: BaseView;
        private static views:Array<BaseView> = [];

        /**
         * 打开显示页面
         * @param view          BaseView 一个继承BaseView的页面
         * @param openEffect    显示效果 目前只有透明性0-1显示效果 默认 alpha
         * @param closeOther    是否关闭上一个UI 默认 true
         * @param data          UI显示的时候传递的数据 会在onReady之后通过setData传递 默认为null
         */
        public static open(view: BaseView, openEffect: string = 'alpha', closeOther:boolean = true, data:any = null): void {
            this.checkResource(view, ()=>{
                Laya.stage.addChild(view);
                view.onReady();
                if(data)view.setData(data);
                if(view.viewUI instanceof Laya.Dialog){
                    view.viewUI.popup();
                    return;
                }
                this.views.push(view);
                switch (openEffect) {
                    case 'alpha':
                        this.alphaAni(view, ()=>{
                            if(closeOther){
                                this.close(this.oldView);
                                this.oldView = view;
                            }
                        });
                        break;
                    case 'rightIn':
                        this.rightInAni(view, ()=>{
                            if(closeOther){
                                this.close(this.oldView);
                                this.oldView = view;
                            }
                        });
                        break;
                    default:
                        if(closeOther){
                            this.close(this.oldView);
                            this.oldView = view;
                        }
                        break;
                }
            });
            // console.log('cls:', cls.toString().match(/function\s*([^(]*)\(/)[1]);
        }

        /**
         * 关闭一个页面
         * @param view  BaseView 一个继承BaseView的页面 
         */
        public static close(view: BaseView, closeEffect:string = ''): void {
            let index:number = this.views.indexOf(view);
            if(index > -1){
                this.views.splice(index, 1);
            }
            if (view) {
                switch (closeEffect) {
                    case 'rightOut':
                            this.rightOutAni(view, ()=>{
                                this.closeView(view);
                            });
                        break;
                
                    default:
                        this.closeView(view);
                        break;
                }

            }
        }

        public static removeAll():void{
            this.oldView = null;
            while(this.views.length > 0){
                this.close(this.views[0]);
            }
        }

        //检测是否要加载素材
        private static checkResource(view: BaseView, callback:Function):void{
            var resource:Array<any> = view.resource;
            if(resource && resource.length){
                App.Loading.show('资源加载中...');
                console.log('load res group:' + view.viewName);
                Laya.loader.load(resource, Laya.Handler.create(this, ()=>{
                    App.Loading.hide();
                    callback();
                }), null, '', 1, true, view.viewName);
            }else{
                callback();
            }
        }
        private static closeView(view:BaseView):void{
            var resource:Array<any> = view.resource;
            if(view.viewUI instanceof Laya.Dialog){
                view.viewUI.close(null, true);
                view.viewUI.closeHandler = Laya.Handler.create(this, ()=>{
                    if(resource && resource.length){
                        console.log('clear res group:' + view.viewName);
                        Laya.loader.clearResByGroup(view.viewName);  
                        
                        view.onClose();  
                    }
                });
            }else{
                if(resource && resource.length){
                    console.log('clear res group:' + view.viewName);
                    Laya.loader.clearResByGroup(view.viewName);    
                }
                view.onClose();
                view.destroyChildren();
                view.destroy();
                view.removeSelf();
                view = null;
            }
            
            
        }

        private static alphaAni(view:BaseView, callback:Function):void{
            view.alpha = 0;
            Laya.Tween.to(view, { alpha: 1 }, 300, null, Laya.Handler.create(this, callback));
        }
        private static rightInAni(view:BaseView, callback:Function):void{
            view.x = Laya.stage.width;
            Laya.Tween.to(view, { x: 0 }, 300, null, Laya.Handler.create(this, callback));
        }
        private static rightOutAni(view:BaseView, callback:Function):void{
            Laya.Tween.to(view, { x: Laya.stage.width }, 300, null, Laya.Handler.create(this, callback));
        }

    }
}