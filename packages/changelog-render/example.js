const Render = require('./render.js');

const examples = [['facebook', 'jest'], ['eventum', 'eventum']]
const example = examples[1];
const repo = Render.start(example[0], example[1]);
const md_promise = Render.changelog(repo);
md_promise.then((md) => { console.log("Changelog markdown:"); console.log(md); });