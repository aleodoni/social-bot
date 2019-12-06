const ig = require('./instagram');

(async () => {
  await ig.initialize();

  await ig.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);

  debugger;
})()
