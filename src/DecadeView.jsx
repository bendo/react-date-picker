import React from 'react';
import moment from 'moment';
import assign from 'object-assign';
import isInRange from './utils/isInRange';
import onEnter from './onEnter';
import asConfig from './utils/asConfig';
import toMoment from './toMoment';
import FORMAT from './utils/format';

var TODAY;

function emptyFn() {
}

var DecadeView = React.createClass({

    displayName: 'DecadeView',

    getDefaultProps: function () {
        return asConfig()
    },

    /**
     * Returns all the years in the decade of the given value
     *
     * @param  {Moment/Date/Number} value
     * @return {Moment[]}
     */
    getYearsInDecade: function (value) {
        var year = moment(value).get('year');
        var offset = year % 10;

        year = year - offset - 1;

        var result = [];
        var i = 0;

        var start = moment(year, 'YYYY').startOf('year');

        for (; i < 12; i++) {
            result.push(moment(start));
            start.add(1, 'year')
        }

        return result
    },

    render: function () {

        TODAY = +moment().startOf('day');

        var props = assign({}, this.props);

        var viewMoment = props.viewMoment = moment(this.props.viewDate);

        if (!this.props.range) {
            props.moment = moment(props.date).startOf('year')
        }

        var yearsInView = this.getYearsInDecade(viewMoment);

        return (
            <div className="dp-table dp-decade-view">
                {this.renderYears(props, yearsInView)}
            </div>
        )
    },

    /**
     * Render the given array of days
     * @param  {Moment[]} days
     * @return {React.DOM}
     */
    renderYears: function (props, days) {
        var nodes = days.map(function (date, index, arr) {
            return this.renderYear(props, date, index, arr)
        }, this);
        var len = days.length;
        var buckets = [];
        var bucketsLen = Math.ceil(len / 4);

        var i = 0;

        for (; i < bucketsLen; i++) {
            buckets.push(nodes.slice(i * 4, (i + 1) * 4))
        }

        return buckets.map(function (bucket, i) {
            return <div key={"row" + i} className="dp-row">{bucket}</div>
        })
    },

    renderYear: function (props, date, index, arr) {
        var yearText = FORMAT.year(date, props.yearFormat);
        var classes = ["dp-cell dp-year"];

        var dateTimestamp = +date;

        if (props.range) {
            const start = date;
            const end = moment(start).endOf('year');

            const [rangeStart, rangeEnd] = props.range;

            if (
                isInRange(start, props.range) ||
                isInRange(end, props.range) ||
                rangeStart && isInRange(rangeStart, [start, end]) ||
                rangeEnd && isInRange(rangeEnd, [start, end])
            ) {
                classes.push('dp-in-range')
            }
        }

        if (dateTimestamp == props.moment && !props.range) {
            classes.push('dp-value')
        }

        if (!index) {
            classes.push('dp-prev')
        }

        if (index == arr.length - 1) {
            classes.push('dp-next')
        }

        var onClick = this.handleClick.bind(this, props, date);

        return (
            <div
                role="link"
                tabIndex="1"
                key={yearText}
                className={classes.join(' ')}
                onClick={onClick}
                onKeyUp={onEnter(onClick)}
            >
                {yearText}
            </div>
        )
    },

    handleClick: function (props, date, event) {
        event.target.value = date
        ;
        (props.onSelect || emptyFn)(date, event)
    }
});

DecadeView.getHeaderText = function (value, props) {
    var year = moment(value).get('year');
    var offset = year % 10;

    year = year - offset - 1;

    return year + ' - ' + (year + 11)
};

export default DecadeView
