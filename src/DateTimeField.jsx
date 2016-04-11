import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Size from './utils/Size';
import DatePicker from './index';


const DateTimeField = React.createClass({
    getInitialState() {
        return {
            showPicker: false,
            inputValue: undefined,
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
                offset.top = 75;
                classes.top = false;
                classes.bottom = true;
                classes["pull-right"] = true;
            }
            styles = {
                display: "block",
                position: "absolute",
                top: offset.top,
                left: "auto",
                right: 10
            };
            return this.setState({
                widgetStyle: styles,
                widgetClasses: classes
            });
        }
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

    render() {
        const datePicker = (
            <li>
                <DatePicker style={{width: 300, height: 250}}
                            highlightWeekends={true}
                            locale={this.props.locale}
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
                    <input className='form-control' onChange={this.onChange} type='text'
                           value={this.state.inputValue} {...this.props.inputProps}/>
              <span className='input-group-addon' onBlur={this.onBlur} onClick={this.onClick} ref='dtpbutton'>
                <span className={classNames('glyphicon', 'glyphicon-calendar')}/>
              </span>
                </div>
            </div>
        );
    }
});

export default DateTimeField
