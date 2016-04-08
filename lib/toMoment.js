'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value, dateFormat, config) {
    var strict = !!(config && config.strict);
    var locale = config && config.locale;

    dateFormat = dateFormat || _config2.default.dateFormat;

    if (typeof value == 'string') {
        return (0, _moment2.default)(value, dateFormat, locale, strict);
    }

    // return moment.isMoment(value)?
    // 			value:
    return (0, _moment2.default)(value == null ? new Date() : value, undefined, locale, strict);
};

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

/**
 * This function will be used to convert a date to a moment.
 *
 * It accepts input as sring, date or moment
 *
 * @param  {String/Date/Moment} value
 * @param  {String} [dateFormat] if value is string, it will be parsed to a moment using this format
 * @param  {Object} [config]
 * @param  {Boolean} [config.strict] whether to perform strict parsing on strings
 * @return {Moment}
 */