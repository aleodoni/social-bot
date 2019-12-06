require('dotenv').config();
const puppeteer = require('puppeteer');

const instagram = {
  browser: null,
  page: null,

  initialize: async () => {

    instagram.browser = await puppeteer.launch({
      headless: false,
    });

    instagram.page = await instagram.browser.newPage();

  },

  login: async(username, password) => {

    await instagram.page.goto(process.env.IG_BASE, {timeout: 6000});

    await instagram.page.waitFor(2500);

    let loginButtton = await instagram.page.$x('//a[contains(text(), "Conecte-se")]');

    await loginButtton[0].click();

    // await instagram.page.waitForNavigation({waitUntil: 'networkidle2'});

    await instagram.page.waitFor(2500);

    await instagram.page.click('input[name="username"]');
    await instagram.page.type('input[name="username"]', username, { delay: 100 });

    await instagram.page.click('input[name="password"]');
    await instagram.page.type('input[name="password"]', password, { delay: 100 });

    await instagram.page.click('button[type="submit"]');

    debugger;

  }
}

module.exports = instagram;
