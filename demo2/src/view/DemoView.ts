class DemoView extends Laya.Sprite {

    private ui: ui.test.demoUI;
    constructor() {
        super();

        this.ui = new ui.test.demoUI();
        this.addChild(this.ui);


        this.ui.btn1.on(Laya.Event.CLICK, this, this.lalala);
        this.ui.btn2.on(Laya.Event.CLICK, this, this.lalala);
    }

    private lalala(e: Laya.Event) {

        console.log(e.currentTarget.name);
        this.removeSelf();
        
    }
}