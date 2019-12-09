'use strict'

const Instagram = require('instagram-web-api')

class InstagramService {
  constructor(Config) {
    this._instagramConfig = Config.get('instagram')

    this._client = new Instagram({
      username: this._instagramConfig.username,
      password: this._instagramConfig.password
    })
  }

  async authenticate() {
    await this._client.login()

    const profile = await this._client.getProfile()

    return profile
  }
}

module.exports = InstagramService
