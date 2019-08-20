class Log {
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    public static trace(...optionalParams:any[]):void {
        // if (App.isDebug) {
        //     // console.log("[DebugLog]");
            console.log.apply(console, optionalParams);
        // }
    }
    public static warn(...optionalParams:any[]):void {
        // if (App.isDebug) {
        //     // console.log("[DebugLog]");
            console.warn.apply(console, optionalParams);
        // }
    }
}