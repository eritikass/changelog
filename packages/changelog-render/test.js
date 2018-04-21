const Render = require('./render');

const repo = Render.start('litvand', 'changelog-test');
Render.push_changelog(repo).then(() => console.log('Done.'));