'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _react2.default.createClass({

    displayName: 'WeekView',

    getDefaultProps: function getDefaultProps() {
        return {
            days: [],
            date: null
        };
    },

    getDaysForView: function getDaysForView(value) {
        var first = (0, _moment2.default)(value).startOf('month');
        var start = this.getWeekStartMoment(first);
        var result = [];
        var i = 0;

        if (first.add('days', -1).isBefore(start)) {
            //make sure the last day of prev month is included
            start.add('weeks', -1);
        }

        for (; i < 42; i++) {
            result.push((0, _moment2.default)(start));
            start.add('days', 1);
        }

        return result;
    },

    render: function render() {

        var days = this.props.days;
        var date = this.props.date;

        return _react2.default.createElement(
            'table',
            null,
            _react2.default.createElement(
                'tbody',
                null,
                weekDayNames.map(renderDayName)
            )
        );
    }

});