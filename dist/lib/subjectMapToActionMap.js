"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
function subjectMapToActionMap(subjectMap) {
    return utils_1.mapObjectFromKeysOf(subjectMap, function (key) { return function (val) {
        return subjectMap[key].next(val);
    }; });
}
exports.subjectMapToActionMap = subjectMapToActionMap;
//# sourceMappingURL=subjectMapToActionMap.js.map