export const moment = require('moment');

export const today = moment() 

export const startDayOfWeek = moment().day("Monday") //gets date 'x'day of current week 

export const startDayOfMonth = moment().date(1) //gets the date of 1st of current month

export const startDayOfTwoMonthsAgo = today.subtract(2, 'months').date(1) //gets day 1 of 2 months prior

export const convertISOToNiceDate = (ISODateString) => {
    moment(ISODateString)
}
