const get_repo_changelog = require('./render.js');

var repo_owner, repo_name;
[repo_owner, repo_name] = false ? ['steveukx', 'git-js'] : ['facebook', 'jest'];
const md_promise = get_repo_changelog(repo_owner, repo_name);
md_promise.then((md) => { console.log("Changelog markdown:"); console.log(md); });