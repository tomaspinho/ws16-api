const startups = require('./startups');

const filterFn = (startup) => startup.country === 'Portugal';

console.log(startups.filter(filterFn));
