var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * MessageCenter
 */
var MessageCenter = (function (_super) {
    __extends(MessageCenter, _super);
    function MessageCenter() {
        var _this = _super.call(this) || this;
        _this.dic = {};
        _this.messList = new Array();
        return _this;
    }
    /**
     * 清空处理
     */
    MessageCenter.prototype.clear = function () {
        this.dic = {};
    };
    /**
     * 添加消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     *
     */
    MessageCenter.prototype.addListener = function (type, listener, listenerObj) {
        var arr = this.dic[type];
        if (arr == null) {
            arr = new Array();
            this.dic[type] = arr;
        }
        //判断是否存在
        var i = 0;
        var len = arr.length;
        var obj;
        for (i = 0; i < len; i++) {
            obj = arr[i];
            if (obj[0] == listener && arr[1] == listenerObj) {
                return;
            }
        }
        arr.push([listener, listenerObj]);
    };
    /**
     * 移除消息监听
     * @param type 消息唯一标识
     * @param listener 侦听函数
     * @param listenerObj 侦听函数所属对象
     */
    MessageCenter.prototype.removeListener = function (type, listener, listenerObj) {
        var arr = this.dic[type];
        if (arr == null) {
            return;
        }
        var i = 0;
        var len = arr.length;
        var obj;
        for (i; i < len; i++) {
            if (arr[i][0] == listener && arr[i][1] == listenerObj) {
                arr.splice(i, 1);
                break;
            }
        }
        if (arr.length == 0) {
            this.dic[type] = null;
            delete this.dic[type];
        }
    };
    /**
     * 移除某一对象的所有监听
     * @param listenerObj 侦听函数所属对象
     */
    MessageCenter.prototype.removeAll = function (listenerObj) {
        var keys = Object.keys(this.dic);
        for (var i = 0, len = keys.length; i < len; i++) {
            var type = keys[i];
            var arr = this.dic[type];
            for (var j = 0; j < arr.length; j++) {
                if (arr[j][1] == listenerObj) {
                    arr.splice(j, 1);
                    j--;
                }
            }
            if (arr.length == 0) {
                this.dic[type] = null;
                delete this.dic[type];
            }
        }
    };
    /**
     * 触发消息
     * @param type 消息唯一标识
     * @param param 消息参数
     *
     */
    MessageCenter.prototype.dispatch = function (type) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (this.dic[type] == null) {
            return;
        }
        var vo = ObjectPool.getItem("MessageVo");
        if (null == vo) {
            vo = new MessageVo();
        }
        vo.type = type;
        vo.param = param;
        this.dealMsg(vo);
    };
    /**
     * 处理一条消息
     * @param msgVo
     */
    MessageCenter.prototype.dealMsg = function (msgVo) {
        var listeners = this.dic[msgVo.type];
        var i = 0;
        var len = listeners.length;
        var listener = null;
        while (i < len) {
            listener = listeners[i];
            listener[0].apply(listener[1], msgVo.param);
            if (listeners.length != len) {
                len = listeners.length;
                i--;
            }
            i++;
        }
        msgVo.dispose();
        ObjectPool.recover("MessageVo", msgVo);
    };
    return MessageCenter;
}(BaseClass));
//# sourceMappingURL=MessageCenter.js.map