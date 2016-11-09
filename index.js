const rp = require('request-promise').defaults({ json: true });;
const pages = 90;

const promises = [];
for (let i = 0; i < 90; i++) {
  promises.push(rp.get(`https://api.cilabs.net/v1/conferences/ws16/info/startups` +
    `/alumni?limit=25&page=${i}`)
    .then(data => {
      console.log(`Got data for page ${i}`);
      return data;
    }));
}

Promise.all(promises)
  .then(pages => pages.map(page => page.startups))
  .then(startupPages => [].concat.apply([], startupPages))
  .then(startups => {
    console.log(startups);
    require('fs').writeFileSync('startups.json', JSON.stringify(startups));
  })
  .catch(err => console.error('errored', err));
