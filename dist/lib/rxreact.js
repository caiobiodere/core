"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var subjectMapToActionMap_1 = require("./subjectMapToActionMap");
var combineObservables_1 = require("./combineObservables");
var rxjs_1 = require("rxjs");
function getObservableState(inputs) {
    if (inputs instanceof rxjs_1.Observable) {
        return inputs;
    }
    return inputs ? combineObservables_1.combineObservables(inputs) : rxjs_1.of({});
}
function withViewModelFactory(viewModelFactory) {
    return function wrapWithConnect(WrappedComponent) {
        return /** @class */ (function (_super) {
            __extends(ConnectState, _super);
            function ConnectState(props) {
                var _this = _super.call(this, props) || this;
                _this.propsObservable = new rxjs_1.ReplaySubject(1);
                var viewModel = viewModelFactory(_this.propsObservable);
                _this.observableState = getObservableState(viewModel.inputs);
                _this.actions = viewModel.outputs
                    ? subjectMapToActionMap_1.subjectMapToActionMap(viewModel.outputs)
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
                    return react_1.default.createElement(WrappedComponent, __assign({}, this.state, this.actions, this.props));
                }
                else {
                    return null;
                }
            };
            return ConnectState;
        }(react_1.default.Component));
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
//# sourceMappingURL=rxreact.js.map