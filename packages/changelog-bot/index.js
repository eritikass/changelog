const Renderer = require('../changelog-render/render')

const getPullRequestInfo = `
query getPullRequestInfo($owner: String!, $repository: String!, $pullRequest: Int!) {
  repository(owner: $owner, name: $repository) {
    pullRequest(number: $pullRequest) {
      id
      number
      title
      headRefName
      commits(last: 1) {
        edges {
          node {
          	commit {
              message
            }
          }
        }
      }
    }
  }
}
`

const addComment = `
mutation addComment($id: ID!, $body: String!) {
  addComment(input: {subjectId: $id, body: $body, clientMutationId: "AutoChanges"}) {
    clientMutationId
    subject {
      id
    }
    commentEdge {
      node {
        id
      }
    }
  }
}
`

// doesnt work, permissions issue?
const addReaction = `
mutation addReaction($id: ID!) {
  addReaction(input: {subjectId: $id, content:HOORAY, clientMutationId: "AutoChanges"}) {
    clientMutationId
  }
}
`

module.exports = robot => {
    robot.on('pull_request.opened', async context => {
        const pullRequestInfo = await context.github.query(getPullRequestInfo, {
            "owner": context.payload.repository.owner.login,
            "repository": context.payload.repository.name,
            "pullRequest": context.payload.pull_request.number
        })

        console.log('PullRequestInfo: ');
        console.log(pullRequestInfo)

        const commentInfo = await context.github.query(addComment, {
            id: pullRequestInfo.repository.pullRequest.id,
            body: 'AutoChanages bot checked you pull request, preparing Changelog updates!\n\n' +
            '[https://github.com/OmIkRoNiXz/changelog-test/pull/1](url)'
        })

        console.log('CommentInfo: ');
        console.log(commentInfo);
        console.log(commentInfo.addComment.commentEdge);

        // Permission issue?
        //const reactionInfo = await context.github.query(addReaction, {
        //    id: commentInfo.addComment.commentEdge.node.id
        //})

        //console.log('ReactionInfo: ')
        //console.log(reactionInfo);

        const username = process.env.GIT_USER;
        const password = process.env.GIT_PASS;

        const repo_owner = 'litvand';          // Replace with the owner of your repo.
        const repo_name  = 'changelog-test';   // Replace with the name of your repo.

        const repo = Renderer.start(repo_owner, repo_name, username, password);
        Renderer.push_changelog(repo).then(() => console.log('Pushed changelog.'));

        return;

        const result = await octokit.repos.updateFile(
            {
                owner: pullRequestInfo.repository.owner.login,
                repo: pullRequestInfo.repository.name,
                path,
                message,
                content,
                sha,
                branch,
                committer,
                author
            })

        const createCommitInfo = await octokit.gitdata.createCommit(
            {
                owner: pullRequestInfo.repository.owner.login,
                repo: pullRequestInfo.repository.name,
                message,
                tree,
                parents,
                author,
                committer
            })

        console.log(createCommitInfo)

        const createPullRequestInfo = context.github.pullRequests.create(
            {
                owner: pullRequestInfo.repository.owner.login,
                repo: pullRequestInfo.repository.name,
                head: 'resttest1',
                base: pullRequestInfo.repository.default_branch,
                title: 'Update CHANGELOG.md by AutoChanages'
            })

        console.log(createPullRequestInfo)
    })
}
