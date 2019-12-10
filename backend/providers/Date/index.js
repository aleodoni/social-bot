'use strict'

const DateFns = require('date-fns')
const Config = use('Config')

class Date {
  constructor() {
    this._dateConfig = Config.get('date')
  }

  format(date) {
    console.log('==============================1')
    console.log(this._dateConfig.format)
    return DateFns.format(date, this._dateConfig.format)
  }

  parseISO(strDate) {
    return DateFns.parseISO(strDate)
  }
}

module.exports = Date
