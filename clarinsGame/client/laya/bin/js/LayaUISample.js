var GameMain = /** @class */ (function () {
    function GameMain() {
        this.initLaya();
    }
    //初始化
    GameMain.prototype.initLaya = function () {
        //初始化微信小游戏
        Laya.MiniAdpter.init();
        //程序入口  这里高度写成1624为了兼容iphoneX屏幕底部点击失效的问题
        Laya.init(750, 1624, Laya.WebGL);
        //适配模式 宽度100%
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.bgColor = "#ffffff";
        //关闭Dialog背景能点击
        UIConfig.closeDialogOnSide = false;
        //自动关闭声音关闭
        Laya.SoundManager.autoStopMusic = false;
        //开启统计信息
        Laya.Stat.show(0, 0);
        //设置图片的加载路径
        // Laya.URL.basePath = '';
        //设置服务器域名
        // App.Ajax.serverUrl = "";
        //加载一下loading的素材
        Laya.loader.load([GameConfig.Loading], Laya.Handler.create(this, this.onLoadingComplete));
    };
    //前置 loading素材加载完成 显示loading 开始去加载其他素材
    GameMain.prototype.onLoadingComplete = function () {
        //初始化层级
        App.Layer.init();
        //显示默认loading
        LoadingControl.show();
        //添加GameConfig中的素材
        var resource = [];
        resource.push(GameConfig.COMP);
        resource.push(GameConfig.COMMON);
        // resource.push(GameConfig.DANDAN);
        resource.push(GameConfig.Index);
        resource.push(GameConfig.Game);
        resource.push(GameConfig.Result);
        resource.push(GameConfig.gameTipsBox); //弹窗规则
        resource.push(GameConfig.Rank); //排行榜
        resource.push(GameConfig.gameLevelBox); //游戏提示
        //这里添加默认的组件UI 如果有默认进入首页 建议在这里加上 首页的素材
        Laya.loader.load(resource, Laya.Handler.create(this, this.onComplete), Laya.Handler.create(this, this.onLoading));
    };
    //loading进度
    GameMain.prototype.onLoading = function (value) {
        LoadingControl.setProgress(value);
    };
    //loading完成
    GameMain.prototype.onComplete = function () {
        //wx初始化 如果是小游戏环境会去登陆 同时全屏覆盖一个透明的按钮 获取用户信息
        App.WX.init(Laya.Handler.create(this, this.onWxInit));
    };
    //wx初始化回调
    GameMain.prototype.onWxInit = function () {
        //非小游戏环境 会模拟用户数据
        //用户登录
        LoadingControl.hide();
        //查看微信用户信息
        Log.trace(App.WX.userInfo);
        //显示首页
        HomeControl.show();
        // DemoControl.show();
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaUISample.js.map