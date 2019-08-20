var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HomeView = /** @class */ (function (_super) {
    __extends(HomeView, _super);
    function HomeView() {
        return _super.call(this, 'HomeView') || this;
    }
    //==================== Public ====================
    //页面准备好了
    HomeView.prototype.onReady = function () {
        //初始化UI
        this.ui = new ui.views.HomeUI();
        this.regUI(this.ui);
        this.addChild(this.ui);
        //头像赋值
        // this.ui.headImage.skin = GameConfig.userInfo.HeadImage;
        // //昵称赋值
        // this.ui.nickName.text = GameConfig.userInfo.NickName;
        this.parseData();
        this.addEvent();
    };
    //页面关闭 
    HomeView.prototype.onClose = function () {
        //在这里清除定时器等
        this.removeEvent();
    };
    HomeView.prototype.update = function () {
        this.parseData();
    };
    //==================== Private ====================
    HomeView.prototype.parseData = function () {
        // this.ui.scroeTxt.text = GameData.score + "";
        // //实例化导出的UI类
        // var efc:ui.EffectAnimationDemoUI = new ui.EffectAnimationDemoUI();
        // //添加到舞台
        // Laya.stage.addChild(efc);
    };
    HomeView.prototype.addEvent = function () {
        this.ui.on(Laya.Event.CLICK, this, this.clickHandler);
        this.ui.gameTpsBtn.on(Laya.Event.CLICK, this, this.showGameTipsModal);
    };
    HomeView.prototype.removeEvent = function () {
        this.ui.off(Laya.Event.CLICK, this, this.clickHandler);
        this.ui.gameTpsBtn.off(Laya.Event.CLICK, this, this.showGameTipsModal);
    };
    //    功能展示
    HomeView.prototype.showLoading = function () {
        App.Loading.show();
        setTimeout(function () {
            App.Loading.hide();
        }, 1000);
    };
    HomeView.prototype.showModal = function (title, content, showCancel, confirmText, cancelText, complete) {
        if (title === void 0) { title = '提示'; }
        if (content === void 0) { content = '内容'; }
        if (showCancel === void 0) { showCancel = true; }
        if (confirmText === void 0) { confirmText = '确定'; }
        if (cancelText === void 0) { cancelText = '取消'; }
        if (complete === void 0) { complete = null; }
        App.Modal.show({
            title: title,
            content: content,
            confirmText: confirmText,
            cancelText: cancelText,
            showCancel: showCancel,
            complete: function (res) {
                App.Modal.show({
                    title: '提示',
                    content: '你点击了' + res,
                    showCancel: false
                });
            },
        });
    };
    // 显示游戏规则弹窗
    HomeView.prototype.showGameTipsModal = function () {
        //  console.log(22)
        var dialog = new Dialog();
        dialog.show();
    };
    //==================== Event ====================
    HomeView.prototype.clickHandler = function (e) {
        switch (e.target.name) {
            case 'btnLoading':
                this.showLoading();
                break;
            case 'btnModal1':
                this.showModal();
                break;
            case 'btnModal2':
                this.showModal('提示', '我没有取消按钮', false);
                break;
            case 'btnModal3':
                this.showModal('提示', '按钮文字自定义', true, 'yes', 'no');
                break;
            case 'btnModal4':
                RankControl.show({ abc: 1 });
                break;
            case 'btnModal5':
                DandanControl.show();
                break;
            default:
                break;
        }
    };
    return HomeView;
}(App.BaseView));
//# sourceMappingURL=HomeView.js.map