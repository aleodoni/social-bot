'use strict'

const DateFns = require('date-fns')
const Config = use('Config')

class Date {
  constructor() {
    this._dateConfig = Config.get('date')
  }

  format(date) {
    return DateFns.format(date, this._dateConfig.format)
  }

  parseISO(strDate) {
    return DateFns.parseISO(strDate)
  }

  startOfDay(date) {
    return DateFns.startOfDay(date)
  }

  endOfDay(date) {
    return DateFns.endOfDay(date)
  }
}

module.exports = Date
