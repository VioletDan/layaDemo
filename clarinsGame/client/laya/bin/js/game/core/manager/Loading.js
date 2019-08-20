var App;
(function (App) {
    var Loading = /** @class */ (function () {
        function Loading() {
        }
        Loading.show = function (content) {
            if (content === void 0) { content = 'Loading...'; }
            if (this.ui == null) {
                this.ui = new ui.common.LoadingUI();
            }
            this.ui.txt.text = content;
            this.ui.popup(false, false);
        };
        Loading.hide = function () {
            if (this.ui)
                this.ui.close(null, false);
        };
        return Loading;
    }());
    App.Loading = Loading;
})(App || (App = {}));
//# sourceMappingURL=Loading.js.map