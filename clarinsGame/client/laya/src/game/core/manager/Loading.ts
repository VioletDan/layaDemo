module App{
    export class Loading{

        private static ui:ui.common.LoadingUI;

        public static show(content:string = 'Loading...'):void{
            if(this.ui == null){
                this.ui = new ui.common.LoadingUI();
            }
            this.ui.txt.text = content;
            this.ui.popup(false, false);
        }

        public static hide():void{
            if(this.ui)this.ui.close(null, false);
        }

    }
}