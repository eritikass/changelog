const Render = require('./render.js');

var repos = [['facebook', 'jest'], ['eventum', 'eventum']]
var repo_owner, repo_name;
[repo_owner, repo_name] = repos[1];
const md_promise = Render.get_repo_changelog(repo_owner, repo_name);
md_promise.then((md) => { console.log("Changelog markdown:"); console.log(md); });