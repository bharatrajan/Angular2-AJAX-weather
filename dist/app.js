System.register(['angular2/platform/browser', 'angular2/core', 'angular2/common', 'angular2/http'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, common_1, http_1;
    var App;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            App = (function () {
                function App(http) {
                    this.http = http;
                    this.fcList = [];
                    this.forecast("94089");
                }
                App.prototype.forecast = function (zip) {
                    var _this = this;
                    if (zip.value) {
                        zip = zip.value;
                    }
                    this.http.get('http://query.yahooapis.com/v1/public/yql?q=select item from weather.forecast where location=' + zip + '&format=json')
                        .subscribe(function (data) { return _this.result = JSON.parse(data.text()); }, function (err) { return _this.logError(err.text()); }, function () {
                        if (!_this.result.query.results.channel) {
                        }
                        else {
                            _this.fcList = [];
                            _this.location = _this.result.query.results.channel.item.title;
                            for (var _i = 0, _a = _this.result.query.results.channel.item.forecast; _i < _a.length; _i++) {
                                var elem = _a[_i];
                                _this.fcList.push('Date : ' + elem.date + ',     Condition : ' + elem.text);
                                console.log('Date : ' + elem.date + ',     Condition : ' + elem.text);
                            }
                        }
                    });
                };
                App.prototype.logError = function (err) {
                    this.location = err;
                    this.fcList = [];
                    console.error('There was an error: ' + err);
                };
                App = __decorate([
                    core_1.Component({
                        selector: 'app'
                    }),
                    core_1.View({
                        directives: [common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
                        template: " \n  <header>\n    <h1 class=\"title\">Angular 2 HTTP</h1>\n  </header>\n\n\n\n  <section>\n    <label for=\"zip\">Zip </label>\n\n    <input\n          type=\"text\"\n          #zip\n          id=\"zip\"\n          ng-model=\"zip\"\n          required (change)=\"forecast(zip)\">\n\n    <button (click)=\"forecast(zip)\">Forecast</button>\n\n    <section>\n    <br/>\n      <label for=\"zip\">{{location}} </label>\n    </section>\n\n    <ul id=\"issue-list\">\n        <li *ngFor=\"#elem of fcList\">\n          <label>{{elem}}</label>\n        </li>\n    </ul>\n\n\n\n  </section>\n  "
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], App);
                return App;
            })();
            exports_1("App", App);
            browser_1.bootstrap(App, [http_1.HTTP_PROVIDERS]);
        }
    }
});
