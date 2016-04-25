import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Size from './utils/Size';
import DatePicker from './DatePicker';


const DateTimeField = React.createClass({
    getInitialState() {
        return {
            showPicker: false,
            inputValue: this.props.date == '' ? '' : this.getLocaleDate().format('L'),
            widgetStyle: {
                display: 'block',
                position: 'absolute',
                left: -9999,
                zIndex: '9999 !important'
            }
        };
    },

    size() {
        switch (this.props.size) {
            case Size.SIZE_SMALL:
                return 'form-group-sm';
            case Size.SIZE_LARGE:
                return 'form-group-lg';
        }

        return '';
    },

    onClick() {
        let classes, gBCR, offset, placePosition, scrollTop, styles;
        if (this.state.showPicker) {
            return this.closePicker();
        } else {
            this.setState({
                showPicker: true
            });
            gBCR = this.refs.dtpbutton.getBoundingClientRect();
            classes = {
                "bootstrap-datetimepicker-widget": true,
                "dropdown-menu": true
            };
            offset = {
                top: gBCR.top + window.pageYOffset - document.documentElement.clientTop,
                left: gBCR.left + window.pageXOffset - document.documentElement.clientLeft
            };
            offset.top = offset.top + this.refs.datetimepicker.offsetHeight;
            scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            placePosition = this.props.direction === "up" ? "top" : this.props.direction === "bottom" ? "bottom" : this.props.direction === "auto" ? offset.top + this.refs.widget.offsetHeight > window.offsetHeight + scrollTop && this.refs.widget.offsetHeight + this.refs.datetimepicker.offsetHeight > offset.top ? "top" : "bottom" : void 0;
            if (placePosition === "top") {
                offset.top = -this.refs.widget.offsetHeight - this.clientHeight - 2;
                classes.top = true;
                classes.bottom = false;
                classes["pull-right"] = true;
            } else {
                offset.top = 62;
                classes.top = false;
                classes.bottom = true;
                classes["pull-right"] = true;
            }
            styles = {
                display: "block",
                position: "absolute",
                zIndex: 999,
                top: offset.top,
                left: "auto",
                right: 40
            };
            return this.setState({
                widgetStyle: styles,
                widgetClasses: classes
            });
        }
    },

    onDateChange(dateText) {
        const formattedDate = moment(dateText).locale(this.props.locale || 'en').format('L');
        this.setState({inputValue: formattedDate});
        this.closePicker();
        this.props.onChange(moment(dateText).format('YYYY-MM-DD'), moment(dateText));
    },

    onInputChange(e) {
        const date = e.target.value;
        if (moment(date, this.getLocaleDate().localeData().longDateFormat('L'), true).isValid()) {
            const m = moment(date, this.getLocaleDate().localeData().longDateFormat('L'));
            const d = m.format('YYYY-MM-DD');
            this.props.onChange(d, m);
        } else {
            this.props.onChange('', undefined);
        }
        return this.setState({defaultDate: date, inputValue: date});
    },

    closePicker() {
        let style = {...this.state.widgetStyle};
        style.left = -9999;
        style.display = 'none';
        return this.setState({
            showPicker: false,
            widgetStyle: style
        });
    },

    renderOverlay() {
        const styles = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: '999'
        };
        if (this.state.showPicker) {
            return (<div onClick={this.closePicker} style={styles}></div>);
        } else {
            return <span />;
        }
    },

    getLocaleDate() {
        return moment(this.props.date).locale(this.props.locale || 'en');
    },

    getDate() {
        return this.state.inputValue == '' ? moment().locale(this.props.locale || 'en') :
            moment(this.state.inputValue, this.getLocaleDate().localeData().longDateFormat('L')).format();
    },

    render() {
        const datePicker = (
            <li>
                <DatePicker closePicker={this.closePicker}
                            defaultDate={this.getDate()}
                            dateFormat={this.props.dateFormat}
                            grayElapsedDays={this.props.grayElapsedDays}
                            highlightWeekends={this.props.highlightWeekends}
                            locale={this.props.locale}
                            minDate={moment(this.props.minDate)}
                            maxDate={moment(this.props.maxDate)}
                            onChange={this.onDateChange}
                            style={{width: 300, height: 250}}
                            weekNumbers/>
            </li>
        );

        return (
            <div>
                {this.renderOverlay()}
                <div className={classNames(this.props.widgetClasses)} style={this.state.widgetStyle}>
                    <ul className="list-unstyled">
                        {datePicker}
                    </ul>
                </div>

                <div className={'input-group date ' + this.size()} ref='datetimepicker'>
                    <input className='form-control' onChange={this.onInputChange} type='text'
                           value={this.state.inputValue} {...this.props.inputProps}/>
                    <span className='input-group-addon' onBlur={this.onBlur} onClick={this.onClick} ref='dtpbutton'>
                        <span className={classNames('glyphicon', 'glyphicon-calendar')}/>
                    </span>
                </div>
            </div>
        );
    },

    propTypes: {
        date: React.PropTypes.string.isRequired,
        locale: React.PropTypes.string,
        highlightWeekends: React.PropTypes.bool,
        minDate: React.PropTypes.string,
        maxDate: React.PropTypes.string,
        size: React.PropTypes.string,
        onChange: React.PropTypes.func
    }
});

export default DateTimeField
