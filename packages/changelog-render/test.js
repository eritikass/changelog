const Render = require('./render.js');


/* Render.get_tags_commits('./tmp_repos/git-js').then((tags_commits) => {
    for (var i = 0; i < tags_commits.length; ++i) {
        console.log(tags_commits[i].tag);
        for (var j = 0; j < tags_commits[i].commits.length; ++j) {
            const hash = tags_commits[i].commits[j].hash;
            if (hash == '2bc60762b6379c85ca202ded061af2ff45f6a5ad') console.log("FOUND");
        }
    }
});*/

var repos = [['steveukx', 'git-js'], ['facebook', 'jest'], ['eventum', 'eventum']]
var repo_owner, repo_name;
[repo_owner, repo_name] = repos[1];
const md_promise = Render.get_repo_changelog(repo_owner, repo_name);
md_promise.then((md) => { console.log("Changelog markdown:"); console.log(md); });