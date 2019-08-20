
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
import EffectAnimation=laya.display.EffectAnimation;
module ui.common {
    export class LoadingUI extends Dialog {
		public ani1:Laya.FrameAnimation;
		public txt:laya.display.Text;

        public static  uiView:any ={"type":"Dialog","props":{"width":200,"height":200},"child":[{"type":"Sprite","props":{"y":0,"x":0,"alpha":0.8},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":200,"lineWidth":1,"height":200,"fillColor":"#000000"}}]},{"type":"Image","props":{"y":89,"x":100,"skin":"common/loading_icon.png","pivotY":15,"pivotX":15},"compId":4},{"type":"Text","props":{"y":136,"x":0,"width":200,"var":"txt","text":"text","height":24,"fontSize":20,"color":"#ffffff","align":"center"}}],"animations":[{"nodes":[{"target":4,"keyframes":{"x":[{"value":100,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":0},{"value":100,"tweenMethod":"linearNone","tween":true,"target":4,"key":"x","index":30}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":4,"key":"rotation","index":0},{"value":360,"tweenMethod":"linearNone","tween":true,"target":4,"key":"rotation","index":30}]}}],"name":"ani1","id":1,"frameRate":24,"action":2}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.common.LoadingUI.uiView);

        }

    }
}

module ui.common {
    export class ModalUI extends Dialog {
		public content:laya.display.Text;
		public btnOk:Laya.Button;
		public btnCancel:Laya.Button;
		public title:laya.display.Text;

        public static  uiView:any ={"type":"Dialog","props":{"width":500,"height":280},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":500,"lineWidth":1,"height":280,"fillColor":"#fafafc"}},{"type":"Rect","props":{"y":200,"x":0,"width":500,"lineWidth":1,"height":1,"fillColor":"#D5D5D6"}},{"type":"Text","props":{"y":96,"x":30,"wordWrap":true,"width":440,"var":"content","valign":"middle","text":"txttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxttxt","overflow":"hidden","leading":5,"height":76,"fontSize":30,"color":"#888888","align":"center"}},{"type":"Button","props":{"y":203,"x":0,"width":250,"var":"btnOk","name":"yes","labelSize":40,"labelFont":"SimHei","labelColors":"#0BB20C","labelAlign":"center","label":"确认","height":76}},{"type":"Button","props":{"y":203,"x":250,"width":250,"var":"btnCancel","name":"no","labelSize":40,"labelFont":"SimHei","labelColors":"#0BB20C","labelAlign":"center","label":"取消","height":76}},{"type":"Text","props":{"y":26,"x":30,"wordWrap":true,"width":440,"var":"title","valign":"middle","text":"标题","overflow":"hidden","leading":5,"height":54,"fontSize":34,"color":"#000000","align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.common.ModalUI.uiView);

        }

    }
}

module ui.test {
    export class TestPageUI extends View {
		public btn:Laya.Button;
		public clip:Laya.Clip;
		public combobox:Laya.ComboBox;
		public tab:Laya.Tab;
		public list:Laya.List;
		public btn2:Laya.Button;
		public check:Laya.CheckBox;
		public radio:Laya.RadioGroup;
		public box:Laya.Box;

