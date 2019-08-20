var App;
(function (App) {
    var WX = /** @class */ (function () {
        function WX() {
        }
        /**
         * 初始化
         * @param callback 回调方法 Laya.Handler
         * @param shareWidth 开放域画布宽度    默认750
         * @param shareHeight 开放域画布高度   默认1000
         * @param needUserInfo 是否需要获取用户头像等数据 默认true
         */
        WX.init = function (callback, shareWidth, shareHeight, needUserInfo) {
            var _this = this;
            if (shareWidth === void 0) { shareWidth = 750; }
            if (shareHeight === void 0) { shareHeight = 1000; }
            if (needUserInfo === void 0) { needUserInfo = true; }
            if (!this.isInit) {
                this._callback = callback;
                this.isInit = true;
                if (Laya.Browser.onMiniGame) {
                    Laya.Browser.window.sharedCanvas.width = shareWidth;
                    Laya.Browser.window.sharedCanvas.height = shareHeight;
                    this.wx = Laya.Browser.window.wx;
                    this.openDataContext = this.wx.getOpenDataContext();
                    this.wxLogin();
                }
                else {
                    App.Modal.show({
                        content: App.WX.OUTH_MSG,
                        showCancel: false,
                        complete: function () {
                            _this._code = Date.now() + "";
                            _this._userInfo = new UserInfoVo(_this.getTestData());
                            _this._callback.run();
                        }
                    });
                }
            }
        };
        Object.defineProperty(WX, "code", {
            /**
             * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 api，使用 code 换取 openid 和 session_key 等信息
             */
            get: function () {
                return this._code;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WX, "userInfo", {
            /**
             * 获取用户信息
             * 如果没有授权是拿不到的
             */
            get: function () {
                return this._userInfo;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 重置分享
         * @param title     分享标题 不传则默认使用当前小游戏的昵称。
         * @param imageUrl  分享图片地址(转发显示图片的链接，可以是网络图片路径或本地图片文件路径或相对代码包根目录的图片文件路径。显示图片长宽比是 5:4)
         */
        WX.resetShare = function (title, imageUrl) {
            this.shareObj.title = title;
            this.shareObj.imageUrl = imageUrl;
        };
        /**
         * 判断是否大于等于某个版本号
         * @param version 版本号
         */
        WX.isLargerVersion = function (version) {
            var res = false;
            return res;
        };
        /**
         * 保存微信开放域数据
         * @param key 要存储的key 用于开放域查询数据的唯一标识 必须是string
         * @param value key对应的值 必须是string
         */
        WX.setShareData = function (key, value) {
            if (Laya.Browser.onMiniGame) {
                if (this.wx.setUserCloudStorage) {
                    this.wx.setUserCloudStorage({
                        KVDataList: [
                            { key: key + "", value: value + "" }
                        ],
                        success: function (res) {
                            console.log('success:', res);
                        },
                        fail: function (res) {
                            console.log('fail:', res);
                        }
                    });
                }
                else {
                }
            }
        };
        /**
         * 给开放域发送消息 只有小游戏环境才执行
         * @param message 发送给开放域的数据 {cmd:''}  cmd的内容是约定好的
         * @param caller 请求的作用域
         * @param callback 请求后的回调方法
         * @param timeOut 延迟多久执行 默认500毫秒
         */
        WX.callShare = function (message, caller, callback, timeOut) {
            if (timeOut === void 0) { timeOut = 500; }
            if (Laya.Browser.onMiniGame) {
                this.openDataContext.postMessage(message);
                Laya.timer.once(timeOut, this, function () {
                    callback.apply(caller, [message]);
                });
            }
            else {
                Log.trace('需要发给开放域的数据');
                Log.trace(message);
            }
        };
        /**
         * 主动拉起转发，进入选择通讯录界面。
         */
        WX.shareAppMessage = function () {
            if (Laya.Browser.onMiniGame) {
                this.wx.shareAppMessage({
                    title: this.shareObj.title,
                    imageUrl: this.shareObj.imageUrl
                });
            }
        };
        //内部模拟的数据
        WX.getTestData = function () {
            return {
                encryptedData: "w/tDcthZWlXdBOCTUNtP1pUg0LQbdKNsscIBEKh1aeXeXcvQBxMXASL+WX2SoF37uAXQ6uq6gbpydPt/+n4LHnkgQVaerDo/nzmxvH3iTrbaZgJgsHppFbGEVN+S41tUr6jdZktG/o1GcZmGDE3bDvoV3mlk2k0SIC9W/QrH41Ja6VTLwAEPLuXfes6H4gdNrQpazw5iPCaDjOjJi1+g2S7SYRH2NhsIEJ3gqqiCewOKadH2iQR6yHc/+mkSf2RvCZ5WX1ar12iJbNQowuoJpPnoH0qLNo6z5Sa9uB4kKQkT6dcI5UVemBfZdQQgAzNXMMcZ7tFUb4H5BdZmulSDBTXuOjWH8YGqAApcdROs2sPOUwzvBnvzarXrSbvy8LW1Tp7BT7X2Y3XiIpCYEla7K723Hv0Uk1tx93nrXfMglMbdlPUnhFqPZSoSsa7kN4+gcnXeJPsFHlV68odKFqRNYV8GRGe/LmuDhuHOMTX9JVNzYkz2qtR1HoMLutQpuc+eCCXbt0/r8gj+JKeRegKjCg==",
                iv: "dNp8OYopuXh0fGVZgHopIg==",
                rawData: '{"nickName":"🎾🎾🎾🎾🎾🎾🎾🎾","gender":1,"language":"zh_CN","city":"Pudong New District","province":"Shanghai","country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ersa4kEGqnSzEExdozjlM73vM2dUianlkSWlYaHDq7vW9gDkargWZlDm8SphZD5b3TG0iazWIUlAqHw/132"}',
                signature: "576e82e8ad22cdfeeaee664f6d23eeee94119931",
                userInfo: {
                    avatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ersa4kEGqnSzEExdozjlM73vM2dUianlkSWlYaHDq7vW9gDkargWZlDm8SphZD5b3TG0iazWIUlAqHw/132",
                    city: "Pudong New District",
                    country: "China",
                    gender: 1,
                    language: "zh_CN",
                    nickName: "🎾🎾🎾🎾🎾🎾🎾🎾",
                    province: "Shanghai"
                }
            };
        };
        //登录
        WX.wxLogin = function () {
            var _this = this;
            this.wx.login({
                success: function (res) {
                    console.log('wx login success', res);
                    //存储一下code方便后面去和服务器拿SessionKey
                    _this._code = res.code;
                    // GameConfig.userInfo.Code = res.code;
                    _this.wxCreateUserInfo();
                    _this.initWX();
                    _this.initWXUpdate();
                },
                fail: function (res) {
                    console.warn('wx login fail', res);
                }
            });
        };
        //初始化wx的授权按钮 暂时全屏显示 点一下就会授权成功
        WX.wxCreateUserInfo = function () {
            var _this = this;
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
                });
                button.onTap(function (res) {
                    if (res.errMsg == 'getUserInfo:fail auth deny') {
                        _this.wx.showModal({
                            title: '提示',
                            content: '请同意授权才能继续游戏哦',
                            showCancel: false
                        });
                    }
                    else {
                        //存储授权后的用户信息
                        _this._userInfo = new UserInfoVo(res);
                        _this._callback.run();
                        button.destroy();
                        App.Modal.hide();
                    }
                });
                App.Modal.show({
                    content: App.WX.OUTH_MSG,
                    showCancel: false
                });
            }
            else {
                this._callback.run();
            }
        };
        //初始化微信的分享和onshow onhide
        WX.initWX = function () {
            var _this = this;
            //开启分享
            this.wx.showShareMenu();
            //小游戏隐藏
            this.wx.onHide(function () {
                if (Laya.stage.renderingEnabled) {
                    Laya.stage.renderingEnabled = false;
                    App.Message.event(App.WX.WX_HIDE);
                }
            });
            //小游戏显示
            this.wx.onShow(function () {
                if (!Laya.stage.renderingEnabled) {
                    Laya.stage.renderingEnabled = true;
                    App.Message.event(App.WX.WX_SHOW);
                }
            });
            this.wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: _this.shareObj.title,
                    imageUrl: _this.shareObj.imageUrl
                };
            });
        };
        //初始化小游戏自动更新
        WX.initWXUpdate = function () {
            if (this.wx.getUpdateManager) {
                var updateManager_1 = this.wx.getUpdateManager();
                updateManager_1.onCheckForUpdate(function (res) {
                    if (res.hasUpdate) {
                        this.wx.showLoading({
                            title: '升级中',
                            mask: true
                        });
                        updateManager_1.onUpdateReady(function (res) {
                            this.wx.hideLoading();
                            this.wx.showModal({
                                title: '升级提示',
                                content: '新版本已经准备好，是否重启应用？',
                                success: function (res) {
                                    if (res.confirm) {
                                        updateManager_1.applyUpdate();
                                    }
                                }
                            });
                        });
                        updateManager_1.onUpdateFailed(function () {
                            this.wx.hideLoading();
                            this.wx.showModal({
                                title: '升级失败',
                                content: '新版本下载失败，请检查网络！',
                                showCancel: false
                            });
                        });
                    }
                });
            }
        };
        /**
         * 版本号转换
         * @param ver 版本号 例如 1.0.1
         */
        WX.prototype.parseVersion = function (ver) {
            var res = 0;
            return res;
        };
        //微信切换到后台事件
        WX.WX_HIDE = 'wx_hide';
        //微信切换到前台事件
        WX.WX_SHOW = 'wx_show';
        WX.OUTH_MSG = "将要进行微信登录";
        WX.isInit = false;
        WX._code = "";
        //分享
        WX.shareObj = {
            title: '分享文案',
            imageUrl: 'images/share.jpg'
        };
        return WX;
    }());
    App.WX = WX;
    //用户信息
    var UserInfoVo = /** @class */ (function () {
        function UserInfoVo(data) {
            this._rawData = '';
            this._signature = '';
            this._encryptedData = '';
            this._iv = '';
            this._nickName = '';
            this._avatarUrl = '';
            this._gender = '';
            this._city = '';
            this._province = '';
            this._country = '';
            this._language = '';
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
        Object.defineProperty(UserInfoVo.prototype, "rawData", {
            /**
             * 不包括敏感信息的原始数据字符串，用于计算签名。
             */
            get: function () {
                return this._rawData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "signature", {
            /**
             * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息
             */
            get: function () {
                return this._signature;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "encryptedData", {
            /**
             * 包括敏感数据在内的完整用户信息的加密数据
             */
            get: function () {
                return this._encryptedData;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "iv", {
            /**
             * 加密算法的初始向量
             */
            get: function () {
                return this._iv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "nickName", {
            /**
             * 用户昵称
             */
            get: function () {
                return this._nickName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "avatarUrl", {
            /**
             * 用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表132*132正方形头像），用户没有头像时该项为空。若用户更换头像，原有头像URL将失效。
             */
            get: function () {
                return this._avatarUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "gender", {
            /**
             * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知
             */
            get: function () {
                return this._gender;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "city", {
            /**
             * 用户所在城市
             */
            get: function () {
                return this._city;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "province", {
            /**
             * 用户所在省份
             */
            get: function () {
                return this._province;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "country", {
            /**
             * 用户所在国家
             */
            get: function () {
                return this._country;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoVo.prototype, "language", {
            /**
             * 用户的语言，简体中文为zh_CN
             */
            get: function () {
                return this._language;
            },
            enumerable: true,
            configurable: true
        });
        return UserInfoVo;
    }());
    App.UserInfoVo = UserInfoVo;
})(App || (App = {}));
//# sourceMappingURL=WX.js.map