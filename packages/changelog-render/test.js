const Render = require('./render');

const repo = Render.start('eventum', 'eventum');
Render.changelog(repo).then((c) => console.log(c));