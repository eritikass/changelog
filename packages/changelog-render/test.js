// Clone repository if not already cloned into './tmp_repos';
// generate changelog from tags and recent pull requests;
// write changelog to file and add, commit and push.

const Render = require('./render');

// Cloning and changelog generation work without username or password.
// Replace with your username and password so pushing works:
const username = process.env.GIT_USER;
const password = process.env.GIT_PASS;

const repo_owner = 'eritikass';        // Replace with the owner of your repo.
const repo_name  = 'alfa-beeta';             // Replace with the name of your repo.

const repo = Render.start(repo_owner, repo_name, username, password);
Render.push_changelog(repo).then(() => console.log('Pushed changelog.'));