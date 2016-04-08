import React, {PropTypes} from 'react';
import onEnter from './onEnter';

export default React.createClass({

    displayName: 'DatePickerHeader',

    propTypes: {
        onChange: PropTypes.func,
        onPrev: PropTypes.func,
        onNext: PropTypes.func,
        colspan: PropTypes.number,
        children: PropTypes.node
    },

    render: function () {
        const {onPrev, onNext, prevText, nextText, children, colspan, onChange} = this.props;

        return <div className="dp-header">
            <div className="dp-nav-table">
                <div className="dp-row">
                    <div
                        tabIndex="1"
                        role="link"
                        className="dp-prev-nav dp-nav-cell dp-cell"
                        onClick={onPrev}
                        onKeyUp={onEnter(onPrev)}>
                        {prevText}
                    </div>

                    <div tabIndex="1"
                         role="link"
                         className="dp-nav-view dp-cell"
                         colSpan={colspan}
                         onClick={onChange}
                         onKeyUp={onEnter(onChange)}>
                        {children}
                    </div>

                    <div tabIndex="1"
                         role="link"
                         className="dp-next-nav dp-nav-cell dp-cell"
                         onClick={onNext}
                         onKeyUp={onEnter(onNext)}>
                        {nextText}
                    </div>
                </div>
            </div>
        </div>
    }
});
