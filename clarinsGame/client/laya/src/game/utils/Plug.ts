class Plug{
    public static Dayjs:any;

    public static init(){
        Plug.Dayjs = Laya.Browser.window['dayjs'];
    }
}