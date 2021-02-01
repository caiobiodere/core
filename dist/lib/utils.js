"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapObjectFromKeysOf(o, mapFn) {
    return Object.keys(o).reduce(function (acc, k) {
        acc[k] = mapFn(k);
        return acc;
    }, {});
}
exports.mapObjectFromKeysOf = mapObjectFromKeysOf;
function mapArrayFromKeysOf(o, mapFn) {
    return Object.keys(o).map(mapFn);
}
exports.mapArrayFromKeysOf = mapArrayFromKeysOf;
function toupleArrayToDict(toupleArray) {
    return toupleArray.reduce(function (acc, _a) {
        var key = _a[0], value = _a[1];
        acc[key] = value;
        return acc;
    }, {});
}
exports.toupleArrayToDict = toupleArrayToDict;
//# sourceMappingURL=utils.js.map