var HomeControl = /** @class */ (function () {
    function HomeControl() {
    }
    HomeControl.show = function () {
        this.view = new HomeView();
        App.UI.open(this.view);
    };
    HomeControl.hide = function () {
        App.UI.close(this.view);
    };
    HomeControl.update = function () {
        this.view.update();
    };
    return HomeControl;
}());
//# sourceMappingURL=HomeControl.js.map