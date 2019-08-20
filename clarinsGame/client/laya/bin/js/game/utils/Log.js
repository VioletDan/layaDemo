var Log = /** @class */ (function () {
    function Log() {
    }
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    Log.trace = function () {
        var optionalParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            optionalParams[_i] = arguments[_i];
        }
        // if (App.isDebug) {
        //     // console.log("[DebugLog]");
        console.log.apply(console, optionalParams);
        // }
    };
    Log.warn = function () {
        var optionalParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            optionalParams[_i] = arguments[_i];
        }
        // if (App.isDebug) {
        //     // console.log("[DebugLog]");
        console.warn.apply(console, optionalParams);
        // }
    };
    return Log;
}());
//# sourceMappingURL=Log.js.map