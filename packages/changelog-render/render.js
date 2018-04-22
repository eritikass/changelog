const SimpleGit = require('simple-git/promise')
const Handlebars = require('handlebars');
const Octokit = require('@octokit/rest')();
const FS = require('fs');
const Util = require('util');
const writeFileAsync = Util.promisify(FS.writeFile);
const rimraf = require('rimraf');

async function get_tags_commits(repo) {
    repo.sg.cwd(repo.path);
    const tags_resolve = await repo.sg.tags();
    
    const tags = tags_resolve.all;

    const tags_commits = [];
    for (var i = tags.length; i >= 1; --i) { // From newest to oldest version
        const from = i < tags.length ? tags[i] : 'HEAD';
        const to = tags[i - 1];
        const options = {'from': from, 'to': to}; // TODO: `from` inclusive, `to` exclusive?
        const log = await repo.sg.log(options);
        const commits = log.all; // From newest to oldest commit
        tags_commits.push({'tag': from, 'commits': commits});
    }
    return tags_commits;
}

async function get_closed_reqs(repo, max_req_num) {
    console.log("Getting " + max_req_num + " newest pull requests:", repo.owner, repo.name);

    // {owner, repo, state, head: 'user:branch', base: 'branch', sort, direction, page, per_page}
    const args = {owner: repo.owner, repo: repo.name, state: 'closed', direction: 'desc'};
    
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
    console.log("Got " + reqs.length + " pull requests:", repo.owner, repo.name);
    return reqs;
}

const MAX_REQ_NUM = 200; // TODO: Make parameter somewhere instead of constant.

async function get_tags_reqs(repo, tags_commits) {
    if (!tags_commits) tags_commits = await get_tags_commits(repo);
    const all_reqs = await get_closed_reqs(repo, MAX_REQ_NUM);
    
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
            if (!!idx || idx === 0) {
                tag_reqs.push(all_reqs[idx]);
                req_idx_from_hash[hash] = false;
            }
        }
        tags_reqs.push({'tag': tags_commits[i].tag, 'reqs': tag_reqs});
    }
    return tags_reqs;
}

function start_repo(owner, name, username, password) {
    if (username) {
        try {
            Octokit.authenticate({
                type: 'basic',
                username: username,
                password: password
            });
        } catch (e) {
            console.log(e);
            console.log("WARNING: Couldn't authenticate user:", username);
        }
    }

    const repo = {owner: owner, name: name, sg: SimpleGit('.')};

    // TODO: What if `repo.owner + '___' + repo.name` are equal for two repos? (name conflict)
    repo.path = './tmp_repos/' + repo.owner + '___' + repo.name + (+new Date()) + '/';

    // TODO: Non-GitHub URLs
    repo.url = 'https://github.com/' + repo.owner + '/' + repo.name + '.git';
    return repo;
}

async function maybe_clone_repo(repo) { // Caches repos.
    // if (FS.existsSync(repo.path)) {
    //     console.log("Repo cached at", repo.path);
    //     return repo.path; // Repo was already cloned earlier.
    // } // TODO: Breaks with remote change (need pull).

    console.log("Cloning", repo.url);
    repo.sg.cwd('.');
    await repo.sg.clone(repo.url, repo.path);
    console.log("Cloned into", repo.path);
    return repo.path;
}

function get_template() {
    const md_source = `
{{#for_each_tag}}
\n{{tag}}
{{#reqs}}
* {{title}} [#{{number}}]({{html_url}})
{{/reqs}}
{{/for_each_tag}}`;

    const template = Handlebars.compile(md_source);
    return template;
}

function use_template(template, tags_reqs) {
    const is_first_tag_head = (tags_reqs.length > 0 && tags_reqs[0].tag == 'HEAD');
    if (is_first_tag_head) { // Temporarily change tag for generating markdown
        tags_reqs[0].tag = 'Unreleased';
    }

    const data = {'for_each_tag': tags_reqs};
    const markdown = template(data);
    console.log('--------------------------------------------------------------------------');
    console.log(markdown);
    console.log('--------------------------------------------------------------------------');

    if (is_first_tag_head) tags_reqs[0].tag = 'HEAD'; // Restore tag name.
    return markdown;
}

async function get_changelog(repo) {
    await maybe_clone_repo(repo);
    const tags_reqs = await get_tags_reqs(repo);
    return use_template(get_template(), tags_reqs);
}

async function push_changelog(repo) {
    const md = await get_changelog(repo);
    repo.sg.cwd(repo.path);
    await writeFileAsync(repo.path + 'CHANGELOG.md', md);
    // TODO: git branch AutoChange (if branch doesn't exist); git checkout AutoChange
    await repo.sg.add('CHANGELOG.md');
    await repo.sg.commit('Update changelog');
    await repo.sg.push('origin', 'master');
    // TODO (after commiting to branch other than master): generate merge request

    // TODO: improve cleanup
    rimraf(repo.path, function () {
        console.log('tmp repo removed: ', repo.path);
    });
}

module.exports = {
    start: start_repo,
    tags_commits: get_tags_commits,
    changelog: get_changelog,
    push_changelog: push_changelog
};