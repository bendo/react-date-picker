'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _isInRange = require('./utils/isInRange');

var _isInRange2 = _interopRequireDefault(_isInRange);

var _onEnter = require('./onEnter');

var _onEnter2 = _interopRequireDefault(_onEnter);

var _asConfig = require('./utils/asConfig');

var _asConfig2 = _interopRequireDefault(_asConfig);

var _toMoment = require('./toMoment');

var _toMoment2 = _interopRequireDefault(_toMoment);

var _format = require('./utils/format');

var _format2 = _interopRequireDefault(_format);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TODAY;

function emptyFn() {}

var DecadeView = _react2.default.createClass({

    displayName: 'DecadeView',

    getDefaultProps: function getDefaultProps() {
        return (0, _asConfig2.default)();
    },

    /**
     * Returns all the years in the decade of the given value
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getYearsInDecade: function getYearsInDecade(value) {
        var year = (0, _moment2.default)(value).get('year');
        var offset = year % 10;

        year = year - offset - 1;

        var result = [];
        var i = 0;

        var start = (0, _moment2.default)(year, 'YYYY').startOf('year');

        for (; i < 12; i++) {
            result.push((0, _moment2.default)(start));
            start.add(1, 'year');
        }

        return result;
    },

    render: function render() {

        TODAY = +(0, _moment2.default)().startOf('day');

        var props = (0, _objectAssign2.default)({}, this.props);

        var viewMoment = props.viewMoment = (0, _moment2.default)(this.props.viewDate);

        if (!this.props.range) {
            props.moment = (0, _moment2.default)(props.date).startOf('year');
        }

        var yearsInView = this.getYearsInDecade(viewMoment);

        return _react2.default.createElement(
            'div',
            { className: 'dp-table dp-decade-view' },
            this.renderYears(props, yearsInView)
        );
    },

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderYears: function renderYears(props, days) {
        var nodes = days.map(function (date, index, arr) {
            return this.renderYear(props, date, index, arr);
        }, this);
        var len = days.length;
        var buckets = [];
        var bucketsLen = Math.ceil(len / 4);

        var i = 0;

        for (; i < bucketsLen; i++) {
            buckets.push(nodes.slice(i * 4, (i + 1) * 4));
        }

        return buckets.map(function (bucket, i) {
            return _react2.default.createElement(
                'div',
                { key: "row" + i, className: 'dp-row' },
                bucket
            );
        });
    },

    renderYear: function renderYear(props, date, index, arr) {
        var yearText = _format2.default.year(date, props.yearFormat);
        var classes = ["dp-cell dp-year"];

        var dateTimestamp = +date;

        if (props.range) {
            var start = date;
            var end = (0, _moment2.default)(start).endOf('year');

            var _props$range = _slicedToArray(props.range, 2);

            var rangeStart = _props$range[0];
            var rangeEnd = _props$range[1];


            if ((0, _isInRange2.default)(start, props.range) || (0, _isInRange2.default)(end, props.range) || rangeStart && (0, _isInRange2.default)(rangeStart, [start, end]) || rangeEnd && (0, _isInRange2.default)(rangeEnd, [start, end])) {
                classes.push('dp-in-range');
            }
        }

        if (dateTimestamp == props.moment && !props.range) {
            classes.push('dp-value');
        }

        if (!index) {
            classes.push('dp-prev');
        }

        if (index == arr.length - 1) {
            classes.push('dp-next');
        }

        var onClick = this.handleClick.bind(this, props, date);

        return _react2.default.createElement(
            'div',
            {
                role: 'link',
                tabIndex: '1',
                key: yearText,
                className: classes.join(' '),
                onClick: onClick,
                onKeyUp: (0, _onEnter2.default)(onClick)
            },
            yearText
        );
    },

    handleClick: function handleClick(props, date, event) {
        event.target.value = date;
        (props.onSelect || emptyFn)(date, event);
    }
});

DecadeView.getHeaderText = function (value, props) {
    var year = (0, _moment2.default)(value).get('year');
    var offset = year % 10;

    year = year - offset - 1;

    return year + ' - ' + (year + 11);
};

exports.default = DecadeView;