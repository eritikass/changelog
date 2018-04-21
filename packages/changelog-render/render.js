// const html_source = `<ul>{{#pull_reqs}}
//     <li>{{title}} (<a href="{{url}}">#{{number}}</a>)</li>
// {{/pull_reqs}}</ul>`;

// sg.checkIsRepo((err, is_repo) => { console.log(err, is_repo); })

const SimpleGit = require('simple-git/promise')
const Handlebars = require('handlebars');

const example_reqs = require('./example-pull-requests.json');


async function get_tags_commits(repo_path) {
    const sg = SimpleGit(repo_path);
    const tags_resolve = await sg.tags();
    const tags = tags_resolve.all;

    const tags_commits = [];
    for (var i = tags.length; i >= 1; --i) { // From newest to oldest version
        
        const from = tags[i - 1];
        const to = i < tags.length ? tags[i] : undefined;
        const options = {'from': from, 'to': to}; // TODO: `from` inclusive, `to` exclusive?
        
        const log = await sg.log(options);
        const commits = log.all;
        commits.reverse(); // From newest to oldest commit
        
        tags_commits.push({'tag': from, 'commits': commits});
    }
    return tags_commits;
}

function get_closed_reqs(repo_url) { // TODO: `async function` ?
    var reqs; // TODO
    // `reqs` sorted from oldest to newest.
    return reqs;
}

async function get_tags_reqs(repo_url, repo_path, tags_commits_promise) {
    if (!tags_commits_promise) tags_commits_promise = get_tags_commits(repo_path);
    const tags_commits = await tags_commits_promise;

    const all_reqs = get_closed_reqs(repo_url);
    
    const req_idx_from_hash = {};
    for (var i = 0; i < all_reqs.length; ++i) {
        const hash = all_reqs[i].merge_commit_sha;
        req_idx_from_hash[hash] = i;
    }

    const tags_reqs = [];
    for (var i = 0; i < tags_commits.length; ++i) {
        const tag = tags_commits[i].tag;
        const tag_commits = tags_commits[i].commits;
        
        const tag_reqs = [];
        for (var j = 0; j < tag_commits.length; ++j) {
            const hash = tag_commits[j].hash;
            const idx = req_idx_from_hash[hash];
            if (idx === true) {
                console.log("WARNING: Same pull request under multiple tags?");
                console.log(hash, tag, j);
            } else if (!!idx || idx === 0) {
                tag_reqs.push(all_reqs[idx]);
                req_idx_from_hash[hash] = true; // Warn about multiple use (see above).
            }
        }
        tags_reqs.push({'tag': tags_commits[i].tag, 'reqs': tag_reqs});
    }
    return tags_reqs;
}

function get_template() {
    const md_source = `
{{#for_each_tag}}
    {{tag}}
    {{#reqs}}
        * {{title}} [#{{number}}]({{url}})
    {{/reqs}}
{{/for_each_tag}}`;

    const template = Handlebars.compile(md_source);
    return template;
}

async function use_template(template, tags_reqs_promise) {
    const tags_reqs = await tags_reqs_promise;
    const data = {'for_each_tag': tags_reqs};
    const md_promise = template(data);
    return md_promise;
}

async function maybe_clone_repo(repo_url) { // TODO: Repo caching?
    console.log("Cloning", repo_url);
    const repo_path = './tmp_repo';
    await SimpleGit('.').clone(repo_url, repo_path);
    console.log("Cloned into", repo_path);
    return repo_path;
}

async function get_repo_changelog(repo_url) {
    const repo_path = await maybe_clone_repo(repo_url);
    const tags_reqs_promise = get_tags_reqs(repo_url, repo_path);
    // tags_reqs_promise.then((r) => console.log(r));
    return use_template(get_template(), tags_reqs_promise);
}

module.exports = get_repo_changelog;