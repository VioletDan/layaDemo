/**
 * 对象池类
 * ObjectPool
 */
var ObjectPool = /** @class */ (function () {
    /**
     * 构造函数
     */
    function ObjectPool() {
    }
    /**
     * 清除缓存对象
     * @params sign {string} 注册时的标识
     */
    ObjectPool.clearBySign = function (sign) {
        Laya.Pool.clearBySign(sign);
    };
    /**
     * 根据标识符 返回对象 如果为空 则返回null
     * @params sign {string} 注册时的标识
     */
    ObjectPool.getItem = function (sign) {
        return Laya.Pool.getItem(sign);
    };
    /**
     * 将对象放到对应类型标识的对象池中。
     * @params sign {string} 注册时的标识
     * @params item {Object} 类名
     */
    ObjectPool.recover = function (sign, item) {
        Laya.Pool.recover(sign, item);
    };
    return ObjectPool;
}());
//# sourceMappingURL=ObjectPool.js.map