        public static  uiView:any ={"type":"View","child":[{"props":{"x":0,"y":0,"skin":"comp/bg.png","sizeGrid":"30,4,4,4","width":600,"height":400},"type":"Image"},{"props":{"x":41,"y":56,"skin":"comp/button.png","label":"点我赋值","width":150,"height":37,"sizeGrid":"4,4,4,4","var":"btn"},"type":"Button"},{"props":{"x":401,"y":56,"skin":"comp/clip_num.png","clipX":10,"var":"clip"},"type":"Clip"},{"props":{"x":220,"y":143,"skin":"comp/combobox.png","labels":"select1,select2,selecte3","selectedIndex":1,"sizeGrid":"4,20,4,4","width":200,"height":23,"var":"combobox"},"type":"ComboBox"},{"props":{"x":220,"y":96,"skin":"comp/tab.png","labels":"tab1,tab2,tab3","var":"tab"},"type":"Tab"},{"props":{"x":259,"y":223,"skin":"comp/vscroll.png","height":150},"type":"VScrollBar"},{"props":{"x":224,"y":223,"skin":"comp/vslider.png","height":150},"type":"VSlider"},{"type":"List","child":[{"type":"Box","child":[{"props":{"skin":"comp/label.png","text":"this is a list","x":26,"y":5,"width":78,"height":20,"fontSize":14,"name":"label"},"type":"Label"},{"props":{"x":0,"y":2,"skin":"comp/clip_num.png","clipX":10,"name":"clip"},"type":"Clip"}],"props":{"name":"render","x":0,"y":0,"width":112,"height":30}}],"props":{"x":452,"y":68,"width":128,"height":299,"vScrollBarSkin":"comp/vscroll.png","repeatX":1,"var":"list"}},{"props":{"x":563,"y":4,"skin":"comp/btn_close.png","name":"close"},"type":"Button"},{"props":{"x":41,"y":112,"skin":"comp/button.png","label":"点我赋值","width":150,"height":66,"sizeGrid":"4,4,4,4","labelSize":30,"labelBold":true,"var":"btn2"},"type":"Button"},{"props":{"x":220,"y":188,"skin":"comp/checkbox.png","label":"checkBox1","var":"check"},"type":"CheckBox"},{"props":{"x":220,"y":61,"skin":"comp/radiogroup.png","labels":"radio1,radio2,radio3","var":"radio"},"type":"RadioGroup"},{"type":"Panel","child":[{"props":{"skin":"comp/image.png"},"type":"Image"}],"props":{"x":299,"y":223,"width":127,"height":150,"vScrollBarSkin":"comp/vscroll.png"}},{"props":{"x":326,"y":188,"skin":"comp/checkbox.png","label":"checkBox2","labelColors":"#ff0000"},"type":"CheckBox"},{"type":"Box","child":[{"props":{"y":70,"skin":"comp/progress.png","width":150,"height":14,"sizeGrid":"4,4,4,4","name":"progress"},"type":"ProgressBar"},{"props":{"y":103,"skin":"comp/label.png","text":"This is a Label","width":137,"height":26,"fontSize":20,"name":"label"},"type":"Label"},{"props":{"y":148,"skin":"comp/textinput.png","text":"textinput","width":150,"name":"input"},"type":"TextInput"},{"props":{"skin":"comp/hslider.png","width":150,"name":"slider"},"type":"HSlider"},{"props":{"y":34,"skin":"comp/hscroll.png","width":150,"name":"scroll"},"type":"HScrollBar"}],"props":{"x":41,"y":197,"var":"box"}}],"props":{"width":600,"height":400}};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.test.TestPageUI.uiView);

        }

    }
}

module ui.views {
    export class DandanUI extends View {
		public btn:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Rect","props":{"y":10,"x":10,"width":750,"lineWidth":1,"height":1334,"fillColor":"#d2ffd4"}},{"type":"Image","props":{"y":450,"x":158,"skin":"dandan/avatar.jpg"}},{"type":"Button","props":{"y":918,"x":214,"width":294,"var":"btn","skin":"comp/button.png","sizeGrid":"6,12,6,12","label":"label","height":134}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.DandanUI.uiView);

        }

    }
}

module ui.views {
    export class DemoUI extends View {

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Button","props":{"y":624,"x":302,"skin":"comp/button.png","label":"label"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.DemoUI.uiView);

        }

    }
}

module ui.views {
    export class gameTipsBoxUI extends Dialog {

