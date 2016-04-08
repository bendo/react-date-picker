'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = onKeyUp;
function onKeyUp(fn) {
    return function (event) {
        if (event.key == 'Enter') {
            fn(event);
        }
    };
}