module App {
    export class WX {

        //微信切换到后台事件
        public static WX_HIDE:string = 'wx_hide';
        //微信切换到前台事件
        public static WX_SHOW:string = 'wx_show';
        
        private static OUTH_MSG:string = "将要进行微信登录";

        private static wx: any;
        private static openDataContext:any;
        private static isInit: boolean = false;

        private static _code:string = "";
        private static _userInfo:UserInfoVo;
        private static _callback:Laya.Handler;

        //分享
        private static shareObj: any = {
            title: '分享文案',
            imageUrl: 'images/share.jpg'
        };

        /**
         * 初始化
         * @param callback 回调方法 Laya.Handler
         * @param shareWidth 开放域画布宽度    默认750
         * @param shareHeight 开放域画布高度   默认1000
         * @param needUserInfo 是否需要获取用户头像等数据 默认true
         */
        public static init(callback: Laya.Handler, shareWidth:number = 750, shareHeight:number = 1000, needUserInfo:boolean = true): void {
            if (!this.isInit) {
                this._callback = callback;
                this.isInit = true;
                if (Laya.Browser.onMiniGame) {
                    Laya.Browser.window.sharedCanvas.width = shareWidth;
                    Laya.Browser.window.sharedCanvas.height = shareHeight;
                    this.wx = Laya.Browser.window.wx;
                    this.openDataContext = this.wx.getOpenDataContext();
                    this.wxLogin();
                } else {
                    App.Modal.show({
                        content: App.WX.OUTH_MSG,
                        showCancel: false,
                        complete: ()=>{
                            this._code = Date.now() + "";
                            this._userInfo = new UserInfoVo(this.getTestData());
                            this._callback.run();
                        }
                    });
                }
            }
        }

        /**
         * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
         */
        public static get code():string{
            return this._code;
        }
        /**
         * 获取用户信息
         * 如果没有授权是拿不到的
         */
        public static get userInfo():UserInfoVo{
            return this._userInfo;
        }

        /**
         * 重置分享
         * @param title     分享标题 不传则默认使用当前小游戏的昵称。
         * @param imageUrl  分享图片地址(转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4)
         */
        public static resetShare(title: string, imageUrl: string): void {
            this.shareObj.title = title;
            this.shareObj.imageUrl = imageUrl;
        }

        /**
         * 判断是否大于等于某个版本号
         * @param version 版本号
         */
        public static isLargerVersion(version:string):boolean{
            let res:boolean = false;
            return res;
        }

        /**
         * 保存微信开放域数据
         * @param key 要存储的key 用于开放域查询数据的唯一标识 必须是string
         * @param value key对应的值 必须是string
         */
        public static setShareData(key, value):void{
            if(Laya.Browser.onMiniGame){
                if(this.wx.setUserCloudStorage){
                    this.wx.setUserCloudStorage({
                        KVDataList: [
                            { key: key + "", value: value + "" }
                        ],
                        success: (res) => {
                            console.log('success:', res);
                        },
                        fail: (res) => {
                            console.log('fail:', res);
                        }
                    })
                }else{

                }
            }
        }

        /**
         * 给开放域发送消息 只有小游戏环境才执行
         * @param message 发送给开放域的数据 {cmd:''}  cmd的内容是约定好的
         * @param caller 请求的作用域
         * @param callback 请求后的回调方法
         * @param timeOut 延迟多久执行 默认500毫秒
         */
        public static callShare(message:any, caller:any, callback:Function, timeOut:number = 500):void{
            if(Laya.Browser.onMiniGame){
                this.openDataContext.postMessage(message);
                Laya.timer.once(timeOut, this, ()=>{
                    callback.apply(caller, [message]);
                });
            }else{
                Log.trace('需要发给开放域的数据');
                Log.trace(message);
            }
        }

        /**
         * 主动拉起转发，进入选择通讯录界面。
         */
        public static shareAppMessage():void{
            if(Laya.Browser.onMiniGame){
                this.wx.shareAppMessage({
                    title: this.shareObj.title,
                    imageUrl: this.shareObj.imageUrl
                });
            }
        }

