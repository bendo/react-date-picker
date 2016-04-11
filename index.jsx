require('./style/base.styl');
require('./style/theme/bootstrap/index.styl');

import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './src/index';
import DateTimeField from './src/DateTimeField';

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

                <DateTimeField highlightWeekends={true}
                               locale={LOCALE}
                               weekNumbers/>

                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        )
    },

    onRangeChange: function (rangeValue) {
        //range = rangeValue
        //date = rangeValue
        //this.setState({})
    }
});

/*<DatePicker style={{width: 300, height: 250}}
 xweekStartDay={3}
 highlightWeekends={true}
 locale={LOCALE}
 weekNumbers
 //defaultRange={range}
 defaultDate={date}
 //onChange={this.onRangeChange}
 //onRangeChange={this.onRangeChange}
 xweekDayNames={['S','M','T','W','T','F','S']}
 />*/

ReactDOM.render(<App />, document.getElementById('content'));
