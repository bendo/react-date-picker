require('./style/base.styl');
require('./style/theme/bootstrap/index.styl');

import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './src/index';

let range = ['2016-02-01', '2016-02-09'];
let date = moment().add(2, 'days');

let LOCALE = 'en';

const TODAY = {
    en: 'Today',
    fr: 'Aujourd\'hui',
    de: 'Heute',
    es: 'Hoy',
    ro: 'Azi'
};

const App = React.createClass({
    displayName: 'App',

    onLocaleChange: function (event) {
        LOCALE = event.target.value;
        this.setState({})
    },

    render: function () {
        range = this.props.range || range;
        date = this.props.date || date;

        return (
            <div style={{margin: 10}}>

                <p>Select locale:
                    <select value={LOCALE} onChange={this.onLocaleChange}>
                        <option value="en">English (US)</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                        <option value="ro">Romanian</option>
                    </select>
                </p>

                <DatePicker style={{width: 300, height: 250}}
                            xweekStartDay={3}
                            highlightWeekends={true}
                            locale="en"
                            weekNumbers
                    //defaultRange={range}
                            defaultDate={date}
                    //onChange={this.onRangeChange}
                    //onRangeChange={this.onRangeChange}
                            xweekDayNames={['S','M','T','W','T','F','S']}
                />
            </div>
        )
    },

    onRangeChange: function (rangeValue) {
        //range = rangeValue
        //date = rangeValue
        //this.setState({})
    }
});

ReactDOM.render(<App />, document.getElementById('content'));
