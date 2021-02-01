(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('rxjs'), require('rxjs/operators'), require('react')) :
    typeof define === 'function' && define.amd ? define(['exports', 'rxjs', 'rxjs/operators', 'react'], factory) :
    (factory((global.rxreact = {}),global.rxjs,global.operators,global.React));
}(this, (function (exports,rxjs,operators,React) { 'use strict';

    React = React && React.hasOwnProperty('default') ? React['default'] : React;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function mapObjectFromKeysOf(o, mapFn) {
        return Object.keys(o).reduce(function (acc, k) {
            acc[k] = mapFn(k);
            return acc;
        }, {});
    }
    function mapArrayFromKeysOf(o, mapFn) {
        return Object.keys(o).map(mapFn);
    }
    function toupleArrayToDict(toupleArray) {
        return toupleArray.reduce(function (acc, _a) {
            var key = _a[0], value = _a[1];
            acc[key] = value;
            return acc;
        }, {});
    }

    function subjectMapToActionMap(subjectMap) {
        return mapObjectFromKeysOf(subjectMap, function (key) { return function (val) {
            return subjectMap[key].next(val);
        }; });
    }

    function combineObservables(observables) {
        var observableArray = mapArrayFromKeysOf(observables, function (key) {
            return observables[key].pipe(operators.map(function (value) { return [key, value]; }));
        });
        return rxjs.combineLatest.apply(void 0, observableArray).pipe(operators.map(toupleArrayToDict));
    }

    function getObservableState(inputs) {
        if (inputs instanceof rxjs.Observable) {
            return inputs;
        }
        return inputs ? combineObservables(inputs) : rxjs.of({});
    }
    function withViewModelFactory(viewModelFactory) {
        return function wrapWithConnect(WrappedComponent) {
            return /** @class */ (function (_super) {
                __extends(ConnectState, _super);
                function ConnectState(props) {
                    var _this = _super.call(this, props) || this;
                    _this.propsObservable = new rxjs.ReplaySubject(1);
                    var viewModel = viewModelFactory(_this.propsObservable);
                    _this.observableState = getObservableState(viewModel.inputs);
                    _this.actions = viewModel.outputs
                        ? subjectMapToActionMap(viewModel.outputs)
                        : {};
                    return _this;
                }
                ConnectState.prototype.componentDidMount = function () {
                    var _this = this;
                    this.propsObservable.next(this.props);
                    this.subscription = this.observableState.subscribe(function (newState) { return _this.setState(newState); });
                };
                ConnectState.prototype.componentDidUpdate = function (prevProps) {
                    if (this.props !== prevProps) {
                        this.propsObservable.next(this.props);
                    }
                };
                ConnectState.prototype.componentWillUnmount = function () {
                    this.subscription && this.subscription.unsubscribe();
                };
                ConnectState.prototype.render = function () {
                    if (this.state !== null) {
                        return React.createElement(WrappedComponent, __assign({}, this.state, this.actions, this.props));
                    }
                    else {
                        return null;
                    }
                };
                return ConnectState;
            }(React.Component));
        };
    }
    function withViewModelSimple(viewModel) {
        return function wrapWithViewModel(WrappedComponent) {
            return withViewModelFactory(function (_) { return viewModel; })(WrappedComponent);
        };
    }
    function withViewModel(viewModel) {
        if (typeof viewModel === "function") {
            return withViewModelFactory(viewModel);
        }
        else {
            return withViewModelSimple(viewModel);
        }
    }

    exports.withViewModel = withViewModel;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
