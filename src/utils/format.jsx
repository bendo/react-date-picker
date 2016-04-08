import CONFIG from '../config';
import toMoment from '../toMoment';

function f(mom, format) {
    return toMoment(mom).format(format)
}

export default {
    day: function (mom, format) {
        return f(mom, format || CONFIG.dayFormat)
    },

    month: function (mom, format) {
        return f(mom, format || CONFIG.monthFormat)
    },

    year: function (mom, format) {
        return f(mom, format || CONFIG.yearFormat)
    }
}