        public static  uiView:any ={"type":"Dialog","props":{"width":750,"name":"gameTipsBox","height":1334},"child":[{"type":"Image","props":{"y":22,"x":339,"skin":"gameTipsBox/index_close.png","name":"close"}},{"type":"Image","props":{"y":122,"x":44,"skin":"gameTipsBox/index_des_bg.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.gameTipsBoxUI.uiView);

        }

    }
}

module ui.views {
    export class HomeUI extends View {
		public logoScale:Laya.FrameAnimation;
		public pigGa:Laya.FrameAnimation;
		public txtY:Laya.FrameAnimation;
		public luhan:Laya.FrameAnimation;
		public gameTpsBtn:Laya.Image;

        public static  uiView:any ={"type":"View","props":{"y":0,"x":0,"width":750,"height":1334},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":750,"lineWidth":1,"height":1334,"fillColor":"#fa791c"}},{"type":"Image","props":{"y":0,"x":0,"skin":"index/index_bg.jpg","name":"bg"}},{"type":"Box","props":{"y":37,"x":37},"child":[{"type":"Image","props":{"y":42,"x":601,"skin":"index/index_pig.png"}},{"type":"Image","props":{"y":82,"x":115,"width":230,"skin":"index/logo.png","height":165,"anchorY":0.5,"anchorX":0.5},"compId":46},{"type":"Image","props":{"y":114,"x":527,"skin":"index/index_pig_ga.png"},"compId":75}]},{"type":"Box","props":{"y":209,"x":96,"name":"txt"},"compId":57,"child":[{"type":"Image","props":{"x":42,"skin":"index/index_title.png"}},{"type":"Image","props":{"y":126,"skin":"index/index_title2.png"}}]},{"type":"Box","props":{"y":630,"x":0,"name":"bottom"},"child":[{"type":"Image","props":{"x":125,"skin":"index/index_bowl2.png"}},{"type":"Image","props":{"y":292,"skin":"index/index_cloud.png","bottom":0}},{"type":"Image","props":{"y":10,"x":-271,"skin":"index/index_lh.png","rotation":0},"compId":54},{"type":"Image","props":{"y":508,"x":83,"skin":"index/index_btn_rank.png","name":"btnPlay","left":83,"bottom":110}},{"type":"Image","props":{"y":508,"x":411,"skin":"index/index_btn_play.png","right":83,"name":"btnRank","bottom":110}},{"type":"Image","props":{"y":604,"x":293,"width":169,"var":"gameTpsBtn","skin":"index/index_des.png","name":"gameTpsBtn","height":62,"bottom":38}}]},{"type":"Rect","props":{"width":750,"name":"gameTipsModal","lineWidth":1,"height":1334,"fillColor":"#000000"}},{"type":"Image","props":{"y":64,"x":395,"skin":"index/index_shine.png","name":"shine"}}],"animations":[{"nodes":[{"target":46,"keyframes":{"x":[{"value":115,"tweenMethod":"linearNone","tween":true,"target":46,"key":"x","index":0}],"scaleY":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleY","index":0},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleY","index":1},{"value":1,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleY","index":13}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleX","index":0},{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleX","index":1},{"value":1,"tweenMethod":"linearNone","tween":true,"target":46,"key":"scaleX","index":13}]}}],"name":"logoScale","id":1,"frameRate":60,"action":1},{"nodes":[{"target":75,"keyframes":{"y":[{"value":175,"tweenMethod":"linearNone","tween":true,"target":75,"key":"y","index":0}],"x":[{"value":599,"tweenMethod":"linearNone","tween":true,"target":75,"key":"x","index":0}],"scaleX":[{"value":1,"tweenMethod":"linearNone","tween":true,"target":75,"key":"scaleX","index":0}],"rotation":[{"value":15,"tweenMethod":"linearNone","tween":true,"target":75,"key":"rotation","index":0},{"value":-15,"tweenMethod":"linearNone","tween":true,"target":75,"key":"rotation","index":13},{"value":15,"tweenMethod":"linearNone","tween":true,"target":75,"key":"rotation","index":30}],"pivotX":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":75,"key":"pivotX","index":0}],"anchorY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":75,"key":"anchorY","index":0}],"anchorX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":75,"key":"anchorX","index":0}]}}],"name":"pigGa","id":2,"frameRate":60,"action":2},{"nodes":[{"target":57,"keyframes":{"y":[{"value":162,"tweenMethod":"linearNone","tween":true,"target":57,"key":"y","index":0},{"value":212,"tweenMethod":"linearNone","tween":true,"target":57,"key":"y","index":40}],"x":[{"value":375,"tweenMethod":"linearNone","tween":true,"target":57,"key":"x","index":0},{"value":94,"tweenMethod":"linearNone","tween":true,"target":57,"key":"x","index":40}],"pivotY":[{"value":-50,"tweenMethod":"linearNone","tween":true,"target":57,"key":"pivotY","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"pivotY","index":40}],"anchorY":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":57,"key":"anchorY","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"anchorY","index":40}],"anchorX":[{"value":0.5,"tweenMethod":"linearNone","tween":true,"target":57,"key":"anchorX","index":0},{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"anchorX","index":40}],"alpha":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":57,"key":"alpha","index":40}]}}],"name":"txtY","id":3,"frameRate":60,"action":1},{"nodes":[{"target":54,"keyframes":{"y":[{"value":10,"tweenMethod":"linearNone","tween":true,"target":54,"key":"y","index":0},{"value":-40,"tweenMethod":"linearNone","tween":true,"target":54,"key":"y","index":20},{"value":10,"tweenMethod":"linearNone","tween":true,"target":54,"key":"y","index":70}],"x":[{"value":-271,"tweenMethod":"linearNone","tween":true,"target":54,"key":"x","index":0},{"value":-189,"tweenMethod":"linearNone","tween":true,"target":54,"key":"x","index":20},{"value":0,"tweenMethod":"linearNone","tween":true,"target":54,"key":"x","index":70}],"rotation":[{"value":0,"tweenMethod":"linearNone","tween":true,"target":54,"key":"rotation","index":0},{"value":20,"tweenMethod":"linearNone","tween":true,"target":54,"key":"rotation","index":20},{"value":-10,"tweenMethod":"linearNone","tween":true,"target":54,"key":"rotation","index":45},{"value":0,"tweenMethod":"linearNone","tween":true,"target":54,"key":"rotation","index":70}]}}],"name":"luhan","id":4,"frameRate":60,"action":1}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.views.HomeUI.uiView);

        }

    }
}

module ui.views {
    export class LoadingUI extends View {
		public txt:laya.display.Text;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Text","props":{"y":629,"x":85,"width":579,"var":"txt","valign":"middle","text":"我是一个游戏加载的封面loading","height":76,"fontSize":30,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.views.LoadingUI.uiView);

        }

    }
}

module ui.views {
    export class RankUI extends View {
		public btnIndex:Laya.Button;
		public list:Laya.List;

