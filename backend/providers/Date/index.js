'use strict'

const DateFns = require('date-fns')

const Config = use('Config')
const GeneralException = use('App/Exceptions/GeneralException')

class Date {
  constructor() {
    this._dateConfig = Config.get('date')
  }

  format(date) {
    return DateFns.format(date, this._dateConfig.format)
  }

  parseISO(strDate) {
    const parsedDate = DateFns.parseISO(strDate)

    if (parsedDate.toJSON() === null) {
      throw new GeneralException(400, 'Invalid date')
    }
    return parsedDate
  }

  startOfDay(date) {
    return DateFns.startOfDay(date)
  }

  endOfDay(date) {
    return DateFns.endOfDay(date)
  }

  compareAsc(dateLeft, dateRight) {
    return DateFns.compareAsc(dateLeft, dateRight)
  }
}

module.exports = Date
