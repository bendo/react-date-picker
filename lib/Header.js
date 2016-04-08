'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _onEnter = require('./onEnter');

var _onEnter2 = _interopRequireDefault(_onEnter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createClass({

    displayName: 'DatePickerHeader',

    propTypes: {
        onChange: _react.PropTypes.func,
        onPrev: _react.PropTypes.func,
        onNext: _react.PropTypes.func,
        colspan: _react.PropTypes.number,
        children: _react.PropTypes.node
    },

    render: function render() {
        var _props = this.props;
        var onPrev = _props.onPrev;
        var onNext = _props.onNext;
        var prevText = _props.prevText;
        var nextText = _props.nextText;
        var children = _props.children;
        var colspan = _props.colspan;
        var onChange = _props.onChange;


        return _react2.default.createElement(
            'div',
            { className: 'dp-header' },
            _react2.default.createElement(
                'div',
                { className: 'dp-nav-table' },
                _react2.default.createElement(
                    'div',
                    { className: 'dp-row' },
                    _react2.default.createElement(
                        'div',
                        {
                            tabIndex: '1',
                            role: 'link',
                            className: 'dp-prev-nav dp-nav-cell dp-cell',
                            onClick: onPrev,
                            onKeyUp: (0, _onEnter2.default)(onPrev) },
                        prevText
                    ),
                    _react2.default.createElement(
                        'div',
                        { tabIndex: '1',
                            role: 'link',
                            className: 'dp-nav-view dp-cell',
                            colSpan: colspan,
                            onClick: onChange,
                            onKeyUp: (0, _onEnter2.default)(onChange) },
                        children
                    ),
                    _react2.default.createElement(
                        'div',
                        { tabIndex: '1',
                            role: 'link',
                            className: 'dp-next-nav dp-nav-cell dp-cell',
                            onClick: onNext,
                            onKeyUp: (0, _onEnter2.default)(onNext) },
                        nextText
                    )
                )
            )
        );
    }
});