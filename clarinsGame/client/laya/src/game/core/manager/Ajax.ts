module App {
    export class Ajax {
        
        private static sendData:Object = {};
        private static _serverUrl:string = "";

        /**
         * 添加ajax发送数据时要携带的数据
         * @param key 键
         * @param value 值 
         */
        public static addData(key:string, value:any):void{
            this.sendData[key] = value;
        }

        /**
         * 设置接口域名
         */
        public static set serverUrl(value:string){
            this._serverUrl = value;
        }


        /**
         * Get请求
         * @param url           请求地址
         * @param data          数据 object
         * @param listenerObj   侦听函数所属对象(作用域)
         * @param onSuccess     成功回调
         * @param onError       失败回调
         */
        public static get(url, data, listenerObj:any, onSuccess, onError) {
            this.ajax(url, data, 'get', listenerObj, onSuccess, onError)
        }


        /**
         * Post请求
         * @param url           请求地址
         * @param data          数据 object
         * @param listenerObj   侦听函数所属对象(作用域)
         * @param onSuccess     成功回调
         * @param onError       失败回调
         */
        public static post(url, data, listenerObj:any, onSuccess, onError) {
            this.ajax(url, data, 'post', listenerObj, onSuccess, onError)
        }

        private static ajax(url, data, method, listenerObj:any, onSuccess, onError) {
            if (url && url != '') {
                //查找一下是否有必填的通用信息 统一添加
                for(let key in this.sendData){
                    data[key] = this.sendData[key];
                }
                let http:Laya.HttpRequest = new Laya.HttpRequest();
                http.once(Laya.Event.COMPLETE, this, this.onHttpRequestComplete, [listenerObj, onSuccess, http]);
                http.once(Laya.Event.ERROR, this, this.onHttpRequestError, [listenerObj, onError, http]);
                http.send(this._serverUrl + url, JSON.stringify(data), method, 'json', ['content-type', 'application/x-www-form-urlencoded']);
            }
        }

        public static urlEncode(param, key:any = null, encode: any = null) {
            if (param == null) return '';
            var paramStr = '';
            var t = typeof (param);
            if (t == 'string' || t == 'number' || t == 'boolean') {
                paramStr += key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
            } else {
                let m = 0;
                for (var i in param) {
                    var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                    if(m == 0){
                        paramStr += this.urlEncode(param[i], k, encode);
                    }else{
                        paramStr += ("&" + this.urlEncode(param[i], k, encode));
                    }
                    
                    m++;
                }
            }
            return paramStr;
        };

        private static onHttpRequestError(listenerObj, callback:Function, http:Laya.HttpRequest) {
            console.log('error');
            if (listenerObj && callback){
                callback.apply(listenerObj, [null]);
            }
            http.offAll();
        }

        private static onHttpRequestComplete(listenerObj, callback:Function, http:Laya.HttpRequest) {
            console.log('success', http.data);
            if (listenerObj && callback){
                callback.apply(listenerObj, [http.data]);
            }
            http.offAll();
        }
    }
}