        //内部模拟的数据
        private static getTestData():any{
            return {
                encryptedData : "w/tDcthZWlXdBOCTUNtP1pUg0LQbdKNsscIBEKh1aeXeXcvQBxMXASL+WX2SoF37uAXQ6uq6gbpydPt/+n4LHnkgQVaerDo/nzmxvH3iTrbaZgJgsHppFbGEVN+S41tUr6jdZktG/o1GcZmGDE3bDvoV3mlk2k0SIC9W/QrH41Ja6VTLwAEPLuXfes6H4gdNrQpazw5iPCaDjOjJi1+g2S7SYRH2NhsIEJ3gqqiCewOKadH2iQR6yHc/+mkSf2RvCZ5WX1ar12iJbNQowuoJpPnoH0qLNo6z5Sa9uB4kKQkT6dcI5UVemBfZdQQgAzNXMMcZ7tFUb4H5BdZmulSDBTXuOjWH8YGqAApcdROs2sPOUwzvBnvzarXrSbvy8LW1Tp7BT7X2Y3XiIpCYEla7K723Hv0Uk1tx93nrXfMglMbdlPUnhFqPZSoSsa7kN4+gcnXeJPsFHlV68odKFqRNYV8GRGe/LmuDhuHOMTX9JVNzYkz2qtR1HoMLutQpuc+eCCXbt0/r8gj+JKeRegKjCg==",
                iv:"dNp8OYopuXh0fGVZgHopIg==",
                rawData:'{"nickName":"🎾🎾🎾🎾🎾🎾🎾🎾","gender":1,"language":"zh_CN","city":"Pudong New District","province":"Shanghai","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ersa4kEGqnSzEExdozjlM73vM2dUianlkSWlYaHDq7vW9gDkargWZlDm8SphZD5b3TG0iazWIUlAqHw/132"}',
                signature:"576e82e8ad22cdfeeaee664f6d23eeee94119931",
                userInfo:{
                    avatarUrl:"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ersa4kEGqnSzEExdozjlM73vM2dUianlkSWlYaHDq7vW9gDkargWZlDm8SphZD5b3TG0iazWIUlAqHw/132",
                    city:"Pudong New District",
                    country:"China",
                    gender:1,
                    language:"zh_CN",
                    nickName:"🎾🎾🎾🎾🎾🎾🎾🎾",
                    province:"Shanghai"
                }
            }
        }

        //登录
        private static wxLogin(): void {
            this.wx.login({
                success: (res) => {
                    console.log('wx login success', res);
                    //存储一下code方便后面去和服务器拿SessionKey
                    this._code = res.code;
                    // GameConfig.userInfo.Code = res.code;
                    this.wxCreateUserInfo();
                    this.initWX();
                    this.initWXUpdate();
                },
                fail: (res) => {
                    console.warn('wx login fail', res);
                }
            })
        }
        //初始化wx的授权按钮 暂时全屏显示 点一下就会授权成功
        private static wxCreateUserInfo(): void {
            //用户授权按钮
            if (this.wx.createUserInfoButton) {
                var systemInfo = this.wx.getSystemInfoSync();
                var button = this.wx.createUserInfoButton({
                    type: 'image',
                    image: 'game/blank.png',
                    style: {
                        left: 0,
                        top: 0,
                        width: systemInfo.screenWidth,
                        height: systemInfo.screenHeight
                    }
                })
                button.onTap((res) => {
                    if (res.errMsg == 'getUserInfo:fail auth deny') {
                        this.wx.showModal({
                            title: '提示',
                            content: '请同意授权才能继续游戏哦',
                            showCancel: false
                        });
                    } else {
                        //存储授权后的用户信息
                        this._userInfo = new UserInfoVo(res);
                        this._callback.run();
                        button.destroy();
                        App.Modal.hide();
                    }
                })
                App.Modal.show({
                    content: App.WX.OUTH_MSG,
                    showCancel: false
                });
            } else {
                this._callback.run();
            }

        }