        public static  uiView:any ={"type":"View","props":{"width":750,"height":1334},"child":[{"type":"Rect","props":{"y":0,"x":0,"width":750,"lineWidth":1,"height":1334,"fillColor":"#d2ffd4"}},{"type":"Text","props":{"y":200,"x":0,"width":750,"text":"排行榜","fontSize":40,"color":"#000000","align":"center"}},{"type":"Button","props":{"y":1076,"x":237,"width":300,"var":"btnIndex","skin":"comp/button.png","sizeGrid":"6,6,6,6","labelSize":30,"label":"返回首页","height":120}},{"type":"List","props":{"y":317,"x":171,"width":410,"var":"list","vScrollBarSkin":"comp/vscroll.png","repeatX":1,"height":684},"child":[{"type":"Box","props":{"y":0,"x":0,"width":112,"name":"render","height":30},"child":[{"type":"Label","props":{"y":5,"x":26,"width":78,"text":"this is a list","skin":"comp/label.png","name":"label","height":20,"fontSize":14}},{"type":"Clip","props":{"y":2,"x":0,"skin":"comp/clip_num.png","name":"clip","clipX":10}}]}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.views.RankUI.uiView);

        }

    }
}

module ui.views {
    export class scaleUI extends EffectAnimation {
		public ani1:Laya.FrameAnimation;

        public static  uiView:any ={"type":"View","props":{},"child":[{"type":"Image","props":{"y":-97,"x":-112,"skin":"index/logo.png"},"compId":2}],"animations":[{"nodes":[{"target":2,"keyframes":{"x":[{"value":-112,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":0},{"value":-112,"tweenMethod":"linearNone","tween":true,"target":2,"key":"x","index":1}],"scaleY":[{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleY","index":13}],"scaleX":[{"value":0.2,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":0},{"value":1,"tweenMethod":"linearNone","tween":true,"target":2,"key":"scaleX","index":13}]}}],"name":"ani1","id":1,"frameRate":24,"action":0}]};
        constructor(){ super();this.effectData =ui.views.scaleUI.uiView;}
    }
}
