"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var utils_1 = require("./utils");
function combineObservables(observables) {
    var observableArray = utils_1.mapArrayFromKeysOf(observables, function (key) {
        return observables[key].pipe(operators_1.map(function (value) { return [key, value]; }));
    });
    return rxjs_1.combineLatest.apply(void 0, observableArray).pipe(operators_1.map(utils_1.toupleArrayToDict));
}
exports.combineObservables = combineObservables;
//# sourceMappingURL=combineObservables.js.map