        //初始化微信的分享和onshow onhide
        private static initWX(): void {
            //开启分享
            this.wx.showShareMenu();
            //小游戏隐藏
            this.wx.onHide(function () {
                if(Laya.stage.renderingEnabled){
                    Laya.stage.renderingEnabled = false;
                    App.Message.event(App.WX.WX_HIDE);
                }
            });
            //小游戏显示
            this.wx.onShow(function () {
                if(!Laya.stage.renderingEnabled){
                    Laya.stage.renderingEnabled = true;
                    App.Message.event(App.WX.WX_SHOW);
                }
            });

            this.wx.onShareAppMessage(() => {
                // 用户点击了“转发”按钮
                return {
                    title: this.shareObj.title,
                    imageUrl: this.shareObj.imageUrl
                }
            })
        }

        //初始化小游戏自动更新
        private static initWXUpdate(): void {
            if (this.wx.getUpdateManager) {
                const updateManager = this.wx.getUpdateManager();
                updateManager.onCheckForUpdate(function (res) {
                    if (res.hasUpdate) {
                        this.wx.showLoading({
                            title: '升级中',
                            mask: true
                        })
                        updateManager.onUpdateReady(function (res) {
                            this.wx.hideLoading();
                            this.wx.showModal({
                                title: '升级提示',
                                content: '新版本已经准备好，是否重启应用？',
                                success: function (res) {
                                    if (res.confirm) {
                                        updateManager.applyUpdate()
                                    }
                                }
                            });
                        });
                        updateManager.onUpdateFailed(function () {
                            this.wx.hideLoading();
                            this.wx.showModal({
                                title: '升级失败',
                                content: '新版本下载失败，请检查网络！',
                                showCancel: false
                            });
                        })
                    }
                })
            }
        }

        /**
         * 版本号转换
         * @param ver 版本号 例如 1.0.1
         */
        private parseVersion(ver:string):number{
            let res:number = 0;
            return res;
        }

    }


    //用户信息
    export class UserInfoVo{
        private _rawData:string = '';
        private _signature:string = '';
        private _encryptedData:string = '';
        private _iv:string = '';

        private _nickName:string = '';
        private _avatarUrl:string = '';
        private _gender:string = '';
        private _city:string = '';
        private _province:string = '';
        private _country:string = '';
        private _language:string = '';

        constructor(data:any){
            this._rawData = data.rawData;
            this._signature = data.signature;
            this._encryptedData = data.encryptedData;
            this._iv = data.iv;
            this._nickName = data.userInfo.nickName;
            this._avatarUrl = data.userInfo.avatarUrl;
            this._gender = data.userInfo.gender;
            this._city = data.userInfo.city;
            this._province = data.userInfo.province;
            this._country = data.userInfo.country;
            this._language = data.userInfo.language;
        }

        /**
         * 不包括敏感信息的原始数据字符串，用于计算签名。
         */
        public get rawData():string{
            return this._rawData;
        }
        /**
         * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
         */
        public get signature():string{
            return this._signature;
        }
        /**
         * 包括敏感数据在内的完整用户信息的加密数据
         */
        public get encryptedData():string{
            return this._encryptedData;
        }
        /**
         * 加密算法的初始向量
         */
        public get iv():string{
            return this._iv;
        }
        /**
         * 用户昵称
         */
        public get nickName():string{
            return this._nickName;
        }
        /**
         * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表132*132正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
         */
        public get avatarUrl():string{
            return this._avatarUrl;
        }
        /**
         * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
         */
        public get gender():string{
            return this._gender;
        }
        /**
         * 用户所在城市
         */
        public get city():string{
            return this._city;
        }
        /**
         * 用户所在省份
         */
        public get province():string{
            return this._province;
        }
        /**
         * 用户所在国家
         */
        public get country():string{
            return this._country;
        }
        /**
         * 用户的语言，简体中文为zh_CN
         */
        public get language():string{
            return this._language;
        }
    }
}