const { ServiceProvider } = require('@adonisjs/fold')

class DateProvider extends ServiceProvider {
  register() {
    this.app.singleton('DateFns', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('.'))(Config)
    })
  }
}

module.exports = DateProvider
