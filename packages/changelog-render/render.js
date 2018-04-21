const SimpleGit = require('simple-git/promise')
const Handlebars = require('handlebars');
const Octokit = require('@octokit/rest')();
const FS = require ('fs');

Octokit.authenticate({
    type: 'basic',
    username: process.env.GIT_USER,
    password: process.env.GIT_PASS
})

async function get_tags_commits(repo_path) {
    const sg = SimpleGit(repo_path);
    const tags_resolve = await sg.tags();
    const tags = tags_resolve.all;

    const tags_commits = [];
    for (var i = tags.length; i >= 1; --i) { // From newest to oldest version
        const from = i < tags.length ? tags[i] : 'HEAD';
        const to = tags[i - 1];
        const options = {'from': from, 'to': to}; // TODO: `from` inclusive, `to` exclusive?
        const log = await sg.log(options);
        const commits = log.all; // From newest to oldest commit
        tags_commits.push({'tag': from, 'commits': commits});
    }
    return tags_commits;
}

async function get_closed_reqs(repo_owner, repo_name, max_req_num) {
    console.log("Getting pull requests:", repo_owner, repo_name, max_req_num);

    // {owner, repo, state, head: 'user:branch', base: 'branch', sort, direction, page, per_page}
    const args = {owner: repo_owner, repo: repo_name, state: 'closed', direction: 'desc'};
    
    // Get older pull requests by looping through pages (one octokit call per page).
    var next_page = 1;
    var remaining_num = max_req_num;
    const reqs = [];
    while (remaining_num > 0) {

        args.page = next_page;                       // Octokit limits the number of requests
        args.per_page = Math.min(remaining_num, 99); // that can be downloaded at once to 99.

        const download = await Octokit.pullRequests.getAll(args); // TODO: Parallel downloads?
        const downloaded_num = download.data.length;
        if (downloaded_num == 0) break; // No pull requests left to download

        for (var i = 0; i < downloaded_num; ++i) reqs.push(download.data[i]);
        next_page += 1;
        remaining_num -= downloaded_num;
    }
    console.log("Got pull requests:", repo_owner, repo_name, reqs.length);
    return reqs;
}

const MAX_REQ_NUM = 200; // TODO: Make parameter somewhere instead of constant.

async function get_tags_reqs(repo_owner, repo_name, repo_path, tags_commits_promise) {
    if (!tags_commits_promise) tags_commits_promise = get_tags_commits(repo_path);
    const tags_commits = await tags_commits_promise;

    const all_reqs = await get_closed_reqs(repo_owner, repo_name, MAX_REQ_NUM);
    
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
                // console.log("WARNING: Same pull request under multiple tags?");
                // console.log(hash, tag, j);
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
        * {{title}} [#{{number}}]({{html_url}})
    {{/reqs}}
{{/for_each_tag}}`;

    const template = Handlebars.compile(md_source);
    return template;
}

function use_template(template, tags_reqs) {
    const data = {'for_each_tag': tags_reqs};
    const markdown = template(data);
    return markdown;
}

async function maybe_clone_repo(repo_owner, repo_name) { // Caches repos.
    const repo_path = './tmp_repos/' + repo_name; // TODO: Include `repo_owner` in path.
    if (FS.existsSync(repo_path)) {
        console.log("Repo cached at", repo_path);
        return repo_path; // Repo was already cloned earlier.
    }

    const repo_url = 'https://github.com/' + repo_owner + '/' + repo_name + '.git';
    console.log("Cloning", repo_url);
    await SimpleGit('.').clone(repo_url, repo_path);
    console.log("Cloned into", repo_path);
    return repo_path;
}

async function get_repo_changelog(repo_owner, repo_name) {
    const repo_path = await maybe_clone_repo(repo_owner, repo_name);
    const tags_reqs = await get_tags_reqs(repo_owner, repo_name, repo_path);
    return use_template(get_template(), tags_reqs);
}

module.exports = {get_repo_changelog: get_repo_changelog, get_tags_commits: get_tags_commits};