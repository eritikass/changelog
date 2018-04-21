const get_repo_changelog = require('./render.js');

repo_url = 'https://github.com/steveukx/git-js.git';
const md_promise = get_repo_changelog(repo_url);
md_promise.then((r) => { console.log("Changelog markdown:"); console.log(r); });