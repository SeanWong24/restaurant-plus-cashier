function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html":
  /*!***************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
    \***************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppHomeHomePageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-title>\n      Cashier\n    </ion-title>\n    <ion-buttons slot=\"end\">\n      <ion-button routerLink=\"/settings\">\n        <ion-icon slot=\"icon-only\" name=\"settings\"></ion-icon>\n      </ion-button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content no-padding [fullscreen]=\"true\">\n  <ion-grid style=\"height: 100%;\">\n    <ion-row style=\"height: 100%;\">\n      <ion-col size=\"4\" style=\"height: 100%;\">\n        <ion-row style=\"height: 70%;\">\n          <ion-col style=\"height: 100%;\">\n            <ion-card>\n              <app-table-list #tableListComponenet [(selectedTable)]=\"selectedTable\"></app-table-list>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n        <ion-row style=\"height: 30%;\">\n          <ion-col style=\"height: 100%;\">\n            <ion-card>Table Detail</ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n      <ion-col size=\"5\" style=\"height: 100%;\">\n        <ion-row style=\"height: 70%;\">\n          <ion-col style=\"height: 100%;\">\n            <ion-card>Bill List</ion-card>\n          </ion-col>\n        </ion-row>\n        <ion-row style=\"height: 30%;\">\n          <ion-col style=\"height: 100%;\">\n            <ion-card>Bill Summary</ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n      <ion-col size=\"3\" style=\"height: 100%;\">\n        <ion-card>Management Buttons</ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>";
    /***/
  },

  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/home/table-list/table-list.component.html":
  /*!*************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/table-list/table-list.component.html ***!
    \*************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppHomeTableListTableListComponentHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-grid>\n  <ion-row>\n    <ion-col *ngFor=\"let table of tableList\" size=\"4\">\n      <ion-button class=\"large-button\" [fill]=\"selectedTable === table ? 'outline' : 'solid'\"\n        [color]=\"table.status | tableStatusColor\" (click)=\"selectTable(table)\">{{table.name}}</ion-button>\n    </ion-col>\n  </ion-row>\n</ion-grid>";
    /***/
  },

  /***/
  "./src/app/home/home.module.ts":
  /*!*************************************!*\
    !*** ./src/app/home/home.module.ts ***!
    \*************************************/

  /*! exports provided: HomePageModule */

  /***/
  function srcAppHomeHomeModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePageModule", function () {
      return HomePageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/fesm2015/ionic-angular.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _home_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./home.pipe */
    "./src/app/home/home.pipe.ts");
    /* harmony import */


    var _home_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./home.page */
    "./src/app/home/home.page.ts");
    /* harmony import */


    var _table_list_table_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./table-list/table-list.component */
    "./src/app/home/table-list/table-list.component.ts");

    var HomePageModule = function HomePageModule() {
      _classCallCheck(this, HomePageModule);
    };

    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([{
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_7__["HomePage"]
      }])],
      declarations: [_home_pipe__WEBPACK_IMPORTED_MODULE_6__["TableStatusColorPipe"], _home_page__WEBPACK_IMPORTED_MODULE_7__["HomePage"], _table_list_table_list_component__WEBPACK_IMPORTED_MODULE_8__["TableListComponent"]]
    })], HomePageModule);
    /***/
  },

  /***/
  "./src/app/home/home.page.scss":
  /*!*************************************!*\
    !*** ./src/app/home/home.page.scss ***!
    \*************************************/

  /*! exports provided: default */

  /***/
  function srcAppHomeHomePageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "ion-card {\n  height: 100%;\n  margin: 0;\n}\n\nion-card.dark {\n  background: grey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL3J1bm5lci93b3JrL3Jlc3RhdXJhbnQtcGx1cy1jYXNoaWVyL3Jlc3RhdXJhbnQtcGx1cy1jYXNoaWVyL3NyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxTQUFBO0FDQ0Y7O0FERUE7RUFDRSxnQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImlvbi1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXJnaW46IDA7XG59XG5cbmlvbi1jYXJkLmRhcmsge1xuICBiYWNrZ3JvdW5kOiBncmV5O1xufSIsImlvbi1jYXJkIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXJnaW46IDA7XG59XG5cbmlvbi1jYXJkLmRhcmsge1xuICBiYWNrZ3JvdW5kOiBncmV5O1xufSJdfQ== */";
    /***/
  },

  /***/
  "./src/app/home/home.page.ts":
  /*!***********************************!*\
    !*** ./src/app/home/home.page.ts ***!
    \***********************************/

  /*! exports provided: HomePage */

  /***/
  function srcAppHomeHomePageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "HomePage", function () {
      return HomePage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var HomePage = function HomePage() {
      _classCallCheck(this, HomePage);
    };

    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-home',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./home.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./home.page.scss */
      "./src/app/home/home.page.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], HomePage);
    /***/
  },

  /***/
  "./src/app/home/home.pipe.ts":
  /*!***********************************!*\
    !*** ./src/app/home/home.pipe.ts ***!
    \***********************************/

  /*! exports provided: TableStatusColorPipe */

  /***/
  function srcAppHomeHomePipeTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TableStatusColorPipe", function () {
      return TableStatusColorPipe;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");

    var TableStatusColorPipe = /*#__PURE__*/function () {
      function TableStatusColorPipe() {
        _classCallCheck(this, TableStatusColorPipe);
      }

      _createClass(TableStatusColorPipe, [{
        key: "transform",
        value: function transform(status) {
          switch (status) {
            case 'Free':
              return 'secondary';

            case 'Using':
              return 'success';

            case 'Reserved':
              return 'tertiary';

            case 'Dirty':
              return 'warning';

            case 'Unavailable':
              return 'danger';
          }
        }
      }]);

      return TableStatusColorPipe;
    }();

    TableStatusColorPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
      name: 'tableStatusColor'
    })], TableStatusColorPipe);
    /***/
  },

  /***/
  "./src/app/home/table-list/table-list.component.scss":
  /*!***********************************************************!*\
    !*** ./src/app/home/table-list/table-list.component.scss ***!
    \***********************************************************/

  /*! exports provided: default */

  /***/
  function srcAppHomeTableListTableListComponentScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvdGFibGUtbGlzdC90YWJsZS1saXN0LmNvbXBvbmVudC5zY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/home/table-list/table-list.component.ts":
  /*!*********************************************************!*\
    !*** ./src/app/home/table-list/table-list.component.ts ***!
    \*********************************************************/

  /*! exports provided: TableListComponent */

  /***/
  function srcAppHomeTableListTableListComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "TableListComponent", function () {
      return TableListComponent;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var src_app_models_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! src/app/models/table */
    "./src/app/models/table.ts");

    var TableListComponent = /*#__PURE__*/function () {
      function TableListComponent() {
        _classCallCheck(this, TableListComponent);

        this.selectedTableChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
      }

      _createClass(TableListComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.fetchTableList();
        }
      }, {
        key: "ionViewDidEnter",
        value: function ionViewDidEnter() {
          debugger;
          this.fetchTableList();
        }
      }, {
        key: "selectTable",
        value: function selectTable(table) {
          this.selectedTable = table;
        }
      }, {
        key: "fetchTableList",
        value: function fetchTableList() {
          return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _this = this;

            var response;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return fetch(localStorage.getItem('serverApiBaseUrl') + '/table');

                  case 2:
                    response = _context.sent;
                    _context.next = 5;
                    return response.json();

                  case 5:
                    this.tableList = _context.sent;

                    if (this.selectedTable) {
                      this.selectedTable = this.tableList.find(function (table) {
                        return table.name == _this.selectedTable.name;
                      });
                    }

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
        }
      }, {
        key: "selectedTable",
        get: function get() {
          return this._selectedTable;
        },
        set: function set(value) {
          this._selectedTable = value;
          this.selectedTableChange.emit(value);
        }
      }]);

      return TableListComponent;
    }();

    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", src_app_models_table__WEBPACK_IMPORTED_MODULE_2__["Table"]), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [src_app_models_table__WEBPACK_IMPORTED_MODULE_2__["Table"]])], TableListComponent.prototype, "selectedTable", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)], TableListComponent.prototype, "selectedTableChange", void 0);
    TableListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-table-list',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./table-list.component.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/home/table-list/table-list.component.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./table-list.component.scss */
      "./src/app/home/table-list/table-list.component.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])], TableListComponent);
    /***/
  },

  /***/
  "./src/app/models/table.ts":
  /*!*********************************!*\
    !*** ./src/app/models/table.ts ***!
    \*********************************/

  /*! exports provided: Table */

  /***/
  function srcAppModelsTableTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Table", function () {
      return Table;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    var Table = function Table() {
      _classCallCheck(this, Table);

      this.occupied = 0;
      this.status = Table.Status.Unavailable;
    };

    Table.Status = {
      Free: 'Free',
      Using: 'Using',
      Reserved: 'Reserved',
      Dirty: 'Dirty',
      Unavailable: 'Unavailable'
    };
    /***/
  }
}]);
//# sourceMappingURL=home-home-module-es5.js.map